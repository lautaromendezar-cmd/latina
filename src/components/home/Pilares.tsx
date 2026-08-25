'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { TexturaGreca } from '@/components/ui/TexturaGreca'
import { useLayoutEffectSeguro, movimientoReducido } from '@/lib/motion'
import { pilares } from '@/content/site'

/**
 * Los tres pilares — el paquete y lo que lo orbita.
 *
 * Antes esto era un acordeón horizontal. Funcionaba, pero escondía detrás
 * de un click las tres razones para comprar: para leer la segunda había
 * que cerrar la primera. Los tres claims son paralelos, no pasos de un
 * proceso, así que verlos juntos es estrictamente mejor que verlos de a
 * uno.
 *
 * Se va con el acordeón toda su maquinaria de accesibilidad —los botones
 * con `aria-expanded`, el panel que nunca se desmontaba, el `onFocus` que
 * abría tabulando—. No se perdió nada: acá no hay estado que comunicar
 * porque no hay nada cerrado. Es una lista.
 *
 * ENTRA EN UNA PANTALLA, y por eso la sección es una columna flex de alto
 * fijo en vez de un apilado que crece: encabezado y lista miden lo que
 * miden, y el escenario del medio se queda con lo que sobra. El paquete va
 * a `h-full`, así que el que manda es el ALTO disponible y no un ancho
 * elegido a mano. El escenario conserva la proporción con `aspect-[5/4]` y
 * `max-w-full`: si la pantalla es baja, se achica entero en vez de
 * recortarse. Abajo de `lg` vuelve a crecer, que es lo correcto en un
 * teléfono.
 *
 * LOS COLORES. La paleta de la marca tiene dos tonos, verde y amarillo, no
 * cuatro como la referencia. La variedad sale de las COMBINACIONES y no de
 * inventar tonos que la marca no tiene: amarillo con tinta (8.6:1), verde
 * con crema (4.7:1) y verde-profundo con amarillo (6.2:1). Los tres pasan
 * AA. Si hicieran falta más colores, eso es una decisión de marca y no se
 * resuelve acá.
 *
 * LA TIPOGRAFÍA de los chips es la condensada del hero en caps, que es el
 * mismo registro que la referencia. La manuscrita no: adentro de una
 * pastilla se lee peor que en un remate gigante, y la regla que quedó
 * escrita es una manuscrita por sección y siempre sobre el remate de una
 * frase.
 *
 * ACCESIBILIDAD DE LO QUE FLOTA: los chips del escenario son
 * `aria-hidden`. No es que se escondan, es que el mismo texto está en la
 * lista de abajo, y anunciarlo dos veces es ruido. En teléfono no orbitan
 * —no hay "alrededor" en 360px—: aparecen en la lista, que es el estado
 * terminado y no una degradación.
 */

/**
 * Cada chip con su par de colores y dónde se planta alrededor del
 * paquete. Es presentación, por eso vive acá y no en `site.ts`.
 *
 * `--ciclo` y `--retraso` desincronizan la flotación: si los tres suben y
 * bajan juntos deja de parecer que flotan y parece que se mueve la página.
 * Los retrasos son negativos para que al entrar en cuadro cada uno esté ya
 * en un punto distinto del ciclo, en vez de arrancar los tres del piso.
 */
const CHIPS = [
  {
    color: 'bg-amarillo text-tinta',
    sitio: 'left-0 top-[8%] lg:-left-[6%]',
    giro: '-rotate-[5deg]',
    ciclo: '10s',
    retraso: '0s',
  },
  {
    color: 'bg-verde text-crema',
    sitio: 'right-0 top-[44%] lg:-right-[7%]',
    giro: 'rotate-[4deg]',
    ciclo: '12s',
    retraso: '-3.5s',
  },
  {
    color: 'bg-verde-profundo text-amarillo',
    sitio: 'bottom-[14%] left-[2%] lg:-left-[2%]',
    giro: '-rotate-[3deg]',
    ciclo: '11s',
    retraso: '-6s',
  },
] as const

/**
 * De dónde viene cada chip al entrar, en el mismo orden que `CHIPS`.
 * Cada uno llega desde su propio lado, no todos desde el mismo punto.
 */
const ENTRADA = [
  { x: -70, y: -18, giro: -16 },
  { x: 80, y: 0, giro: 14 },
  { x: -60, y: 26, giro: -13 },
] as const

/** El recorte de molienda que orbita junto a los chips. */
const ORBITA = [
  {
    sitio: 'bottom-[6%] right-[8%]',
    ancho: 'w-[22%] max-w-[150px]',
    giro: '-rotate-[8deg]',
    ciclo: '9s',
    retraso: '-5s',
  },
] as const

export function Pilares() {
  const seccion = useRef<HTMLElement>(null)
  const escenario = useRef<HTMLDivElement>(null)

  useLayoutEffectSeguro(() => {
    if (!seccion.current || !escenario.current) return
    if (movimientoReducido()) return

    const ctx = gsap.context(() => {
      // DOS disparadores, no uno.
      //
      // Con uno solo atado a la sección entera, la línea de tiempo arranca
      // cuando el BORDE DE ARRIBA de la sección cruza el viewport — y esta
      // sección mide una pantalla completa, así que para cuando el paquete
      // aparece en cuadro la animación ya terminó hace rato. Se veía
      // aparecer el encabezado y nada más.
      //
      // El encabezado se cuelga de la sección y el escenario del escenario:
      // cada cosa entra cuando la estás por ver.
      gsap.fromTo(
        '[data-pilares-encabezado]',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: seccion.current, start: 'top 78%', once: true },
        },
      )

      const tl = gsap.timeline({
        scrollTrigger: { trigger: escenario.current, start: 'top 82%', once: true },
      })

      // El paquete CAE. Entra desde arriba del escenario y rebota al
      // aterrizar.
      //
      // El recorte lo hace su propio contenedor (`overflow-hidden` en el
      // div del producto) y no la sección: si el que recortara fuera la
      // sección, el paquete pasaría por encima del encabezado durante toda
      // la caída. Recortado acá, aparece por el borde de arriba del
      // escenario, que es de donde tiene que venir.
      //
      // `yPercent` y no `y`: el recorrido tiene que ser la altura del
      // escenario, que cambia con el alto de la pantalla. Con un valor en
      // píxeles, en un monitor alto la caída se queda corta y el paquete
      // arranca a medio entrar.
      tl.fromTo(
        '[data-pilares-producto]',
        { yPercent: -118 },
        { yPercent: 0, duration: 1, ease: 'bounce.out' },
      )

      // Los chips llegan después y cada uno DESDE SU LADO, girado de más:
      // el de la izquierda entra por la izquierda. Que vengan todos del
      // mismo lugar los convierte en un bloque y se pierde que son tres
      // cosas distintas pegadas al paquete.
      //
      // GSAP escribe `transform` y la inclinación de reposo vive en la
      // propiedad `rotate` del CSS, que es independiente: por eso el
      // `rotation: 0` del final no endereza el chip, lo deja en su
      // inclinación de siempre.
      tl.fromTo(
        '[data-pilares-chip]',
        {
          scale: 0.55,
          opacity: 0,
          x: (i: number) => ENTRADA[i]?.x ?? 0,
          y: (i: number) => ENTRADA[i]?.y ?? 0,
          rotation: (i: number) => ENTRADA[i]?.giro ?? 0,
        },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.62,
          stagger: 0.13,
          ease: 'back.out(2)',
        },
        '-=0.45',
      )

      tl.fromTo(
        '[data-pilares-orbita]',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)' },
        '-=0.4',
      )

      tl.fromTo(
        '[data-pilares-texto]',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.3',
      )

      ScrollTrigger.refresh()
    }, seccion)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={seccion}
      className="relative flex flex-col overflow-hidden py-seccion lg:h-[100svh] lg:min-h-[640px] lg:py-14"
    >
      <TexturaGreca tono="verde" escala={132} opacidad={0.05} />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-4 sm:px-6 lg:px-10">
        <header className="mb-8 max-w-2xl shrink-0 lg:mb-4">
          <div data-pilares-encabezado className="mb-4 lg:mb-3">
            <Etiqueta>{pilares.etiqueta}</Etiqueta>
          </div>
          <h2 data-pilares-encabezado className="display text-display-2">
            {pilares.titulo}
          </h2>
        </header>

        {/* ---------- el escenario: el paquete y lo que lo orbita ----------

            `min-h-0` no es opcional en el hijo flexible: sin eso el mínimo
            automático de una caja flex es su contenido, el escenario se
            niega a achicarse y la sección desborda la pantalla en cuanto
            el viewport es bajo. */}
        <div className="flex min-h-0 flex-1 items-center justify-center py-2">
          <div
            ref={escenario}
            className="relative aspect-[5/4] w-full max-w-[760px] lg:h-full lg:w-auto lg:max-w-full"
          >
            <div
              data-pilares-producto
              className="absolute inset-0 flex items-center justify-center overflow-hidden px-[22%] py-[4%]"
            >
              <Image
                src={pilares.producto.imagen}
                alt={pilares.producto.alt}
                width={960}
                height={1547}
                sizes="(max-width: 640px) 56vw, 34vw"
                className="h-full w-auto object-contain drop-shadow-[14px_16px_0_rgba(11,58,28,0.16)]"
              />
            </div>

            {/* La molienda. Decorativa: lo que muestra ya está escrito en
                los chips y en el cuerpo. */}
            {pilares.orbita.map((pieza, i) => (
              <span
                key={pieza.src}
                aria-hidden="true"
                className={`pilar-flota pointer-events-none absolute hidden sm:block ${ORBITA[i]?.sitio ?? ''} ${ORBITA[i]?.ancho ?? ''}`}
                style={
                  {
                    '--ciclo': ORBITA[i]?.ciclo,
                    '--retraso': ORBITA[i]?.retraso,
                  } as React.CSSProperties
                }
              >
                <Image
                  src={pieza.src}
                  alt=""
                  width={pieza.ancho}
                  height={pieza.alto}
                  sizes="16vw"
                  data-pilares-orbita
                  className={`block h-auto w-full ${ORBITA[i]?.giro ?? ''}`}
                />
              </span>
            ))}

            {/* Los chips. Sólo orbitan de sm para arriba; abajo van en la
                lista, junto a su texto. */}
            {pilares.items.map((item, i) => (
              <span
                key={item.id}
                aria-hidden="true"
                className={`pilar-flota pointer-events-none absolute hidden sm:block ${CHIPS[i]?.sitio ?? ''}`}
                style={
                  {
                    '--ciclo': CHIPS[i]?.ciclo,
                    '--retraso': CHIPS[i]?.retraso,
                  } as React.CSSProperties
                }
              >
                <span
                  data-pilares-chip
                  className={`display sombra-dura block whitespace-nowrap rounded-full px-5 py-2.5 text-display-3 ${CHIPS[i]?.color ?? ''} ${CHIPS[i]?.giro ?? ''}`}
                >
                  {item.chip}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* ---------- la lectura ---------- */}
        <ul className="mt-10 grid shrink-0 gap-10 sm:grid-cols-3 lg:mt-4 lg:gap-10">
          {pilares.items.map((item, i) => (
            <li key={item.id} data-pilares-texto>
              {/* En teléfono los chips no orbitan: aparecen acá, que es
                  donde igual hay que leerlos. */}
              <span
                className={`display sombra-dura-chica mb-4 inline-block rounded-full px-4 py-2 text-body ${CHIPS[i]?.color ?? ''} sm:hidden`}
              >
                {item.chip}
              </span>
              <h3 className="display mb-2 text-display-3">{item.titulo}</h3>
              <p className="text-tinta-suave">{item.cuerpo}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
