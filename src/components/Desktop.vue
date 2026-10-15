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
  height: 100%;                                /* occupe toute la hauteur du bureau */
  grid-auto-flow: column;                      /* remplit de haut en bas, puis colonne suivante */
  grid-template-rows: repeat(auto-fill, 90px); /* autant de lignes de 90px qu'il en rentre */
  grid-auto-columns: 80px;                     /* largeur de chaque colonne créée */
  gap: 8px;                                    /* espace entre les cellules */
}
</style>

<template>
    <div class="desktop">
        
        
        <div class="grid">
            <icon v-for="(app, index) in apps" :key="index" :name="app.name" :size="48" :image="app.icon" @open="openapp(app)"/>
            
            

        </div>

    </div>
</template>