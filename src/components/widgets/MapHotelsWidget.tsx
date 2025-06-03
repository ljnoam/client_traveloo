"use client"

import { useEffect, useRef } from "react"
import BaseWidget from "./BaseWidget"

export default function MapHotelsWidget() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement("script")
      script.async = true
      script.src =
        "https://tpemd.com/content?currency=eur&trs=412943&shmarker=627699.627699&search_host=search.hotellook.com&locale=en&powered_by=true&draggable=true&disable_zoom=false&show_logo=false&scrollwheel=false&color=%23596CB9ff&contrast_color=%23ffffff&width=400&height=300&lat=7.893587&lng=98.29682&zoom=13&radius=60&stars=0&rating_from=0&rating_to=10&promo_id=4285&campaign_id=101"
      script.charset = "utf-8"
      containerRef.current.appendChild(script)
    }
  }, [])

  return (
    <BaseWidget>
      <div ref={containerRef} className="w-full h-full" />
    </BaseWidget>
  )
}
