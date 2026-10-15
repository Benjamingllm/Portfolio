<script setup>
import { ref } from 'vue'
import Desktop from './components/Desktop.vue'
import taskbar from './components/taskbar.vue'
import { useWindowsStore } from './stores/windows.js'
const windowsStore = useWindowsStore()
let draggedId = null
let offsetX = 0
let offsetY = 0
function startDrag(id,event) {
  const win = windowsStore.windows.find(w => w.id === id)
  if (win.maximized) {
    return
  }
  draggedId = id
  
  offsetX =  win.x - event.clientX 
  offsetY =  win.y -  event.clientY 
  document.addEventListener('mousemove', onDrag)
  
  document.addEventListener('mouseup', stopDrag)
}

function onDrag(event) {
  
  windowsStore.moveWindow(draggedId, event.clientX + offsetX, event.clientY + offsetY)
 
}

function stopDrag() {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  draggedId = null
}
</script>

<template>
  
  <div class="windows" >
    <div v-for="(window, ) in windowsStore.windows" :class="{maximized: window.maximized }" :key="window.id" class="window" v-show="!window.minimized" v-bind:style="{ 'z-index': window.zIndex, 'top': window.y + 'px', 'left': window.x + 'px'}" @mousedown="windowsStore.focusWindow(window.id)">
      <div class="title-bar" @mousedown.prevent="startDrag(window.id, $event)">
        <span class="title-bar-text">{{ window.id }}</span>
          <div class="title-bar-controls">
              <button aria-label="Minimize" @click="windowsStore.minimizeWindow(window.id)"></button>
              <button :aria-label="window.maximized ? 'Restore' : 'Maximize'" @click="windowsStore.maximizeWindow(window.id)"></button>
              <button aria-label="Close" @click="windowsStore.closeWindow(window.id)"></button>
          </div>
      </div>
      <div class="window-body">

        <p>Ma premiere fenêtre</p>
      </div>
    </div>


  </div>
  <Desktop />
  <taskbar />

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
}

.maximized {
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
}
</style>

