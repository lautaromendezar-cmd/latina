'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { useMovimientoReducido } from '@/lib/motion'
import { manifiesto } from '@/content/site'

/**
 * Manifiesto — el contorno que se llena de yerba.
 *
 * Cada palabra se dibuja dos veces: abajo el contorno, encima una copia
 * rellena con la macro REAL de la molienda (background-clip: text). El
 * scroll sube un clip-path y el texto se llena de yerba mientras leés que
 * la yerba cambia el mate.
 *
 * «Padrón» y «Despalada» porque son las dos palabras impresas en el
 * envase: si lo que se llena dijera otra cosa, el contorno sería
 * decoración.
 *
 * DEL REDISEÑO: se fueron los palos que salían de cuadro. El cliente los
 * leyó como huesos volando (y el hero oscuro como radiografía). La idea
 * era buena en papel; en pantalla era un chiste que nadie pidió. Quedan
 * las dos hojas desenfocadas del fondo, que sobre claro se leen como lo
 * que son.
 */

const TEXTURA = '/imagenes/textura-molienda.jpg'

export function Manifiesto() {
  const seccion = useRef<HTMLElement>(null)
  const reducido = useMovimientoReducido()

  useEffect(() => {
    if (reducido || !seccion.current) return

    const ctx = gsap.context(() => {
      const rellenos = gsap.utils.toArray<HTMLElement>('[data-relleno]')

      rellenos.forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              // Arranca cuando la palabra entra bien en cuadro y termina
              // antes de que se vaya.
              start: 'top 78%',
              end: 'top 34%',
              scrub: 0.8,
            },
            delay: i * 0.05,
          },
        )
      })
    }, seccion)

    return () => ctx.revert()
  }, [reducido])

  return (
    <section id="manifiesto" ref={seccion} className="relative overflow-hidden py-seccion">
      {/* Dos hojas muy atrás, para que el fondo tenga profundidad. Si se
          notan, están mal calibradas. */}
      <Image
        aria-hidden="true"
        src="/imagenes/cutouts/hoja-partida.png"
        alt=""
        width={1000}
        height={900}
        sizes="30vw"
        data-plano="fondo"
        className="cutout cutout--tenue absolute -left-[8%] top-[6%] w-[46vw] max-w-[420px] -rotate-12"
      />
      <Image
        aria-hidden="true"
        src="/imagenes/cutouts/hoja-entera.png"
        alt=""
        width={1000}
        height={1200}
        sizes="24vw"
        data-plano="fondo"
        className="cutout cutout--tenue absolute bottom-[8%] right-[4%] w-[30vw] max-w-[300px] rotate-[18deg]"
      />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <p className="display text-display-3 text-tinta-suave">{manifiesto.antes}</p>

        <div className="my-6 lg:my-10">
          {manifiesto.palabras.map((palabra) => (
            <p key={palabra} className="display relative text-display-1 text-verde">
              {/* base: el contorno (hereda el verde) */}
              <span className="contorno">{palabra}</span>
              {/* encima: la misma palabra rellena de molienda */}
              <span
                aria-hidden="true"
                data-relleno
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${TEXTURA})`,
                  backgroundSize: '120% auto',
                  backgroundPosition: 'center',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  clipPath: reducido ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
                }}
              >
                {palabra}
              </span>
            </p>
          ))}
        </div>

        <p className="display text-display-3">{manifiesto.despues}</p>

        <div className="mt-14 grid max-w-4xl gap-8 sm:grid-cols-2 lg:mt-20">
          {manifiesto.cuerpo.map((parrafo, i) => (
            <div key={parrafo}>
              <Etiqueta className="mb-3 block">{i === 0 ? 'El padrón' : 'La palabra'}</Etiqueta>
              <p className="text-body-lg text-tinta-suave">{parrafo}</p>
            </div>
          ))}
        </div>

        <p className="display mt-14 text-display-2 text-verde lg:mt-20">{manifiesto.cierre}</p>
      </div>
    </section>
  )
}
