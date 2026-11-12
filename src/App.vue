<script setup>
import Desktop from './components/Desktop.vue'
import taskbar from './components/taskbar.vue'
import LoginScreen from './components/LoginScreen.vue'
import AppWindow from './components/AppWindow.vue'
import { useWindowsStore } from './stores/windows.js'
import { useSessionStore } from './stores/session.js'
import { useContentStore } from './stores/content.js'
const windowsStore = useWindowsStore()
const session = useSessionStore()
useContentStore().load()
</script>

<template>
  <LoginScreen v-if="!session.loggedIn" @login="session.login()" />

  <template v-else>
    <div class="windows">
      <AppWindow v-for="win in windowsStore.windows" :key="win.id" :win="win" />
    </div>
    <Desktop />
    <taskbar />
  </template>
</template>

<style scoped>
.windows {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: var(--taskbar-height);
  z-index: 1;
  pointer-events: none;
}
</style>
