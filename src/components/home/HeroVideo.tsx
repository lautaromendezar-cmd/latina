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
 *
 * EN TELEFONO EL VIDEO ARRANCA ADELANTADO, y el numero esta medido
 * cuadro por cuadro. El loop dura 12,1s y en un telefono solo se ve la
 * franja CENTRAL del encuadre (object-cover recorta a lo ancho): ahi
 * el tucan entra a los ~5s, pasa pleno entre 6,5 y 7,5 y sale a los
 * 8,5. Arrancando de cero, el visitante mira monte vacio cinco
 * segundos — mas de lo que dura la entrada del hero entera. Desde 5,5s
 * el tucan esta entrando en cuadro DE UNA, con casi tres segundos de
 * vuelo por delante.
 *
 * El salto del poster (cuadro cero) al segundo 5,5 no se ve: la camara
 * esta quieta y el sol y el monte son identicos en todos los cuadros —
 * lo unico que cambia entre esos dos instantes es que el tucan existe.
 * En desktop se ve el encuadre entero y el tucan aparece por el borde
 * a los ~2,5s: ahi el arranque natural funciona y no se toca.
 *
 * Solo se adelanta si el video esta al principio: el reintento por
 * gesto (bajo consumo) no tiene que rebobinar un video que ya avanzo.
 */

/** Donde arranca el loop en telefono. Ver la nota de arriba. */
const ADELANTO_MOVIL = 5.5

export function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    v.muted = true

    const adelantar = () => {
      if (v.currentTime < 0.2) v.currentTime = ADELANTO_MOVIL
    }
    if (window.matchMedia('(max-width: 767px)').matches) {
      // Antes de los metadatos no hay linea de tiempo donde buscar.
      if (v.readyState >= HTMLMediaElement.HAVE_METADATA) adelantar()
      else v.addEventListener('loadedmetadata', adelantar, { once: true })
    }
    const intentar = () => {
      if (v.paused) void v.play().catch(() => {})
    }
    intentar()

    const opciones = { once: true, passive: true } as const
    window.addEventListener('touchend', intentar, opciones)
    window.addEventListener('pointerdown', intentar, opciones)
    window.addEventListener('scroll', intentar, opciones)
    return () => {
      v.removeEventListener('loadedmetadata', adelantar)
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
