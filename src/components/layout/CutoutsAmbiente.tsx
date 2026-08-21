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
          //
          // `data-salida` puede traer un selector: entonces la salida se
          // ata a ESE elemento y no a la sección entera. Importa mucho.
          // Con la sección como disparador, el rango va desde que asoma por
          // abajo hasta que se va por arriba, así que a mitad de la lectura
          // el palo ya recorrió el 70% y no lo ve nadie. Atado al párrafo
          // que dice «despalada», el palo está en cuadro mientras leés
          // sobre el padrón y se va justo cuando llegás a la palabra.
          const selector = el.dataset.salida
          const disparador =
            (selector && document.querySelector<HTMLElement>(selector)) ||
            el.closest('section') ||
            el

          // Lo que está lejos se mueve MENOS. Si los tres palos viajan la
          // misma distancia salen como un bloque y se pierde la
          // profundidad, que es justamente lo que se busca acá.
          const lejos = el.dataset.plano === 'fondo'
          const distancia = lejos ? 95 : 165

          // Rotación inicial declarada en el markup, no deducida: el palo
          // trae su `rotate-[Ndeg]` del CSS, y hacer que GSAP lo saque del
          // transform computado es pedirle que adivine.
          const giroInicial = Number(el.dataset.giro ?? 8)
          const giroFinal = giroInicial + (lejos ? 14 : 26)

          // Desfase: mueve el rango un poco para cada uno, así no arrancan
          // ni terminan todos en el mismo píxel de scroll.
          const desfase = Number(el.dataset.desfase ?? 0)

          gsap.fromTo(
            el,
            { xPercent: 0, rotation: giroInicial },
            {
              xPercent: distancia,
              rotation: giroFinal,
              ease: 'none',
              scrollTrigger: {
                trigger: disparador,
                // Rango corto y a media pantalla: el palo tiene que estar
                // en cuadro durante todo el recorrido. Si el final cae muy
                // arriba, la salida ocurre cuando el cutout ya se fue por
                // el techo y no la ve nadie.
                start: selector ? `top ${92 + desfase}%` : 'top bottom',
                end: selector ? `top ${50 + desfase}%` : 'bottom top',
                scrub: lejos ? 1.2 : 0.8,
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
