'use client'

import { useId, useMemo, useState } from 'react'
import Link from 'next/link'
import { Boton } from '@/components/ui/Boton'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { dondeComprarPreview as copy } from '@/content/site'
import {
  buscar,
  localidades,
  provincias,
  total,
  totalProvincias,
  PROVINCIAS_ARGENTINA,
} from '@/lib/distribuidores'

/**
 * Dónde comprar (preview de la home).
 *
 * Esta sección está diseñada AL REVÉS de como la pedía el brief, y es a
 * propósito. Los datos scrapeados dicen: 29 puntos, 8 provincias de 24,
 * cero coordenadas, cinco direcciones de calle.
 *
 * De ahí salen tres decisiones:
 *
 *  1. NO hay geolocalización ni "los 3 más cercanos". Sin coordenadas no
 *     se puede calcular una distancia, y pedir permiso de ubicación para
 *     después no poder usarlo es peor que no pedirlo.
 *  2. El estado "no hay nadie cerca" es el CAMINO PRINCIPAL, no el borde:
 *     con 8 provincias cubiertas, la mayoría de las búsquedas van a caer
 *     ahí. Por eso tiene dos salidas escritas y con jerarquía —comprar
 *     online, o traerla vos— y no es un cartelito gris.
 *  3. Las provincias se muestran ANTES de buscar. Si la tuya no está en la
 *     lista, la respuesta llega en un segundo y sin escribir nada.
 *
 * Una búsqueda de retail que fracasa se convierte en un lead mayorista,
 * que es la página que hace plata.
 */
export function DondeComprar() {
  const [consulta, setConsulta] = useState('')
  const inputId = useId()
  const listaId = useId()

  const resultados = useMemo(
    () => (consulta.trim().length >= 2 ? buscar(consulta) : []),
    [consulta],
  )
  const buscando = consulta.trim().length >= 2
  const sinResultados = buscando && resultados.length === 0

  const listaProvincias = useMemo(() => provincias(), [])
  const listaLocalidades = useMemo(() => localidades(), [])

  return (
    <section className="border-t border-yerba-alta bg-yerba-media py-seccion">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <header className="mb-10 max-w-3xl">
          <Etiqueta className="mb-4 block">{copy.etiqueta}</Etiqueta>
          <h2 className="display mb-5 text-display-2">{copy.titulo}</h2>
          <p className="text-body-lg text-papel-suave">{copy.bajada}</p>
        </header>

        {/* Cobertura declarada sin inflarla: se dice en cuántas provincias
            estamos, no "en todo el país". */}
        <p className="etiqueta mb-8 text-yerba-seca">
          {total} puntos de venta · {totalProvincias} de {PROVINCIAS_ARGENTINA} provincias
        </p>

        <div className="max-w-xl">
          <label htmlFor={inputId} className="etiqueta mb-2 block text-yerba-seca">
            {copy.etiquetaBusqueda}
          </label>
          <input
            id={inputId}
            type="search"
            list={listaId}
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder={copy.placeholderBusqueda}
            autoComplete="off"
            className="w-full border border-yerba-alta bg-yerba-oscuro px-4 py-3.5 text-papel placeholder:text-papel-suave/60"
          />
          <datalist id={listaId}>
            {listaLocalidades.map((l) => (
              <option key={l} value={l} />
            ))}
          </datalist>
        </div>

        {/* Región viva: el resultado de la búsqueda se anuncia solo. */}
        <div aria-live="polite" className="mt-10">
          {!buscando && (
            <div>
              <Etiqueta as="p" className="mb-4 block">
                Dónde estamos hoy
              </Etiqueta>
              <ul className="flex flex-wrap gap-2">
                {listaProvincias.map((p) => (
                  <li key={p.nombre}>
                    <span className="etiqueta inline-flex items-center gap-2 border border-yerba-alta px-3 py-2 text-papel">
                      {p.nombre}
                      <span className="text-yerba-seca">{p.cantidad}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {buscando && resultados.length > 0 && (
            <div>
              <Etiqueta as="p" className="mb-4 block">
                {resultados.length === 1
                  ? '1 punto de venta'
                  : `${resultados.length} puntos de venta`}
              </Etiqueta>
              <ul className="grid gap-px border border-yerba-alta bg-yerba-alta sm:grid-cols-2 lg:grid-cols-3">
                {resultados.slice(0, 6).map((d) => (
                  <li key={d.id} className="bg-yerba-media p-5">
                    <p className="etiqueta mb-2 text-yerba-seca">
                      {d.localidad} · {d.provincia}
                    </p>
                    <p className="mb-1 font-medium text-papel">{d.nombre}</p>
                    {d.direccion && (
                      <p className="text-sm text-papel-suave">{d.direccion}</p>
                    )}
                    {d.telefono && (
                      <a
                        href={`tel:${d.telefono.replace(/[^\d+]/g, '')}`}
                        className="mt-2 inline-block text-sm text-dorado underline underline-offset-4"
                      >
                        {d.telefono}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              {resultados.length > 6 && (
                <p className="mt-4 text-sm text-papel-suave">
                  Y {resultados.length - 6} más en{' '}
                  <Link href="/donde-comprar" className="text-dorado underline underline-offset-4">
                    el listado completo
                  </Link>
                  .
                </p>
              )}
            </div>
          )}

          {/* El estado que más se va a ver. Tiene el mismo peso visual que
              el estado de éxito, no menos. */}
          {sinResultados && (
            <div className="border border-dorado/40 p-6 lg:p-8">
              <h3 className="display mb-2 text-display-3">{copy.sinResultados.titulo}</h3>
              <p className="mb-8 text-papel-suave">{copy.sinResultados.cuerpo}</p>

              <ul className="grid gap-6 sm:grid-cols-2">
                {copy.sinResultados.opciones.map((op) => (
                  <li key={op.id} className="flex flex-col items-start gap-3">
                    <h4 className="text-lg font-semibold text-papel">{op.titulo}</h4>
                    <p className="flex-1 text-sm text-papel-suave">{op.cuerpo}</p>
                    <Boton
                      href={op.href}
                      externo={op.externo}
                      variante={op.id === 'online' ? 'primario' : 'secundario'}
                    >
                      {op.cta}
                    </Boton>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-12">
          <Boton href="/donde-comprar" variante="secundario">
            {copy.verTodos}
          </Boton>
        </div>
      </div>
    </section>
  )
}
