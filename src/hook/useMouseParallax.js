// src/hooks/useMouseParallax.js
import { useEffect } from "react";

export default function useMouseParallax(depthFactor = 10) {
  useEffect(() => {
    const handler = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      document.querySelectorAll(".parallax").forEach((el) => {
        const depth = parseFloat(el.dataset.depth) || 1;
        el.style.transform = `translate3d(${-x * depthFactor * depth}px, ${-y * depthFactor * depth}px, 0)`;
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [depthFactor]);
}
