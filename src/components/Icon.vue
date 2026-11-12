<script setup>
defineProps({
    name: String,
    size: {
        type: Number,
        default: 24
    },
    image: {
        type: String,
        default: ''
    }

})

import { isTouch } from '@/utils/touch'

const emit = defineEmits(['select', 'open'])

function onClick() {
    emit('select')
    if (isTouch()) {
        emit('open')
    }
}
</script>
<style scoped>
.icon_image {
    flex: 1;
    min-height: 0;
    width: 100%;
    object-fit: contain;
}
.icon {

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: v-bind("size + 'px'");
    height: v-bind("size + 'px'");
}
p {
  margin: 0;
  flex-shrink: 0;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;

}
</style>
<template>
    <div class="icon"  @click="onClick" @dblclick="emit('open')">
        <img v-bind:src="image" alt="" class="icon_image">
        <p>{{ name }}</p>
        

    </div>
</template>