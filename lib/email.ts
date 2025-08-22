// lib/email.ts
import * as nodemailer from 'nodemailer';

// Configuration du transporteur SMTP Hostinger
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // true pour SSL (port 465)
  auth: {
    user: process.env.SMTP_USER, // contact@memoriabox.fr
    pass: process.env.SMTP_PASS, // votre mot de passe email
  },
});

// Interface pour les données du formulaire
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string;
  message: string;
  plan?: string;
  website?: string; // honeypot
}

// Fonction principale pour envoyer les emails
export async function sendContactEmail(data: ContactFormData) {
  const { name, email, phone, eventType, eventDate, message, plan } = data;

  // Formatage de la date si présente
  const formattedDate = eventDate 
    ? new Date(eventDate).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  // 1. EMAIL INTERNE (pour vous)
  const internalEmailResult = await sendInternalEmail(data, formattedDate);
  
  // 2. EMAIL CLIENT (confirmation)
  const clientEmailResult = await sendClientConfirmationEmail(data, formattedDate);

  return {
    success: true,
    internal: internalEmailResult,
    client: clientEmailResult
  };
}

// Email interne avec tous les détails
async function sendInternalEmail(data: ContactFormData, formattedDate: string | null) {
  const { name, email, phone, eventType, eventDate, message, plan } = data;

  // Template HTML professionnel pour l'équipe
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #d4af37, #f4e4a6); padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 24px; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
        .content { background: white; padding: 30px; border: 1px solid #e0e0e0; }
        .section { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d4af37; }
        .section h3 { color: #333; margin-top: 0; margin-bottom: 15px; font-size: 18px; }
        .field { margin-bottom: 12px; }
        .field strong { color: #555; min-width: 120px; display: inline-block; }
        .message-box { background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 5px; white-space: pre-line; }
        .footer { background: #f1f1f1; padding: 20px; border-radius: 0 0 10px 10px; text-align: center; font-size: 12px; color: #666; }
        .priority { background: #e8f5e8; border-left-color: #28a745; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 Nouvelle demande MemoriaBox</h1>
        </div>
        
        <div class="content">
          <div class="section priority">
            <h3>🎯 Résumé rapide</h3>
            <div class="field"><strong>Client :</strong> ${name}</div>
            <div class="field"><strong>Événement :</strong> ${eventType}</div>
            <div class="field"><strong>Email :</strong> <a href="mailto:${email}">${email}</a></div>
            ${formattedDate ? `<div class="field"><strong>Date :</strong> ${formattedDate}</div>` : ''}
          </div>

          <div class="section">
            <h3>👤 Coordonnées complètes</h3>
            <div class="field"><strong>Nom :</strong> ${name}</div>
            <div class="field"><strong>Email :</strong> ${email}</div>
            ${phone ? `<div class="field"><strong>Téléphone :</strong> ${phone}</div>` : ''}
          </div>

          <div class="section">
            <h3>🎉 Détails de l'événement</h3>
            <div class="field"><strong>Type :</strong> ${eventType}</div>
            ${eventDate ? `<div class="field"><strong>Date souhaitée :</strong> ${formattedDate}</div>` : ''}
            ${plan ? `<div class="field"><strong>Formule envisagée :</strong> ${plan}</div>` : ''}
          </div>

          ${message ? `
          <div class="section">
            <h3>💬 Message du client</h3>
            <div class="message-box">${message}</div>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding: 20px; background: #e3f2fd; border-radius: 8px; border-left: 4px solid #2196f3;">
            <h3 style="margin-top: 0; color: #1976d2;">🚀 Actions recommandées</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Répondre dans les 2h ouvrées pour maximiser la conversion</li>
              <li>Proposer un appel de 15min pour comprendre les besoins</li>
              <li>Envoyer des exemples correspondant au type d'événement</li>
              ${plan ? '<li>Préparer un devis personnalisé pour la formule ' + plan + '</li>' : ''}
            </ul>
          </div>
        </div>

        <div class="footer">
          <p><strong>📅 Reçu le :</strong> ${new Date().toLocaleString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
          <p>Email envoyé automatiquement depuis le formulaire de contact MemoriaBox</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const internalMailOptions = {
    from: `"MemoriaBox Contact" <contact@memoriabox.fr>`,
    to: 'contact@memoriabox.fr',
    replyTo: email,
    subject: `🎯 [${eventType.toUpperCase()}] ${name} - Nouvelle demande${plan ? ` (${plan})` : ''}`,
    html: htmlContent,
    headers: {
      'X-Priority': '2',
      'X-MSMail-Priority': 'High',
      'Importance': 'High'
    }
  };

  try {
    const info = await transporter.sendMail(internalMailOptions);
    console.log('✅ Email interne envoyé:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Erreur email interne:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur d\'envoi inconnue';
    throw new Error(errorMessage);
  }
}

// Email de confirmation pour le client
async function sendClientConfirmationEmail(data: ContactFormData, formattedDate: string | null) {
  const { name, email, eventType, plan } = data;

  const clientHtmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #d4af37, #f4e4a6); padding: 40px 30px; border-radius: 10px 10px 0 0; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
        .header p { color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px; }
        .content { background: white; padding: 40px 30px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; }
        .welcome { text-align: center; margin-bottom: 30px; }
        .welcome h2 { color: #d4af37; margin: 0 0 15px 0; font-size: 24px; }
        .section { background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #d4af37; }
        .section h3 { color: #333; margin-top: 0; margin-bottom: 15px; font-size: 18px; }
        .field { margin-bottom: 10px; }
        .field strong { color: #555; }
        .next-steps { background: #e8f5e8; border-left-color: #28a745; }
        .footer { background: #f1f1f1; padding: 30px; border-radius: 0 0 10px 10px; text-align: center; }
        .footer p { margin: 5px 0; font-size: 14px; color: #666; }
        .logo { font-size: 24px; margin-bottom: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">📸✨</div>
          <h1>MemoriaBox</h1>
          <p>Votre page de souvenirs personnalisée</p>
        </div>
        
        <div class="content">
          <div class="welcome">
            <h2>Merci ${name} !</h2>
            <p>Nous avons bien reçu votre demande concernant votre ${eventType.toLowerCase()}.</p>
          </div>

          <div class="section">
            <h3>📋 Récapitulatif de votre demande</h3>
            <div class="field"><strong>Type d'événement :</strong> ${eventType}</div>
            ${formattedDate ? `<div class="field"><strong>Date souhaitée :</strong> ${formattedDate}</div>` : ''}
            ${plan ? `<div class="field"><strong>Formule envisagée :</strong> ${plan}</div>` : ''}
            <div class="field"><strong>Email de contact :</strong> ${email}</div>
          </div>

          <div class="section next-steps">
            <h3>🚀 Prochaines étapes</h3>
            <p><strong>1. Analyse de votre demande</strong><br>
            Notre équipe étudie vos besoins pour vous proposer la solution parfaite.</p>
            
            <p><strong>2. Proposition personnalisée</strong><br>
            Nous vous envoyons un devis détaillé avec des exemples correspondant à votre événement.</p>
            
            <p><strong>3. Création de votre page</strong><br>
            Une fois validé, nous créons votre page de souvenirs unique en quelques jours.</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <p style="font-size: 18px; color: #555;">Nous vous répondons <strong>rapidement</strong></p>
            <p style="font-size: 14px; color: #777;">Généralement sous 24h</p>
          </div>

          <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <p style="margin: 0; color: #856404;"><strong>💡 En attendant notre réponse :</strong><br>
            Pensez au nombre d'invités et au type de souvenirs que vous aimeriez collecter (photos, vidéos, messages). Cela nous aidera à mieux vous conseiller !</p>
          </div>
        </div>

        <div class="footer">
          <p><strong>MemoriaBox</strong> - Créateur de pages de souvenirs</p>
          <p>📧 contact@memoriabox.fr</p>
          <p style="font-size: 12px; margin-top: 15px;">
            Cet email confirme la réception de votre demande.<br>
            Nous ne partageons jamais vos informations avec des tiers.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const clientTextContent = `
Bonjour ${name},

Merci pour votre demande concernant votre ${eventType.toLowerCase()} !

RÉCAPITULATIF
============
Type d'événement : ${eventType}
${formattedDate ? `Date souhaitée : ${formattedDate}` : ''}
${plan ? `Formule envisagée : ${plan}` : ''}
Email de contact : ${email}

PROCHAINES ÉTAPES
================
1. Notre équipe analyse votre demande
2. Nous vous envoyons une proposition personnalisée
3. Création de votre page de souvenirs unique

Nous vous répondons rapidement (généralement sous 24h).

En attendant, pensez au nombre d'invités et au type de souvenirs que vous aimeriez collecter !

À très bientôt,
L'équipe MemoriaBox

--
📧 contact@memoriabox.fr
MemoriaBox - Créateur de pages de souvenirs
  `.trim();

  const clientMailOptions = {
    from: `"MemoriaBox" <contact@memoriabox.fr>`,
    to: email,
    subject: `✅ Demande reçue pour votre ${eventType.toLowerCase()} - MemoriaBox`,
    html: clientHtmlContent,
    text: clientTextContent,
    headers: {
      'X-Priority': '3', // Normale pour le client
    }
  };

  try {
    const info = await transporter.sendMail(clientMailOptions);
    console.log('✅ Email client envoyé:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Erreur email client:', error);
    // Ne pas faire échouer si l'email client échoue
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    return { success: false, error: errorMessage };
  }
}

// Fonction de test de la connexion SMTP
export async function testEmailConnection() {
  try {
    await transporter.verify();
    console.log('✅ Connexion SMTP OK');
    return { success: true, message: 'Connexion SMTP établie avec succès' };
  } catch (error) {
    console.error('❌ Erreur connexion SMTP:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    return { success: false, error: errorMessage };
  }
}

// Fonction pour vérifier les variables d'environnement
export function checkEmailConfig() {
  const required = ['SMTP_USER', 'SMTP_PASS'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Variables d'environnement manquantes: ${missing.join(', ')}`);
  }
  
  return true;
}