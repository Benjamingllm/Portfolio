<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from '@/lib/supabase.js'
import { useContentStore } from '@/stores/content.js'
import ProjectsTab from './tabs/ProjectsTab.vue'
import AboutTab from './tabs/AboutTab.vue'
import CvTab from './tabs/CvTab.vue'
import ContactTab from './tabs/ContactTab.vue'

const tabs = [
  { id: 'projects', label: 'Projets', component: ProjectsTab },
  { id: 'about', label: 'About', component: AboutTab },
  { id: 'cv', label: 'CV', component: CvTab },
  { id: 'contact', label: 'Contact', component: ContactTab },
]

const content = useContentStore()
const session = ref(null)
const ready = ref(false)
const current = ref('projects')
const email = ref('')
const password = ref('')
const loginError = ref('')
let subscription = null

onMounted(async () => {
  if (!supabase) {
    ready.value = true
    return
  }
  const { data } = await supabase.auth.getSession()
  session.value = data.session
  subscription = supabase.auth.onAuthStateChange((_event, newSession) => {
    session.value = newSession
  }).data.subscription
  await content.load()
  ready.value = true
})

onUnmounted(() => subscription?.unsubscribe())

async function login() {
  loginError.value = ''
  const { error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value })
  if (error) {
    loginError.value = 'Connexion refusée : vérifiez l\'email et le mot de passe.'
    return
  }
  password.value = ''
}

function logout() {
  supabase.auth.signOut()
}
</script>

<template>
  <main class="admin">
    <p v-if="!ready" class="status">Chargement…</p>

    <div v-else-if="!supabase" class="card">
      <h2>Supabase non configuré</h2>
      <p>Renseignez <code>VITE_SUPABASE_URL</code> et <code>VITE_SUPABASE_ANON_KEY</code> dans <code>.env.local</code>, puis relancez <code>npm run dev</code>.</p>
    </div>

    <form v-else-if="!session" class="card form login" @submit.prevent="login()">
      <h2>Administration</h2>
      <label>Email <input v-model="email" type="email" autocomplete="username" required></label>
      <label>Mot de passe <input v-model="password" type="password" autocomplete="current-password" required></label>
      <button class="primary" type="submit">Se connecter</button>
      <p v-if="loginError" class="status">{{ loginError }}</p>
    </form>

    <template v-else>
      <header class="header">
        <nav class="tabs">
          <button v-for="tab in tabs" :key="tab.id" type="button" :class="{ primary: current === tab.id }" @click="current = tab.id">{{ tab.label }}</button>
        </nav>
        <div class="account">
          <a href="/" target="_blank" rel="noopener">Voir le site</a>
          <button type="button" @click="logout()">Déconnexion</button>
        </div>
      </header>

      <p v-if="!content.fromSupabase" class="status">Supabase n'a pas répondu : les formulaires sont pré-remplis avec les données locales de <code>src/data/</code>.</p>

      <KeepAlive>
        <component :is="tabs.find(tab => tab.id === current).component" />
      </KeepAlive>
    </template>
  </main>
</template>

<style scoped>
.admin {
  max-width: 860px;
  margin: 0 auto;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login {
  max-width: 360px;
  width: 100%;
  margin: 10vh auto 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.tabs,
.account {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
