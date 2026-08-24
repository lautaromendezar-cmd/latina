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
 * Los datos mandan: 29 puntos, 8 provincias de 24, cero coordenadas.
 *
 *  1. NO hay geolocalización ni "los 3 más cercanos": sin coordenadas no
 *     hay distancia que calcular.
 *  2. El estado "no hay nadie cerca" es el CAMINO PRINCIPAL, no el
 *     borde, y tiene dos salidas con jerarquía: comprar online, o
 *     traerla vos.
 *  3. Las provincias se muestran ANTES de buscar.
 *
 * Una búsqueda de retail que fracasa se convierte en un lead mayorista.
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
    <section className="border-t-2 border-tinta/10 py-seccion">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <header className="mb-10 max-w-3xl">
          <Etiqueta className="mb-4 block">{copy.etiqueta}</Etiqueta>
          <h2 className="display mb-5 text-display-2">{copy.titulo}</h2>
          <p className="text-body-lg text-tinta-suave">{copy.bajada}</p>
        </header>

        {/* Cobertura declarada sin inflarla. */}
        <p className="etiqueta mb-8 text-verde-profundo">
          {total} puntos de venta · {totalProvincias} de {PROVINCIAS_ARGENTINA} provincias
        </p>

        <div className="max-w-xl">
          <label htmlFor={inputId} className="etiqueta mb-2 block text-verde-profundo">
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
            className="w-full rounded-[--radius-card] border-2 border-tinta/15 bg-blanco px-4 py-3.5 text-tinta transition-colors placeholder:text-tinta-suave/70 focus:border-verde"
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
                    <span className="etiqueta inline-flex items-center gap-2 rounded-full border-2 border-tinta/15 bg-blanco px-3.5 py-2 text-tinta">
                      {p.nombre}
                      <span className="text-verde-profundo">{p.cantidad}</span>
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
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {resultados.slice(0, 6).map((d) => (
                  <li
                    key={d.id}
                    className="rounded-[--radius-card] border-2 border-tinta/10 bg-blanco p-5"
                  >
                    <p className="etiqueta mb-2 text-verde-profundo">
                      {d.localidad} · {d.provincia}
                    </p>
                    <p className="mb-1 font-bold text-tinta">{d.nombre}</p>
                    {d.direccion && (
                      <p className="text-sm text-tinta-suave">{d.direccion}</p>
                    )}
                    {d.telefono && (
                      <a
                        href={`tel:${d.telefono.replace(/[^\d+]/g, '')}`}
                        className="mt-2 inline-block text-sm font-semibold text-verde-profundo underline underline-offset-4"
                      >
                        {d.telefono}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              {resultados.length > 6 && (
                <p className="mt-4 text-sm text-tinta-suave">
                  Y {resultados.length - 6} más en{' '}
                  <Link
                    href="/donde-comprar"
                    className="font-semibold text-verde-profundo underline underline-offset-4"
                  >
                    el listado completo
                  </Link>
                  .
                </p>
              )}
            </div>
          )}

          {/* El estado que más se va a ver. Mismo peso visual que el
              estado de éxito. */}
          {sinResultados && (
            <div className="rounded-[--radius-card] border-2 border-verde bg-blanco p-6 sombra-dura lg:p-8">
              <h3 className="display mb-2 text-display-3">{copy.sinResultados.titulo}</h3>
              <p className="mb-8 text-tinta-suave">{copy.sinResultados.cuerpo}</p>

              <ul className="grid gap-6 sm:grid-cols-2">
                {copy.sinResultados.opciones.map((op) => (
                  <li key={op.id} className="flex flex-col items-start gap-3">
                    <h4 className="text-lg font-bold text-tinta">{op.titulo}</h4>
                    <p className="flex-1 text-sm text-tinta-suave">{op.cuerpo}</p>
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
