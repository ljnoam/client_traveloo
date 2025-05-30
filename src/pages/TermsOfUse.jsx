import React from "react";

const TermsOfUse = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 mt-25 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-center">Conditions Générales d'Utilisation</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p>
          Bienvenue sur Traveloo. En utilisant nos services, vous acceptez les présentes Conditions Générales d'Utilisation (CGU). Merci de les lire attentivement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Inscription et accès au service</h2>
        <p>
          L'accès à certaines fonctionnalités nécessite la création d'un compte utilisateur. Vous vous engagez à fournir des informations exactes et à les tenir à jour.
          Vous êtes responsable de la confidentialité de vos identifiants et de toute activité liée à votre compte.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Utilisation du service</h2>
        <p>
          Vous vous engagez à utiliser Traveloo de manière légale et conforme à nos politiques. Il est interdit de tenter d'accéder sans autorisation à d'autres comptes, d'endommager ou d'interférer avec le fonctionnement du service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus présents sur Traveloo (textes, images, logos, logiciels) est protégé par des droits de propriété intellectuelle. 
          Vous vous engagez à ne pas reproduire, copier ou exploiter ces contenus sans notre autorisation écrite.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Responsabilité</h2>
        <p>
          Nous nous efforçons de maintenir Traveloo accessible et sécurisé. Toutefois, nous ne pouvons être tenus responsables des interruptions, erreurs ou pertes de données indépendantes de notre volonté.
          Vous utilisez nos services sous votre propre responsabilité.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Résiliation</h2>
        <p>
          Vous pouvez supprimer votre compte à tout moment depuis votre espace personnel ou en nous contactant. 
          Nous nous réservons également le droit de suspendre ou supprimer un compte en cas de violation de ces CGU.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Loi applicable et juridiction</h2>
        <p>
          Les présentes CGU sont régies par le droit français. En cas de litige, les tribunaux compétents seront ceux du ressort de notre siège social.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
        <p>
          Pour toute question concernant ces conditions ou pour exercer vos droits, vous pouvez nous contacter à :
          <a href="mailto:support@traveloo.fr" className="text-blue-600 dark:text-blue-400 underline ml-1">support@traveloo.fr</a>.
        </p>
      </section>

      <p className="text-center text-sm text-gray-500 mt-12">
        Dernière mise à jour : avril 2025
      </p>
    </div>
  );
};

export default TermsOfUse;
