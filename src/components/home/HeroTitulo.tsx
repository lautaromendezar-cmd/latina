'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useLayoutEffectSeguro, movimientoReducido } from '@/lib/motion'
import { hero } from '@/content/site'

/**
 * La entrada del hero.
 *
 * Antes sólo se animaban las tres líneas del título y todo lo demás
 * —bajada, botones, banda de especificaciones— aparecía de golpe. El hero
 * arrancaba a medio armar. Ahora es UNA sola línea de tiempo: las líneas
 * suben desde atrás de su máscara y el resto las sigue, escalonado.
 *
 * Sigue contando como un solo efecto del presupuesto: es la entrada del
 * hero, no un fade-in por elemento (que el brief prohíbe explícitamente).
 * La diferencia es que acá los elementos entran en el orden en que se
 * leen, encadenados, no cada uno por su cuenta al cruzar el viewport.
 *
 * REGLA, aprendida rompiéndola: el contenido nunca se esconde con CSS
 * esperando que el JS lo revele. El HTML del servidor sale VISIBLE y GSAP
 * lo esconde y lo anima dentro de un useLayoutEffect, que corre antes del
 * primer pintado — sin parpadeo. Si el bundle no carga, si GSAP falla, si
 * el efecto tira error: el hero se ve igual.
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

    const seccion = raiz.current.closest('section')
    if (!seccion) return

    const ctx = gsap.context(() => {
      const lineas = gsap.utils.toArray<HTMLElement>('[data-linea]')
      const siguen = gsap.utils.toArray<HTMLElement>('[data-hero-entra]')

      // Arranca cuando el preloader ya se está abriendo, no cuando termina:
      // los dos movimientos se encadenan en vez de turnarse.
      const tl = gsap.timeline({ delay: 0.35 })

      if (lineas.length) {
        // fromTo con valores explícitos: si GSAP tuviera que leer el estado
        // inicial del CSS, un transform en % se le vuelve px.
        tl.fromTo(
          lineas,
          { yPercent: 108, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'expo.out' },
        )
      }

      if (siguen.length) {
        tl.fromTo(
          siguen,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.09, ease: 'power3.out' },
          // se solapa con el final del título: encadenado, no en fila india
          '-=0.45',
        )
      }
    }, seccion)

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
