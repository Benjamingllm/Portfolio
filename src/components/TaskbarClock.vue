<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const time = ref('')
let timer = null

function update() {
    time.value = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
    update()
    timer = setInterval(update, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>


<template>
    <div class="clock">{{ time }}</div>
</template>


<style scoped>
.clock{
    display: flex;
    align-items: center;
    flex-shrink: 0;
    padding: 0 14px;
    border-left: 1px solid #0b3d91;
    background: linear-gradient(
        to bottom,
        #0c9ff0 0%,
        #129ff2 6%,
        #0b8ee3 50%,
        #0a86da 92%,
        #0870c4 100%
    );
    box-shadow: inset 1px 0 1px #47b8ff;
}
</style>
