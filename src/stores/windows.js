import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWindowsStore = defineStore('windows', () => {
  const windows = ref([])

  function openWindow(appid) {
    if (windows.value.some(app => app.id === appid)) {
      return
    }
    windows.value.push({ id: appid })
  }

  
  function closeWindow(appid) {
      windows.value = windows.value.filter(window => window.id !== appid)
  }

  return { windows, openWindow, closeWindow }
})