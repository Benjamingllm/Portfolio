<script setup>
import { ref } from 'vue'
import Desktop from './components/Desktop.vue'
import taskbar from './components/taskbar.vue'
import LoginScreen from './components/LoginScreen.vue'
import { useWindowsStore } from './stores/windows.js'
import { useSessionStore } from './stores/session.js'
import { getApp } from './data/apps.js'
const windowsStore = useWindowsStore()
const session = useSessionStore()
const windowsArea = ref(null)
// nombre de pixels de la fenêtre qui restent visibles au minimum (barre de titre attrapable)
const MIN_VISIBLE = 40
let draggedId = null
let offsetX = 0
let offsetY = 0
function startDrag(id,event) {
  const win = windowsStore.windows.find(w => w.id === id)
  if (win.maximized || event.target.closest('button')) {
    return
  }
  draggedId = id
  
  offsetX =  win.x - event.clientX 
  offsetY =  win.y -  event.clientY 
  document.addEventListener('mousemove', onDrag)
  
  document.addEventListener('mouseup', stopDrag)
}

function onDrag(event) {
  const maxX = windowsArea.value.clientWidth - MIN_VISIBLE
  const maxY = windowsArea.value.clientHeight - MIN_VISIBLE
  const x = Math.min(maxX, Math.max(0, event.clientX + offsetX))
  const y = Math.min(maxY, Math.max(0, event.clientY + offsetY))
  windowsStore.moveWindow(draggedId, x, y)
}

function stopDrag() {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  draggedId = null
}
</script>

<template>
  <LoginScreen v-if="!session.loggedIn" @login="session.login()" />

  <template v-else>
  <div class="windows" ref="windowsArea">
    <div v-for="(window, ) in windowsStore.windows" :class="{maximized: window.maximized }" :key="window.id" class="window" v-show="!window.minimized" v-bind:style="{ 'z-index': window.zIndex, 'top': window.y + 'px', 'left': window.x + 'px'}" @mousedown="windowsStore.focusWindow(window.id)">
      <div class="title-bar" @mousedown.prevent="startDrag(window.id, $event)">
        <span class="title-bar-text">{{ getApp(window.id).name }}</span>
          <div class="title-bar-controls">
              <button aria-label="Minimize" @click="windowsStore.minimizeWindow(window.id)"></button>
              <button :aria-label="window.maximized ? 'Restore' : 'Maximize'" @click="windowsStore.maximizeWindow(window.id)"></button>
              <button aria-label="Close" @click="windowsStore.closeWindow(window.id)"></button>
          </div>
      </div>
      <div class="window-body">

        <component :is="getApp(window.id).component"></component>
      </div>
    </div>


  </div>
  <Desktop />
  <taskbar />
  </template>
</template>

<style scoped>
/* Zone des fenêtres = tout l'écran sauf la barre des tâches.
   z-index: 1 crée un contexte d'empilement : les z-index des fenêtres
   ne comptent qu'entre elles, la barre (z-index: 2) reste toujours devant. */
.windows {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: var(--taskbar-height);
  z-index: 1;
  pointer-events: none;
}
.window {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: 100%;
}
/* Colonne flex pour qu'une app puisse remplir la fenêtre agrandie (flex: 1 sur sa racine).
   min-height: 0, sinon le corps refuse d'être plus petit que son contenu et ne défile pas. */
.window-body {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  margin: 0;
  margin-left: 3px;
  margin-right: 3px;
  overflow: auto;
}
.maximized {
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
}
</style>

