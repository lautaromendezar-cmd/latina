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
 * Por qué son ESAS dos palabras y no otras: «Padrón» y «Despalada» son las
 * dos que están impresas en el envase. Si lo que se llena dijera cualquier
 * otra cosa, el contorno sería decoración — y el brief lo prohíbe
 * explícitamente.
 *
 * Y la textura tiene que ser la molienda de LaTiNa, no una textura de
 * yerba cualquiera: si es genérica, el efecto es genérico.
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
              // antes de que se vaya: si el rango incluye el borde inferior
              // del viewport, se llena cuando ya nadie la está mirando.
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
      {/* El palo se va de cuadro justo donde el copy dice despalada. No es
          adorno: es la única razón por la que este cutout existe.

          Arranca ENTERO en cuadro (antes empezaba mordido por el borde y
          con la salida atada a la sección entera, así que para cuando
          llegabas a leer ya se había ido). Ahora el disparador es el
          párrafo que explica la palabra. */}
      <Image
        aria-hidden="true"
        src="/imagenes/cutouts/palo.png"
        alt=""
        width={1200}
        height={600}
        sizes="40vw"
        data-plano="frente"
        data-salida="[data-despalada]"
        className="cutout cutout--frente absolute right-[4%] top-[22%] w-[54vw] max-w-[560px] rotate-[8deg] lg:top-[24%]"
      />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <p className="display text-display-3 text-papel-suave">{manifiesto.antes}</p>

        <div className="my-6 lg:my-10">
          {manifiesto.palabras.map((palabra) => (
            <p key={palabra} className="display relative text-display-1">
              {/* base: el contorno */}
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
            // el segundo párrafo es el que explica «despalada»: es el que
            // dispara la salida del palo
            <div key={parrafo} {...(i === 1 ? { 'data-despalada': '' } : {})}>
              <Etiqueta className="mb-3 block">{i === 0 ? 'El padrón' : 'La palabra'}</Etiqueta>
              <p className="text-body-lg text-papel-suave">{parrafo}</p>
            </div>
          ))}
        </div>

        <p className="display mt-14 text-display-2 text-dorado lg:mt-20">{manifiesto.cierre}</p>
      </div>
    </section>
  )
}
