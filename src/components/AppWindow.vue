<script setup>
import { ref } from 'vue'
import { useWindowsStore } from '@/stores/windows.js'
import { getApp } from '@/data/apps.js'

const props = defineProps({
  win: {
    type: Object,
    required: true
  }
})

const windowsStore = useWindowsStore()
const root = ref(null)
const MIN_VISIBLE = 40
let offsetX = 0
let offsetY = 0
let area = null

function startDrag(event) {
  if (props.win.maximized || event.target.closest('button')) {
    return
  }
  area = root.value.parentElement
  offsetX = props.win.x - event.clientX
  offsetY = props.win.y - event.clientY
  document.addEventListener('pointermove', onDrag)
  document.addEventListener('pointerup', stopDrag)
  document.addEventListener('pointercancel', stopDrag)
}

function onDrag(event) {
  const maxX = area.clientWidth - MIN_VISIBLE
  const maxY = area.clientHeight - MIN_VISIBLE
  const x = Math.min(maxX, Math.max(0, event.clientX + offsetX))
  const y = Math.min(maxY, Math.max(0, event.clientY + offsetY))
  windowsStore.moveWindow(props.win.id, x, y)
}

function stopDrag() {
  document.removeEventListener('pointermove', onDrag)
  document.removeEventListener('pointerup', stopDrag)
  document.removeEventListener('pointercancel', stopDrag)
  area = null
}
</script>

<template>
  <div ref="root" class="window" :class="{ maximized: win.maximized }" v-show="!win.minimized" :style="{ 'z-index': win.zIndex, 'top': win.y + 'px', 'left': win.x + 'px' }" @pointerdown="windowsStore.focusWindow(win.id)">
    <div class="title-bar" @pointerdown="startDrag">
      <span class="title-bar-text">{{ getApp(win.id).name }}</span>
      <div class="title-bar-controls">
        <button aria-label="Minimize" @click="windowsStore.minimizeWindow(win.id)"></button>
        <button :aria-label="win.maximized ? 'Restore' : 'Maximize'" @click="windowsStore.maximizeWindow(win.id)"></button>
        <button aria-label="Close" @click="windowsStore.closeWindow(win.id)"></button>
      </div>
    </div>
    <div class="window-body">
      <component :is="getApp(win.id).component"></component>
    </div>
  </div>
</template>

<style scoped>
.window {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: 100%;
}
.window-body {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  margin: 0;
  margin-left: 3px;
  margin-right: 3px;
  overflow: auto;
}
.title-bar {
  user-select: none;
  touch-action: none;
}
.maximized {
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
}
</style>
