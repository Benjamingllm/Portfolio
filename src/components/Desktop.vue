<script setup>
import icon from './Icon.vue'
import { apps } from '../data/apps.js'
import { useWindowsStore } from '../stores/windows.js'
const windowsStore = useWindowsStore()

function openapp(app) {
    windowsStore.openWindow(app.id)
}
</script>
<style scoped>
.desktop {
  padding: 3vmin;
  flex: 1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image:url(../assets/img/background-image.jpg);}
.grid {
  display: grid;
  height: 100%;
  grid-auto-flow: column;
  grid-template-rows: repeat(auto-fill, 90px);
  grid-auto-columns: 80px;
  gap: 8px;
}
</style>

<template>
    <div class="desktop">
        
        
        <div class="grid">
            <icon v-for="(app, index) in apps" :key="index" :name="app.name" :size="48" :image="app.icon" @open="openapp(app)"/>
            
            

        </div>

    </div>
</template>