# AgroDistrib - Gestion de Stock des Produits Laitiers

Application web de gestion de stock pour les produits laitiers, permettant aux superviseurs de gérer les vendeurs et les produits.

## Fonctionnalités

- Authentification des utilisateurs (Superviseur, Vendeur, Client)
- Gestion des produits (CRUD)
- Gestion des vendeurs (CRUD)
- Interface utilisateur moderne et responsive
- Tableau de bord personnalisé selon le rôle

## Prérequis

- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)
- Backend Spring Boot (sur le port 8080)

## Installation

1. Cloner le dépôt :
```bash
git clone [URL_DU_REPO]
cd agrodistrib
```

2. Installer les dépendances :
```bash
npm install
```

3. Démarrer l'application en mode développement :
```bash
npm run dev
```

L'application sera accessible à l'adresse : http://localhost:3000

## Structure du Projet

```
src/
  ├── components/         # Composants React
  │   ├── auth/          # Composants d'authentification
  │   ├── dashboard/     # Composants du tableau de bord
  │   ├── produit/      # Composants de gestion des produits
  │   └── vendeur/      # Composants de gestion des vendeurs
  ├── store/            # Configuration Redux
  │   └── slices/       # Slices Redux
  ├── services/         # Services API
  ├── types/           # Types TypeScript
  ├── App.tsx          # Composant principal
  └── main.tsx         # Point d'entrée
```

## Technologies Utilisées

- React 18
- TypeScript
- Redux Toolkit
- Material-UI
- React Router
- Formik & Yup
- Axios
- React Toastify

## API Backend

L'application communique avec une API REST Spring Boot sur `http://localhost:8080/api`. Les endpoints principaux sont :

- `/api/auth/login` - Connexion
- `/api/auth/register` - Inscription
- `/api/produits` - Gestion des produits
- `/api/vendeurs` - Gestion des vendeurs

## Développement

Pour contribuer au projet :

1. Créer une branche pour votre fonctionnalité
2. Développer et tester votre code
3. Soumettre une pull request

## Scripts Disponibles

- `npm run dev` - Lance l'application en mode développement
- `npm run build` - Compile l'application pour la production
- `npm run lint` - Vérifie le code avec ESLint
- `npm run preview` - Prévisualise la version de production #   A g r o D i s t r i b _ F r o n t  
 #   A g r o D i s t r i b _ F r o n t  
 # AgroDistrib_Front
