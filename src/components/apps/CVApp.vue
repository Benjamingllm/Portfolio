<script setup>
import { ref } from 'vue'

// 1 = page entière, chaque pas agrandit les plafonds de l'image de 25 %
const zoom = ref(1)

function ZoomFw(){
    if (zoom.value >=2){
        return
    }
    zoom.value += 0.25


}
function ZoomBw(){
    if (zoom.value <=1){
        return
    }
    zoom.value -= 0.25
}
</script>





<template>
    <div class="CV">
        <div class="toolbar">
            <button class="toolButton"  @click="ZoomFw()">
             <img src="/icons/IE Enlarge Image.png" alt="" class="img">
            </button>
            <button class="toolButton" @click="ZoomBw()">
             <img src="/icons/IE Shrink Image.png" alt="" class="img" >
            </button>
            <!-- Un lien, pas un bouton : seul un <a download> déclenche le téléchargement -->
            <a class="toolButton" href="/cv/CV.pdf" download="CV.pdf">
             <img src="/icons/Save.png" alt="" class="img">
            </a>
        </div>
        <div class="viewer">
            <!-- Plafonds dans le :style car ils dépendent du zoom.
                 64px = barre de titre (28) + barre d'outils (32) + bordure basse de la fenêtre (3), arrondi. -->
            <img src="/cv/CV.jpg" alt="CV" :style="{
                'max-height': `calc(${zoom} * (100vh - var(--taskbar-height) - 64px))`,
                'max-width': `calc(${zoom} * 90vw)`
            }">
        </div>
    </div>
</template>


<style scoped>
.toolbar{
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 2px;
    background-color: #e0d9d1;
}
/* Bouton plat façon XP : on neutralise le style de xp.css */
.toolButton{
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
    box-shadow: none;
    min-width: 0;
    padding: 2px;
}
/* Taille fixe : c'est l'icône qui donne la hauteur à la barre */
.img{
    width: 24px;
    height: 24px;
}
.viewer{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>