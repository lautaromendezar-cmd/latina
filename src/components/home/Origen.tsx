'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { useMovimientoReducido } from '@/lib/motion'
import { origen } from '@/content/site'

/**
 * Origen — columna sticky con crossfade scrubbeado.
 *
 * No es geografía, es trayectoria: se hace en el sur de Brasil, el padrón
 * se probó exportándolo a Uruguay, y a la Argentina recién está llegando.
 * El tercer panel es el único donde la marca NO está instalada, y eso no
 * lo puede contar ninguna yerba de acá. Sin fechas: la marca no publica
 * año de fundación (MARCA.md).
 *
 * Los marcadores son nombres de lugar, no `01 / 02 / 03`: es un recorrido
 * con nombres propios, no una secuencia numerada.
 *
 * Sobre el markup duplicado: las imágenes aparecen dos veces, una en la
 * columna sticky (desktop) y otra dentro de cada bloque (mobile). Son las
 * MISMAS URLs, así que el browser descarga una sola vez de cada una; lo
 * único que se paga son nodos de DOM. La alternativa —una sola copia—
 * obliga a que texto e imagen se intercalen en mobile y se separen en
 * desktop, que con sticky no sale sin JavaScript de layout.
 *
 * En mobile y con movimiento reducido: stack simple, sin sticky y sin
 * crossfade. Es un estado terminado, no una degradación.
 */
export function Origen() {
  const seccion = useRef<HTMLElement>(null)
  const reducido = useMovimientoReducido()

  useEffect(() => {
    if (reducido || !seccion.current) return
    if (!window.matchMedia('(min-width: 1024px)').matches) return

    const ctx = gsap.context(() => {
      const bloques = gsap.utils.toArray<HTMLElement>('[data-bloque]')

      bloques.forEach((bloque, i) => {
        const imagen = seccion.current?.querySelector<HTMLElement>(
          `[data-sticky="${i}"]`,
        )
        const marca = seccion.current?.querySelector<HTMLElement>(`[data-marca="${i}"]`)
        if (!imagen) return

        gsap.to(imagen, {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: bloque,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.5,
          },
        })

        // La primera queda visible al salir; las otras se apagan al irse
        // para que la de abajo vuelva a aparecer al scrollear para arriba.
        if (i > 0) {
          gsap.to(imagen, {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: bloque,
              start: 'bottom 60%',
              end: 'bottom 20%',
              scrub: 0.5,
            },
          })
        }

        if (marca) {
          gsap.to(marca, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: bloque,
              start: 'top 70%',
              end: 'bottom 70%',
              scrub: 0.5,
            },
          })
        }
      })
    }, seccion)

    return () => ctx.revert()
  }, [reducido])

  return (
    <section
      ref={seccion}
      className="border-t border-verde/20 bg-papel py-seccion text-yerba-oscuro"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <header className="mb-14 lg:mb-20">
          <Etiqueta fondo="papel" className="mb-4 block">
            {origen.etiqueta}
          </Etiqueta>
          <h2 className="display max-w-[18ch] text-display-2">{origen.titulo}</h2>
        </header>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* --- columna sticky, sólo desktop --- */}
          <div className="hidden lg:block">
            <div className="sticky top-24 h-[70vh] overflow-hidden">
              {origen.momentos.map((momento, i) => (
                <Image
                  key={momento.id}
                  data-sticky={i}
                  src={momento.imagen}
                  alt={momento.alt}
                  fill
                  sizes="50vw"
                  className="object-cover"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                />
              ))}
            </div>
          </div>

          {/* --- los tres bloques --- */}
          <ol className="space-y-16 lg:space-y-0">
            {origen.momentos.map((momento, i) => (
              <li
                key={momento.id}
                data-bloque
                className="lg:flex lg:min-h-[85vh] lg:flex-col lg:justify-center"
              >
                {/* imagen inline: sólo mobile, misma URL que la sticky */}
                <div className="relative mb-6 aspect-[3/2] overflow-hidden lg:hidden">
                  <Image
                    src={momento.imagen}
                    alt={momento.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>

                <Etiqueta acento fondo="papel" className="mb-3 block">
                  {momento.lugar}
                </Etiqueta>

                {/* hairline de avance: es el único que queda en el sistema,
                    y queda porque carga dato — marca en qué punto del
                    recorrido estás— en vez de decorar. */}
                <div className="mb-4 hidden h-px w-full bg-verde/25 lg:block">
                  <div
                    data-marca={i}
                    className="h-full origin-left bg-sello"
                  />
                </div>

                <h3 className="display mb-4 text-display-3">{momento.titulo}</h3>
                <p className="max-w-[52ch] text-body-lg text-verde">
                  {momento.cuerpo}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
