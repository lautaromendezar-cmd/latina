'use client'

import { useEffect, useRef } from 'react'

/**
 * El video del hero, en su propio componente cliente. Existe por UN
 * motivo: en iPhone el video salia con el boton de play en vez de
 * reproducirse, y son dos problemas apilados.
 *
 * 1. REACT NO ESCRIBE `muted` EN EL HTML DEL SERVIDOR. Es un bug
 *    conocido de react-dom (#23772): el atributo se aplica como
 *    propiedad recien al hidratar. Safari parsea un `<video autoplay>`
 *    SIN muted y le niega el autoplay en el acto — la politica es
 *    "con sonido no arranca solo", y que el muted llegue medio segundo
 *    despues no lo hace reconsiderar. En desktop la hidratacion suele
 *    ganarle a la carga del video y por eso alla no se veia.
 *
 * 2. EL MODO DE BAJO CONSUMO DE iOS bloquea TODO autoplay, muted o no,
 *    hasta que el visitante hace un gesto. Contra eso no hay atributo
 *    que valga: hay que pedir play() desde el gesto.
 *
 * La solucion son las dos patas: reponer `muted` por propiedad y pedir
 *  play() a mano al montar (arregla 1), y reintentar una sola vez en el
 * primer toque o scroll (arregla 2 sin escuchar para siempre).
 *
 * El play() va con .catch(() => {}): si el navegador dice que no, la
 * respuesta correcta es quedarse en el poster — que es el estado
 * estatico disenado — y no un error en consola.
 *
 * Con `prefers-reduced-motion` no se intenta nada: los <source> llevan
 * el media query y el navegador ni descarga el video, asi que forzar
 * play() aca seria pelearle a una decision del visitante.
 */
export function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    v.muted = true
    const intentar = () => {
      if (v.paused) void v.play().catch(() => {})
    }
    intentar()

    const opciones = { once: true, passive: true } as const
    window.addEventListener('touchend', intentar, opciones)
    window.addEventListener('pointerdown', intentar, opciones)
    window.addEventListener('scroll', intentar, opciones)
    return () => {
      window.removeEventListener('touchend', intentar)
      window.removeEventListener('pointerdown', intentar)
      window.removeEventListener('scroll', intentar)
    }
  }, [])

  return (
    <video
      ref={video}
      aria-hidden="true"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/imagenes/hero-poster.webp"
      className="absolute inset-0 h-full w-full object-cover object-center"
    >
      <source
        src="/imagenes/hero-loop.webm"
        type="video/webm"
        media="(prefers-reduced-motion: no-preference)"
      />
      <source
        src="/imagenes/hero-loop.mp4"
        type="video/mp4"
        media="(prefers-reduced-motion: no-preference)"
      />
    </video>
  )
}
