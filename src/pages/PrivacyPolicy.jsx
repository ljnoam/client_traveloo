import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 mt-25 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-center">Politique de Confidentialité</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p>
          Bienvenue sur Traveloo. Votre vie privée est importante pour nous. Cette politique explique quelles données nous collectons, pourquoi nous les collectons et comment nous les protégeons, en conformité avec le Règlement Général sur la Protection des Données (RGPD).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Données que nous collectons</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Informations d'identification :</strong> votre adresse email et mot de passe via Firebase Auth.</li>
          <li><strong>Profil utilisateur :</strong> prénom, nom, itinéraires et préférences enregistrés dans Firestore.</li>
          <li><strong>Données d’usage :</strong> données analytiques anonymisées (Firebase Analytics) pour améliorer l’expérience utilisateur.</li>
          <li><strong>Cookies :</strong> consentement de suivi stocké localement dans votre navigateur.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Finalités du traitement</h2>
        <p>
          Nous utilisons vos données pour :
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Fournir et sécuriser nos services (accès aux comptes, itinéraires personnalisés).</li>
          <li>Améliorer votre expérience utilisateur.</li>
          <li>Respecter nos obligations légales.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Base légale du traitement</h2>
        <p>
          Selon le RGPD, notre traitement repose sur :
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>L’exécution du contrat (gestion du compte utilisateur).</li>
          <li>Votre consentement (cookies et données analytiques).</li>
          <li>Notre intérêt légitime (amélioration du service).</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Durée de conservation</h2>
        <p>
          Nous conservons vos données aussi longtemps que votre compte est actif. Vous pouvez demander leur suppression à tout moment. Les cookies de consentement expirent au bout de 6 mois.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Sécurité des données</h2>
        <p>
          Vos données sont protégées grâce aux standards de sécurité de Firebase, y compris le chiffrement en transit et au repos.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Partage des données</h2>
        <p>
          Vos données ne sont partagées qu’avec Firebase (hébergement et base de données sécurisée).  
          Nous ne revendons ni ne transférons vos informations personnelles à des tiers non autorisés.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez des droits suivants :
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Droit d’accès à vos données personnelles.</li>
          <li>Droit de rectification des données inexactes.</li>
          <li>Droit à l’effacement (droit à l’oubli).</li>
          <li>Droit d’opposition au traitement.</li>
          <li>Droit à la portabilité des données.</li>
        </ul>
        <p className="mt-4">
          Pour exercer vos droits, vous pouvez nous contacter à l’adresse suivante : 
          <a href="mailto:support@traveloo.fr" className="text-blue-600 dark:text-blue-400 underline ml-1">support@traveloo.fr</a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Modifications de la politique</h2>
        <p>
          Nous pouvons mettre à jour cette politique de confidentialité pour refléter les changements dans nos pratiques. Toute modification sera publiée sur cette page avec la date de mise à jour.
        </p>
      </section>

      <p className="text-center text-sm text-gray-500 mt-12">
        Dernière mise à jour : avril 2025
      </p>
    </div>
  );
};

export default PrivacyPolicy;
