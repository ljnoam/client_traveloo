<<<<<<< HEAD
# 🌍 Traveloo — Frontend

![React Version](https://img.shields.io/badge/react-19-blue)
![Build with Vite](https://img.shields.io/badge/build-vite-yellow)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Issues](https://img.shields.io/github/issues/votre-repo/traveloo)

> Interface web de l’application **Traveloo**, une plateforme intelligente de planification de voyages combinant IA, météo, vols, hôtels et favoris. Développée avec **React**, **Vite**, **TailwindCSS**, **Firebase**, et **Gemini AI**.

---

## 📚 Table des matières

- [📦 Installation](#-installation)
- [▶️ Lancement du projet](#️-lancement-du-projet)
- [🧱 Stack technique](#-stack-technique)
- [🔑 Variables d’environnement](#-variables-denvironnement-env)
- [🗂️ Structure du projet](#️-structure-du-projet)
- [✨ Fonctionnalités clés](#-fonctionnalités-clés)
- [💾 Favoris](#-favoris)
- [🧪 Linting](#-linting)
- [📸 Aperçu](#-aperçu)
- [🚀 À venir](#-à-venir)
- [🤝 Contribuer](#-contribuer)
- [📄 Licence](#-licence)
- [🧠 Powered by](#-powered-by)

---

## 📦 Installation

```bash
cd client
npm install
```

> Assure-toi d’avoir Node.js ≥ 18 installé.

---

## ▶️ Lancement du projet

```bash
npm run dev
```

Accessible à l'adresse : `http://localhost:5173`

---

## 🧱 Stack technique

- **React 19** — UI dynamique
- **React Router DOM v7** — Navigation SPA
- **Vite** — Développement ultra-rapide
- **TailwindCSS 4** — Style moderne
- **Firebase Auth** — Authentification
- **Gemini AI** — Génération d’itinéraires via l’IA Google
- **Flask APIs (backend)** :
  - Vols → `http://localhost:5000/api/flights`
  - Hôtels → `http://localhost:5001/api/hotels`
  - Favoris → `http://localhost:5002/api/favorites`

---

## 🔑 Variables d’environnement `.env`

Créer un fichier `.env` dans `client/` :

```env
VITE_GEMINI_API_KEY=ta_clé_google_ai
```

---

## 🗂️ Structure du projet

```
client/
├── api/
│   └── geminiApi.js
├── components/
│   └── trip/
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── Planner.jsx
│   ├── About.jsx
├── firebase.js
├── routes.js
├── App.jsx
├── main.jsx
```

---

## ✨ Fonctionnalités clés

### 🔐 Authentification

- Suivi de session via Firebase
- Accès conditionnel aux pages/plans

```js
const { user } = useContext(AuthContext);
```

### ✈️ & 🏨 API de voyage

- Appels à :
  - `/api/flights`
  - `/api/hotels`
  - `generateTripPlan()` (Gemini AI)
  - `/api/favorites` (sauvegarde)

### 🧠 Génération IA (Gemini)

- Entrée : destination, dates, budget, personnes
- Sortie : JSON d’itinéraire structuré

---

## 💾 Favoris

Stockage sécurisé côté utilisateur :

```http
POST http://localhost:5002/api/favorites
{
  user_id,
  destination,
  start_date,
  end_date,
  itinerary,
  flights,
  hotels
}
```

---

## 🧪 Linting

```bash
npm run lint
```

> Basé sur `eslint` avec règles modernes pour React.

---

## 📸 Aperçu

- ✅ Itinéraire jour par jour
- 🗺️ Cartes hôtels et vols
- 🔐 Auth Firebase
- 💾 Favoris persistants
- 🎨 UI animée avec `framer-motion`

---

## 🚀 À venir

- 🔍 Recherche intelligente
- 📱 Support mobile
- 🧭 Suggestions IA temps réel
- 📚 Historique des voyages

---

## 🤝 Contribuer

1. **Fork** & clone le repo :

```bash
git clone https://github.com/votre-repo/traveloo.git
cd traveloo/client
```

2. **Installe les dépendances** :

```bash
npm install
```

3. **Configure le fichier `.env`** et lance :

```bash
npm run dev
```

> Pour les règles de contribution, voir `CONTRIBUTING.md` *(à ajouter si nécessaire)*

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir [`LICENSE`](LICENSE) pour les détails.

---

## 🧠 Powered by

- [Google Gemini](https://ai.google.dev)
- [Firebase](https://firebase.google.com/)
- [Vite](https://vitejs.dev)
- [TailwindCSS](https://tailwindcss.com)

---

Bon voyage avec **Traveloo** ✈️🌍
=======
# traveloo
>>>>>>> 1c493d6e9632c4be44c87b71f4875791e717eb32
