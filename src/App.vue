<script setup>
import { ref } from 'vue'
import Desktop from './components/Desktop.vue'
import { useWindowsStore } from './stores/windows.js'
const windowsStore = useWindowsStore()

</script>

<template>
  
  <div class="windows" >
    <div v-for="(window, ) in windowsStore.windows" :key="window.id" class="window" v-show="!window.minimized" >
      <div class="title-bar">
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
  pointer-events: auto;
}
</style>

