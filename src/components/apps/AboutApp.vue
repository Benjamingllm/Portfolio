<script setup>
    import { about } from '@/data/about';
    import { useWindowsStore } from '@/stores/windows.js';
    import TaskPanelSection from '@/components/TaskPanelSection.vue';

    const windowsStore = useWindowsStore()

</script>


<template>
    <div class="AboutApp">
        <div class="toolbar">
            <button class="toolButton" @click="windowsStore.openWindow('projets')">
                <img src="/icons/My Documents.png" alt="" class="toolIcon">
                <span>Mes projets</span>
            </button>
            <button class="toolButton" @click="windowsStore.openWindow('cv')">
                <img src="/icons/Generic Text Document.png" alt="" class="toolIcon">
                <span>Mon CV</span>
            </button>
            <span class="separator"></span>
            <button class="toolButton" @click="windowsStore.openWindow('contact')">
                <img src="/icons/Outlook Express.png" alt="" class="toolIcon">
                <span>Me contacter</span>
            </button>
        </div>

        <div class="main">
            <aside class="taskPanel">
                <TaskPanelSection title="Liens">
                    <template v-for="link in about.links" :key="link.label">
                        <a v-if="link.url" :href="link.url" target="_blank" rel="noopener" class="task">
                            <img :src="link.icon" alt="" class="taskIcon">
                            {{ link.label }}
                        </a>
                    </template>
                </TaskPanelSection>

                <TaskPanelSection title="Compétences">
                    <ul class="stack">
                        <li v-for="skill in about.skills" :key="skill">{{ skill }}</li>
                    </ul>
                </TaskPanelSection>

                <TaskPanelSection title="Outils">
                    <p v-for="tool in about.tools" :key="tool.label" class="task">
                        <img :src="tool.icon" alt="" class="taskIcon">
                        {{ tool.label }}
                    </p>
                </TaskPanelSection>
            </aside>

            <div class="content">
                <div class="profile">
                    <img :src="about.photo" :alt="`Photo de ${about.name}`" class="photo">
                    <div>
                        <h1 class="name">{{ about.name }}</h1>
                        <p class="title">{{ about.title }}</p>
                    </div>
                </div>

                <section v-for="section in about.sections" :key="section.title" class="section">
                    <h2 class="sectionTitle">{{ section.title }}</h2>
                    <p class="text">{{ section.text }}</p>
                </section>
            </div>
        </div>

        <div class="status-bar">
            <p class="status-bar-field">{{ about.lookingFor }}</p>
        </div>
    </div>
</template>



<style scoped>
.AboutApp{
    width: 100%;
    min-width: min(560px, 90vw);
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
}

.toolbar{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.2em;
    padding: 0.3em 0.5em;
    border-bottom: 1px solid #c5c2b2;
    box-shadow: 0 1px #fff;
}

.toolButton{
    display: flex;
    align-items: center;
    gap: 0.4em;
    background: transparent;
    border: none;
    box-shadow: none;
    min-width: 0;
    padding: 0.2em 0.4em;
}
.toolIcon{
    width: 24px;
    height: 24px;
}
.separator{
    width: 1px;
    align-self: stretch;
    margin: 0 0.3em;
    background-color: #c5c2b2;
    box-shadow: 1px 0 #fff;
}

.main{
    flex: 1 1 auto;
    min-height: 20em;
    display: flex;
    flex-wrap: wrap;
}
.taskPanel{
    flex: 1 1 180px;
    padding: 0.8em;
    background: linear-gradient(#7ba2e7, #6375d6);
    overflow: auto;
}
.content{
    flex: 999 1 320px;
    min-width: 0;
    padding: 1.2em 1.5em;
    background-color: #fff;
    overflow: auto;
}

.task{
    display: flex;
    align-items: center;
    gap: 0.4em;
    margin: 0;
    padding: 0.2em 0;
    color: #215dc6;
    text-decoration: none;
}
a.task:hover{
    text-decoration: underline;
}
.taskIcon{
    width: 16px;
    height: 16px;
}

.stack{
    display: flex;
    flex-wrap: wrap;
    gap: 0.3em;
    margin: 0;
    padding: 0;
    list-style: none;
}
.stack li{
    padding: 0.1em 0.5em;
    background-color: #fff;
    border: 1px solid #a5b9e8;
    color: #215dc6;
}

.profile{
    display: flex;
    align-items: center;
    gap: 1em;
    padding-bottom: 1em;
    margin-bottom: 1em;
    border-bottom: 1px solid #c5d3f0;
}
.photo{
    width: 72px;
    height: 72px;
    object-fit: cover;
    border: 1px solid #c5c2b2;
}
.name{
    margin: 0;
    font-size: 20px;
    color: #215dc6;
}
.title{
    margin: 0.2em 0 0;
    color: #555;
}

.section{
    margin-bottom: 1em;
}
.sectionTitle{
    margin: 0 0 0.3em;
    font-size: 13px;
    color: #215dc6;
}
.text{
    margin: 0;
    font-size: 12px;
    line-height: 1.5;
}

.status-bar{
    margin: 0;
}
</style>
