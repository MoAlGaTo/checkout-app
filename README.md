# Projet Page de Paiement avec Next.js, React.js et Bootstrap

## Description du projet
Ce projet consiste à reproduire une page de paiement (checkout) en utilisant **Next.js**, **React.js**, et **Bootstrap**. L'objectif est de créer une interface responsive permettant de simuler un paiement via **Stripe** en mode test (sandbox).

Les principales fonctionnalités incluent :
- La création d'une page de paiement (checkout).
- L'intégration de **Stripe** pour effectuer des paiements en mode test.
- La mise en place d'une interface responsive avec **Bootstrap**.

## Technologies utilisées
- **Next.js** : Framework React pour la création d'applications web côté serveur.
- **React.js** : Bibliothèque JavaScript pour la gestion des composants UI.
- **Bootstrap** : Framework CSS pour la mise en page responsive.
- **Stripe API** : Service de paiement pour gérer les transactions en mode test.

## Instructions d’installation et de lancement

### 1. Cloner le repository
Pour commencer, clonez ce repository :

```bash
git clone https://github.com/MoAlGaTo/checkout-app.git
```

Installez les dépendances nécessaires avec npm ou yarn :

```bash
npm install
```

### 3. Configurer Stripe
Créez un compte Stripe sur https://stripe.com et obtenez vos clés API (clé publique et clé secrète).
Ajoutez vos clés dans le fichier .env.local à la racine du projet :

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXX
```

### 4. Lancer l'application
Démarrez l'application en mode développement :

```bash
npm run dev
```


### 5. Tester le paiement
L'application redirige automatiquement vers la page de paiement http://localhost:3000/checkout.

Sur la page de paiement, remplissez les champs de carte de crédit avec les informations suivantes (carte de test de Stripe) :

Numéro de carte : 4242 4242 4242 4242
Date d’expiration : Toute date future (ex : 12/24)
CVC : N'importe quel numéro à 3 chiffres (ex : 123)
Cliquez sur le bouton "Payer" pour simuler un paiement.

Un message de succès s'affiche.