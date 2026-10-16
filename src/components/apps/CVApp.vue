<template>
    <div class="CV">
        <div class="toolbar">
            <button class="toolButton">
             <img src="/icons/Search.png" alt="" class="img">
            </button><button class="toolButton">
             <img src="/icons/Save.png" alt="" class="img">
            </button>
        </div>
        <div class="viewer">
            <img src="/cv/resumeMitchIvin.jpg" alt="CV" class="page">
        </div>
    </div>
</template>


<style scoped>
/* Barre d'outils : les boutons en ligne, centrés verticalement */
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
.page{
    display: block; 
    max-height: calc(100vh - var(--taskbar-height) - 64px);
    max-width: 90vw;
}
</style>