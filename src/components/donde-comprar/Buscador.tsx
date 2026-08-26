'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { Boton } from '@/components/ui/Boton'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { Greca } from '@/components/ui/Greca'
import { contacto } from '@/content/site'
import { buscar, localidades, provincias, total, totalProvincias, PROVINCIAS_ARGENTINA } from '@/lib/distribuidores'
import { movimientoReducido } from '@/lib/motion'

/**
 * Buscador de puntos de venta.
 *
 * Está diseñado AL REVÉS de un directorio normal, y es a propósito. Los
 * datos dicen: ~300 puntos pero concentrados en 10 provincias de 24 (y
 * más de la mitad en una sola ciudad), sin coordenadas.
 *
 * De ahí salen las decisiones:
 *
 *  1. NO hay geolocalización ni "los 3 más cercanos". Sin coordenadas no
 *     se puede calcular una distancia, y pedir permiso de ubicación para
 *     después no poder usarlo es peor que no pedirlo.
 *  2. El estado "no hay nadie cerca" es el CAMINO PRINCIPAL, no el borde:
 *     con 8 de 24 provincias, la mayoría de las búsquedas caen ahí. Tiene
 *     el mismo peso visual que el estado de éxito y dos salidas escritas.
 *     Una búsqueda fallida de retail se convierte en un lead mayorista,
 *     que es la página que hace plata.
 *  3. Las provincias se ven ANTES de buscar. Si la tuya no está, la
 *     respuesta llega en un segundo y sin escribir nada.
 *
 * El movimiento acá no es decorativo: los resultados entran escalonados
 * cuando cambia el filtro, y eso es lo que confirma que el filtro hizo
 * algo. Es respuesta a una acción, no un fade-in de bienvenida.
 */
export function Buscador() {
  const [consulta, setConsulta] = useState('')
  const [provincia, setProvincia] = useState<string | null>(null)
  const grilla = useRef<HTMLUListElement>(null)
  const inputId = useId()
  const listaId = useId()

  const listaProvincias = useMemo(() => provincias(), [])
  const listaLocalidades = useMemo(() => localidades(), [])

  const resultados = useMemo(
    () => buscar(consulta, provincia ?? undefined),
    [consulta, provincia],
  )

  const filtrando = consulta.trim().length > 0 || provincia !== null
  const vacio = filtrando && resultados.length === 0

  // Entrada escalonada de las fichas cada vez que cambia el filtro.
  useEffect(() => {
    if (movimientoReducido() || !grilla.current) return
    const fichas = grilla.current.querySelectorAll('[data-ficha]')
    if (!fichas.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fichas,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          // Con la lista completa (~300 fichas) un each fijo de 0.025 tarda
          // 7,5s en terminar: el escalonado entero se techa en 0,9s.
          stagger: { each: Math.min(0.025, 0.9 / fichas.length), from: 'start' },
          ease: 'power2.out',
          overwrite: true,
        },
      )
    }, grilla)

    return () => ctx.revert()
  }, [resultados])

  const limpiar = () => {
    setConsulta('')
    setProvincia(null)
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-seccion sm:px-6 lg:px-10">
      {/* --- cobertura, sin inflarla --- */}
      <div className="mb-10 flex flex-wrap items-baseline gap-x-8 gap-y-2">
        <p className="display text-display-3 text-verde">
          {total} <span className="text-tinta">puntos de venta</span>
        </p>
        <Etiqueta as="p">
          En {totalProvincias} de {PROVINCIAS_ARGENTINA} provincias
        </Etiqueta>
      </div>

      {/* --- búsqueda --- */}
      <div className="max-w-xl">
        <label htmlFor={inputId} className="etiqueta mb-2 block text-verde-profundo">
          Buscá tu localidad
        </label>
        <div className="relative">
          <input
            id={inputId}
            type="search"
            list={listaId}
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder="Paraná, Olavarría, Rafaela…"
            autoComplete="off"
            className="w-full rounded-[--radius-card] border-2 border-tinta/15 bg-blanco px-4 py-3.5 pr-12 text-tinta transition-colors placeholder:text-tinta-suave/70 focus:border-verde"
          />
          {consulta && (
            <button
              type="button"
              onClick={() => setConsulta('')}
              className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-tinta-suave hover:text-verde"
            >
              <span className="sr-only">Borrar la búsqueda</span>
              <span aria-hidden="true">×</span>
            </button>
          )}
        </div>
        <datalist id={listaId}>
          {listaLocalidades.map((l) => (
            <option key={l} value={l} />
          ))}
        </datalist>
      </div>

      {/* --- chips de provincia, no un dropdown --- */}
      <div className="mt-8">
        <Etiqueta as="p" className="mb-3 block">
          O elegí tu provincia
        </Etiqueta>
        <ul className="flex flex-wrap gap-2">
          {listaProvincias.map((p) => {
            const activa = provincia === p.nombre
            return (
              <li key={p.nombre}>
                <button
                  type="button"
                  aria-pressed={activa}
                  onClick={() => setProvincia(activa ? null : p.nombre)}
                  className={`etiqueta inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 transition-colors ${
                    activa
                      ? 'border-tinta bg-amarillo text-tinta'
                      : 'border-tinta/15 bg-blanco text-tinta hover:border-verde'
                  }`}
                >
                  {p.nombre}
                  <span className="text-verde-profundo">{p.cantidad}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* --- resultados --- */}
      <div className="mt-12" aria-live="polite">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <Etiqueta as="p">
            {filtrando
              ? resultados.length === 1
                ? '1 punto encontrado'
                : `${resultados.length} puntos encontrados`
              : 'Todos los puntos'}
          </Etiqueta>
          {filtrando && (
            <button
              type="button"
              onClick={limpiar}
              className="etiqueta text-verde-profundo underline underline-offset-4"
            >
              Ver todos
            </button>
          )}
        </div>

        {!vacio && (
          <ul ref={grilla} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resultados.map((d) => (
              <li
                key={d.id}
                data-ficha
                className="rounded-[--radius-card] border-2 border-tinta/10 bg-blanco p-5"
              >
                <Etiqueta className="mb-2 block">
                  {d.localidad} · {d.provincia}
                </Etiqueta>
                <p className="mb-1 font-bold text-tinta">{d.nombre}</p>
                {d.direccion && <p className="text-sm text-tinta-suave">{d.direccion}</p>}
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {d.telefono && (
                    <a
                      href={`tel:${d.telefono.replace(/[^\d+]/g, '')}`}
                      className="text-sm font-semibold text-verde-profundo underline underline-offset-4"
                    >
                      {d.telefono}
                    </a>
                  )}
                  {d.instagram && (
                    <a
                      href={`https://instagram.com/${d.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-tinta-suave underline underline-offset-4 hover:text-tinta"
                    >
                      @{d.instagram}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* El estado que más se va a ver. Mismo peso que el de éxito. */}
        {vacio && (
          <div className="rounded-[--radius-card] border-2 border-verde bg-blanco p-6 sombra-dura lg:p-10">
            <h2 className="display mb-3 text-display-3">
              Todavía no llegamos a {consulta.trim() || provincia}.
            </h2>
            <p className="mb-8 max-w-[46ch] text-tinta-suave">
              Somos {total} puntos en {totalProvincias} provincias y la lista crece todos los
              meses. Mientras tanto hay dos formas de tomar LaTiNa igual.
            </p>

            <Greca tono="amarillo" alto={10} opacidad={0.9} className="mb-8 max-w-xs" />

            <ul className="grid gap-8 sm:grid-cols-2">
              <li className="flex flex-col items-start gap-3">
                <h3 className="text-lg font-bold text-tinta">Pedila online</h3>
                <p className="flex-1 text-sm text-tinta-suave">
                  Te llega a cualquier punto del país, sin depender de que haya un comercio
                  cerca.
                </p>
                <Boton href={contacto.tienda} externo variante="primario">
                  Ir a la tienda
                </Boton>
              </li>
              <li className="flex flex-col items-start gap-3">
                <h3 className="text-lg font-bold text-tinta">Traela vos</h3>
                <p className="flex-1 text-sm text-tinta-suave">
                  Si tenés un comercio, podés ser el primero que la venda en tu ciudad.
                </p>
                <Boton href="/vende-latina" variante="secundario">
                  Quiero distribuir
                </Boton>
              </li>
            </ul>
          </div>
        )}
      </div>

      <p className="mt-10 text-sm text-tinta-suave">
        ¿Falta un punto de venta o hay un dato mal?{' '}
        <a
          href={`https://wa.me/${contacto.whatsappE164}?text=${encodeURIComponent(
            'Hola, encontré un dato para corregir en la lista de puntos de venta.',
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-verde-profundo underline underline-offset-4"
        >
          Avisanos por WhatsApp
        </a>
        .
      </p>
    </div>
  )
}
