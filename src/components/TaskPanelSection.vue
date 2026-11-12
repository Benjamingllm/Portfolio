<script setup>
defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>


<template>
    <section class="panelSection">
        <h3 class="panelTitle">{{ title }}</h3>
        <div class="panelBody">
            <slot />
        </div>
    </section>
</template>


<style scoped>
.panelSection{
    margin-bottom: 0.9em;
}

.panelTitle{
    margin: 0;
    padding: 0.4em 0.8em;
    border-radius: 4px 4px 0 0;
    background: linear-gradient(to right, #fff, #c6d3f7);
    color: #215dc6;
    font-size: 1em;
    font-weight: bold;
}

.panelBody{
    padding: 0.6em 0.8em;
    background-color: #d6dff7;
    border: 1px solid #fff;
    border-top: none;
}
</style>
