import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useWindowsStore } from './windows.js'

export const useSessionStore = defineStore('session', () => {
  const loggedIn = ref(false)

  function login() {
    loggedIn.value = true
  }

  // les fenêtres sont dans le store, pas dans le bureau : v-if ne suffit pas à les fermer
  function logout() {
    useWindowsStore().closeAllWindows()
    loggedIn.value = false
  }

  return { loggedIn, login, logout }
})
