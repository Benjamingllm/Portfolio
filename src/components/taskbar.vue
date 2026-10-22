<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowsStore } from '../stores/windows.js'
import { getApp } from '../data/apps.js'
import StartMenu from './StartMenu.vue'
const windowsStore = useWindowsStore()

const menuOpen = ref(false)
const startArea = ref(null)

// un clic n'importe où hors du bouton et du menu le referme, comme sous XP
function closeOnOutsideClick(event) {
  if (menuOpen.value && !startArea.value.contains(event.target)) {
    menuOpen.value = false
  }
}
onMounted(() => document.addEventListener('mousedown', closeOnOutsideClick))
onUnmounted(() => document.removeEventListener('mousedown', closeOnOutsideClick))
</script>
<template>
    <div class="taskbar">
        <div class="start-area" ref="startArea">
            <button class="start-button" :class="{ open: menuOpen }" type="button" @click="menuOpen = !menuOpen">
                <span class="start-flag" aria-hidden="true"></span>
                <span class="start-label">démarrer</span>
            </button>
            <StartMenu v-if="menuOpen" @close="menuOpen = false" />
        </div>
        <div class="taskbar-icons" >
            <div v-for="win in windowsStore.windows" :key="win.id" class="taskbar-icon" @click="windowsStore.toggleFromTaskbar(win.id)" :class="{ active: win.id === windowsStore.activeId }">
                <img :src="getApp(win.id).icon" alt="" />
                <span>{{ getApp(win.id).name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.taskbar {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  display: flex;
  align-items: stretch;
  height: var(--taskbar-height);
  font-family: Tahoma, "MS Sans Serif", sans-serif;
  font-size: 11px;
  color: #fff;
  user-select: none;
  background: linear-gradient(
    to bottom,
    #3f8cf3 0%,
    #2c7ae8 3%,
    #1b5fd9 6%,
    #1a5ad2 50%,
    #1d5fd8 92%,
    #1a4fb8 96%,
    #123f9e 100%
  );
  box-shadow: inset 0 1px 0 #6ba8f7;
}

/* xp.css peint tous les <button> : bord, fond et ombres de survol
   doivent être neutralisés avant de repeindre les nôtres. */
.start-button {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  min-width: 0;
  min-height: 0;
  margin: 0;
  padding: 0 15px 2px 7px;
  border: none;
  border-radius: 0 9px 9px 0;
  font: italic bold 14px/1 Tahoma, "MS Sans Serif", sans-serif;
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  background: linear-gradient(
    to bottom,
    #57ad44 0%,
    #4a9d3b 10%,
    #3a8c30 45%,
    #2e7d26 62%,
    #3a8a2f 88%,
    #2a7223 100%
  );
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.45),
    inset -3px 0 4px rgba(0, 0, 0, 0.2),
    1px 0 3px rgba(0, 0, 0, 0.35);
}

.start-button:hover {
  filter: brightness(1.12);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.45),
    inset -3px 0 4px rgba(0, 0, 0, 0.2),
    1px 0 3px rgba(0, 0, 0, 0.35);
}

.start-area {
  display: flex;
}

.start-button:active,
.start-button.open {
  filter: brightness(0.88);
  box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.4);
}

.start-flag {
  width: 13px;
  height: 12px;
  flex-shrink: 0;
  border-radius: 1px;
  transform: skewY(-7deg);
  background: conic-gradient(
    #7bc043 0 25%,
    #3b9ae1 0 50%,
    #f7c531 0 75%,
    #f45b4e 0
  );
}

.taskbar-icons {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 3px;
  margin-left: 6px;
  padding: 0 4px;
  overflow: hidden;
}

.taskbar-icon {
  display: flex;
  align-items: center;
  gap: 5px;
  flex: 0 1 158px;
  min-width: 0;
  height: calc(var(--taskbar-height) - 8px);
  padding: 0 6px;
  border-radius: 2px;
  cursor: pointer;
  overflow: hidden;
  background: linear-gradient(
    to bottom,
    #4f93f2 0%,
    #3178e6 8%,
    #2568d9 50%,
    #2d75e4 92%,
    #1f5ec9 100%
  );
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    inset 0 -1px 0 rgba(0, 0, 0, 0.22);
}

.taskbar-icon:hover {
  filter: brightness(1.15);
}

.taskbar-icon:active,
.taskbar-icon.active {
  background: linear-gradient(
    to bottom,
    #17479f 0%,
    #1b52b4 50%,
    #2663c8 100%
  );
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.45);
}

.taskbar-icon img {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.taskbar-icon span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@media (max-width: 560px) {
  .start-label {
    display: none;
  }

  .start-button {
    padding: 0 9px 2px 8px;
    border-radius: 0 7px 7px 0;
  }

  .taskbar-icon {
    flex-basis: 30px;
    justify-content: center;
    padding: 0 4px;
  }

  .taskbar-icon span {
    display: none;
  }
}
</style>
