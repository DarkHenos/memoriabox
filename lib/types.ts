// lib/types.ts - Types centralisés pour MemoriaBox
export interface ContactFormData {
    name: string
    email: string
    phone?: string
    eventType: string
    eventDate?: string
    message: string
    plan?: string
    website?: string // honeypot
    files?: ContactFile[]
  }
  
  export interface ContactFile {
    name: string
    size: number
    type: string
    data: string // base64 sans préfixe
  }
  
  export interface UploadedFile extends ContactFile {
    id: string
    preview?: string // URL pour aperçu images
    status: 'uploading' | 'success' | 'error'
    error?: string
  }
  
  export interface SubmitStatus {
    type: 'success' | 'error' | 'warning' | null
    message: string
    details?: string
  }
  
  export interface EmailResult {
    success: boolean
    internal: { success: boolean; messageId?: string }
    client: { success: boolean; messageId?: string; error?: string }
  }