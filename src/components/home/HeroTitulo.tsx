'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useLayoutEffectSeguro, movimientoReducido } from '@/lib/motion'
import { hero } from '@/content/site'

/**
 * El título del hero, con reveal por líneas.
 *
 * REGLA, aprendida rompiéndola: el contenido nunca se esconde con CSS
 * esperando que el JS lo revele. Acá el HTML del servidor sale con el
 * título VISIBLE, y GSAP lo esconde y lo anima dentro de un
 * useLayoutEffect, que corre antes del primer pintado — sin parpadeo.
 *
 * Si el bundle no carga, si GSAP falla, si el efecto tira error: el
 * título se ve igual. No hay ninguna regla de CSS que dependa de que el
 * JavaScript llegue.
 *
 * Sobre SplitText: no se usa a propósito. Las tres líneas ya están
 * escritas como tres líneas en `site.ts`, así que no hay nada que partir.
 * Lo único que aportaría es el wrapper con overflow oculto, que son cinco
 * líneas de markup — y el hero es el LCP.
 */
export function HeroTitulo() {
  const raiz = useRef<HTMLHeadingElement>(null)

  useLayoutEffectSeguro(() => {
    if (!raiz.current) return
    if (movimientoReducido()) return

    const ctx = gsap.context(() => {
      const lineas = gsap.utils.toArray<HTMLElement>('[data-linea]')
      if (!lineas.length) return

      // fromTo con valores explícitos: si GSAP tuviera que leer el estado
      // inicial del CSS, un transform en % se le vuelve px.
      gsap.fromTo(
        lineas,
        { yPercent: 108, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: 'expo.out',
          // Espera a que el preloader se esté yendo, no a que termine.
          delay: 0.35,
        },
      )
    }, raiz)

    return () => ctx.revert()
  }, [])

  return (
    <h1 ref={raiz} className="display text-display-1">
      {hero.titulo.map((linea) => (
        // overflow oculto: la línea sube desde atrás del renglón anterior
        <span key={linea.texto} className="block overflow-hidden pb-[0.08em]">
          <span data-linea className="block">
            <span className={linea.contorno ? 'contorno' : undefined}>{linea.texto}</span>
          </span>
        </span>
      ))}
    </h1>
  )
}
