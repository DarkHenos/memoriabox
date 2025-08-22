// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail, type ContactFormData } from '../../../lib/email'

// Méthode GET pour éviter l'erreur 405
export async function GET() {
  return NextResponse.json({ 
    message: 'API Contact - Utilisez POST pour envoyer un message' 
  })
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()
    
    // Validation basique des données requises
    if (!data.name || !data.email || !data.eventType) {
      return NextResponse.json(
        { success: false, message: 'Nom, email et type d\'événement sont requis' },
        { status: 400 }
      )
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, message: 'Format d\'email invalide' },
        { status: 400 }
      )
    }

    // Protection anti-spam (honeypot)
    if (data.website && data.website.trim() !== '') {
      console.log('Tentative de spam détectée:', data)
      // On fait semblant que ça marche pour ne pas alerter le bot
      return NextResponse.json({ 
        success: true, 
        message: 'Message reçu' 
      })
    }

    console.log('Nouvelle demande de contact:', {
      name: data.name,
      email: data.email,
      eventType: data.eventType,
      timestamp: new Date().toISOString()
    })

    // Tentative d'envoi d'email
    try {
      await sendContactEmail(data)
      
      return NextResponse.json({ 
        success: true, 
        message: 'Merci ! Votre message a été envoyé. Nous vous répondrons rapidement.' 
      })
      
    } catch (emailError) {
      console.error('Erreur envoi email:', emailError)
      
      // En cas d'erreur email, on sauvegarde quand même dans les logs
      console.log('DEMANDE DE CONTACT (email failed):', JSON.stringify(data, null, 2))
      
      return NextResponse.json(
        { 
          success: false, 
          message: 'Erreur technique lors de l\'envoi. Merci de nous contacter directement par email à contact@memoriabox.fr.' 
        },
        { status: 500 }
      )
    }
    
  } catch (error) {
    console.error('Erreur traitement formulaire contact:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur lors du traitement de votre demande. Veuillez réessayer.' 
      },
      { status: 500 }
    )
  }
}