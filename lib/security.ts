// lib/security.ts - Sécurité propre
import type { NextRequest } from 'next/server'

// Limites Vercel
export const MAX_JSON_BYTES = 4_000_000 // 4MB
export const MAX_FILE_BYTES = 2 * 1024 * 1024 // 2MB par fichier
export const MAX_TOTAL_BYTES = 3_000_000 // 3MB total fichiers

// Types autorisés
export const ALLOWED_TYPES = new Set([
  'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
])

// Validation origine
export function originOk(req: NextRequest): boolean {
  const origin = req.headers.get('origin') || ''
  if (!origin) return true // Appels serveur

  try {
    const url = new URL(origin)
    const host = url.host
    
    // Vérification simple et compatible
    if (host === 'memoriabox.fr') return true
    if (host === 'www.memoriabox.fr') return true
    if (host === 'localhost:3000') return true
    
    return false
  } catch {
    return false
  }
}

// Rate limiting simple (en mémoire)
const rateLimits = new Map<string, number>()

export function tooSoon(req: NextRequest, seconds = 15): boolean {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  const now = Date.now()
  const last = rateLimits.get(ip) || 0
  
  if (now - last < seconds * 1000) {
    return true
  }
  
  rateLimits.set(ip, now)
  return false
}

// Cookie rate limit
export function nextThrottleCookieOptions(seconds = 15) {
  return {
    name: 'mbx_rl',
    value: String(Date.now()),
    options: {
      httpOnly: true as const,
      sameSite: 'lax' as const,
      path: '/api/contact',
      maxAge: seconds
    }
  }
}

// Lecture JSON sécurisée
export async function readJsonSafely(req: NextRequest) {
  try {
    const text = await req.text()
    const bytes = new TextEncoder().encode(text).length
    
    if (bytes > MAX_JSON_BYTES) {
      return { ok: false as const, error: 'Payload trop volumineux' }
    }
    
    const json = JSON.parse(text)
    return { ok: true as const, json }
  } catch {
    return { ok: false as const, error: 'JSON invalide' }
  }
}

// Validation fichiers
export function validateFilesPayload(files: Array<{ name: string; type: string; data: string; size: number }>) {
  if (!files || files.length === 0) {
    return { ok: true, total: 0 }
  }

  if (files.length > 5) {
    return { ok: false, reason: 'Maximum 5 fichiers' }
  }

  let total = 0
  for (const file of files) {
    if (!ALLOWED_TYPES.has(file.type)) {
      return { ok: false, reason: `Type non autorisé: ${file.name}` }
    }
    
    const size = file.size || Math.floor(file.data.length * 0.75)
    if (size > MAX_FILE_BYTES) {
      return { ok: false, reason: `${file.name} trop volumineux (max 2MB)` }
    }
    
    total += size
  }

  if (total > MAX_TOTAL_BYTES) {
    return { ok: false, reason: 'Taille totale dépassée (max 3MB)' }
  }

  return { ok: true, total }
}

// Nettoyage texte
export function sanitizeText(input: unknown, maxLength = 800): string {
  return String(input || '')
    .replace(/[\x00-\x09\x0B-\x1F\x7F]/g, '') // Caractères de contrôle
    .slice(0, maxLength)
    .trim()
}