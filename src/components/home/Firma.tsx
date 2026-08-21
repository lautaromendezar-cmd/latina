'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Greca } from '@/components/ui/Greca'
import { Etiqueta, FilaFicha } from '@/components/ui/Etiqueta'
import { useMovimientoReducido } from '@/lib/motion'
import { firma } from '@/content/site'

/**
 * EL ELEMENTO FIRMA — dos moliendas, un solo scroll.
 *
 * Reemplaza al "contador de 1 a 40 mates" del brief. Los motivos quedan
 * escritos acá para que no se pierdan:
 *
 *  1. "Rinde más" lo dicen todas las yerbas de la góndola. Montar el
 *     momento de máxima audacia del sitio sobre el claim más disputado de
 *     la categoría es gastar el presupuesto de movimiento en el único
 *     terreno donde LaTiNa no gana. Lo incopiable es el padrón uruguayo.
 *  2. El 40 no está en el envase, ni en el folleto, ni en MARCA.md.
 *
 * También fusiona el comparador de molienda (5.4) con la cebada (5.5): un
 * solo pin en vez de dos secciones, y el slider draggable —un widget de
 * antes/después que le queda igual a una crema facial— deja de ser un
 * widget y pasa a ser la demostración.
 *
 * El mecanismo: el scroll ceba. A medida que sube el contador, la yerba
 * con palo SE LAVA, y eso es literal — la imagen pierde saturación y
 * contraste mientras su barra de cuerpo cae. La de padrón aguanta. La
 * metáfora y el efecto son la misma cosa; si el efecto fuera decorativo,
 * no iría.
 */

/** Cuánto scroll dura el pin, en porcentaje de la altura de pantalla. */
const RECORRIDO = '+=220%'

export function Firma() {
  const seccion = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const numero = useRef<HTMLParagraphElement>(null)
  const reducido = useMovimientoReducido()

  const total = firma.contador.hasta ?? firma.contador.hastaProvisorio

  useEffect(() => {
    if (reducido) return
    if (!seccion.current || !pin.current) return

    const ctx = gsap.context(() => {
      // El objeto del contador tiene la propiedad ANTES de tweenear: GSAP no
      // llama onUpdate si le pasás un objeto sin nada que interpolar.
      const cuenta = { valor: 1 }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: seccion.current,
          start: 'top top',
          end: RECORRIDO,
          pin: pin.current,
          scrub: 0.6,
          anticipatePin: 1,
        },
      })

      tl.to(
        cuenta,
        {
          valor: total,
          ease: 'none',
          onUpdate: () => {
            if (numero.current) {
              numero.current.textContent = String(Math.round(cuenta.valor))
            }
          },
        },
        0,
      )

      // La yerba con palo se lava. fromTo con valores explícitos: leer el
      // estado inicial del CSS es justo donde GSAP se confunde de unidad.
      tl.fromTo(
        '[data-lava]',
        { filter: 'saturate(1) brightness(1) contrast(1)', opacity: 1 },
        {
          filter: 'saturate(0.18) brightness(1.35) contrast(0.75)',
          opacity: 0.5,
          ease: 'none',
        },
        0,
      )

      tl.fromTo('[data-barra="comun"]', { scaleY: 1 }, { scaleY: 0.2, ease: 'none' }, 0)
      tl.fromTo('[data-barra="latina"]', { scaleY: 1 }, { scaleY: 0.88, ease: 'none' }, 0)

      // El cierre entra sobre el final del recorrido, no antes.
      tl.fromTo(
        '[data-cierre]',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, ease: 'none', duration: 0.25 },
        0.75,
      )
    }, seccion)

    return () => ctx.revert()
  }, [reducido, total])

  return (
    <section ref={seccion} className="relative">
      <div ref={pin} className="flex min-h-[100svh] flex-col justify-center py-16">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <header className="mb-8 max-w-3xl lg:mb-12">
            <Etiqueta className="mb-3 block">{firma.etiqueta}</Etiqueta>
            <h2 className="display mb-4 text-display-2">{firma.titulo}</h2>
            <p className="text-body-lg text-papel-suave">{firma.bajada}</p>
          </header>

          <div className="grid gap-5 sm:grid-cols-[1fr_auto_1fr] sm:items-start lg:gap-10">
            {firma.lados.map((lado, i) => {
              const esLatina = lado.id === 'latina'
              return (
                <figure key={lado.id} className={i === 1 ? 'sm:order-3' : undefined}>
                  {/* `data-lava` va en el contenedor, no en la <Image>: el
                      filtro se hereda igual y así no hay que colarle un
                      atributo suelto al componente de next/image. */}
                  <div
                    {...(esLatina ? {} : { 'data-lava': '' })}
                    className={`relative aspect-square overflow-hidden border ${
                      esLatina ? 'border-dorado' : 'border-yerba-alta'
                    }`}
                    style={
                      reducido && !esLatina
                        ? {
                            filter: 'saturate(0.18) brightness(1.35) contrast(0.75)',
                            opacity: 0.5,
                          }
                        : undefined
                    }
                  >
                    <Image
                      src={lado.imagen}
                      alt={lado.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>

                  <figcaption className="pt-4">
                    <Etiqueta acento={esLatina} className="mb-2 block">
                      {lado.etiqueta}
                    </Etiqueta>
                    <p className="text-sm text-papel-suave">{lado.descripcion}</p>
                  </figcaption>

                  {/* Barra de cuerpo. Es la lectura del efecto, así que en
                      movimiento reducido ya arranca en su valor final. */}
                  <div className="mt-4">
                    <div className="h-2 w-full bg-yerba-alta">
                      <div
                        data-barra={esLatina ? 'latina' : 'comun'}
                        className={`h-full origin-bottom ${
                          esLatina ? 'bg-dorado' : 'bg-yerba-seca'
                        }`}
                        style={
                          reducido
                            ? { transform: `scaleY(${esLatina ? 0.88 : 0.2})` }
                            : undefined
                        }
                      />
                    </div>
                    <Etiqueta className="mt-2 block">Cuerpo</Etiqueta>
                  </div>
                </figure>
              )
            })}

            {/* El contador, entre los dos. En mobile cae abajo. */}
            <div className="order-first sm:order-2 sm:px-4 sm:text-center">
              <p
                ref={numero}
                className="display text-dato leading-none text-dorado tabular-nums"
              >
                {reducido ? total : 1}
              </p>
              <Etiqueta as="p" className="mt-1 block">
                {firma.contador.unidad}
              </Etiqueta>
            </div>
          </div>

          <div data-cierre style={reducido ? undefined : { opacity: 0 }} className="mt-10">
            <p className="display text-display-2">{firma.cierre}</p>
          </div>

          {firma.contador.hasta === null && (
            <p className="mt-4 text-sm text-papel-suave">
              [VERIFICAR: cuántas cebadas sostiene el sabor — el contador corre con un
              valor provisorio]
            </p>
          )}
        </div>
      </div>

      {/* La ficha queda fuera del pin: se lee después de ver la prueba. */}
      <div className="mx-auto max-w-lg px-4 py-seccion sm:px-6">
        <Greca tono="dorado" alto={12} opacidad={0.6} className="mb-8" />
        <dl>
          {firma.ficha.map((fila) => (
            <FilaFicha key={fila.campo} campo={fila.campo} valor={fila.valor} />
          ))}
        </dl>
      </div>
    </section>
  )
}
