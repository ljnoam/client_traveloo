// src/components/CookieBanner.jsx
import React from "react";

export default function CookieBanner({ onAccept }) {
  return (
    <div
      className="
        fixed bottom-0 left-0
        md:bottom-8 md:left-8
        w-full md:w-96
        bg-white dark:bg-gray-800
        shadow-xl
        rounded-xl
        p-4
        z-50
      "
    >
      <p className="text-sm text-gray-800 dark:text-gray-200">
        Nous utilisons des cookies et traceurs tiers pour améliorer votre expérience et analyser le trafic.
        <a
          href="/politique-confidentialite"
          className="underline text-blue-600 dark:text-blue-400 ml-1"
        >
          En savoir plus
        </a>
      </p>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => onAccept(false)}
          className="
            px-3 py-1
            bg-gray-200 dark:bg-gray-700
            text-gray-800 dark:text-gray-200
            rounded-lg
            hover:bg-gray-300 dark:hover:bg-gray-600
            transition
          "
        >
          Refuser
        </button>
        <button
          onClick={() => onAccept(true)}
          className="
            px-3 py-1
            bg-blue-600 dark:bg-blue-500
            text-white
            rounded-lg
            hover:bg-blue-700 dark:hover:bg-blue-600
            transition
          "
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
