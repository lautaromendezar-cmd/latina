'use client'

import { useState } from 'react'
import { Greca } from '@/components/ui/Greca'
import { MarcaMate } from '@/components/ui/MarcaMate'
import { tira } from '@/content/site'

/**
 * La tira.
 *
 * Sección propia entre el hero y el manifiesto. Antes era una banda quieta
 * al pie del hero; ahora el hero mide exactamente una pantalla y esto es
 * lo primero que aparece al scrollear.
 *
 * Decisiones de la versión en movimiento:
 *
 *  · **Tres copias, no dos.** El bucle desplaza una copia entera
 *    (`-33.33%`) y vuelve al punto de partida sin costura. Con dos copias
 *    la costura se ve en cuanto la pantalla es más ancha que una copia —
 *    en un monitor de 2560 aparece el hueco. Con tres, la pista mide
 *    siempre más que el viewport más el desplazamiento.
 *  · **Sólo la primera copia existe para un lector de pantalla.** Las
 *    otras dos son `aria-hidden`: son el mismo texto repetido, y anunciarlo
 *    tres veces es ruido.
 *  · **Botón de pausa de verdad.** WCAG 2.2.2: contenido en movimiento
 *    automático que dura más de cinco segundos necesita un control para
 *    frenarlo. Es la condición que hacía que esta tira no existiera; con el
 *    control, existe.
 *  · **Estado estático diseñado.** Con `prefers-reduced-motion` no se apaga
 *    la animación y listo —quedaría una fila cortada por el borde—: las
 *    copias desaparecen, la lista se centra y envuelve, y el botón se va
 *    porque ya no hay nada que pausar. Todo en CSS, así que no depende de
 *    que hidrate.
 *
 * La tipografía es la display (Archivo condensada 850) y no la etiqueta
 * traqueada: una tira que se mueve se lee de un vistazo o no se lee. El
 * par es tinta sobre amarillo (8.6:1).
 */

/** Copias de la lista dentro de la pista. Ver nota de arriba. */
const COPIAS = 3

export function Tira() {
  const [pausada, setPausada] = useState(false)

  return (
    <section id="especificaciones" className="relative scroll-mt-16 bg-amarillo text-tinta">
      <Greca tono="verde" alto={10} opacidad={0.55} />

      <div className="relative overflow-hidden py-3.5 sm:py-4">
        <div className="tira-pista" data-pausada={pausada ? 'true' : undefined}>
          {Array.from({ length: COPIAS }, (_, copia) => (
            <ul
              key={copia}
              role="list"
              aria-hidden={copia > 0 || undefined}
              className={`tira-grupo ${copia > 0 ? 'motion-reduce:hidden' : ''}`}
            >
              {tira.items.map((item) => (
                <li key={item} className="tira-item">
                  {item}
                  {/* El mate de la marca. Va DESPUÉS de cada ítem, incluido
                      el último: así el empalme entre una copia y la
                      siguiente tiene el mismo ritmo que el resto y la
                      costura no se ve. */}
                  <span aria-hidden="true" className="tira-marca">
                    <MarcaMate />
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Pegado al borde derecho y opaco: la tira le pasa por debajo.
            44px de lado mínimo, que es el objetivo táctil de WCAG, y en
            mobile es lo único que se le come a la banda. */}
        <button
          type="button"
          onClick={() => setPausada((p) => !p)}
          className="absolute inset-y-0 right-0 z-10 flex w-11 items-center justify-center border-l border-verde/40 bg-amarillo text-tinta transition-colors hover:bg-amarillo-claro focus-visible:outline-offset-[-3px] motion-reduce:hidden sm:w-12"
        >
          <span className="sr-only">{pausada ? tira.reanudar : tira.pausar}</span>
          <svg
            aria-hidden="true"
            focusable="false"
            width="13"
            height="15"
            viewBox="0 0 13 15"
            fill="currentColor"
          >
            {pausada ? <path d="M1 0.5 12 7.5 1 14.5Z" /> : <path d="M1 1h3.5v13H1zM8.5 1H12v13H8.5z" />}
          </svg>
        </button>
      </div>

      <Greca tono="verde" alto={10} opacidad={0.55} />
    </section>
  )
}
