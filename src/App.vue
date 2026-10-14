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
  draggedId = id
  const win = windowsStore.windows.find(w => w.id === id)
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
    <div v-for="(window, ) in windowsStore.windows" :key="window.id" class="window" v-show="!window.minimized" v-bind:style="{ 'z-index': window.zIndex, 'top': window.y + 'px', 'left': window.x + 'px'}" @mousedown="windowsStore.focusWindow(window.id)">
      <div class="title-bar" @mousedown.prevent="startDrag(window.id, $event)">
        <span class="title-bar-text">{{ window.id }}</span>
          <div class="title-bar-controls">
              <button aria-label="Minimize" @click="windowsStore.minimizeWindow(window.id)"></button>
              <button aria-label="Restore"></button>
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
.windows {
  position: absolute;
  top: 0;
  left: 0;
  width: 60%;
  height: 60%;
  pointer-events: none
}
.window {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: auto;
}
</style>

