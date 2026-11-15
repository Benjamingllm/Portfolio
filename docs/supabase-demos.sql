alter table projects
  add column if not exists demo text,
  add column if not exists terminal text,
  add column if not exists controls text[] not null default '{}',
  add column if not exists progress jsonb;

insert into projects (name, description, stack, image, demo, terminal, controls, progress, github, position) values
(
  'Valopyx',
  'Mini-jeu de tir tactique en pixel art inspiré de Valorant, avec pathfinding A* pour les ennemis. Projet de lycée (2024).',
  array['Python', 'Pyxel'],
  '/img/valopyx.png',
  '/demos/valopyx/index.html',
  null,
  array['ZQSD : se déplacer', 'Clic : tirer', 'E : dash', 'G : ramasser le spike', 'R : planter le spike', 'Sur téléphone : croix, toucher pour tirer, boutons bas / droite / gauche pour E / G / R'],
  null,
  'https://github.com/Benjamingllm/Valopyx',
  1
),
(
  'RPG MongoDB',
  'Jeu de combat au tour par tour qui se joue dans le terminal. Personnages, monstres, boutique et scores sont stockés dans MongoDB.',
  array['Python', 'MongoDB'],
  null,
  null,
  'rpg',
  '{}',
  null,
  'https://github.com/Benjamingllm/Projet_jeux_db',
  2
),
(
  'Tanafit API',
  'Backend de la refonte de Tanafit : une API REST qui servira un front Vue, puis une application mobile Expo.',
  array['Django', 'DRF', 'PostgreSQL', 'Docker'],
  '/img/tanafit-api.svg',
  null,
  null,
  '{}',
  '{"updated": "novembre 2026", "done": ["Socle Django dockerisé avec PostgreSQL", "Utilisateurs identifiés par leur e-mail", "Tests pytest et intégration continue"], "todo": ["Routes de suivi des séances", "Authentification", "Front Vue, puis application Expo"]}',
  'https://github.com/Benjamingllm/tanafit-api',
  3
);

update settings set value = jsonb_set(value, '{photo}', '"/img/photo.jpg"') where key = 'about';
