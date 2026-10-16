# AppHub

Une marketplace où les créateurs publient leurs créations (applications web, jeux, SaaS) et où les utilisateurs les découvrent et y accèdent.

## Statut

Version de démonstration (étape 1 : interface).

## Fonctionnalités

### Actuellement en place
- Page d'accueil avec titre animé et bouton « Explorer »
- Catalogue affichant des cartes d'applications (données factices)
- Page « Publier une app » (formulaire de démonstration, rien n'est enregistré)
- En-tête de navigation commun

### Prévu (étapes suivantes)
- Base de données PostgreSQL hébergée sur Neon
- Comptes utilisateurs et créateurs (inscription, connexion)
- Publication réelle des applications depuis l'espace créateur
- Téléchargement ou accès aux applications
- Page de détail par application (description, captures, avis)
- Tableau de bord utilisateur (applications téléchargées, favoris)

## Stack technique

- Next.js 14 (App Router)
- React 18
- Tailwind CSS 3
- Framer Motion (animations)

## Structure du projet

## Connexion (créateurs)

- Choix « créateur / utilisateur » sur `/enter`. Les utilisateurs n'ont pas de compte : ils parcourent le catalogue.
- Les créateurs se connectent uniquement avec Google (Auth.js), puis créent leur pseudo et choisissent ce qu'ils créent. La photo vient de leur compte Gmail.
- Seuls les créateurs peuvent publier (`/publish`, `POST /api/apps`).
- Variables à définir : voir `.env.example` (identifiants Google OAuth, `NEXTAUTH_SECRET`, `DATABASE_URL`).
- URI de redirection à ajouter dans Google Cloud : `<URL du site>/api/auth/callback/google`.
- Les tables `creators` et la colonne `apps.creator` se créent automatiquement à la première utilisation.
