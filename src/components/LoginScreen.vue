<script setup>
import { ref, onUnmounted } from 'vue'
import { about } from '../data/about.js'

const emit = defineEmits(['login'])
const WELCOME_DELAY = 1000

// état propre à l'écran : le reste de l'appli n'a besoin de savoir que "connecté ou pas"
const welcome = ref(false)
let timer = null

function start() {
  welcome.value = true
  timer = setTimeout(() => emit('login'), WELCOME_DELAY)
}
onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <div class="login">
    <div class="band band-top"></div>

    <div v-if="welcome" class="middle">
      <p class="welcome">bienvenue</p>
    </div>

    <div v-else class="middle">
      <div class="left">
        <span class="flag" aria-hidden="true"></span>
        <p class="brand">Portfolio <span>xp</span></p>
        <p class="hint">Pour commencer, cliquez sur le nom d'utilisateur</p>
      </div>

      <div class="divider"></div>

      <div class="right">
        <button class="user" type="button" @click="start()">
          <img :src="about.photo" alt="" class="user-photo">
          <span class="user-text">
            <span class="user-name">{{ about.name }}</span>
            <span class="user-title">{{ about.title }}</span>
          </span>
        </button>
      </div>
    </div>

    <div class="band band-bottom"></div>
  </div>
</template>

<style scoped>
.login {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-family: Tahoma, "MS Sans Serif", sans-serif;
  color: #fff;
  user-select: none;
  background: #5a7edc;
}

.band {
  flex: 0 0 12vh;
  background: #00309c;
}
.band-top {
  border-bottom: 2px solid #7a96df;
}
/* le liseré orange du bas de l'écran XP */
.band-bottom {
  border-top: 2px solid transparent;
  border-image: linear-gradient(to right, #00309c, #f99736 50%, #00309c) 1;
}

.middle {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 16px;
  background: radial-gradient(circle at 10% 10%, #91b1ef, transparent 45%);
}

.left {
  flex: 0 1 300px;
  text-align: right;
}
.flag {
  display: inline-block;
  width: 64px;
  height: 58px;
  border-radius: 4px;
  transform: skewY(-7deg);
  background: conic-gradient(#7bc043 0 25%, #3b9ae1 0 50%, #f7c531 0 75%, #f45b4e 0);
}
.brand {
  margin: 8px 0 24px;
  font-size: 28px;
  font-weight: bold;
}
.brand span {
  color: #f99736;
  font-style: italic;
}
.hint {
  margin: 0;
  font-size: 14px;
}

.divider {
  align-self: stretch;
  width: 1px;
  margin: 24px 0;
  background: linear-gradient(transparent, #fff 50%, transparent);
}

.right {
  flex: 0 1 300px;
}

/* xp.css peint les <button> : on repart d'une vignette nue */
.user {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  min-height: 0;
  padding: 8px;
  border: none;
  border-radius: 6px;
  background: transparent;
  box-shadow: none;
  color: #fff;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.user:hover,
.user:active {
  background: linear-gradient(to right, #00309c, transparent);
  box-shadow: none;
}
.user-photo {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border: 2px solid #fff;
  border-radius: 4px;
  background: #fff;
}
.user:hover .user-photo {
  border-color: #f7c531;
}
.user-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.user-name {
  font-size: 18px;
}
.user-title {
  font-size: 12px;
  color: #d3e5fa;
}

.welcome {
  margin: 0;
  font-size: 48px;
  font-style: italic;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
}

@media (max-width: 560px) {
  .middle {
    flex-direction: column;
    gap: 16px;
  }
  .left {
    flex-basis: auto;
    text-align: center;
  }
  .divider {
    align-self: center;
    width: 80%;
    height: 1px;
    margin: 0;
    background: linear-gradient(to right, transparent, #fff 50%, transparent);
  }
  .right {
    flex-basis: auto;
  }
}
</style>
