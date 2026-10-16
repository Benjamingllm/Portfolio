// Les icônes sont dans public/ : on les référence par leur chemin, sans import
import AboutApp from "@/components/apps/AboutApp.vue"
import ProjectApp from "@/components/apps/ProjectApp.vue"
import CVApp from "@/components/apps/CVApp.vue"
import ContactApp from "@/components/apps/ContactApp.vue"
const Accounts = '/icons/User Accounts.png'
const Doc = '/icons/My Documents.png'
const cv = '/icons/Generic Text Document.png'
const contact ='/icons/Outlook Express.png'

export const apps = [
    {
        name: "About",
        icon: Accounts,
        id:"about",
        component : AboutApp

    },
    {
        name: "Projets",
        icon: Doc,
        id:"projets",
        component : ProjectApp

    },
    {
        name: "CV",
        icon: cv,
        id:"cv",
        component : CVApp

    },
    {
        name: "Contact",
        icon: contact,
        id:"contact",
        component : ContactApp

    },

  






]

// retrouve l'app (name, icon...) à partir de l'id stocké dans une fenêtre
export function getApp(id) {
    return apps.find(app => app.id === id)
}
    