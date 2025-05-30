// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Dès que le chemin change, on fait défiler la fenêtre en haut
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // rien à afficher
}
