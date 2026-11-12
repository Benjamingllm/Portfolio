<script setup>
import { ref } from 'vue'
import { useContentStore } from '@/stores/content.js'
import { uploadFile } from '@/lib/supabase.js'
import { saveSetting } from '../saveSetting.js'

const content = useContentStore()
const pdfFile = ref(null)
const imageFile = ref(null)
const status = ref('')
const busy = ref(false)

async function save(event) {
  busy.value = true
  status.value = 'Envoi…'
  try {
    const version = `?v=${Date.now()}`
    const cv = { ...content.cv }
    if (pdfFile.value) {
      cv.pdf = await uploadFile('cv/CV.pdf', pdfFile.value) + version
    }
    if (imageFile.value) {
      cv.image = await uploadFile('cv/CV.jpg', imageFile.value) + version
    }
    await saveSetting('cv', cv)
    content.cv = cv
    pdfFile.value = null
    imageFile.value = null
    event.target.reset()
    status.value = 'CV mis à jour.'
  } catch (error) {
    status.value = `Échec : ${error.message}`
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <form class="card form" @submit.prevent="save">
    <h2>CV</h2>
    <p class="status">Le PDF est le fichier téléchargé, l'image est l'aperçu affiché dans la fenêtre CV. Vous pouvez n'en remplacer qu'un des deux.</p>
    <div class="row">
      <label>PDF <input type="file" accept="application/pdf" @change="pdfFile = $event.target.files[0] ?? null"></label>
      <a :href="content.cv.pdf" target="_blank" rel="noopener">PDF actuel</a>
    </div>
    <div class="row">
      <label>Aperçu (JPG) <input type="file" accept="image/jpeg" @change="imageFile = $event.target.files[0] ?? null"></label>
      <img :src="content.cv.image" alt="Aperçu actuel" class="preview">
    </div>
    <div class="row">
      <button class="primary" type="submit" :disabled="busy || (!pdfFile && !imageFile)">Envoyer</button>
    </div>
    <p v-if="status" class="status">{{ status }}</p>
  </form>
</template>
