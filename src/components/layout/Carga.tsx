'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Greca } from '@/components/ui/Greca'
import { useLayoutEffectSeguro, movimientoReducido } from '@/lib/motion'
import { marca } from '@/content/site'

/**
 * Preloader.
 *
 * Cuatro tiempos, ~1.5s, sobre el verde profundo:
 *
 *   1. El isotipo entra en escala, con el aro dorado dibujándose alrededor
 *      (stroke-dashoffset — el mismo gesto que haría DrawSVG, pero sobre
 *      un círculo que dibujo acá; el logo del cliente es un PNG y no hay
 *      ningún vector en todo el material).
 *   2. El aro se completa y el mate "se ceba": una máscara sube de abajo
 *      hacia arriba tiñendo el isotipo, como el agua entrando.
 *   3. Aparecen las dos grecas del packaging, abriéndose desde el centro.
 *   4. El velo se va de una: dos hojas que se separan arriba y abajo, y el
 *      hero queda a la vista.
 *
 * Reglas que se respetan igual:
 *  · Una sola vez por sesión. Volver de /contacto no lo dispara.
 *  · El hero YA está pintado abajo; el velo no bloquea nada. Si el JS
 *    muere, el velo no aparece nunca y no pasa nada.
 *  · Con `prefers-reduced-motion` no existe.
 *  · `aria-hidden` y sin foco: para un lector de pantalla no está.
 */

const CLAVE = 'latina:carga'

export function Carga() {
  const [mostrar, setMostrar] = useState(false)
  const velo = useRef<HTMLDivElement>(null)

  useLayoutEffectSeguro(() => {
    if (movimientoReducido()) return
    if (sessionStorage.getItem(CLAVE)) return
    sessionStorage.setItem(CLAVE, '1')
    setMostrar(true)
  }, [])

  useLayoutEffectSeguro(() => {
    if (!mostrar || !velo.current) return

    // Mientras dura, el scroll no se mueve.
    const overflowPrevio = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = overflowPrevio
          setMostrar(false)
          // El pin de la firma se midió con el body bloqueado.
          ScrollTrigger.refresh()
        },
      })

      tl.fromTo(
        '[data-carga-logo]',
        { scale: 0.72, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'expo.out' },
      )
        .fromTo(
          '[data-carga-aro]',
          { strokeDashoffset: 302 },
          { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' },
          0.1,
        )
        // el mate se ceba: la máscara sube y tiñe el isotipo
        .fromTo(
          '[data-carga-fill]',
          { yPercent: 100 },
          { yPercent: 0, duration: 0.55, ease: 'power2.out' },
          0.35,
        )
        .fromTo(
          '[data-carga-greca]',
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power3.out' },
          0.55,
        )
        .fromTo(
          '[data-carga-slogan]',
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          0.7,
        )
        .to('[data-carga-marca]', { opacity: 0, duration: 0.25, ease: 'power1.in' }, 1.05)
        // el velo se abre en dos
        .to('[data-carga-hoja="arriba"]', { yPercent: -100, duration: 0.7, ease: 'expo.inOut' }, 1.1)
        .to('[data-carga-hoja="abajo"]', { yPercent: 100, duration: 0.7, ease: 'expo.inOut' }, 1.1)
    }, velo)

    return () => {
      document.body.style.overflow = overflowPrevio
      ctx.revert()
    }
  }, [mostrar])

  if (!mostrar) return null

  return (
    <div ref={velo} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95]">
      {/* las dos hojas que después se abren */}
      <div data-carga-hoja="arriba" className="absolute inset-x-0 top-0 h-1/2 bg-yerba-oscuro" />
      <div data-carga-hoja="abajo" className="absolute inset-x-0 bottom-0 h-1/2 bg-yerba-oscuro" />

      <div
        data-carga-marca
        className="absolute inset-0 flex flex-col items-center justify-center gap-6"
      >
        <div data-carga-logo className="relative h-28 w-28 sm:h-36 sm:w-36">
          {/* el aro dorado que se dibuja */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
            <circle
              data-carga-aro
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="var(--color-dorado)"
              strokeWidth="1.5"
              strokeDasharray="302"
              strokeLinecap="round"
            />
          </svg>

          {/* el isotipo, y encima la capa que "se ceba" de abajo hacia arriba */}
          <div className="absolute inset-[6px] overflow-hidden rounded-full">
            <Image
              src="/marca/logo.png"
              alt=""
              width={160}
              height={160}
              priority
              className="h-full w-full opacity-45"
            />
            <div data-carga-fill className="absolute inset-0">
              <Image
                src="/marca/logo.png"
                alt=""
                width={160}
                height={160}
                priority
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* la greca del packaging, abriéndose desde el centro */}
        <div data-carga-greca className="w-56 origin-center sm:w-72">
          <Greca tono="dorado" alto={12} opacidad={0.85} />
        </div>

        <p data-carga-slogan className="etiqueta text-yerba-seca">
          {marca.slogan}
        </p>
      </div>
    </div>
  )
}
