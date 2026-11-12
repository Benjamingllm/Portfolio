<script setup>
import { ref, onMounted } from 'vue'
import { supabase, uploadFile, safeName } from '@/lib/supabase.js'

const empty = () => ({ id: null, name: '', description: '', stackText: '', image: null, link: '', github: '', position: 0 })

const projects = ref([])
const form = ref(empty())
const imageFile = ref(null)
const fileInput = ref(null)
const status = ref('')
const busy = ref(false)

async function load() {
  const { data, error } = await supabase.from('projects').select('*').order('position').order('id')
  if (error) {
    status.value = `Lecture impossible : ${error.message}`
    return
  }
  projects.value = data
}

onMounted(load)

function edit(project) {
  form.value = { ...project, stackText: project.stack.join(', '), link: project.link ?? '', github: project.github ?? '' }
  resetFile()
  status.value = ''
}

function reset() {
  form.value = empty()
  resetFile()
}

function resetFile() {
  imageFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

async function save() {
  busy.value = true
  status.value = 'Enregistrement…'
  try {
    let image = form.value.image
    if (imageFile.value) {
      image = await uploadFile(`projects/${safeName(imageFile.value)}`, imageFile.value)
    }
    const row = {
      name: form.value.name.trim(),
      description: form.value.description.trim(),
      stack: form.value.stackText.split(',').map(tech => tech.trim()).filter(Boolean),
      image,
      link: form.value.link.trim() || null,
      github: form.value.github.trim() || null,
      position: Number(form.value.position) || 0,
    }
    const { error } = form.value.id
      ? await supabase.from('projects').update(row).eq('id', form.value.id)
      : await supabase.from('projects').insert(row)
    if (error) {
      throw error
    }
    status.value = `« ${row.name} » enregistré.`
    reset()
    await load()
  } catch (error) {
    status.value = `Échec : ${error.message}`
  } finally {
    busy.value = false
  }
}

async function remove(project) {
  if (!confirm(`Supprimer « ${project.name} » ?`)) {
    return
  }
  const { error } = await supabase.from('projects').delete().eq('id', project.id)
  if (error) {
    status.value = `Échec : ${error.message}`
    return
  }
  if (form.value.id === project.id) {
    reset()
  }
  status.value = `« ${project.name} » supprimé.`
  await load()
}
</script>

<template>
  <section class="card">
    <h2>Projets ({{ projects.length }})</h2>
    <p v-if="!projects.length" class="status">Aucun projet en base.</p>
    <ul class="list">
      <li v-for="project in projects" :key="project.id" class="item">
        <img v-if="project.image" :src="project.image" alt="" class="thumb">
        <span class="name">{{ project.position }}. {{ project.name }}</span>
        <button type="button" @click="edit(project)">Modifier</button>
        <button type="button" class="danger" @click="remove(project)">Supprimer</button>
      </li>
    </ul>
  </section>

  <form class="card form" @submit.prevent="save()">
    <h2>{{ form.id ? `Modifier « ${form.name} »` : 'Nouveau projet' }}</h2>
    <div class="row">
      <label>Nom <input v-model="form.name" required></label>
      <label>Position <input v-model="form.position" type="number"></label>
    </div>
    <label>Description <textarea v-model="form.description"></textarea></label>
    <label>Stack (séparée par des virgules) <input v-model="form.stackText" placeholder="Vue, Tailwind, n8n"></label>
    <div class="row">
      <label>Lien du site <input v-model="form.link" type="url" placeholder="https://…"></label>
      <label>GitHub <input v-model="form.github" type="url" placeholder="https://github.com/…"></label>
    </div>
    <div class="row">
      <label>Capture <input ref="fileInput" type="file" accept="image/*" @change="imageFile = $event.target.files[0] ?? null"></label>
      <img v-if="form.image && !imageFile" :src="form.image" alt="" class="preview">
    </div>
    <div class="row">
      <button class="primary" type="submit" :disabled="busy">{{ form.id ? 'Enregistrer' : 'Ajouter' }}</button>
      <button v-if="form.id" type="button" :disabled="busy" @click="reset()">Annuler</button>
    </div>
    <p v-if="status" class="status">{{ status }}</p>
  </form>
</template>

<style scoped>
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name {
  flex: 1;
}

.thumb {
  width: 48px;
  height: 36px;
  object-fit: cover;
  border: 1px solid #e4e4e7;
}

.card + .card {
  margin-top: 16px;
}
</style>
