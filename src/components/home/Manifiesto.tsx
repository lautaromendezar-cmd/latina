'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { TexturaGreca } from '@/components/ui/TexturaGreca'
import { useLayoutEffectSeguro, movimientoReducido } from '@/lib/motion'
import { manifiesto } from '@/content/site'

/**
 * Manifiesto.
 *
 * Antes las dos palabras del envase —PADRON y DESPALADA— se dibujaban de
 * contorno y se rellenaban con la macro real de la molienda a medida que
 * scrolleabas. En el sitio oscuro funcionaba; sobre el fondo casi blanco
 * del rediseno la yerba adentro de la letra quedaba como una mancha
 * marron y no se leia ni como yerba ni como palabra. Se fue el efecto
 * entero, y con el se libera un lugar del presupuesto de movimiento, que
 * es el que ocupa la entrada de esta seccion.
 *
 * Las dos palabras no se pierden: siguen encabezando las dos columnas del
 * cuerpo, que es donde se explican. Como display no aportaban.
 *
 * Ahora la seccion es la frase del cliente entera, con el remate
 * manuscrito —misma logica que el hero— y la RONDA al lado: la foto real
 * de cuatro pibes cebando en una rampa. Es la unica imagen del sitio
 * donde se ve a quien le habla la marca, y sale del material propio, no
 * de un banco.
 */
export function Manifiesto() {
  const seccion = useRef<HTMLElement>(null)

  useLayoutEffectSeguro(() => {
    if (!seccion.current) return
    if (movimientoReducido()) return

    const ctx = gsap.context(() => {
      // UNA linea de tiempo para toda la seccion, no un reveal por
      // elemento: entran en el orden en que se leen. Igual que el hero.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: seccion.current,
          start: 'top 72%',
          once: true,
        },
      })

      const lineas = gsap.utils.toArray<HTMLElement>('[data-linea]')
      if (lineas.length) {
        tl.fromTo(
          lineas,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'back.out(1.3)' },
        )
      }

      // La ronda entra con el iris abriendose, no con un fade. Es una
      // foto redonda: que se abra en redondo es la unica forma de que la
      // entrada hable de la forma que tiene.
      tl.fromTo(
        '[data-ronda]',
        { clipPath: 'circle(0% at 50% 50%)', scale: 1.12 },
        { clipPath: 'circle(50% at 50% 50%)', scale: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.55',
      )

      tl.fromTo(
        '[data-ronda-sticker]',
        { scale: 0 },
        { scale: 1, duration: 0.5, ease: 'back.out(2.2)' },
        '-=0.25',
      )

      tl.fromTo(
        '[data-entra]',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.5',
      )

      // La seccion crece cuando entran las fuentes y las imagenes; sin
      // esto el disparador queda calculado sobre la altura vieja.
      ScrollTrigger.refresh()
    }, seccion)

    return () => ctx.revert()
  }, [])

  return (
    <section id="manifiesto" ref={seccion} className="relative overflow-hidden py-seccion">
      {/* El cliente vio el fondo "solo blanco" y pidio la parte blanca del
          PAQUETE, que no es blanco liso: es blanco con la greca. Mismos
          parametros que Pilares (el id del pattern se comparte a proposito,
          son el mismo dibujo). */}
      <TexturaGreca tono="verde" escala={132} opacidad={0.05} />
      {/* Dos hojas muy atras, para que el fondo tenga profundidad. Si se
          notan, estan mal calibradas. */}
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
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-16">
          <h2 className="display text-display-1 text-tinta">
            {manifiesto.frase.map((linea) => (
              <span key={linea} className="block overflow-hidden pb-[0.12em] -mb-[0.06em]">
                <span data-linea className="block">
                  {linea}
                </span>
              </span>
            ))}
            {/* El remate. Mismo tratamiento que el hero, con el filete al
                reves: sobre claro el contorno va oscuro. Ver la nota de
                `.manuscrita-calco--tinta` en globals.css — el amarillo
                solo sobre crema no pasa, y aca lo que dibuja la letra es
                el contorno. */}
            <span className="block origin-left -rotate-[2.5deg] overflow-hidden pb-[0.72em] pt-[0.2em] -mb-[0.42em] -mt-[0.2em]">
              <span data-linea className="block">
                <span className="manuscrita manuscrita-calco manuscrita-calco--tinta text-manuscrita text-amarillo">
                  {manifiesto.remate}
                </span>
              </span>
            </span>
          </h2>

          <figure className="relative mx-auto w-full max-w-[25rem] lg:mx-0">
            <div
              data-ronda
              className="aspect-square overflow-hidden rounded-full border-[6px] border-verde shadow-[12px_14px_0_0_rgba(11,58,28,0.18)]"
            >
              <Image
                src={manifiesto.foto.src}
                alt={manifiesto.foto.alt}
                width={1100}
                height={1100}
                sizes="(max-width: 1024px) 88vw, 25rem"
                className="h-full w-full object-cover"
              />
            </div>

            {/* El mate de la pieza del cliente, mordiendo el borde del
                circulo. En el borde y no encima: la foto es el contenido.

                La inclinacion la pone el CSS y GSAP anima SOLO la escala.
                Si el tween tocara `rotate`, escribiria `transform` y se
                sumaria a la propiedad `rotate` de la clase: la misma
                vuelta contada dos veces, 28 grados en vez de 14. */}
            <span
              aria-hidden="true"
              data-ronda-sticker
              className="pointer-events-none absolute -left-[7%] top-[4%] block w-[26%] origin-center -rotate-[14deg]"
            >
              <Image
                src="/imagenes/stickers/mate.png"
                alt=""
                width={364}
                height={536}
                sizes="(max-width: 1024px) 24vw, 7rem"
                className="block h-auto w-full drop-shadow-[6px_7px_0_rgba(11,58,28,0.22)]"
              />
            </span>
          </figure>
        </div>

        <div className="mt-16 grid max-w-4xl gap-8 sm:grid-cols-2 lg:mt-20">
          {manifiesto.cuerpo.map((parrafo, i) => (
            <div key={parrafo} data-entra>
              <Etiqueta className="mb-3 block">{manifiesto.etiquetas[i]}</Etiqueta>
              <p className="text-body-lg text-tinta-suave">{parrafo}</p>
            </div>
          ))}
        </div>

        <p data-entra className="display mt-14 text-display-2 text-verde lg:mt-20">
          {manifiesto.cierre}
        </p>
      </div>
    </section>
  )
}
