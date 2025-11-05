# Projet Simulation Crédit

## 1. Présentation

**Simulation Crédit** est une application web permettant :

- Aux **visiteurs (Guest)** :
  - Réaliser des simulations de crédits (mensualité, coût total, tableau d’amortissement simplifié)
  - Soumettre une demande de crédit à partir d’une simulation

- À **l'administrateur (Admin)** :
  - Consulter toutes les demandes de crédit
  - Voir le détail des demandes
  - Modifier le statut (en attente, en cours, acceptée, refusée)
  - Ajouter des notes internes

La communication côté données se fait via un backend **mocké avec json-server**.

---

## 2. Technologies utilisées

- **Frontend :** React (Vite), React Router, Tailwind CSS  
- **Backend :** json-server (mock API)  
- **State Management :** Context API (ou Redux/Zustand)  
- **Outils :** Node.js, npm  

---

## 3. Structure du projet

simulation-credit-app/
│
├── public/
│ ├── index.html
│ └── favicon.ico
│
├── src/
│ ├── assets/
│ │ └── images/
│ │ └── logo.png
│ │
│ ├── components/
│ │ ├── Button.jsx
│ │ ├── InputField.jsx
│ │ ├── SimulationCard.jsx
│ │ ├── NotificationBadge.jsx
│ │ └── TableRow.jsx
│ │
│ ├── pages/
│ │ ├── SimulationPage.jsx
│ │ ├── ApplicationPage.jsx
│ │ ├── AdminDashboard.jsx
│ │ └── AdminDemandDetail.jsx
│ │
│ ├── context/
│ │ ├── SimulationContext.jsx
│ │ └── AdminContext.jsx
│ │
│ ├── services/
│ │ ├── simulationService.js
│ │ ├── applicationService.js
│ │ └── notificationService.js
│ │
│ ├── hooks/
│ │ └── useFetch.js
│ │
│ ├── utils/
│ │ ├── calculateCredit.js
│ │ └── formatDate.js
│ │
│ ├── App.jsx
│ └── main.jsx
│
├── db.json
├── package.json
├── vite.config.js
└── README.md




---

## 4. Installation du projet

### Prérequis

- Node.js >= 16
- npm >= 8
- json-server

### Étapes

1. Cloner le projet :

```bash
git clone <url-du-projet>
cd simulation-credit-app


Installer les dépendances :

npm install


Lancer le serveur JSON :

npx json-server --watch db.json --port 4000


Lancer l’application React (Vite) :

npm run dev


Accéder à l’application :

Frontend: http://localhost:5173
Backend JSON-server: http://localhost:4000

5. Fonctionnalités principales
5.1 Simulation de crédit

Formulaire avec : type de crédit, montant, durée, taux, frais, assurance

Calcul automatique : mensualité, coût total, TAEG

Tableau d’amortissement simplifié

Possibilité de créer une demande à partir de la simulation

5.2 Demande de crédit (Guest)

Formulaire : nom, email, téléphone, revenu mensuel, situation professionnelle, commentaire

Création d’une entrée dans applications

Notification automatique pour l’admin

Message de confirmation

5.3 Espace Admin

Liste des demandes avec filtre par statut et recherche par nom/email

Détail d’une demande : informations du demandeur, résumé simulation, historique notes

Actions : changer statut, ajouter note, marquer prioritaire

Export CSV des demandes

5.4 Notifications

Badge avec nombre de notifications non lues

Marquer notifications comme lues

6. Endpoints JSON-server
Méthode	URL	Description
GET	/simulations	Lister toutes les simulations
GET	/simulations/:id	Récupérer une simulation spécifique
POST	/applications	Créer une demande de crédit
GET	/applications	Lister toutes les demandes
GET	/applications/:id	Détails d’une demande
PATCH	/applications/:id	Mettre à jour statut ou ajouter note
GET	/notifications	Lister toutes les notifications
PATCH	/notifications/:id	Marquer notification comme lue
7. Documentation technique

Architecture globale : React frontend + json-server backend

Flux de données : Guest → Simulation → Application → Admin → Notifications

Calculs crédits : mensualité, coût total, TAEG (dans utils/calculateCredit.js)

Validation : required, min/max, format email/phone

8. Améliorations possibles

Authentification Admin / Guest

Export PDF pour simulation et demande

Tableau d’amortissement complet

Notifications en temps réel (WebSocket)

9. Commandes utiles
# Installer les dépendances
npm install

# Lancer le serveur JSON
npx json-server --watch db.json --port 4000

# Lancer le frontend React (Vite)
npm run dev

# Build production
npm run build

# Nettoyer node_modules et réinstaller si problème
rm -rf node_modules
npm install

10. Auteur

Nom : Khadija Sahnoun

Contact : khadija@example.com