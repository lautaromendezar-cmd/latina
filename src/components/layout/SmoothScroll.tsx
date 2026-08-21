'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

/**
 * Lenis sincronizado con ScrollTrigger.
 *
 * Tres cosas que importan y que se rompen si se hacen de otra forma:
 *
 * 1. Un solo reloj. Lenis se maneja con el ticker de GSAP en vez de su
 *    propio rAF; con dos loops el pin de la sección firma tiembla.
 * 2. `lagSmoothing(0)`. Sin esto, cuando el navegador se traba GSAP
 *    "salta" para recuperar el tiempo perdido y el scrub se desincroniza
 *    del scroll real.
 * 3. Con `prefers-reduced-motion` Lenis directamente no se instancia. El
 *    smooth scroll ES movimiento; interpolarle el scroll a alguien que
 *    pidió que no se mueva nada es exactamente lo que se está pidiendo
 *    que no pase.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // En touch el scroll nativo ya es bueno y Lenis agrega latencia al
      // primer gesto, que es justo donde se mide el INP.
      syncTouch: false,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
    }
  }, [])

  return null
}
