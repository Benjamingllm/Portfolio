<script setup>
    import { projects } from '@/data/projects';
    import { ref } from 'vue';
    import TaskPanelSection from '@/components/TaskPanelSection.vue';
    import { isTouch } from '@/utils/touch';

    // null = on affiche la grille ; un projet = on affiche son détail
    const selected = ref(null)

    // même règle que les icônes du bureau : au doigt, un tap simple ouvre le dossier
    function onClick(project) {
        if (isTouch()) {
            selected.value = project
        }
    }

</script>


<template>
    <div class="ProjetApp">
        <div class="toolbar">
            <button class="toolButton" :disabled="!selected" @click="selected = null">
                <img src="/icons/Back.png" alt="" class="toolIcon">
                <span>Précédent</span>
            </button>
            <button class="toolButton" disabled>
                <img src="/icons/Forward.png" alt="" class="toolIcon">
            </button>
            <button class="toolButton" :disabled="!selected" @click="selected = null">
                <img src="/icons/Up.png" alt="" class="toolIcon">
            </button>
        </div>

        <div class="addressBar">
            <span class="addressLabel">Adresse</span>
            <div class="addressField">
                <img src="/icons/My Documents.png" alt="" class="addressIcon">
                <span>C:\Documents and Settings\Benjamin\Mes documents\Projets<template v-if="selected">\{{ selected.name }}</template></span>
            </div>
        </div>

        <div class="main">
            <aside class="taskPanel">
                <template v-if="selected">
                    <TaskPanelSection v-if="selected.link || selected.github" title="Tâches">
                        <a v-if="selected.link" :href="selected.link" target="_blank" rel="noopener" class="task">
                            <img src="/icons/Internet Explorer 6.png" alt="" class="taskIcon">
                            Voir le site
                        </a>
                        <a v-if="selected.github" :href="selected.github" target="_blank" rel="noopener" class="task">
                            <img src="/icons/HTML.png" alt="" class="taskIcon">
                            Code source
                        </a>
                    </TaskPanelSection>

                    <TaskPanelSection title="Détails">
                        <p class="detailsName">{{ selected.name }}</p>
                        <p class="description">{{ selected.description }}</p>
                        <ul class="stack">
                            <li v-for="tech in selected.stack" :key="tech">{{ tech }}</li>
                        </ul>
                    </TaskPanelSection>
                </template>

                <TaskPanelSection v-else title="Détails">
                    <p class="detailsName">Projets</p>
                    <p>Dossier de fichiers</p>
                    <p>Double-cliquez sur un dossier pour l'ouvrir.</p>
                </TaskPanelSection>
            </aside>

            <div v-if="selected" class="content preview">
                <img v-if="selected.image" :src="selected.image" :alt="`Capture de ${selected.name}`" class="capture">
            </div>

            <div v-else class="content grid">
                <div class="item" v-for="project in projects" :key="project.id" @click="onClick(project)" @dblclick="selected = project">
                    <img src="/icons/Folder Closed.png" alt="" class="folderIcon">
                    <p>{{ project.name }}</p>
                </div>
            </div>
        </div>

        <div class="status-bar">
            <p class="status-bar-field">{{ selected ? selected.name : `${projects.length} objet(s)` }}</p>
        </div>
    </div>
</template>



<style scoped>
.ProjetApp{
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
/* xp.css grise le texte des boutons désactivés, on grise aussi l'icône */
.toolButton:disabled img{
    filter: grayscale(1);
    opacity: 0.5;
}
.toolIcon{
    width: 24px;
    height: 24px;
}

.addressBar{
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.3em 0.5em;
    border-bottom: 1px solid #c5c2b2;
}
.addressLabel{
    color: #555;
}
.addressField{
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 0.4em;
    padding: 0.15em 0.3em;
    background-color: #fff;
    border: 1px solid #7f9db9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.addressIcon{
    width: 16px;
    height: 16px;
}

/* fenêtre trop étroite : le volet passe au-dessus du contenu */
.main{
    flex: 1 1 auto;
    min-height: 16em;
    display: flex;
    flex-wrap: wrap;
}

/* flex-grow 1 contre 999 : le volet garde ~200px tant qu'il partage la ligne,
   et prend toute la largeur quand il passe au-dessus */
.taskPanel{
    flex: 1 1 200px;
    padding: 0.8em;
    background: linear-gradient(#7ba2e7, #6375d6);
    overflow: auto;
}
.content{
    flex: 999 1 280px;
    min-width: 0;
    padding: 1em;
    background-color: #fff;
    overflow: auto;
}

.task{
    display: flex;
    align-items: center;
    gap: 0.4em;
    padding: 0.2em 0;
    color: #215dc6;
    text-decoration: none;
}
.task:hover{
    text-decoration: underline;
}
.taskIcon{
    width: 16px;
    height: 16px;
}

.taskPanel p{
    margin: 0 0 0.5em;
}
.detailsName{
    font-weight: bold;
}
/* les 11px de xp.css sont trop petits pour un paragraphe */
.description{
    font-size: 12px;
    line-height: 1.4;
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

.preview{
    display: flex;
    justify-content: center;
    align-items: flex-start;
}
.capture{
    max-width: 100%;
    height: auto;
    border: 1px solid #c5c2b2;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.grid{
    display: grid;
    grid-template-columns: repeat(auto-fill, 90px);
    grid-auto-rows: max-content;
    gap: 1em;
}

.item{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    cursor: default;
}
.folderIcon{
    width: 48px;
    height: 48px;
}
.item p{
    margin: 0.3em 0 0;
    padding: 0 0.2em;
    overflow-wrap: anywhere;
}
.item:hover p{
    background-color: #316ac5;
    color: #fff;
}

.status-bar{
    margin: 0;
}
</style>
