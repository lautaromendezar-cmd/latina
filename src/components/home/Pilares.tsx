'use client'

import { useId, useState } from 'react'
import Image from 'next/image'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { TexturaGreca } from '@/components/ui/TexturaGreca'
import { pilares } from '@/content/site'

/**
 * Los tres pilares — acordeón horizontal.
 *
 * La versión anterior tenía los recortes flotando sobre el borde de cada
 * card: se montaban encima de las pestañas, y el paquete —que es
 * vertical— salía diminuto al lado del polvo, que es apaisado. Esto lo
 * resuelve de raíz. El panel abierto tiene todo el ancho para la imagen y
 * los cerrados son barras: nada se pisa con nada.
 *
 * POR QUÉ ESTE PATRÓN Y NO UN SCROLL HORIZONTAL PINEADO: acá el
 * movimiento lo dispara el click, no el scroll. Origen ya está pineada y
 * es la sección anterior; dos pines seguidos es donde un sitio empieza a
 * sentirse como que te pelea el scroll. Con esto el visitante decide.
 *
 * Sigue sin haber 01 / 02 / 03: los tres son claims paralelos —rinde más,
 * padrón, sin T.A.C.C.—, no pasos de un proceso, y numerar algo que no es
 * secuencia está en los antipatrones del brief.
 *
 * Las barras van en dorado porque en este sistema el dorado es ACCIÓN, y
 * son justamente lo único clickeable de la sección. La abierta va en
 * dorado pleno y las cerradas en dorado-oscuro, así el estado se ve sin
 * depender del ancho.
 *
 * ACCESIBILIDAD, y por eso está armado así:
 *  · Son `button` de verdad con `aria-expanded` y `aria-controls`, no
 *    divs con onClick. Se recorren con Tab y se abren con Enter o barra.
 *  · La barra NUNCA se desmonta. Si el botón activo desapareciera del
 *    DOM, el foco del teclado se caería al body en el momento en que lo
 *    activás — y además React reemplazaría el nodo, matando la transición
 *    de ancho. Lo que cambia es el ancho del panel, no qué existe.
 *  · Abre también con `onFocus`: tabulando se ve el contenido sin tener
 *    que apretar nada.
 *
 * En mobile no hay acordeón: los tres paneles van abiertos y apilados, que
 * es el estado terminado, no una degradación.
 */
export function Pilares() {
  const [abierto, setAbierto] = useState(0)
  const idBase = useId()

  return (
    <section className="relative flex flex-col justify-center overflow-hidden border-t border-yerba-alta py-seccion lg:min-h-[100svh]">
      <TexturaGreca tono="yerba-seca" escala={132} opacidad={0.04} />

      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <header className="mb-12 max-w-2xl lg:mb-16">
          <Etiqueta className="mb-4 block">{pilares.etiqueta}</Etiqueta>
          <h2 className="display text-display-2">{pilares.titulo}</h2>
        </header>

        {/* ---------- desktop: acordeón ---------- */}
        <div className="hidden gap-2 lg:flex lg:h-[56svh] lg:min-h-[400px]">
          {pilares.items.map((item, i) => {
            const activo = i === abierto
            const panelId = `${idBase}-panel-${item.id}`

            return (
              <div
                key={item.id}
                className="flex overflow-hidden transition-[flex-grow,flex-basis] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"
                style={{
                  flexGrow: activo ? 7 : 0,
                  // El basis NO es opcional. Sin él, `flex-basis: auto` mide
                  // el contenido: los paneles cerrados se dimensionan por
                  // su texto en vez de colapsar al ancho de la barra, y los
                  // tres terminan repartiéndose la fila con el texto roto
                  // en una palabra por línea.
                  flexBasis: activo ? 0 : '5rem',
                  flexShrink: 0,
                }}
              >
                <button
                  type="button"
                  onClick={() => setAbierto(i)}
                  onFocus={() => setAbierto(i)}
                  aria-expanded={activo}
                  aria-controls={panelId}
                  className={`flex w-20 shrink-0 items-center justify-center transition-colors duration-300 ${
                    activo ? 'bg-dorado' : 'bg-dorado-oscuro hover:bg-dorado'
                  }`}
                >
                  <span className="etiqueta whitespace-nowrap text-yerba-oscuro [transform:rotate(180deg)] [writing-mode:vertical-rl]">
                    {item.pestana}
                  </span>
                </button>

                <div
                  id={panelId}
                  className="flex min-w-0 flex-1 overflow-hidden border border-l-0 border-yerba-alta bg-yerba-media"
                >
                  <div className="relative w-[42%] min-w-0 shrink-0 bg-yerba-oscuro">
                    <Image
                      src={item.imagen}
                      alt={item.alt}
                      fill
                      sizes="30vw"
                      className={`object-contain ${item.id === 'sintacc' ? 'p-14' : 'p-8'}`}
                    />
                  </div>

                  {/* min-w-0 en las dos columnas: sin eso, el contenido
                      impone un ancho mínimo y el panel cerrado no puede
                      colapsar del todo.

                      El título va en display-3 y no en display-2: la
                      columna de texto mide ~520px con el panel abierto, y
                      "El padrón que no se consigue acá" a 60px no entra
                      ni partido en tres líneas. */}
                  <div className="flex min-w-0 flex-col justify-center p-8 xl:p-12">
                    <h3 className="display mb-5 text-display-3">{item.titulo}</h3>
                    <p className="max-w-[46ch] text-body-lg text-papel-suave">
                      {item.cuerpo}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ---------- mobile: los tres abiertos, apilados ---------- */}
        <ul className="space-y-10 lg:hidden">
          {pilares.items.map((item) => (
            <li key={item.id} className="border border-yerba-alta bg-yerba-media">
              <div className="relative aspect-[16/10] bg-yerba-oscuro">
                <Image
                  src={item.imagen}
                  alt={item.alt}
                  fill
                  sizes="100vw"
                  className="object-contain p-8"
                />
              </div>
              <div className="p-6">
                <p className="etiqueta mb-4 w-fit bg-dorado px-3 py-1.5 text-yerba-oscuro">
                  {item.pestana}
                </p>
                <h3 className="display mb-4 text-display-3">{item.titulo}</h3>
                <p className="text-papel-suave">{item.cuerpo}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
