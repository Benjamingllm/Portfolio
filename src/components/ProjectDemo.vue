<script setup>
import { ref, computed } from 'vue'
import TerminalReplay from '@/components/TerminalReplay.vue'
import { isTouch } from '@/utils/touch'
import { terminals } from '@/data/terminals.js'

const props = defineProps({
    project: {
        type: Object,
        required: true
    }
})

const launched = ref(false)
const session = computed(() => terminals[props.project.terminal])

function openInTab() {
    window.open(props.project.demo, '_blank', 'noopener')
}
</script>


<template>
    <div class="demo">
        <iframe v-if="launched && project.demo" :src="project.demo" :title="project.name" class="frame"></iframe>
        <TerminalReplay v-else-if="launched && session" :session="session" />

        <template v-else>
            <img v-if="project.image" :src="project.image" :alt="`Capture de ${project.name}`" class="capture">
            <button v-if="project.demo && isTouch()" @click="openInTab">Lancer en plein écran</button>
            <button v-else-if="project.demo || session" @click="launched = true">Lancer la démo</button>
        </template>
    </div>
</template>


<style scoped>
.demo{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
}

.capture{
    max-width: 100%;
    height: auto;
    border: 1px solid #c5c2b2;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.frame{
    align-self: stretch;
    flex: 1;
    min-height: 300px;
    border: 1px solid #c5c2b2;
}
</style>
