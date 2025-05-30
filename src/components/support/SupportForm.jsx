// src/components/support/SupportForm.jsx
import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { supabase } from '../../api/supabaseClient'; // ✅ Import du client Supabase

export default function SupportForm() {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });
  const [loading, setLoading] = useState(false); // ✅ pour bloquer le bouton pendant envoi

  const cardBg = darkMode ? 'bg-gray-800/80' : 'bg-green-50/80';
  const backdrop = 'backdrop-blur-md';
  const inputBg = darkMode
    ? 'bg-gray-700 text-gray-100 placeholder-gray-400'
    : 'bg-white text-gray-900 placeholder-gray-500';
  const inputBorder = darkMode ? 'border-gray-600' : 'border-gray-300';
  const btnGradient = darkMode
    ? 'from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
    : 'from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500';

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { nom, email, sujet, message } = formData;

    try {
      const { error } = await supabase
        .from('support')
        .insert([{ nom, email, sujet, message }]);

      if (error) {
        console.error('Erreur Supabase:', error.message);
        alert('Une erreur est survenue, merci de réessayer.');
      } else {
        alert('Message envoyé avec succès ! 🚀');
        setFormData({ nom: '', email: '', sujet: '', message: '' });
      }
    } catch (err) {
      console.error('Erreur inconnue:', err);
      alert('Une erreur est survenue, merci de réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        ${cardBg} ${backdrop} p-8 rounded-2xl shadow-xl border ${inputBorder}
        space-y-6 transition-colors duration-500
      `}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <input
          type="text"
          name="nom"
          placeholder="Ton prénom ou pseudo"
          value={formData.nom}
          onChange={handleChange}
          required
          className={`
            p-3 rounded-lg w-full focus:outline-none focus:ring-2
            focus:ring-${darkMode ? 'purple' : 'green'}-400 border ${inputBorder}
            ${inputBg} transition-colors duration-500
          `}
        />
        <input
          type="email"
          name="email"
          placeholder="Ton email (pour te répondre)"
          value={formData.email}
          onChange={handleChange}
          required
          className={`
            p-3 rounded-lg w-full focus:outline-none focus:ring-2
            focus:ring-${darkMode ? 'purple' : 'green'}-400 border ${inputBorder}
            ${inputBg} transition-colors duration-500
          `}
        />
      </div>
      <input
        type="text"
        name="sujet"
        placeholder="Sujet de ton message (ex : Bug sur la carte)"
        value={formData.sujet}
        onChange={handleChange}
        required
        className={`
          p-3 rounded-lg w-full focus:outline-none focus:ring-2
          focus:ring-${darkMode ? 'purple' : 'green'}-400 border ${inputBorder}
          ${inputBg} transition-colors duration-500
        `}
      />
      <textarea
        name="message"
        rows={5}
        placeholder="Explique-nous ce que tu veux partager…"
        value={formData.message}
        onChange={handleChange}
        required
        className={`
          p-3 rounded-lg w-full focus:outline-none focus:ring-2
          focus:ring-${darkMode ? 'purple' : 'green'}-400 border ${inputBorder}
          ${inputBg} resize-none transition-colors duration-500
        `}
      />
      <button
        type="submit"
        disabled={loading} // désactive pendant envoi
        className={`
          w-full bg-gradient-to-r ${btnGradient} text-white py-3 rounded-lg
          font-semibold hover:brightness-105 hover:shadow-xl active:scale-95
          transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {loading ? 'Envoi en cours...' : '📩 Envoyer le message'}
      </button>
    </form>
  );
}
