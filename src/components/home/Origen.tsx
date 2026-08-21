import Image from 'next/image'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { origen } from '@/content/site'

/**
 * Origen.
 *
 * No es geografía, es trayectoria: se hace en el sur de Brasil, el padrón
 * se probó exportándolo a Uruguay, y a la Argentina recién está llegando.
 * El tercer panel es el único donde la marca NO está instalada, y esa es
 * justamente la parte que ninguna yerba argentina puede contar.
 *
 * Sin fechas ni año de fundación: la marca no publica uno (MARCA.md), así
 * que los marcadores son nombres de lugar, no `01 / 02 / 03`.
 *
 * En Fase 3 la columna izquierda se vuelve sticky con crossfade scrubbeado
 * entre las tres imágenes. En Fase 1 —y en mobile siempre, y con
 * movimiento reducido— es este stack, que ya es un estado terminado.
 */
export function Origen() {
  return (
    <section className="border-t border-yerba-alta bg-yerba-media py-seccion">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <header className="mb-14 lg:mb-20">
          <Etiqueta className="mb-4 block">{origen.etiqueta}</Etiqueta>
          <h2 className="display text-display-2 max-w-[18ch]">{origen.titulo}</h2>
        </header>

        <ol className="space-y-16 lg:space-y-28">
          {origen.momentos.map((momento) => (
            <li
              key={momento.id}
              className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-16"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={momento.imagen}
                  alt={momento.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div>
                {/* El marcador es el lugar, no un número: no es una secuencia
                    numerada, es un recorrido con nombres propios. */}
                <Etiqueta acento className="mb-3 block">
                  {momento.lugar}
                </Etiqueta>
                <h3 className="display mb-4 text-display-3">{momento.titulo}</h3>
                <p className="max-w-[52ch] text-body-lg text-papel-suave">{momento.cuerpo}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
