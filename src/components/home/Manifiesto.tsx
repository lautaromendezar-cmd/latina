'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { TexturaGreca } from '@/components/ui/TexturaGreca'
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
      {/* El verde a sangre quedaba muerto. La trama es la greca del
          packaging a escala grande, al 4%: no tiene que leerse como un
          motivo, sólo tiene que sacarle el plano al fondo. */}
      <TexturaGreca tono="yerba-seca" escala={104} opacidad={0.045} />

      {/* Dos hojas muy atrás, para que el fondo tenga profundidad además
          de textura. Van en el plano tenue y con la deriva del ambiente:
          si se notan, están mal calibradas. */}
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
        className="cutout cutout--tenue absolute bottom-[8%] left-[52%] w-[30vw] max-w-[300px] rotate-[18deg]"
      />

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
        data-giro="8"
        className="cutout cutout--frente absolute right-[4%] top-[22%] w-[54vw] max-w-[560px] rotate-[8deg] lg:top-[24%]"
      />

      {/* Dos palos más, atrás y fuera de foco, que salen con el mismo
          scroll pero más lento y más corto: lo que está lejos se mueve
          menos. Y no dilata el sentido, lo refuerza — si «despalada» es
          que le sacaron el palo, varios palos yéndose lo dicen más fuerte
          que uno. */}
      <Image
        aria-hidden="true"
        src="/imagenes/cutouts/palo.png"
        alt=""
        width={1200}
        height={600}
        sizes="30vw"
        data-plano="fondo"
        data-salida="[data-despalada]"
        data-giro="-12"
        data-desfase="6"
        className="cutout cutout--fondo absolute right-[26%] top-[2%] w-[32vw] max-w-[320px] -rotate-12"
      />
      <Image
        aria-hidden="true"
        src="/imagenes/cutouts/palo.png"
        alt=""
        width={1200}
        height={600}
        sizes="20vw"
        data-plano="fondo"
        data-salida="[data-despalada]"
        data-giro="24"
        data-desfase="-5"
        className="cutout cutout--tenue absolute right-[8%] bottom-[14%] w-[22vw] max-w-[200px] rotate-[24deg]"
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
