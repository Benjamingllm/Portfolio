<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useContentStore } from '@/stores/content.js'

const { cv } = storeToRefs(useContentStore())

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
            <a class="toolButton" :href="cv.pdf" download="CV.pdf">
             <img src="/icons/Save.png" alt="" class="img">
            </a>
        </div>
        <div class="viewer">
            <img :src="cv.image" alt="CV" :style="{
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
.toolButton{
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
    box-shadow: none;
    min-width: 0;
    padding: 2px;
}
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