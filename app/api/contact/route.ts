// app/api/contact/route.ts - Route propre
import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail, checkEmailConfig } from '../../../lib/email'
import { ContactFormData } from '../../../lib/types'
import {
  originOk,
  tooSoon,
  nextThrottleCookieOptions,
  readJsonSafely,
  validateFilesPayload,
  sanitizeText
} from '../../../lib/security'

export async function GET() {
  return NextResponse.json({ 
    message: 'API Contact MemoriaBox',
    domain: 'memoriabox.fr',
    status: 'operational'
  })
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'

  try {
    console.log('🔒 Nouvelle demande:', { ip: clientIp.substring(0, 20), timestamp: new Date().toISOString() })

    // 1. Validation origine
    if (!originOk(request)) {
      return NextResponse.json(
        { success: false, message: 'Origine non autorisée' },
        { status: 403 }
      )
    }

    // 2. Rate limiting
    if (tooSoon(request, 15)) {
      return NextResponse.json(
        { success: false, message: 'Merci de patienter avant de renvoyer un message' },
        { status: 429, headers: { 'Retry-After': '15' } }
      )
    }

    // 3. Lecture JSON
    const readResult = await readJsonSafely(request)
    if (!readResult.ok) {
      return NextResponse.json(
        { success: false, message: 'Format invalide' },
        { status: 400 }
      )
    }

    const rawData = readResult.json

    // 4. Sanitisation
    const data: ContactFormData = {
      name: sanitizeText(rawData.name, 100),
      email: sanitizeText(rawData.email, 200),
      phone: sanitizeText(rawData.phone, 20),
      eventType: sanitizeText(rawData.eventType, 50),
      eventDate: sanitizeText(rawData.eventDate, 10),
      message: sanitizeText(rawData.message, 800),
      plan: sanitizeText(rawData.plan, 50),
      website: sanitizeText(rawData.website, 200),
      files: Array.isArray(rawData.files) ? rawData.files.slice(0, 5) : []
    }

    // 5. Validations de base
    if (!data.name || data.name.length < 2) {
      return NextResponse.json(
        { success: false, message: 'Nom requis (min 2 caractères)' },
        { status: 400 }
      )
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json(
        { success: false, message: 'Email valide requis' },
        { status: 400 }
      )
    }

    if (!data.eventType) {
      return NextResponse.json(
        { success: false, message: 'Type d\'événement requis' },
        { status: 400 }
      )
    }

    // Validation téléphone optionnel
    if (data.phone && !/^[\d\s\-\+\(\)\.]{8,20}$/.test(data.phone)) {
      return NextResponse.json(
        { success: false, message: 'Format de téléphone invalide' },
        { status: 400 }
      )
    }

    // Validation date optionnelle
    if (data.eventDate) {
      const eventDate = new Date(data.eventDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (isNaN(eventDate.getTime()) || eventDate < today) {
        return NextResponse.json(
          { success: false, message: 'Date d\'événement invalide' },
          { status: 400 }
        )
      }
    }

    // 6. Honeypot
    if (data.website && data.website.trim() !== '') {
      console.log('🍯 Honeypot:', clientIp.substring(0, 20))
      await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000))
      return NextResponse.json({ success: true, message: 'Message reçu' })
    }

    // 7. Validation fichiers
    if (data.files && data.files.length > 0) {
      const filesCheck = validateFilesPayload(data.files)
      if (!filesCheck.ok) {
        return NextResponse.json(
          { success: false, message: filesCheck.reason },
          { status: 400 }
        )
      }
    }

    // 8. Vérification config email
    try {
      checkEmailConfig()
    } catch (configError) {
      console.error('❌ Config email:', configError)
      
      // Sauvegarde d'urgence
      console.log('💾 SAUVEGARDE:', JSON.stringify({
        ...data,
        files: data.files?.map(f => ({ name: f.name, size: f.size, type: f.type })),
        timestamp: new Date().toISOString(),
        status: 'config_error'
      }))
      
      return NextResponse.json(
        { success: false, message: 'Service temporairement indisponible. Contactez-nous à contact@memoriabox.fr' },
        { status: 503 }
      )
    }

    // 9. Envoi email
    try {
      const result = await sendContactEmail(data)
      
      console.log('✅ Email envoyé')
      console.log('💾 SUCCÈS:', JSON.stringify({
        name: data.name,
        email: data.email,
        eventType: data.eventType,
        filesCount: data.files?.length || 0,
        timestamp: new Date().toISOString(),
        processingTime: Date.now() - startTime
      }))

      let message = 'Merci ! Votre message a été envoyé.'
      
      if (result.client.success) {
        message += ' Vous allez recevoir une confirmation.'
      } else {
        message += ' Nous vous répondrons rapidement.'
      }
      
      if (data.files?.length) {
        message += ` ${data.files.length} fichier(s) joint(s) reçus.`
      }

      const response = NextResponse.json({ 
        success: true, 
        message,
        processingTime: Date.now() - startTime
      })

      // Cookie throttle
      const cookie = nextThrottleCookieOptions(15)
      response.cookies.set(cookie.name, cookie.value, cookie.options)

      return response

    } catch (emailError) {
      console.error('❌ Erreur email:', emailError)
      
      console.log('💾 ÉCHEC EMAIL:', JSON.stringify({
        ...data,
        files: data.files?.map(f => ({ name: f.name, size: f.size, type: f.type })),
        timestamp: new Date().toISOString(),
        error: emailError instanceof Error ? emailError.message : 'Unknown',
        status: 'email_failed'
      }))

      const response = NextResponse.json(
        { success: false, message: 'Erreur technique. Votre demande a été enregistrée, nous vous contacterons.' },
        { status: 500 }
      )

      const cookie = nextThrottleCookieOptions(15)
      response.cookies.set(cookie.name, cookie.value, cookie.options)

      return response
    }

  } catch (error) {
    console.error('💥 Erreur critique:', error)
    
    console.log('🆘 ERREUR CRITIQUE:', JSON.stringify({
      error: error instanceof Error ? error.message : 'Critical error',
      timestamp: new Date().toISOString(),
      ip: clientIp.substring(0, 20),
      processingTime: Date.now() - startTime
    }))

    return NextResponse.json(
      { success: false, message: 'Erreur technique. Contactez-nous à contact@memoriabox.fr' },
      { status: 500 }
    )
  }
}