import { supabase } from '@/lib/supabase.js'

export async function saveSetting(key, value) {
  const { error } = await supabase.from('settings').upsert({ key, value })
  if (error) {
    throw error
  }
}
