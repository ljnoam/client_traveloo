// src/components/home/FeedbackCard.jsx
import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext'; // ← on récupère darkMode  

export default function FeedbackCard() {
  const { darkMode } = useTheme();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Dégradés pour le bouton
  const gradientLight = 'from-green-400 to-green-600';
  const gradientDark  = 'from-purple-600 to-pink-500';
  const btnGradient   = darkMode ? gradientDark : gradientLight;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('feedbacks')
        .insert([{ message }]);

      if (error) {
        console.error("Erreur d'envoi :", error.message);
        alert("Erreur lors de l'envoi du feedback.");
      } else {
        alert("Merci pour ton idée 💡!");
        setMessage('');
      }
    } catch (err) {
      console.error("Erreur inattendue :", err);
      alert("Erreur lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border dark:border-gray-700">
      {/* Titre toujours en blanc */}
      <h3 className="text-xl font-semibold mb-4 text-center text-white">
         Donne-nous ton idée !
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-3 rounded-lg border focus:ring-2 focus:outline-none dark:bg-gray-700 dark:text-white"
          placeholder="Propose une amélioration, une idée de fonctionnalité, etc."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
        />

        <button
          type="submit"
          disabled={loading}
          className={`
            w-full bg-gradient-to-r ${btnGradient}
            hover:from-${darkMode ? 'purple-700'  : 'green-500'}
            hover:to-${darkMode   ? 'pink-600'   : 'green-700'}
            text-white font-semibold py-2 rounded-lg transition
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {loading ? 'Envoi...' : ' Envoyer'}
        </button>
      </form>
    </div>
  );
}
