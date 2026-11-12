<script setup>
import { ref } from 'vue'
import { useContentStore } from '@/stores/content.js'
import { uploadFile, safeName } from '@/lib/supabase.js'
import { saveSetting } from '../saveSetting.js'

const content = useContentStore()
const form = ref(JSON.parse(JSON.stringify(content.about)))
const skillsText = ref(form.value.skills.join(', '))
const photoFile = ref(null)
const status = ref('')
const busy = ref(false)

async function save() {
  busy.value = true
  status.value = 'Enregistrement…'
  try {
    if (photoFile.value) {
      form.value.photo = await uploadFile(`photo/${safeName(photoFile.value)}`, photoFile.value)
      photoFile.value = null
    }
    form.value.skills = skillsText.value.split(',').map(skill => skill.trim()).filter(Boolean)
    await saveSetting('about', form.value)
    content.about = JSON.parse(JSON.stringify(form.value))
    status.value = 'About enregistré.'
  } catch (error) {
    status.value = `Échec : ${error.message}`
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <form class="card form" @submit.prevent="save()">
    <h2>About</h2>

    <div class="row">
      <label>Nom <input v-model="form.name" required></label>
      <label>Titre <input v-model="form.title"></label>
    </div>
    <label>Barre d'état (« à la recherche de… ») <input v-model="form.lookingFor"></label>
    <div class="row">
      <label>Photo <input type="file" accept="image/*" @change="photoFile = $event.target.files[0] ?? null"></label>
      <img v-if="form.photo && !photoFile" :src="form.photo" alt="" class="preview">
    </div>

    <h3>Sections</h3>
    <div v-for="(section, index) in form.sections" :key="index" class="group">
      <div class="row">
        <label>Titre <input v-model="section.title"></label>
        <button type="button" class="danger" @click="form.sections.splice(index, 1)">Retirer</button>
      </div>
      <label>Texte <textarea v-model="section.text"></textarea></label>
    </div>
    <button type="button" @click="form.sections.push({ title: '', text: '' })">+ Section</button>

    <label>Compétences (séparées par des virgules) <input v-model="skillsText"></label>

    <h3>Liens</h3>
    <div v-for="(link, index) in form.links" :key="index" class="row">
      <label>Libellé <input v-model="link.label"></label>
      <label>URL <input v-model="link.url" type="url"></label>
      <label>Icône <input v-model="link.icon" placeholder="/icons/…"></label>
      <button type="button" class="danger" @click="form.links.splice(index, 1)">Retirer</button>
    </div>
    <button type="button" @click="form.links.push({ label: '', url: '', icon: '' })">+ Lien</button>

    <h3>Outils</h3>
    <div v-for="(tool, index) in form.tools" :key="index" class="row">
      <label>Libellé <input v-model="tool.label"></label>
      <label>Icône <input v-model="tool.icon" placeholder="/icons/…"></label>
      <button type="button" class="danger" @click="form.tools.splice(index, 1)">Retirer</button>
    </div>
    <button type="button" @click="form.tools.push({ label: '', icon: '' })">+ Outil</button>

    <div class="row">
      <button class="primary" type="submit" :disabled="busy">Enregistrer</button>
    </div>
    <p v-if="status" class="status">{{ status }}</p>
  </form>
</template>

<style scoped>
h3 {
  margin: 8px 0 0;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 12px;
  border-left: 3px solid #e4e4e7;
}

.form > button[type="button"] {
  align-self: flex-start;
}
</style>
