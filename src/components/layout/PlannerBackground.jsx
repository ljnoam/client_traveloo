"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "../../context/ThemeContext"

const GlobalBackground = () => {
  const { darkMode } = useTheme()
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scaleFactor = 1.02 // zoom très léger pour l'effet parallax
    const amplitude = 3 // translation max ±3px pour un effet subtil

    // applique le zoom initial
    container.style.transform = `scale(${scaleFactor})`

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      const moveX = -x * amplitude
      const moveY = -y * amplitude
      container.style.transform = `scale(${scaleFactor}) translate3d(${moveX}px, ${moveY}px, 0)`
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const getGradientClasses = () => {
    if (darkMode) {
      // Dark mode: more pronounced violet/purple gradient
      return "bg-gradient-to-br from-gray-900 via-violet-900 to-purple-950"
    } else {
      // Light mode: more pronounced green gradient
      return "bg-gradient-to-br from-green-100 via-emerald-50 to-green-200"
    }
  }

  return (
    <div
      ref={containerRef}
      className={`
        fixed inset-0 -z-10 overflow-hidden 
        transition-all duration-[2000ms] ease-in-out
        ${getGradientClasses()}
      `}
    >
      {/* Overlay pattern pour ajouter de la texture */}
      <div
        className={`
          absolute inset-0 opacity-40
          transition-opacity duration-[2000ms] ease-in-out
          ${
            darkMode
              ? "bg-[radial-gradient(circle_at_30%_20%,rgba(139,69,219,0.2),transparent_70%)]"
              : "bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.15),transparent_60%)]"
          }
        `}
      />

      {/* Subtle noise texture overlay */}
      <div
        className={`
          absolute inset-0 opacity-20
          transition-opacity duration-[2000ms] ease-in-out
          ${
            darkMode
              ? 'bg-[url(\'data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.1"/%3E%3C/svg%3E\')]'
              : 'bg-[url(\'data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.05"/%3E%3C/svg%3E\')]'
          }
        `}
      />

      {/* Additional atmospheric effects */}
      <div
        className={`
          absolute inset-0 
          transition-opacity duration-[2000ms] ease-in-out
          ${
            darkMode
              ? "bg-[conic-gradient(from_45deg_at_30%_30%,transparent,rgba(139,69,219,0.1),transparent,rgba(168,85,247,0.08),transparent)] opacity-60"
              : "bg-[conic-gradient(from_225deg_at_70%_70%,transparent,rgba(34,197,94,0.1),transparent,rgba(16,185,129,0.08),transparent)] opacity-50"
          }
        `}
      />
    </div>
  )
}

export default GlobalBackground
