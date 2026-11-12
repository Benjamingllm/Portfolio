import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && key ? createClient(url, key) : null

export const BUCKET = 'medias'

export async function uploadFile(path, file) {
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true })
  if (error) {
    throw error
  }
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}

export function safeName(file) {
  return `${Date.now()}-${file.name.replace(/[^\w.-]/g, '_')}`
}
