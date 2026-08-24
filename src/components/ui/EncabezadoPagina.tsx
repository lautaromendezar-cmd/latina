'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Greca } from '@/components/ui/Greca'
import { useLayoutEffectSeguro, movimientoReducido } from '@/lib/motion'

/**
 * Encabezado de las páginas internas.
 *
 * Foto a sangre con el título encima, no una grilla simétrica de texto a
 * un lado e imagen al otro: eso es una diapositiva, no una portada.
 *
 * Un solo efecto y siempre el mismo: la foto sube más lento que el scroll.
 * Las internas no tienen presupuesto de movimiento propio — el brief pone
 * la audacia en la home— así que acá alcanza con que no se sienta un
 * documento.
 *
 * El título NO se esconde esperando al JS. Sale visible del servidor y
 * GSAP lo anima desde un useLayoutEffect, antes del primer pintado.
 */
type Props = {
  etiqueta: string
  titulo: string
  bajada: string
  imagen: string
  alt: string
  /** Encuadre de la foto cuando el recorte por defecto corta mal. */
  posicion?: string
}

export function EncabezadoPagina({
  etiqueta,
  titulo,
  bajada,
  imagen,
  alt,
  posicion = '50% 50%',
}: Props) {
  const raiz = useRef<HTMLElement>(null)

  useLayoutEffectSeguro(() => {
    if (!raiz.current) return

    const ctx = gsap.context(() => {
      if (!movimientoReducido()) {
        gsap.fromTo(
          '[data-encabezado-titulo] > *',
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.07,
            ease: 'expo.out',
            delay: 0.05,
          },
        )

        // La foto sube más lento que el scroll.
        gsap.fromTo(
          '[data-encabezado-foto]',
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: raiz.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      }

      ScrollTrigger.refresh()
    }, raiz)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={raiz}
      data-bloque="verde"
      className="relative overflow-hidden bg-verde-profundo text-crema"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div data-encabezado-foto className="absolute inset-0 scale-[1.12]">
          <Image
            src={imagen}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: posicion }}
          />
        </div>
        {/* Velo verde, más liviano que antes: las fotos se ven. */}
        <div className="absolute inset-0 bg-verde-profundo/65" />
      </div>

      <div className="relative mx-auto flex min-h-[58svh] max-w-[1400px] flex-col justify-end px-4 pb-12 pt-32 sm:px-6 lg:px-10 lg:pb-16 lg:pt-40">
        <p className="etiqueta mb-4 block text-amarillo">{etiqueta}</p>

        <h1 data-encabezado-titulo className="display max-w-[16ch] text-display-1">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="block">{titulo}</span>
          </span>
        </h1>

        <p className="mt-6 max-w-[52ch] text-body-lg font-semibold text-crema">{bajada}</p>
      </div>

      {/* El alt real va en un elemento accesible: la foto de arriba es
          decorativa porque el título ya dice de qué se trata la página. */}
      <span className="sr-only">{alt}</span>

      <div className="relative">
        <Greca tono="amarillo" alto={12} opacidad={0.7} />
      </div>
    </section>
  )
}
