// lib/email.ts - Service email propre
import * as nodemailer from 'nodemailer'
import { ContactFormData, EmailResult } from './types'

// Vérification config
export function checkEmailConfig() {
  const required = ['SMTP_USER', 'SMTP_PASS']
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Variables manquantes: ${missing.join(', ')}`)
  }
  
  return true
}

// Transporteur SMTP
const transporter = nodemailer.createTransport({ // Corrigé: createTransport (sans 'r')
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  pool: true,
  maxConnections: 3,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
})

// Test connexion
export async function testEmailConnection() {
  try {
    await transporter.verify()
    return { success: true, message: 'Connexion SMTP OK' }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue'
    return { success: false, error: message }
  }
}

// Email interne
async function sendInternalEmail(data: ContactFormData, formattedDate: string | null) {
  const { name, email, phone, eventType, message, plan, files } = data

  // Pièces jointes
  const attachments = files?.map(file => ({
    filename: file.name,
    content: file.data,
    encoding: 'base64' as const,
    contentType: file.type
  })) || []

  // Section fichiers
  const filesSection = files?.length ? `
    <div style="background: #faf8f3; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #d4af37;">
      <h3 style="color: #b8860b; margin: 0 0 15px 0;">📎 Fichiers joints (${files.length})</h3>
      ${files.map(file => `
        <div style="margin-bottom: 8px;">
          <strong>${file.name}</strong> (${Math.round(file.size / 1024)}KB, ${file.type})
        </div>
      `).join('')}
    </div>
  ` : ''

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 700px; margin: 20px auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #d4af37, #f4e4a6); color: white; padding: 30px; text-align: center; }
        .alert { background: #d4af37; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; }
        .section { background: #faf8f3; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d4af37; }
        .field { margin-bottom: 8px; }
        .field strong { color: #b8860b; min-width: 120px; display: inline-block; }
        .message-box { background: white; padding: 15px; border-radius: 5px; border: 1px solid #d4af37; white-space: pre-wrap; }
        .footer { background: #b8860b; color: white; padding: 20px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="alert">
          <h2 style="margin: 0;">🎯 NOUVELLE DEMANDE${files?.length ? ` + ${files.length} FICHIER(S)` : ''}</h2>
        </div>
        
        <div class="content">
          <div class="section">
            <h3 style="margin: 0 0 15px 0; color: #b8860b;">📞 Contact</h3>
            <div class="field"><strong>Nom:</strong> ${name}</div>
            <div class="field"><strong>Email:</strong> <a href="mailto:${email}" style="color: #d4af37;">${email}</a></div>
            ${phone ? `<div class="field"><strong>Tél:</strong> <a href="tel:${phone}" style="color: #d4af37;">${phone}</a></div>` : ''}
          </div>

          <div class="section">
            <h3 style="margin: 0 0 15px 0; color: #b8860b;">🎉 Événement</h3>
            <div class="field"><strong>Type:</strong> ${eventType}</div>
            ${formattedDate ? `<div class="field"><strong>Date:</strong> ${formattedDate}</div>` : ''}
            ${plan ? `<div class="field"><strong>Formule:</strong> ${plan}</div>` : ''}
          </div>

          ${filesSection}

          ${message ? `
          <div class="section">
            <h3 style="margin: 0 0 15px 0; color: #b8860b;">💬 Message</h3>
            <div class="message-box">${message}</div>
          </div>
          ` : ''}

          <div style="background: #fff2e6; padding: 20px; border-radius: 8px; border-left: 4px solid #ff8c00;">
            <h3 style="margin: 0 0 15px 0; color: #ff8c00;">🚀 Actions</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Répondre sous 2h pour maximiser la conversion</li>
              <li>Proposer un appel de 15min</li>
              <li>Envoyer des exemples du type d'événement</li>
            </ul>
          </div>
        </div>

        <div class="footer">
          <p><strong>📅 Reçu le:</strong> ${new Date().toLocaleString('fr-FR')}</p>
          <p>contact@memoriabox.fr</p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const info = await transporter.sendMail({
      from: `"MemoriaBox" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO || 'contact@memoriabox.fr',
      replyTo: email,
      subject: `🎯 [${eventType}] ${name}${files?.length ? ` + ${files.length} fichier(s)` : ''}`,
      html,
      attachments,
      headers: {
        'X-Priority': '2',
        'X-MSMail-Priority': 'High',
        'Importance': 'High'
      }
    })

    return { success: true, messageId: info.messageId }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Erreur email')
  }
}

// Email client
async function sendClientEmail(data: ContactFormData, formattedDate: string | null) {
  const { name, email, eventType, plan, files, message } = data

  const filesSection = files?.length ? `
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d4af37;">
      <h3 style="margin: 0 0 15px 0;">📎 Fichiers reçus (${files.length})</h3>
      <ul style="margin: 0; padding-left: 20px;">
        ${files.map(file => `<li><strong>${file.name}</strong> (${Math.round(file.size / 1024)}KB)</li>`).join('')}
      </ul>
      <p style="margin: 15px 0 0 0; color: #666; font-size: 14px;">
        Ces documents nous aideront à créer votre page personnalisée.
      </p>
    </div>
  ` : ''

  const messageSection = message ? `
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d4af37;">
      <h3 style="margin: 0 0 15px 0;">💬 Votre message</h3>
      <div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #d4af37; white-space: pre-wrap;">${message}</div>
    </div>
  ` : ''

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #d4af37, #f4e4a6); padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; }
        .section { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d4af37; }
        .footer { background: #f1f1f1; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div style="font-size: 30px;">📸✨</div>
          <h1 style="color: white; margin: 0; font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">MemoriaBox</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Votre page de souvenirs personnalisée</p>
        </div>
        
        <div class="content">
          <h2 style="color: #d4af37;">Merci ${name} !</h2>
          <p>Nous avons bien reçu votre demande pour votre ${eventType.toLowerCase()}.</p>

          <div class="section">
            <h3 style="margin: 0 0 15px 0;">📋 Récapitulatif</h3>
            <p><strong>Événement:</strong> ${eventType}</p>
            ${formattedDate ? `<p><strong>Date:</strong> ${formattedDate}</p>` : ''}
            ${plan ? `<p><strong>Formule:</strong> ${plan}</p>` : ''}
          </div>

          ${messageSection}

          ${filesSection}

          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745;">
            <h3 style="margin: 0 0 15px 0; color: #28a745;">🎯 Prochaines étapes</h3>
            <ol style="margin: 0; padding-left: 20px;">
              <li>Analyse de votre demande</li>
              <li>Proposition personnalisée sous 24h</li>
              <li>Création de votre page unique</li>
            </ol>
          </div>

          <p>À très bientôt,<br><strong>L'équipe MemoriaBox</strong></p>
        </div>

        <div class="footer">
          <p>contact@memoriabox.fr<br>
          <a href="https://memoriabox.fr" style="color: #d4af37;">memoriabox.fr</a></p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const info = await transporter.sendMail({
      from: `"MemoriaBox" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `✅ Demande reçue pour votre ${eventType.toLowerCase()} - MemoriaBox`,
      html
    })

    return { success: true, messageId: info.messageId }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Erreur' }
  }
}

// Fonction principale
export async function sendContactEmail(data: ContactFormData): Promise<EmailResult> {
  const formattedDate = data.eventDate 
    ? new Date(data.eventDate).toLocaleDateString('fr-FR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      })
    : null

  try {
    const internal = await sendInternalEmail(data, formattedDate)
    const client = await sendClientEmail(data, formattedDate)
    
    return {
      success: true,
      internal,
      client
    }
  } catch (error) {
    throw error
  }
}