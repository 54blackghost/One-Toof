# React + Vite
# One Rooftop Restaurant - Frontend

Application web moderne pour le restaurant One Rooftop construite avec React.js et Chakra UI.

## Installation

1. Installer les dépendances:
\`\`\`bash
npm install
\`\`\`

2. Créer un fichier `.env` basé sur `.env.example`:
\`\`\`bash
cp .env.example .env
\`\`\`

3. Configurer les variables d'environnement dans `.env`

4. Lancer le serveur de développement:
\`\`\`bash
npm run dev
\`\`\`

L'application sera accessible sur http://localhost:5173/

## Structure du projet

\`\`\`
src/
├── components/       # Composants réutilisables
├── pages/           # Pages de l'application
├── context/         # Contextes React (Auth, Cart)
├── theme.js         # Configuration du thème Chakra UI
├── App.jsx          # Composant principal
└── main.jsx         # Point d'entrée
\`\`\`

## Technologies utilisées

- React.js 18
- Chakra UI
- React Router
- Framer Motion
- Axios
- Vite

## Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Crée une version de production
- `npm run preview` - Prévisualise la version de production

