// src/components/UI/ParallaxContainer.jsx
import React, { useRef, useEffect } from "react";

const ParallaxContainer = ({ children, strength = 20 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    const layers = el.querySelectorAll("[data-speed]");
    let frame;

    const handleMouseMove = ({ clientX, clientY }) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        // -1 → 1
        const x = (clientX / innerWidth - 0.5) * 2;
        const y = (clientY / innerHeight - 0.5) * 2;

        layers.forEach((layer) => {
          const speed = parseFloat(layer.dataset.speed);
          const moveX = -x * speed * strength;
          const moveY = -y * speed * strength;
          layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );
};

export default ParallaxContainer;
