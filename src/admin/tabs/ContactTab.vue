<script setup>
import { ref } from 'vue'
import { useContentStore } from '@/stores/content.js'
import { saveSetting } from '../saveSetting.js'

const content = useContentStore()
const form = ref({ ...content.contact })
const status = ref('')
const busy = ref(false)

async function save() {
  busy.value = true
  status.value = 'Enregistrement…'
  try {
    const contact = { linkedin: form.value.linkedin.trim(), formspree: form.value.formspree.trim() }
    await saveSetting('contact', contact)
    content.contact = contact
    status.value = 'Contact enregistré.'
  } catch (error) {
    status.value = `Échec : ${error.message}`
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <form class="card form" @submit.prevent="save()">
    <h2>Contact</h2>
    <label>LinkedIn (vide = bouton masqué) <input v-model="form.linkedin" type="url"></label>
    <label>Adresse Formspree <input v-model="form.formspree" type="url" required></label>
    <div class="row">
      <button class="primary" type="submit" :disabled="busy">Enregistrer</button>
    </div>
    <p v-if="status" class="status">{{ status }}</p>
  </form>
</template>
