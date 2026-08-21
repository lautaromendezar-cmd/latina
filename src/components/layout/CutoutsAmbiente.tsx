'use client'

import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

/**
 * Capa ambiente: deriva + parallax de los cutouts.
 *
 * Monta una sola vez y busca todo lo que tenga `.cutout`. La ventaja es
 * que Hero, Manifiesto y compañía siguen siendo Server Components: sólo
 * marcan el elemento con una clase y un `data-plano`, y no arrastran
 * JavaScript de cliente por dibujar una hoja.
 *
 * Dos planos, no tres. El plano del medio del brief no lo registraba el
 * ojo y costaba un cutout más en pantalla.
 *
 * `data-salida` es el palo del manifiesto: en vez de flotar en su sitio,
 * se va de cuadro con el scroll y no vuelve. Un palo yéndose es una
 * frase — la yerba es despalada — y es la única razón por la que ese
 * cutout está ahí.
 */

const PLANOS = {
  fondo: { parallax: 0.22, deriva: 26, giro: 2.5, ciclo: 11 },
  frente: { parallax: 0.9, deriva: 12, giro: 1.2, ciclo: 9 },
} as const

export function CutoutsAmbiente() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const cutouts = gsap.utils.toArray<HTMLElement>('.cutout')

      cutouts.forEach((el, i) => {
        const plano = el.dataset.plano === 'fondo' ? PLANOS.fondo : PLANOS.frente

        if (el.dataset.salida !== undefined) {
          // El palo se va y no vuelve. Va SIN deriva: los dos tweens
          // escribirían `rotation` sobre el mismo elemento y GSAP resolvería
          // el conflicto matando uno de los dos, con el que gane cambiando
          // según el orden en que arrancan.
          // fromTo con la rotación inicial explícita: el palo trae un
          // `rotate-[8deg]` del CSS, y hacer que GSAP lo deduzca del
          // transform computado es pedirle que adivine.
          gsap.fromTo(
            el,
            { xPercent: 0, rotation: 8 },
            {
              xPercent: 140,
              rotation: 26,
              ease: 'none',
              scrollTrigger: {
                trigger: el.closest('section') ?? el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          )
          return
        }

        // Deriva permanente. El desfase por índice evita que respiren todos
        // al mismo tiempo, que es lo que delata que es un loop.
        gsap.to(el, {
          y: `+=${plano.deriva}`,
          rotation: `+=${plano.giro}`,
          duration: plano.ciclo,
          delay: (i % 5) * 0.7,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })

        // Parallax: el fondo se mueve poco, el frente casi como el scroll.
        gsap.fromTo(
          el,
          { yPercent: -plano.parallax * 12 },
          {
            yPercent: plano.parallax * 12,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('section') ?? el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
      })

      ScrollTrigger.refresh()
    })

    return () => ctx.revert()
  }, [])

  return null
}
