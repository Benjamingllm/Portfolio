import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase.js'
import { projects as localProjects } from '@/data/projects.js'
import { about as localAbout } from '@/data/about.js'
import { contact as localContact } from '@/data/contact.js'
import { cv as localCv } from '@/data/cv.js'

export const useContentStore = defineStore('content', () => {
  const projects = ref(localProjects)
  const about = ref(localAbout)
  const contact = ref(localContact)
  const cv = ref(localCv)
  const fromSupabase = ref(false)

  const settings = { about, contact, cv }

  async function load() {
    if (!supabase) {
      return
    }
    const [projectsRes, settingsRes] = await Promise.all([
      supabase.from('projects').select('*').order('position').order('id'),
      supabase.from('settings').select('key, value'),
    ])
    if (projectsRes.error || settingsRes.error) {
      console.warn('Supabase indisponible, données locales utilisées', projectsRes.error || settingsRes.error)
      return
    }
    projects.value = projectsRes.data
    for (const row of settingsRes.data) {
      if (settings[row.key]) {
        settings[row.key].value = { ...settings[row.key].value, ...row.value }
      }
    }
    fromSupabase.value = true
  }

  return { projects, about, contact, cv, fromSupabase, load }
})
