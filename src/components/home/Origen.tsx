'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { useLayoutEffectSeguro, movimientoReducido } from '@/lib/motion'
import { origen } from '@/content/site'

/**
 * Origen — sección pineada con indicador lateral.
 *
 * No es geografía, es trayectoria: se hace en el sur de Brasil, el padrón
 * se probó exportándolo a Uruguay, y a la Argentina recién está llegando.
 * El tercer momento es el único donde la marca NO está instalada, y eso no
 * lo puede contar ninguna yerba de acá. Sin fechas: la marca no publica
 * año de fundación (MARCA.md).
 *
 * Los marcadores son nombres de lugar, no `01 / 02 / 03`: es un recorrido
 * con nombres propios, no una secuencia numerada.
 *
 * POR QUÉ PINEADA. Antes era sticky por bloque: la sección medía más de
 * tres pantallas y en cada una sobraba fondo vacío al costado. Pineada
 * entra completa en una pantalla y el scroll pasa de un momento al
 * siguiente. No suma un efecto al presupuesto — es el mismo (Origen
 * sticky) en la versión que funciona.
 *
 * El pin es CORTO a propósito (+=170%). El único momento donde el sitio se
 * puede permitir agarrarte el scroll de verdad es la firma, que va a
 * +=220% y tiene contador. Acá es un pasaje, no un número.
 *
 * La regla vertical de avance es la única hairline vertical del sistema y
 * está porque CARGA DATO: dice en qué punto del recorrido estás. Las
 * verticales decorativas siguen prohibidas.
 *
 * En mobile y con movimiento reducido: stack simple, sin pin ni crossfade.
 * Es un estado terminado, no una degradación.
 */
export function Origen() {
  const seccion = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)

  useLayoutEffectSeguro(() => {
    if (!seccion.current || !pin.current) return
    if (movimientoReducido()) return
    if (!window.matchMedia('(min-width: 1024px)').matches) return

    const ctx = gsap.context(() => {
      const total = origen.momentos.length
      const lugares = gsap.utils.toArray<HTMLElement>('[data-lugar]')
      const fotos = gsap.utils.toArray<HTMLElement>('[data-foto]')
      const textos = gsap.utils.toArray<HTMLElement>('[data-texto]')
      const relleno = seccion.current!.querySelector<HTMLElement>('[data-relleno-avance]')

      if (!lugares.length || !fotos.length || !textos.length) return

      // El activo y el inactivo se distinguen por COLOR, no por opacidad.
      // Medido: yerba-oscuro al 28% sobre papel da 1.80:1, o sea que los
      // dos momentos que no están activos serían texto ilegible. Con el
      // salto verde -> yerba-oscuro el énfasis va de 7.44:1 a 14.54:1 y
      // los dos estados se leen.
      const INACTIVO = '#14592f' // --color-verde
      const ACTIVO = '#06250f' // --color-yerba-oscuro

      // El estado inicial lo pone GSAP, no el JSX. Si el JS no corre, los
      // tres momentos quedan a la vista: la sección cuenta la historia
      // entera igual. Esconder dos de tres desde el CSS dejaría el sitio
      // contando un tercio.
      gsap.set(textos, { position: 'absolute', top: 0, left: 0, right: 0 })
      gsap.set(lugares[0]!, { color: ACTIVO })
      gsap.set([...fotos.slice(1), ...textos.slice(1)], { autoAlpha: 0 })
      if (relleno) gsap.set(relleno, { scaleY: 1 / total, transformOrigin: 'top center' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: seccion.current,
          start: 'top top',
          end: '+=170%',
          pin: pin.current,
          scrub: 0.5,
          anticipatePin: 1,
        },
      })

      for (let i = 1; i < total; i++) {
        const t = i - 1
        tl.to(fotos[i]!, { autoAlpha: 1, duration: 0.35 }, t)
          .to(fotos[i - 1]!, { autoAlpha: 0, duration: 0.35 }, t)
          .to(textos[i]!, { autoAlpha: 1, duration: 0.3 }, t)
          .to(textos[i - 1]!, { autoAlpha: 0, duration: 0.3 }, t)
          .to(lugares[i]!, { color: ACTIVO, duration: 0.25 }, t)
          .to(lugares[i - 1]!, { color: INACTIVO, duration: 0.25 }, t)

        if (relleno) tl.to(relleno, { scaleY: (i + 1) / total, duration: 0.35 }, t)
      }

      ScrollTrigger.refresh()
    }, seccion)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={seccion} className="border-t border-verde/20 bg-papel text-yerba-oscuro">
      {/* ---------- desktop: pineada ---------- */}
      <div ref={pin} className="hidden min-h-[100svh] flex-col justify-center py-14 lg:flex">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <header className="mb-10">
            <Etiqueta fondo="papel" className="mb-3 block">
              {origen.etiqueta}
            </Etiqueta>
            <h2 className="display max-w-[18ch] text-display-2">{origen.titulo}</h2>
          </header>

          <div className="grid grid-cols-[auto_1fr_1.05fr] gap-10 xl:gap-16">
            {/* Regla de avance. Única vertical del sistema, y está porque
                dice en qué punto del recorrido estás. */}
            <div className="relative w-px bg-verde/20" aria-hidden="true">
              <div data-relleno-avance className="absolute inset-x-0 top-0 h-full bg-yerba-oscuro" />
            </div>

            <div className="flex flex-col justify-between gap-10">
              <ol className="space-y-1">
                {origen.momentos.map((m) => (
                  <li key={m.id} data-lugar className="display text-display-3 text-verde">
                    {m.lugar}
                  </li>
                ))}
              </ol>

              <div className="relative min-h-[14rem]">
                {origen.momentos.map((m) => (
                  <div key={m.id} data-texto>
                    <h3 className="display mb-4 text-display-3">{m.titulo}</h3>
                    <p className="max-w-[46ch] text-body-lg text-verde">{m.cuerpo}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-[4/5] max-h-[58svh] overflow-hidden">
              {origen.momentos.map((m) => (
                <Image
                  key={m.id}
                  data-foto
                  src={m.imagen}
                  alt={m.alt}
                  fill
                  sizes="45vw"
                  className="object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- mobile: stack, sin pin ---------- */}
      <div className="px-4 py-seccion sm:px-6 lg:hidden">
        <header className="mb-12">
          <Etiqueta fondo="papel" className="mb-3 block">
            {origen.etiqueta}
          </Etiqueta>
          <h2 className="display max-w-[18ch] text-display-2">{origen.titulo}</h2>
        </header>

        <ol className="space-y-14">
          {origen.momentos.map((m) => (
            <li key={m.id}>
              <div className="relative mb-5 aspect-[3/2] overflow-hidden">
                <Image src={m.imagen} alt={m.alt} fill sizes="100vw" className="object-cover" />
              </div>
              <Etiqueta acento fondo="papel" className="mb-2 block">
                {m.lugar}
              </Etiqueta>
              <h3 className="display mb-3 text-display-3">{m.titulo}</h3>
              <p className="text-body-lg text-verde">{m.cuerpo}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
