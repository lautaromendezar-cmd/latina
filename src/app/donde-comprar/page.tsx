import type { Metadata } from 'next'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { paginas } from '@/content/site'
import { distribuidores } from '@/data/distribuidores'
import { provincias, total, totalProvincias, PROVINCIAS_ARGENTINA } from '@/lib/distribuidores'

export const metadata: Metadata = {
  title: paginas.dondeComprar.titulo,
  description: paginas.dondeComprar.bajada,
  alternates: { canonical: '/donde-comprar' },
}

/**
 * FASE 1 — listado completo, sin filtros todavía.
 *
 * Los chips por provincia, la búsqueda y el estado "no llegamos" con sus
 * dos salidas entran en Fase 2. No hace falta virtualizar: son 29 items,
 * no los ~80 que anticipaba el brief.
 *
 * El slug se mantiene: hay SEO indexado en /donde-comprar/.
 */
export default function DondeComprarPage() {
  const listaProvincias = provincias()

  return (
    <div className="pt-28 lg:pt-36">
      <div className="mx-auto max-w-[1400px] px-4 py-seccion sm:px-6 lg:px-10">
        <header className="mb-12 max-w-3xl">
          <h1 className="display mb-5 text-display-2">{paginas.dondeComprar.titulo}</h1>
          <p className="text-body-lg text-papel-suave">{paginas.dondeComprar.bajada}</p>
          <p className="etiqueta mt-6 text-yerba-seca">
            {total} puntos · {totalProvincias} de {PROVINCIAS_ARGENTINA} provincias
          </p>
        </header>

        {listaProvincias.map((provincia) => (
          <section key={provincia.nombre} className="mb-12">
            <Etiqueta as="h2" acento className="mb-4 block">
              {provincia.nombre} · {provincia.cantidad}
            </Etiqueta>
            <ul className="grid gap-px border border-yerba-alta bg-yerba-alta sm:grid-cols-2 lg:grid-cols-3">
              {distribuidores
                .filter((d) => d.provincia === provincia.nombre)
                .map((d) => (
                  <li key={d.id} className="bg-yerba-oscuro p-5">
                    <p className="etiqueta mb-2 text-yerba-seca">{d.localidad}</p>
                    <p className="mb-1 font-medium">{d.nombre}</p>
                    {d.direccion && <p className="text-sm text-papel-suave">{d.direccion}</p>}
                    {/* Hoy los 29 tienen teléfono, pero el tipo lo marca
                        opcional: si mañana entra uno sin número, la ficha
                        se sigue viendo en vez de romper el build. */}
                    {d.telefono && (
                      <a
                        href={`tel:${d.telefono.replace(/[^\d+]/g, '')}`}
                        className="mt-2 inline-block text-sm text-dorado underline underline-offset-4"
                      >
                        {d.telefono}
                      </a>
                    )}
                    {d.instagram && (
                      <a
                        href={`https://instagram.com/${d.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-sm text-papel-suave underline underline-offset-4"
                      >
                        @{d.instagram}
                      </a>
                    )}
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
