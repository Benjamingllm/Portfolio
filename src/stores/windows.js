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

  function moveWindow(appid, x, y) {
    const win = windows.value.find(window => window.id === appid)
    if (win) {
      win.x = x
      win.y = y
      //clamp limite le déplacement a la taille de l'écran et la barre des tache en hauteur
      
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
      windows.value.push({ id: appid , zIndex: 0,x: 0, y: 0, minimized: false, maximized: false })
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

  function toogleFromTaskbar(appid) {
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

  return { windows, openWindow, closeWindow, focusWindow, activeId, minimizeWindow ,toogleFromTaskbar, moveWindow,maximizeWindow}
})