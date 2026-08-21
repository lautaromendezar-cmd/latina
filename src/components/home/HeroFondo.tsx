'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { heroVideoListo } from '@/data/assets'

/**
 * Fondo del hero: poster siempre, video sólo si conviene.
 *
 * El poster se renderiza SIEMPRE y es el LCP. El video se monta después,
 * y sólo si el visitante está en condiciones de bancarlo. El brief lo pide
 * explícitamente —"si no llega, el video degrada a poster estático según
 * navigator.connection"— y es lo que sostiene el piso de Lighthouse 95 en
 * mobile.
 *
 * Se salta el video cuando:
 *   · el usuario pidió movimiento reducido (es movimiento, y grande)
 *   · `saveData` está activo: nos está pidiendo que no gastemos sus datos
 *   · la conexión declara 2g o 3g
 *
 * El poster es EXACTAMENTE el primer frame del loop, extraído del video ya
 * armado. Por eso el cambio no se ve: no hay salto entre la foto fija y el
 * arranque del video, que es lo que pasa cuando el poster sale de otra
 * toma.
 *
 * El loop además está cosido: el último segundo se funde sobre el primero,
 * así que no pega el tirón de cada vuelta.
 */

type ConexionLenta = {
  saveData?: boolean
  effectiveType?: string
}

function convieneElVideo(): boolean {
  if (!heroVideoListo) return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false

  const nav = navigator as Navigator & { connection?: ConexionLenta }
  const con = nav.connection
  if (!con) return true // no declara nada: le damos el beneficio de la duda

  if (con.saveData) return false
  if (con.effectiveType && /^(slow-)?2g$|^3g$/.test(con.effectiveType)) return false

  return true
}

export function HeroFondo() {
  const [conVideo, setConVideo] = useState(false)
  const [listo, setListo] = useState(false)
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (convieneElVideo()) setConVideo(true)
  }, [])

  useEffect(() => {
    const el = video.current
    if (!el) return
    // `canplay` y no `loadeddata`: recién ahí el primer frame está listo
    // para mostrarse sin quedar en negro.
    const alPoder = () => setListo(true)
    el.addEventListener('canplay', alPoder)
    if (el.readyState >= 3) alPoder()
    return () => el.removeEventListener('canplay', alPoder)
  }, [conVideo])

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Image
        src="/imagenes/hero-poster.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {conVideo && (
        <video
          ref={video}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            listo ? 'opacity-100' : 'opacity-0'
          }`}
          preload="metadata"
          playsInline
          muted
          loop
          autoPlay
        >
          <source src="/imagenes/hero-loop.webm" type="video/webm" />
          <source src="/imagenes/hero-loop.mp4" type="video/mp4" />
        </video>
      )}

      {/* Velo verde, no negro (MARCA.md). Un solo plano plano: el brief
          prohíbe gradientes de color, así que el enganche con la sección
          siguiente lo hace la greca, no un degradé. */}
      <div className="absolute inset-0 bg-yerba-oscuro/72" />
    </div>
  )
}
