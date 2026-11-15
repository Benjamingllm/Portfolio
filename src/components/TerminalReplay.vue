<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'

const props = defineProps({
    session: {
        type: Array,
        required: true
    }
})

const LINE_DELAY = 40
const KEY_DELAY = 120
const BEFORE_INPUT_DELAY = 700

const lines = ref([])
const finished = ref(false)
const screen = ref(null)
let stopped = false

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function play() {
    lines.value = []
    finished.value = false
    for (const step of props.session) {
        if (typeof step === 'string') {
            await wait(LINE_DELAY)
            if (stopped) return
            lines.value.push({ text: step, input: '' })
        } else {
            await wait(BEFORE_INPUT_DELAY)
            for (const char of step.input) {
                await wait(KEY_DELAY)
                if (stopped) return
                lines.value[lines.value.length - 1].input += char
            }
        }
    }
    finished.value = true
}

onMounted(play)
onUpdated(() => {
    screen.value.scrollTop = screen.value.scrollHeight
})
onUnmounted(() => { stopped = true })
</script>


<template>
    <div class="terminal">
        <pre ref="screen" class="screen"><span v-for="(line, index) in lines" :key="index" class="line">{{ line.text }}<span class="typed">{{ line.input }}</span><span v-if="!finished && index === lines.length - 1" class="cursor">_</span></span></pre>
        <div class="footer">
            <span>Partie enregistrée, rejouée automatiquement.</span>
            <button :disabled="!finished" @click="play">Rejouer</button>
        </div>
    </div>
</template>


<style scoped>
.terminal{
    align-self: stretch;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    min-width: 0;
}

.screen{
    flex: 1 1 300px;
    overflow: auto;
    white-space: pre-wrap;
}

.line{
    display: block;
    min-height: 1lh;
}
.typed{
    color: #ffff55;
}

.cursor{
    animation: blink 1s steps(1) infinite;
}
@keyframes blink{
    50%{ opacity: 0; }
}

.footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    color: #555;
}
</style>
