<script setup>
import { apps } from '../data/apps.js'
import { about } from '../data/about.js'
import { useWindowsStore } from '../stores/windows.js'

const emit = defineEmits(['close'])
const windowsStore = useWindowsStore()
const DEFAULT_PHOTO = '/icons/User Accounts.png'

function openApp(id) {
  windowsStore.openWindow(id)
  emit('close')
}

function closeAll() {
  windowsStore.closeAllWindows()
  emit('close')
}
</script>

<template>
  <div class="start-menu">
    <div class="menu-header">
      <img :src="about.photo || DEFAULT_PHOTO" alt="" class="menu-photo">
      <span>{{ about.name }}</span>
    </div>

    <div class="menu-body">
      <ul class="menu-left">
        <li v-for="app in apps" :key="app.id">
          <button class="menu-item" type="button" @click="openApp(app.id)">
            <img :src="app.icon" alt="">
            <span>{{ app.name }}</span>
          </button>
        </li>
      </ul>

      <ul class="menu-right">
        <template v-for="link in about.links" :key="link.label">
          <li v-if="link.url">
            <a class="menu-item" :href="link.url" target="_blank" rel="noopener" @click="emit('close')">
              <img :src="link.icon" alt="">
              <span>{{ link.label }}</span>
            </a>
          </li>
        </template>
      </ul>
    </div>

    <div class="menu-footer">
      <button class="menu-item footer-item" type="button" @click="closeAll()">
        <img src="/icons/Logout.png" alt="">
        <span>Tout fermer</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.start-menu {
  position: absolute;
  bottom: 100%;
  left: 0;
  width: min(380px, 100vw);
  border-radius: 7px 7px 0 0;
  overflow: hidden;
  background: #fff;
  box-shadow: 2px -2px 6px rgba(0, 0, 0, 0.4);
  border: 1px solid #1e57c4;
}

.menu-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  font: bold 14px Tahoma, "MS Sans Serif", sans-serif;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  background: linear-gradient(to bottom, #1868ce, #2b7de9 40%, #1c62d0);
}
.menu-photo {
  width: 42px;
  height: 42px;
  object-fit: cover;
  border: 2px solid #fff;
  border-radius: 3px;
  background: #fff;
}

.menu-body {
  display: flex;
  border-top: 2px solid #e68b2c;
}
.menu-left,
.menu-right {
  flex: 1;
  margin: 0;
  padding: 6px 0;
  list-style: none;
}
.menu-right {
  background: #d3e5fa;
  border-left: 1px solid #95bdee;
}

/* xp.css peint aussi ces <button> : même neutralisation que le bouton démarrer */
.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
  min-height: 0;
  padding: 4px 8px;
  border: none;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  font: inherit;
  color: #222;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
}
.menu-item:hover,
.menu-item:active {
  background: #316ac5;
  box-shadow: none;
  color: #fff;
}
.menu-item img {
  width: 32px;
  height: 32px;
}
.menu-right .menu-item img {
  width: 24px;
  height: 24px;
}

.menu-footer {
  display: flex;
  justify-content: flex-end;
  padding: 4px 6px;
  background: linear-gradient(to bottom, #1c62d0, #2b7de9 50%, #1868ce);
}
.footer-item {
  width: auto;
  color: #fff;
  border-radius: 3px;
}
.footer-item img {
  width: 22px;
  height: 22px;
}
</style>
