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

export function getApp(id) {
    return apps.find(app => app.id === id)
}
    