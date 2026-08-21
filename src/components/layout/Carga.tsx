import Image from 'next/image'
import { Greca } from '@/components/ui/Greca'
import { marca } from '@/content/site'
import { CargaVista } from './CargaVista'

/**
 * Preloader.
 *
 * Server Component: no lleva una sola línea de JavaScript propio. Todos
 * los tiempos están en keyframes de CSS (ver `.preloader` en globals.css).
 *
 * El motivo es un bug que tuvo: cuando lo montaba React en un efecto, el
 * velo aparecía DESPUÉS de hidratar, así que se veía el hero, después el
 * preloader, y después otra vez el hero. Un preloader que llega tarde no
 * es un preloader. Renderizado desde el servidor, está en el primer frame
 * que pinta el browser.
 *
 * Y como una animación de CSS siempre termina, no existe el estado
 * "quedó tapado porque algo no cargó".
 *
 * Los cuatro tiempos, ~2,75s en total (el detalle con los números está
 * en globals.css, junto a los keyframes):
 *   1. el isotipo entra en escala
 *   2. el aro dorado se dibuja alrededor (stroke-dashoffset — el gesto de
 *      DrawSVG, sobre un círculo propio: el logo del cliente es un PNG y
 *      no hay ningún vector en el material)
 *   3. el mate se ceba: una capa sube de abajo y tiñe el isotipo
 *   4. se abre la greca del packaging, y el velo se parte en dos hojas
 *
 * Con `prefers-reduced-motion` no se muestra (`display: none` en el CSS).
 */
export function Carga() {
  return (
    <div className="preloader" aria-hidden="true">
      <CargaVista />

      <div className="preloader__hoja preloader__hoja--arriba" />
      <div className="preloader__hoja preloader__hoja--abajo" />

      <div className="preloader__marca">
        <div className="preloader__logo relative h-28 w-28 sm:h-36 sm:w-36">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
            <circle
              className="preloader__aro"
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="var(--color-dorado)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-[6px] overflow-hidden rounded-full">
            <Image
              src="/marca/logo.png"
              alt=""
              width={160}
              height={160}
              priority
              className="h-full w-full opacity-40"
            />
            <div className="preloader__fill">
              <Image
                src="/marca/logo.png"
                alt=""
                width={160}
                height={160}
                priority
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        <div className="preloader__greca w-56 sm:w-72">
          <Greca tono="dorado" alto={12} opacidad={0.85} />
        </div>

        <p className="preloader__slogan etiqueta text-yerba-seca">{marca.slogan}</p>
      </div>
    </div>
  )
}
