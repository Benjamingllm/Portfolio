import { ref } from 'vue'
import { defineStore } from 'pinia'
import { isTouch } from '@/utils/touch'

export const useWindowsStore = defineStore('windows', () => {
  const windows= ref([])
  const topZ = ref(0)
  const activeId = ref(null)
  // décalage en px entre deux fenêtres ouvertes à la suite (cascade XP)
  const CASCADE_OFFSET = 25


  function focusWindow(appid) {
    const win = windows.value.find(window => window.id === appid)
    if (win) {
      topZ.value += 1
      activeId.value = appid
      win.minimized = false
      win.zIndex = topZ.value


    }
  }

  function moveWindow(appid, x, y) {
    const win = windows.value.find(window => window.id === appid)
    if (win) {
      win.x = x
      win.y = y
    }
  }

  function maximizeWindow(appid) {
    const win = windows.value.find(window => window.id === appid)
    if (win) {
      win.maximized = !win.maximized
      activeId.value = appid
    }
  }




  function openWindow(appid) {
    const win = !windows.value.some(app => app.id === appid)

    if (win) {
      // +1 : la première fenêtre est déjà décalée du coin
      const offset = (windows.value.length + 1) * CASCADE_OFFSET
      // Sur un téléphone, une fenêtre flottante ne tient pas : elle s'ouvre agrandie
      // (et reste restaurable, x/y gardent la position de cascade).
      windows.value.push({ id: appid , zIndex: 0, x: offset, y: offset, minimized: false, maximized: isTouch() })
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
      activeId.value = null
    }

  }
  function closeWindow(appid) {
      windows.value = windows.value.filter(window => window.id !== appid)
      activeId.value = null
  }

  function closeAllWindows() {
    windows.value = []
    activeId.value = null
  }

  function toggleFromTaskbar(appid) {
    const win = windows.value.find(window => window.id === appid)
    if (win) {
      if (win.minimized) {
        focusWindow(appid)
      }
      else if (activeId.value === appid) {
        minimizeWindow(appid)
      }
    else {
      focusWindow(appid)
    }
    }}

  return { windows, openWindow, closeWindow, closeAllWindows, focusWindow, activeId, minimizeWindow ,toggleFromTaskbar, moveWindow,maximizeWindow}
})