// Les icônes sont dans public/ : on les référence par leur chemin, sans import
const folderClosed = '/icons/Folder Closed.png'

export const apps = [
    {
        name: "Folder",
        icon: folderClosed,
        id:"folder",

    },

    {
        name: "fichier",
        icon: folderClosed,
        id:"fichier",


    }







]

// retrouve l'app (name, icon...) à partir de l'id stocké dans une fenêtre
export function getApp(id) {
    return apps.find(app => app.id === id)
}
    