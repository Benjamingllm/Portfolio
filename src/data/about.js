// Tout le contenu de la fenêtre "About" : modifier ici, pas dans AboutApp.vue
// photo: null = icône XP par défaut ; url: null = le lien n'est pas affiché
export const about = {
    name: "Benjamin Guillaume",
    title: "Étudiant en 2e année d'informatique",
    photo: null,
    lookingFor: "À la recherche d'un stage / d'une alternance",

    sections: [
        {
            title: "Qui je suis",
            text: "Je m'appelle Benjamin, j'ai 19 ans et je suis en 2e année de bachelor à Sup de Vinci, à La Défense. J'ai découvert le développement au collège, puis je m'y suis vraiment mis au lycée avec Python. C'est vite devenu ce que j'avais envie de faire de mes journées. Aujourd'hui, je touche un peu à tout : du web, des applications en Python, et du C# avec Unity.",
        },
        {
            title: "Ce que j'aime construire",
            text: "Les projets qui me motivent sont ceux qui servent vraiment à quelqu'un, à commencer par moi. Tanafit, mon application de suivi de séances de musculation, est née comme ça : j'en avais besoin. Ce portfolio, lui, est surtout un défi technique : recréer le comportement des fenêtres de Windows XP (déplacement, empilement, réduction) avec Vue, sans bibliothèque toute faite.",
        },
        {
            title: "En dehors du code",
            text: "Je joue aux jeux vidéo, ce qui explique en partie mon intérêt pour Unity, et je pratique la musculation, qui m'a appris à progresser un peu chaque semaine plutôt que tout d'un coup.",
        },
    ],

    links: [
        { label: "GitHub", url: "https://github.com/Benjamingllm", icon: "/icons/HTML.png" },
        { label: "LinkedIn", url:"https://www.linkedin.com/in/benjamin-guillaume-51641338b/", icon: "/icons/linkedin.webp" },
  
    ],

    skills: ["JavaScript", "Vue 3", "HTML / CSS", "Python", "C#"],

    tools: [
        { label: "VS Code", icon: "/icons/Notepad.png" },
        { label: "Git / GitHub", icon: "/icons/Shared Folder.png" },
        { label: "Vite", icon: "/icons/Programs.png" },
        { label: "n8n", icon: "/icons/Network Connections.png" },
        { label: "Unity", icon: "/icons/Game Controller.png" },
    ],
}
