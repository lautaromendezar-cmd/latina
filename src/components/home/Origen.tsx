'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useLayoutEffectSeguro, movimientoReducido } from '@/lib/motion'
import { origen } from '@/content/site'

/**
 * Origen — tres pantallas completas que se pasan con el scroll.
 *
 * No es geografía, es trayectoria: se hace en el sur de Brasil, el padrón
 * se probó exportándolo a Uruguay, y a la Argentina recién está llegando.
 * El tercer momento es el único donde la marca NO está instalada, y eso no
 * lo puede contar ninguna yerba de acá. Sin fechas: la marca no publica
 * año de fundación (MARCA.md).
 *
 * LA TRANSICIÓN es la del swipe-slider de GSAP (demos.gsap.com/demo/
 * swipe-slider). Dos máscaras encastradas —`outer` baja, `inner` sube la
 * misma cantidad— así que el texto se queda quieto en la pantalla mientras
 * la ventana pasa por encima. Encima de eso, el fondo entra con un 15% de
 * desfasaje: ahí está la profundidad. Y el título se rearma letra por
 * letra, en orden aleatorio.
 *
 * DOS CAMBIOS SOBRE EL DEMO, y los dos son porque acá esto es UNA sección
 * de siete y no la página entera:
 *
 *  1. **No hay Observer ni secuestro de la rueda.** El demo hace
 *     `preventDefault` sobre wheel/touch y se queda con el scroll para
 *     siempre; acá eso pelearía con Lenis y te dejaría preso en la mitad
 *     de la home. La sección se pinea y el índice sale de la posición del
 *     scroll: cada momento se lleva 80vh de recorrido y al cruzar el
 *     umbral corre la transición entera, con su ease y sus 1,25s. Se ve
 *     igual, pero seguís scrolleando como en cualquier página.
 *  2. **El texto no viaja con el fondo.** En el demo el `h2` vive adentro
 *     de `.bg` y se lleva el parallax puesto. Separarlos es más barato de
 *     leer —la imagen se mueve, el texto no— y de paso el bloque de texto
 *     queda en flujo, así que en un teléfono angosto la sección crece en
 *     vez de recortarlo.
 *
 * ESTADO SIN JAVASCRIPT / MOBILE / MOVIMIENTO REDUCIDO. El JSX sale de
 * fábrica como tres pantallas apiladas, una abajo de la otra, y así se
 * queda si el bundle no carga, si el visitante pidió no moverse o si la
 * pantalla es chica. GSAP recién ahí las superpone y las pinea, adentro de
 * un useLayoutEffect que corre antes del primer pintado. No es una
 * degradación: es la misma sección, scrolleada en vez de pasada.
 *
 * El pin mide 240% (80vh por momento). Antes era 170% con crossfade; la
 * transición ahora dura 1,25s y con el recorrido corto se encadenaban dos
 * antes de que terminara la primera.
 */

/** Los dos colores del índice lateral. Nunca opacidad: ver globals.css. */
const ACTIVO = '#ffc81a' // --color-amarillo
const INACTIVO = '#fcfbf7' // --color-crema

export function Origen() {
  const seccion = useRef<HTMLElement>(null)
  const marco = useRef<HTMLDivElement>(null)

  useLayoutEffectSeguro(() => {
    if (!seccion.current || !marco.current) return
    if (movimientoReducido()) return
    if (!window.matchMedia('(min-width: 1024px)').matches) return

    let ctx: gsap.Context | null = null
    let cancelado = false

    /**
     * Se arma con las fuentes ya cargadas. SplitText mide dónde cortan los
     * renglones: si parte con la fuente de respaldo y después entra
     * Archivo, los cortes quedan donde ya no van. Mientras tanto la
     * sección se ve entera —son tres pantallas apiladas—, así que la
     * espera no se nota.
     */
    const armar = async () => {
      const { SplitText } = await import('gsap/SplitText')
      if (document.fonts) await document.fonts.ready
      if (cancelado || !seccion.current || !marco.current) return
      gsap.registerPlugin(SplitText)

      ctx = gsap.context(() => {
        const slides = gsap.utils.toArray<HTMLElement>('[data-slide]')
        const outers = gsap.utils.toArray<HTMLElement>('[data-outer]')
        const inners = gsap.utils.toArray<HTMLElement>('[data-inner]')
        const fondos = gsap.utils.toArray<HTMLElement>('[data-fondo]')
        const titulos = gsap.utils.toArray<HTMLElement>('[data-titulo-slide]')
        const nombres = gsap.utils.toArray<HTMLElement>('[data-nombre]')
        const relleno = marco.current!.querySelector<HTMLElement>('[data-relleno]')
        const indiceLateral = marco.current!.querySelector<HTMLElement>('[data-indice]')

        const total = slides.length
        if (!total || titulos.length !== total) return

        const partidos = titulos.map(
          (t) =>
            new SplitText(t, {
              type: 'chars,words,lines',
              linesClass: 'clip-linea',
              charsClass: 'letra-slide',
            }),
        )
        const secundarios = slides.map((s) =>
          gsap.utils.toArray<HTMLElement>(s.querySelectorAll('[data-secundario]')),
        )

        // Acá GSAP se hace cargo: el marco pasa a medir una pantalla y las
        // tres se superponen. Hasta esta línea estaban apiladas.
        gsap.set(marco.current, { height: '100svh' })
        gsap.set(slides, { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' })
        gsap.set(slides, { autoAlpha: 0, zIndex: 0 })
        gsap.set(slides[0]!, { autoAlpha: 1, zIndex: 1 })
        gsap.set(nombres, { color: INACTIVO })
        gsap.set(nombres[0]!, { color: ACTIVO })
        if (relleno) gsap.set(relleno, { scaleY: 1 / total, transformOrigin: 'top center' })
        // El índice sólo existe si esto corre: sin pin son tres pantallas
        // apiladas y una regla de avance clavada al medio de la segunda no
        // dice nada. Cada momento igual lleva su lugar escrito.
        if (indiceLateral) gsap.set(indiceLateral, { display: 'flex' })
        // Lo único que se esconde de entrada es el texto del primero, que
        // entra cuando entra la sección. Si esta línea no corriera, el
        // texto ya estaría a la vista.
        gsap.set([...partidos[0]!.chars, ...secundarios[0]!], { autoAlpha: 0 })

        let indice = 0
        let entrada = false
        let enCurso: gsap.core.Timeline | null = null

        /**
         * `cortina: false` es la entrada del primero: no hay nada de dónde
         * venir, así que entra solamente el texto.
         */
        const irA = (nuevo: number, dir: 1 | -1, cortina = true): gsap.core.Timeline => {
          enCurso?.kill()
          const anterior = indice
          indice = nuevo

          const t = gsap.timeline({ defaults: { duration: 1.25, ease: 'power1.inOut' } })

          if (cortina && anterior !== nuevo) {
            gsap.set(slides[anterior]!, { zIndex: 0 })
            t.to(fondos[anterior]!, { yPercent: -15 * dir }).set(slides[anterior]!, {
              autoAlpha: 0,
            })
          }

          // Si el scroll se comió dos umbrales de una, el del medio se
          // apaga sin ceremonia: no puede quedar prendido abajo.
          slides.forEach((s, i) => {
            if (i !== anterior && i !== nuevo) gsap.set(s, { autoAlpha: 0, zIndex: 0 })
          })
          gsap.set(slides[nuevo]!, { autoAlpha: 1, zIndex: 1 })

          if (cortina) {
            t.fromTo(
              [outers[nuevo]!, inners[nuevo]!],
              { yPercent: (i: number) => (i ? -100 * dir : 100 * dir) },
              { yPercent: 0 },
              0,
            ).fromTo(fondos[nuevo]!, { yPercent: 15 * dir }, { yPercent: 0 }, 0)
          }

          t.fromTo(
            partidos[nuevo]!.chars,
            { autoAlpha: 0, yPercent: 150 * dir },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 1,
              ease: 'power2',
              stagger: { each: 0.02, from: 'random' },
            },
            cortina ? 0.2 : 0,
          ).fromTo(
            secundarios[nuevo]!,
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.09 },
            cortina ? 0.45 : 0.25,
          )

          nombres.forEach((n, i) => {
            t.to(n, { color: i === nuevo ? ACTIVO : INACTIVO, duration: 0.4 }, 0)
          })
          if (relleno) t.to(relleno, { scaleY: (nuevo + 1) / total, duration: 0.6 }, 0)

          enCurso = t
          return t
        }

        ScrollTrigger.create({
          trigger: seccion.current,
          start: 'top top',
          end: `+=${total * 80}%`,
          pin: marco.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            const i = Math.max(0, Math.min(total - 1, Math.floor(self.progress * total)))
            // Entrar al pin desde abajo —o recargar con el scroll ya
            // adentro— no puede empezar por el primero: se planta en el
            // que corresponde, sin transición.
            if (!entrada) {
              entrada = true
              irA(i, 1, false).progress(1)
              return
            }
            if (i !== indice) irA(i, i > indice ? 1 : -1)
          },
        })

        ScrollTrigger.create({
          trigger: seccion.current,
          start: 'top 60%',
          once: true,
          onEnter: () => {
            if (entrada) return
            entrada = true
            irA(0, 1, false)
          },
        })

        // Si al montar ya está a la vista (scroll restaurado), no hay
        // ningún cruce que esperar.
        if (seccion.current!.getBoundingClientRect().top < window.innerHeight * 0.6) {
          entrada = true
          irA(0, 1, false).progress(1)
        }
      }, seccion)
    }

    void armar()

    return () => {
      cancelado = true
      ctx?.revert()
    }
  }, [])

  return (
    <section ref={seccion} data-bloque="verde" className="relative bg-verde-profundo text-crema">
      <div ref={marco} className="relative w-full overflow-hidden">
        {/* Encabezado. En el teléfono es un bloque más, arriba de la
            primera pantalla; en desktop se apoya sobre el marco pineado y
            se queda ahí mientras pasan los tres momentos. */}
        <header className="relative z-20 px-4 pb-10 pt-24 sm:px-6 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-0 lg:px-10 lg:pb-0 lg:pt-10">
          <p className="etiqueta mb-2 text-amarillo">{origen.etiqueta}</p>
          <h2 className="display max-w-[18ch] text-display-3">{origen.titulo}</h2>
        </header>

        {/* Índice. Dice en qué punto del recorrido estás, que es el dato
            que la sección perdía al pasar de tres columnas a tres
            pantallas. La regla vertical carga ese dato: es la única
            vertical del sistema y por eso está permitida.
            aria-hidden porque los tres lugares ya están escritos abajo. */}
        <aside
          data-indice
          aria-hidden="true"
          className="pointer-events-none absolute right-10 top-1/2 z-20 hidden -translate-y-1/2 items-center gap-4"
        >
          <div className="relative h-32 w-px bg-crema/30">
            <div data-relleno className="absolute inset-x-0 top-0 h-full bg-amarillo" />
          </div>
          <ol className="space-y-2">
            {origen.momentos.map((m) => (
              <li key={m.id} data-nombre className="etiqueta text-crema">
                {m.lugar}
              </li>
            ))}
          </ol>
        </aside>

        {origen.momentos.map((m, i) => (
          <article key={m.id} data-slide className="relative w-full overflow-hidden">
            {/* Las dos máscaras del demo. Van vacías a propósito: lo único
                que hacen es moverse una contra la otra. */}
            <div data-outer className="h-full w-full overflow-hidden">
              <div data-inner className="h-full w-full overflow-hidden">
                <div data-fondo className="absolute inset-0">
                  <Image
                    src={m.imagen}
                    alt={m.alt}
                    fill
                    sizes="100vw"
                    quality={72}
                    priority={i === 0}
                    className="object-cover"
                  />
                  {/* Velo verde, más liviano que el 75% del sitio viejo:
                      las fotos son diurnas y el rediseño las deja verse.
                      El texto sigue centrado sobre la banda más pareja de
                      cada foto; si se cambia una foto por otra con el
                      centro muy claro, subir el velo. */}
                  <div aria-hidden="true" className="absolute inset-0 bg-verde-profundo/60" />
                </div>

                <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 py-24 text-center">
                  <p data-secundario className="etiqueta mb-5 text-amarillo">
                    {m.lugar}
                  </p>
                  <h3 data-titulo-slide className="display max-w-[14ch] text-display-1">
                    {m.titulo}
                  </h3>
                  <p
                    data-secundario
                    className="mt-6 max-w-[52ch] text-balance text-body-lg font-semibold text-crema"
                  >
                    {m.cuerpo}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
