'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { Boton } from '@/components/ui/Boton'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { useLayoutEffectSeguro, movimientoReducido } from '@/lib/motion'
import { redes, contacto } from '@/content/site'

/**
 * Seguinos en redes — el muro de Instagram.
 *
 * Dos columnas de piezas en marquesina vertical, una subiendo y la otra
 * bajando, y el argumento al lado. Sale de la referencia de Slight Twist
 * que trajo Lautaro.
 *
 * LAS PIEZAS SON REALES. Salen de `pdf-latina/latina-material`, que es el
 * material propio del cliente: el "Mate y skate", el "No sos vos, es tu
 * yerba", el "Buenos días", fotos de mates y termos. No hay placeholders
 * ni banco de imágenes, y por eso el cuerpo se puede permitir decir que
 * lo que se ve al lado salió de ese Instagram.
 *
 * BOTÓN DE PAUSA, y no es opcional: WCAG 2.2.2 pide un control para
 * cualquier contenido en movimiento automático que dure más de cinco
 * segundos, y acá adentro de las piezas hay TEXTO. Es la misma regla que
 * hizo que la tira tuviera botón.
 *
 * AQUÍ NO VA LA MANUSCRITA, aunque la sección la pediría. Ya está en el
 * hero, en el manifiesto y en Dónde comprar; una cuarta la convierte en
 * la tipografía de los títulos y deja de ser un gesto. El peso visual acá
 * lo pone el muro.
 *
 * Las diez piezas son `lazy` (el default de next/image): están al final
 * de la página y son 264 KB en total. Cargarlas de entrada sería pagar
 * eso en el primer scroll.
 */

/** Cinco y cinco. La primera columna sube, la segunda baja. */
const MITAD = 5

export function Redes() {
  const [pausado, setPausado] = useState(false)
  const seccion = useRef<HTMLElement>(null)

  const columnas = [redes.posteos.slice(0, MITAD), redes.posteos.slice(MITAD)]

  useLayoutEffectSeguro(() => {
    if (!seccion.current) return
    if (movimientoReducido()) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: seccion.current, start: 'top 74%', once: true },
      })

      // El muro se abre desde el centro hacia arriba y hacia abajo: el
      // recorte crece, no las piezas. Animar las diez sería animar un
      // bucle que ya se está moviendo solo.
      tl.fromTo(
        '[data-redes-muro]',
        { clipPath: 'inset(42% 0% 42% 0%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
        },
      )

      tl.fromTo(
        '[data-redes-entra]',
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.09, ease: 'power3.out' },
        '-=0.55',
      )
    }, seccion)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={seccion}
      className="relative overflow-hidden bg-blanco text-tinta lg:h-[100svh] lg:min-h-[640px]"
    >
      {/* La grilla cuelga de la SECCIÓN, no de un contenedor con padding:
          así el muro llega al piso y al techo del bloque, cortado en seco.
          De `lg` para arriba la sección mide una pantalla y el muro se
          estira a eso. */}
      <div className="grid h-full items-stretch lg:grid-cols-[minmax(0,54%)_minmax(0,46%)]">
        {/* ---------- el muro ----------

            La pista mide lo que miden diez piezas apiladas: más de 5000px.
            Por eso el que recorta tiene que tener un alto DEFINIDO, y por
            eso va `absolute inset-0` adentro de una celda estirada, en vez
            de `min-h-full` sobre una celda en `h-auto`. Con `h-auto` el
            alto lo termina poniendo el contenido —que es justamente la
            pista— y la sección se va a cinco mil píxeles. */}
        <div data-redes-muro className="relative h-[380px] sm:h-[460px] lg:h-full">
          <div className="absolute inset-0 grid grid-cols-2 gap-3 overflow-hidden p-3 sm:gap-4 sm:p-4">
            {columnas.map((columna, i) => (
              <div
                key={i}
                className="muro-pista gap-3 sm:gap-4"
                data-sentido={i === 1 ? 'baja' : undefined}
                data-pausada={pausado ? 'true' : undefined}
                // Las columnas no duran lo mismo: si duran igual, las dos
                // vuelven al punto de partida en el mismo instante y el
                // salto se ve de una.
                style={{ '--muro-dur': i === 1 ? '54s' : '46s' } as React.CSSProperties}
              >
                {/* Dos copias: la segunda es la que hace que el salto de
                    -50% caiga exactamente sobre la primera. Va
                    `aria-hidden` porque es el mismo contenido repetido. */}
                {[0, 1].map((copia) => (
                  <div
                    key={copia}
                    aria-hidden={copia === 1 || undefined}
                    className="flex flex-col gap-3 sm:gap-4"
                  >
                    {columna.map((posteo) => (
                      <Image
                        key={posteo.src}
                        src={posteo.src}
                        alt={copia === 0 ? posteo.alt : ''}
                        width={440}
                        height={550}
                        sizes="(max-width: 1024px) 45vw, 22vw"
                        className="block h-auto w-full rounded-[1.25rem]"
                      />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* El control de pausa. Sobre el muro, abajo a la izquierda, con
              fondo opaco: el muro le pasa por debajo. 44px de lado, que es
              el objetivo táctil de WCAG. Va en verde y no en crema porque
              ahora tiene fotos abajo, no un bloque de color. */}
          <button
            type="button"
            onClick={() => setPausado((p) => !p)}
            className="absolute bottom-5 left-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-verde-profundo text-crema transition-colors hover:bg-verde motion-reduce:hidden"
          >
            <span className="sr-only">{pausado ? redes.reanudar : redes.pausar}</span>
            <svg
              aria-hidden="true"
              focusable="false"
              width="13"
              height="15"
              viewBox="0 0 13 15"
              fill="currentColor"
            >
              {pausado ? (
                <path d="M1 0.5 12 7.5 1 14.5Z" />
              ) : (
                <path d="M1 1h3.5v13H1zM8.5 1H12v13H8.5z" />
              )}
            </svg>
          </button>
        </div>

        {/* ---------- el argumento ---------- */}
        {/* El texto se acota a 30rem y se centra en su celda. Antes
            arrancaba pegado al muro y ocupaba el 40% de la columna, asi
            que TODO el sobrante se juntaba en un hueco a la derecha.
            Centrado, el mismo aire se reparte y deja de leerse como un
            bloque a medio llenar. */}
        <div className="flex flex-col justify-center px-4 py-16 sm:px-6 lg:px-10 lg:py-0">
          <div className="mx-auto w-full max-w-[30rem]">
            <div data-redes-entra className="mb-4">
              <Etiqueta>{redes.etiqueta}</Etiqueta>
            </div>
            <h2 data-redes-entra className="display mb-5 text-display-1">
              {redes.titulo}
            </h2>
            <p data-redes-entra className="mb-5 text-body-lg text-tinta-suave">
              {redes.cuerpo}
            </p>
            {/* El handle en verde y no en amarillo: sobre blanco el
                amarillo da 1.5:1 y no pasa ni como display grande. */}
            <p data-redes-entra className="display mb-8 text-display-3 text-verde">
              @{contacto.instagram}
            </p>
            <div data-redes-entra>
              <Boton href={contacto.instagramUrl} externo variante="primario">
                {redes.cta}
              </Boton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
