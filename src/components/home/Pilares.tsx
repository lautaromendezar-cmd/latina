'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { TexturaGreca } from '@/components/ui/TexturaGreca'
import { useLayoutEffectSeguro, movimientoReducido } from '@/lib/motion'
import { pilares } from '@/content/site'

/**
 * Los tres pilares.
 *
 * DOS COSAS DE LA REFERENCIA QUE NO SE COPIAN, a propósito:
 *
 *  · Los marcadores 01 / 02 / 03. Ahí funcionan porque es un relato con
 *    orden. Estos tres son claims PARALELOS —rinde más, padrón, sin
 *    T.A.C.C.—, no pasos de un proceso. Numerar algo que no es secuencia
 *    está en la lista de antipatrones del brief: promete una progresión
 *    que no existe.
 *
 *  · El scroll horizontal pineado. Origen, la sección inmediatamente
 *    anterior, ya está pineada. Dos pines seguidos es donde un sitio
 *    empieza a sentirse como que te pelea el scroll.
 *
 * Lo que sí se toma: el alto de pantalla completa, el movimiento por
 * profundidad y el ícono grande por card.
 *
 * Y los íconos son RECORTES REALES del producto, no un set de línea: el
 * paquete, la molienda y el sello Sin Gluten recortado del propio envase.
 * Un set de iconos genérico lo tiene cualquier marca; esto es literalmente
 * lo que hay adentro de esta bolsa.
 *
 * El movimiento es profundidad, no entrada: las cards suben con el scroll
 * a una velocidad y los recortes a otra, así que dentro de la sección hay
 * paralaje. La entrada escalonada existe pero es corta — el momento fuerte
 * del sitio es Origen, no esto.
 */

/** Cuánto se desfasa cada card respecto de la anterior, en px de recorrido. */
const PROFUNDIDAD = [64, 96, 78]

export function Pilares() {
  const seccion = useRef<HTMLElement>(null)

  useLayoutEffectSeguro(() => {
    if (!seccion.current) return
    if (movimientoReducido()) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-card]')
      if (!cards.length) return

      // Entrada: corta y escalonada. No es un fade-in por elemento — las
      // tres son una sola tanda disparada por la sección.
      gsap.fromTo(
        cards,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: seccion.current, start: 'top 72%' },
        },
      )

      // Profundidad: cada card recorre distinto con el scroll. Es lo único
      // que hace que tres rectángulos iguales se lean como tres planos.
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { yPercent: 0 },
          {
            y: -(PROFUNDIDAD[i] ?? 70),
            ease: 'none',
            scrollTrigger: {
              trigger: seccion.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.9,
            },
          },
        )
      })
    }, seccion)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={seccion}
      className="relative flex flex-col justify-center overflow-hidden border-t border-yerba-alta py-seccion lg:min-h-[100svh]"
    >
      <TexturaGreca tono="yerba-seca" escala={132} opacidad={0.04} />

      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <header className="mb-16 max-w-2xl lg:mb-24">
          <Etiqueta className="mb-4 block">{pilares.etiqueta}</Etiqueta>
          <h2 className="display text-display-2">{pilares.titulo}</h2>
        </header>

        <ul className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {pilares.items.map((item) => (
            <li key={item.id} data-card className="flex flex-col">
              {/* El recorte se monta sobre el borde de la card: es lo que
                  le saca el aire de rectángulo prolijo.

                  Caja cuadrada fija con object-contain para los tres. Si
                  se dejan a alto libre, el paquete (vertical) sale flaco
                  al lado del polvo (apaisado) y los tres pesan distinto
                  sin que haya un motivo. */}
              <div className="relative z-10 -mb-10 ml-4 h-32 w-32 lg:h-36 lg:w-36">
                <Image
                  src={item.imagen}
                  alt={item.alt}
                  width={400}
                  height={400}
                  sizes="150px"
                  data-plano="frente"
                  className="cutout cutout--frente absolute inset-0 h-full w-full object-contain drop-shadow-[0_8px_0_rgba(6,37,15,0.5)]"
                />
              </div>

              <p className="etiqueta w-fit bg-dorado px-3 py-1.5 text-yerba-oscuro">
                {item.pestana}
              </p>

              <div className="flex-1 border border-yerba-alta bg-yerba-media p-6 shadow-[5px_5px_0_0_var(--color-yerba-alta)] lg:p-8">
                <h3 className="display mb-4 text-display-3">{item.titulo}</h3>
                <p className="text-papel-suave">{item.cuerpo}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
