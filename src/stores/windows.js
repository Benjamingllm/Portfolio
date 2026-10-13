import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWindowsStore = defineStore('windows', () => {
  const windows= ref([])
  const topZ = ref(0)
  const activeId = ref(null)



  function focusWindow(appid) {
    const win = windows.value.find(window => window.id === appid)
    if (win) {
      topZ.value += 1
      activeId.value = appid
      win.minimized = false
      win.zIndex = topZ.value

      
    }
  }
  function openWindow(appid) {
    const win = !windows.value.some(app => app.id === appid)

    if (win) {
      windows.value.push({ id: appid , zIndex: 0, minimized: false})
      focusWindow(appid)
      return
    }
    else {
      focusWindow(appid)
    }
    
  }

  function minimizeWindow(appid) {
    const win = windows.value.find(window => window.id === appid)
    if (win) {
      win.minimized = true
    }

  }
  function closeWindow(appid) {
      windows.value = windows.value.filter(window => window.id !== appid)
  }

  return { windows, openWindow, closeWindow, focusWindow, activeId, minimizeWindow }
})