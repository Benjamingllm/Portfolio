<script setup>
import { ref } from 'vue'
import Desktop from './components/Desktop.vue'
import { useWindowsStore } from './stores/windows.js'
const windowsStore = useWindowsStore()

</script>

<template>
  
  <div class="windows">
    <div v-for="(window, index) in windowsStore.windows" :key="index" class="window">
      <div class="title-bar">
        <span class="title-bar-text">{{ window.id }}</span>
          <div class="title-bar-controls">
              <button aria-label="Minimize"></button>
              <button aria-label="Restore"></button>
              <button aria-label="Close" @click="windowsStore.closeWindow(window.id)"></button>
          </div>
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
  width: 100%;
  height: 100%;
  pointer-events: none
}
.window {
  pointer-events: auto;
}
</style>

