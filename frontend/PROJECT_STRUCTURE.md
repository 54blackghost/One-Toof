# One Rooftop Restaurant - Structure du Projet

## Vue d'ensemble

Application complète de restaurant avec frontend React + Chakra UI et backend FastAPI.

## Structure Frontend (React + Chakra UI)

\`\`\`
frontend/
├── public/                    # Assets statiques
│   └── images/               # Images du restaurant et des plats
├── src/
│   ├── components/           # Composants réutilisables
│   │   ├── Navbar.jsx       # Navigation principale
│   │   ├── Footer.jsx       # Pied de page
│   │   └── StripeCheckout.jsx # Composant de paiement
│   ├── context/             # Contextes React
│   │   ├── AuthContext.jsx  # Gestion de l'authentification
│   │   └── CartContext.jsx  # Gestion du panier
│   ├── pages/               # Pages de l'application
│   │   ├── Home.jsx         # Page d'accueil
│   │   ├── Menu.jsx         # Page du menu
│   │   ├── Reservation.jsx  # Page de réservation
│   │   ├── Order.jsx        # Page de commande/panier
│   │   ├── Contact.jsx      # Page de contact
│   │   ├── Login.jsx        # Page de connexion
│   │   ├── Register.jsx     # Page d'inscription
│   │   └── admin/           # Pages admin
│   │       ├── Dashboard.jsx
│   │       ├── OrdersManagement.jsx
│   │       ├── ReservationsManagement.jsx
│   │       ├── MenuManagement.jsx
│   │       └── MessagesManagement.jsx
│   ├── theme.js             # Configuration Chakra UI
│   ├── App.jsx              # Composant principal
│   └── main.jsx             # Point d'entrée
├── index.html
├── vite.config.js
└── package.json
\`\`\`

## Structure Backend (FastAPI)

\`\`\`
backend/
├── app/
│   ├── api/                 # Routes API
│   │   ├── auth.py         # Authentification
│   │   ├── menu.py         # Gestion du menu
│   │   ├── orders.py       # Gestion des commandes
│   │   ├── reservations.py # Gestion des réservations
│   │   ├── contact.py      # Messages de contact
│   │   ├── admin.py        # Routes admin
│   │   └── payments.py     # Intégration Stripe
│   ├── config.py           # Configuration
│   ├── database.py         # Configuration base de données
│   ├── models.py           # Modèles SQLAlchemy
│   ├── schemas.py          # Schémas Pydantic
│   └── security.py         # JWT et sécurité
├── scripts/
│   ├── seed_data.py        # Script d'initialisation
│   └── README.md
├── main.py                 # Point d'entrée FastAPI
├── requirements.txt
└── .env.example
\`\`\`

## Fonctionnalités

### Frontend
- Page d'accueil avec présentation du restaurant
- Menu interactif avec filtres par catégorie
- Système de panier avec gestion des quantités
- Formulaire de réservation de table
- Système de commande en ligne
- Page de contact avec formulaire et carte
- Authentification (connexion/inscription)
- Dashboard admin complet

### Backend
- API RESTful avec FastAPI
- Authentification JWT
- CRUD complet pour le menu
- Gestion des commandes et réservations
- Système de messages de contact
- Routes admin sécurisées
- Intégration Stripe pour les paiements
- Base de données SQLite (facilement remplaçable)

## Installation et Démarrage

### Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

### Backend
\`\`\`bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python scripts/seed_data.py  # Initialiser la base de données
uvicorn main:app --reload
\`\`\`

## Identifiants Admin par Défaut
- Email: admin@onerooftop.fr
- Mot de passe: admin123

## Technologies Utilisées

### Frontend
- React 18
- Chakra UI
- React Router
- Framer Motion
- Axios
- Vite

### Backend
- FastAPI
- SQLAlchemy
- Pydantic
- JWT (python-jose)
- Stripe
- Uvicorn

## Déploiement

### Frontend
- Vercel (recommandé)
- Netlify
- GitHub Pages

### Backend
- Render
- Railway
- Heroku
- AWS/GCP/Azure

## Variables d'Environnement

### Frontend (.env)
\`\`\`
VITE_API_URL=http://localhost:8000
VITE_STRIPE_PUBLIC_KEY=pk_test_...
\`\`\`

### Backend (.env)
\`\`\`
DATABASE_URL=sqlite:///./onerooftop.db
SECRET_KEY=your-secret-key
STRIPE_SECRET_KEY=sk_test_...
\`\`\`
\`\`\`
