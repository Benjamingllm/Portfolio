import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useWindowsStore } from './windows.js'

export const useSessionStore = defineStore('session', () => {
  const loggedIn = ref(false)

  function login() {
    loggedIn.value = true
  }

  function logout() {
    useWindowsStore().closeAllWindows()
    loggedIn.value = false
  }

  return { loggedIn, login, logout }
})
