export const projects =  [


    {
        id: 0,
        name: "Tanafit",
        description: "application de suivie de séances de musculations",
        stack: ['Tailwind','Vue','N8N'],
        image: '/img/tanafit.png',
        demo: null,
        terminal: null,
        controls: [],
        progress: null,
        // pas de lien tant que l'appli n'a pas de login : ses données seraient accessibles à tous
        link : null,
        github : null



    },

    {
        id: 1,
        name: "Valopyx",
        description: "Mini-jeu de tir tactique en pixel art inspiré de Valorant, avec pathfinding A* pour les ennemis. Projet de lycée (2024).",
        stack: ['Python', 'Pyxel'],
        image: '/img/valopyx.png',
        demo: '/demos/valopyx/index.html',
        terminal: null,
        controls: ['ZQSD : se déplacer', 'Clic : tirer', 'E : dash', 'G : ramasser le spike', 'R : planter le spike', 'Sur téléphone : croix, toucher pour tirer, boutons bas / droite / gauche pour E / G / R'],
        progress: null,
        link: null,
        github: 'https://github.com/Benjamingllm/Valopyx'
    },

    {
        id: 2,
        name: "RPG MongoDB",
        description: "Jeu de combat au tour par tour qui se joue dans le terminal. Personnages, monstres, boutique et scores sont stockés dans MongoDB.",
        stack: ['Python', 'MongoDB'],
        image: null,
        demo: null,
        terminal: 'rpg',
        controls: [],
        progress: null,
        link: null,
        github: 'https://github.com/Benjamingllm/Projet_jeux_db'
    },

    {
        id: 3,
        name: "Tanafit API",
        description: "Backend de la refonte de Tanafit : une API REST qui servira un front Vue, puis une application mobile Expo.",
        stack: ['Django', 'DRF', 'PostgreSQL', 'Docker'],
        image: '/img/tanafit-api.svg',
        demo: null,
        terminal: null,
        controls: [],
        progress: {
            updated: 'novembre 2026',
            done: ['Socle Django dockerisé avec PostgreSQL', 'Utilisateurs identifiés par leur e-mail', 'Tests pytest et intégration continue'],
            todo: ['Routes de suivi des séances', 'Authentification', 'Front Vue, puis application Expo']
        },
        link: null,
        github: 'https://github.com/Benjamingllm/tanafit-api'
    }



]
