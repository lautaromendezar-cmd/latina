'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { Boton } from '@/components/ui/Boton'
import { Greca } from '@/components/ui/Greca'
import { useLayoutEffectSeguro, movimientoReducido } from '@/lib/motion'
import { cierreB2B } from '@/content/site'
import { escalas } from '@/data/mayorista'

/**
 * Cierre mayorista — bloque AMARILLO, el único de la home.
 *
 * Es la sección que hace plata: el bloque más ruidoso del sitio va acá, no
 * en un adorno. Sin precios: la lista cambia seguido y se pide al día
 * (`mayorista.ts`, `preciosPublicados = false`). Cuando llegue la lista
 * confirmada, los importes aparecen solos.
 *
 * Tinta sobre amarillo: 8.6:1. El CTA va en verde (`oscuro`), porque un
 * botón amarillo sobre el bloque amarillo desaparece.
 *
 * LA ESTRUCTURA sale de la referencia de Paput: bloque de color a sangre,
 * el argumento a la izquierda y una imagen grande a la derecha que se sale
 * por el borde. Por eso la grilla cuelga de la SECCIÓN y no del contenedor
 * de 1400: así la columna derecha llega al borde del viewport sin márgenes
 * negativos calculados a mano, y la izquierda se alinea sola con el resto
 * de la página usando `ml-auto` sobre su propio ancho máximo.
 *
 * LA ESCALERA va DENTRO de la columna izquierda, en dos por dos. Estuvo
 * un rato abajo y a lo ancho, y el costo era que la foto dejaba de llegar
 * al piso del bloque: la fila de la grilla terminaba donde terminaba el
 * texto y abajo quedaba una franja amarilla sin nada. Con la escalera
 * adentro, la grilla tiene UNA sola fila y la columna derecha ocupa todo
 * el alto del bloque, que es lo que hace que la foto parezca parte del
 * color y no una imagen pegada adentro de una caja.
 *
 * En dos por dos y no en cuatro columnas: en una columna de ~700px,
 * cuatro peldaños dan 170px cada uno y "Desde 200 kg" se parte en tres
 * renglones.
 */
export function CierreB2B() {
  const seccion = useRef<HTMLElement>(null)

  useLayoutEffectSeguro(() => {
    if (!seccion.current) return
    if (movimientoReducido()) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: seccion.current, start: 'top 75%', once: true },
      })

      tl.fromTo(
        '[data-b2b-entra]',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.09, ease: 'power3.out' },
      )

      // La foto entra empujando desde la derecha, que es el borde por el
      // que se sale. `xPercent` y no píxeles: el recorrido es el ancho de
      // su propia columna, que cambia en cada pantalla.
      tl.fromTo(
        '[data-b2b-foto]',
        { xPercent: 14, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.85, ease: 'power3.out' },
        '-=0.5',
      )

      // Los peldaños de la escalera, uno atrás del otro.
      tl.fromTo(
        '[data-b2b-escalon]',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out' },
        '-=0.35',
      )
    }, seccion)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={seccion} className="relative overflow-hidden bg-amarillo text-tinta">
      <Greca tono="verde" alto={14} opacidad={0.5} />

      <div className="grid items-stretch lg:grid-cols-2">
        {/* El argumento. `ml-auto` + ancho máximo: la columna se alinea
            con el contenedor de 1400 del resto de la página sin tener que
            calcular el margen. */}
        <div className="mx-auto w-full max-w-[700px] px-4 py-seccion sm:px-6 lg:ml-auto lg:mr-0 lg:pl-10 lg:pr-14">
          <p data-b2b-entra className="etiqueta mb-4 text-tinta">
            {cierreB2B.etiqueta}
          </p>
          <h2 data-b2b-entra className="display mb-6 text-display-1">
            {cierreB2B.titulo}
          </h2>
          <p data-b2b-entra className="mb-8 max-w-[46ch] text-body-lg font-semibold">
            {cierreB2B.cuerpo}
          </p>

          {/* La escalera. */}
          <p data-b2b-entra className="etiqueta mb-4 text-tinta">
            {cierreB2B.escalasEtiqueta}
          </p>
          <ol className="mb-4 grid grid-cols-2 gap-x-8 border-t-2 border-tinta/20">
            {escalas.map((escala) => (
              <li
                key={escala.id}
                data-b2b-escalon
                className="border-b-2 border-tinta/15 py-3.5"
              >
                <p className="display text-display-3">{escala.nombre}</p>
                <p className="mt-1 text-sm font-semibold text-tinta/80">
                  {escala.detalle}
                </p>
              </li>
            ))}
          </ol>
          <p data-b2b-entra className="mb-9 text-sm font-semibold">
            {cierreB2B.escalasNota}
          </p>

          <div data-b2b-entra>
            <Boton href={cierreB2B.cta.href} variante="oscuro">
              {cierreB2B.cta.texto}
            </Boton>
          </div>
        </div>

        {/* La foto, a sangre por el borde derecho. En teléfono va arriba
            con alto fijo; de `lg` para arriba se estira al alto del
            bloque, que es lo que la hace parecer parte del color y no una
            imagen pegada adentro de una caja. */}
        <div
          data-b2b-foto
          className="relative order-first min-h-[300px] sm:min-h-[380px] lg:order-none lg:min-h-full"
        >
          <Image
            src={cierreB2B.foto.src}
            alt={cierreB2B.foto.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  )
}
