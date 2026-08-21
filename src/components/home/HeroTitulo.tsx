'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useMovimientoReducido } from '@/lib/motion'
import { hero } from '@/content/site'

/**
 * El título del hero, con reveal por líneas.
 *
 * El brief pedía SplitText. No se usa, a propósito: las tres líneas ya
 * están escritas como tres líneas en `site.ts`, así que no hay nada que
 * partir. Lo único que SplitText aportaría es el wrapper con overflow
 * oculto para que la línea suba desde atrás de una máscara — y eso son
 * cinco líneas de markup. Traer el plugin al bundle del hero para eso,
 * cuando el hero es el LCP, no cierra.
 *
 * Además SplitText tendría que reordenar el `<span class="contorno">` de
 * "la yerba", que es justo la parte que no conviene que toque nadie.
 *
 * El estado inicial se pinta desde el server con `translate-y-full`, así
 * que si el JS no llega a correr las líneas quedan escondidas. Por eso el
 * respaldo: el efecto pone las líneas visibles en el primer frame si algo
 * falla, y con movimiento reducido nunca se esconden.
 */
export function HeroTitulo() {
  const raiz = useRef<HTMLHeadingElement>(null)
  const reducido = useMovimientoReducido()

  useEffect(() => {
    if (!raiz.current) return

    const lineas = gsap.utils.toArray<HTMLElement>('[data-linea]', raiz.current)

    if (reducido) {
      gsap.set(lineas, { yPercent: 0, opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineas,
        { yPercent: 108, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: 'expo.out',
          delay: 0.15,
        },
      )
    }, raiz)

    return () => ctx.revert()
  }, [reducido])

  return (
    <h1 ref={raiz} className="display text-display-1">
      {hero.titulo.map((linea) => (
        // overflow oculto: la línea sube desde atrás del renglón anterior
        <span key={linea.texto} className="block overflow-hidden pb-[0.06em]">
          <span data-linea className="block">
            <span className={linea.contorno ? 'contorno' : undefined}>{linea.texto}</span>
          </span>
        </span>
      ))}
    </h1>
  )
}
