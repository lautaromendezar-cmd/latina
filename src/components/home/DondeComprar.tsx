'use client'

import { useId, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import { Boton } from '@/components/ui/Boton'
import { Flecha, Sello } from '@/components/ui/Adornos'
import { useLayoutEffectSeguro, movimientoReducido } from '@/lib/motion'
import { dondeComprarPreview as copy, contacto } from '@/content/site'
import { presentaciones } from '@/data/producto'
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
 *
 * ADELGAZADA. La primera versión de esta pantalla apilaba cinco estilos de
 * componente distintos —etiqueta, card con borde, botón relleno, pastillas
 * de contorno, botón de contorno— y se leía como una ensalada. Lo que se
 * fue y por qué:
 *
 *  · La etiqueta "Dónde comprar" arriba del título: el título dice eso
 *    mismo, en grande.
 *  · La bajada: explicaba el fallback ANTES de que el fallback pase. Lo
 *    dice el propio bloque de "todavía no llegamos" cuando corresponde.
 *  · La card con borde de las presentaciones: pasó a ser una línea de
 *    texto al pie. El dato no necesitaba una caja.
 *  · Las ocho pastillas de provincias: eran ocho objetos con borde para
 *    decir ocho nombres. Ahora es una línea de texto. La información es
 *    la misma; el ruido, no.
 *
 * En la sección quedan TRES cosas con forma: el campo de búsqueda, las
 * fichas de resultado y el bloque del fallback. El resto es tipografía.
 *
 * ACÁ VIVEN LAS DOS PRESENTACIONES. Tenían una sección propia y se
 * eliminó: su único dato —viene en dos tamaños— ya lo dice la tira, y
 * mostraba dos fotos que en realidad eran el MISMO archivo, así que la del
 * ½ kg tenía 1KG impreso en el envase.
 */
export function DondeComprar() {
  const [consulta, setConsulta] = useState('')
  const inputId = useId()
  const listaId = useId()
  const seccion = useRef<HTMLElement>(null)

  useLayoutEffectSeguro(() => {
    if (!seccion.current) return
    if (movimientoReducido()) return

    const ctx = gsap.context(() => {
      // Entra el encabezado, el buscador y el pie. La región de
      // resultados NO: es `aria-live` y su contenido cambia solo, así que
      // animarla sería animar el resultado de una búsqueda.
      gsap.fromTo(
        '[data-dc-entra]',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: { trigger: seccion.current, start: 'top 76%', once: true },
        },
      )

      // Los adornos entran con gesto propio y no con el mismo
      // desplazamiento que el texto: la flecha llega desde la izquierda,
      // que es hacia donde apunta, y el sello BAJA —escala de 1.7 a 1—
      // como se estampa un sello de goma. La inclinación de reposo la
      // pone el CSS, así que el tween no toca `rotation` y no hay dos
      // giros peleando.
      gsap.fromTo(
        '[data-dc-flecha]',
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: seccion.current, start: 'top 76%', once: true },
        },
      )

      gsap.fromTo(
        '[data-dc-sello]',
        { scale: 1.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          delay: 0.35,
          ease: 'back.out(1.8)',
          scrollTrigger: { trigger: seccion.current, start: 'top 76%', once: true },
        },
      )
    }, seccion)

    return () => ctx.revert()
  }, [])

  const resultados = useMemo(
    () => (consulta.trim().length >= 2 ? buscar(consulta) : []),
    [consulta],
  )
  const buscando = consulta.trim().length >= 2
  const sinResultados = buscando && resultados.length === 0

  const listaProvincias = useMemo(() => provincias(), [])
  const listaLocalidades = useMemo(() => localidades(), [])

  return (
    <section ref={seccion} className="border-t-2 border-tinta/10 py-seccion">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* El título, con el tratamiento de la refe "Find our location":
            centrado, el remate manuscrito, y dos adornos pisándolo.

            Los adornos son `absolute` y no parte del flujo: en la fila
            empujarían el texto y el centro dejaría de ser el centro.
            Debajo de `lg` no se muestran, porque ahí el título ya usa
            todo el ancho. */}
        <header className="relative mx-auto max-w-3xl text-center">
          <span
            data-dc-flecha
            className="pointer-events-none absolute -left-[19%] top-[6%] hidden w-[16%] text-verde lg:block"
          >
            <Flecha className="block h-auto w-full" />
          </span>
          <span
            data-dc-sello
            className="pointer-events-none absolute -right-[12%] top-[30%] hidden w-[18%] -rotate-[8deg] text-verde-profundo lg:block"
          >
            <Sello className="block h-auto w-full" />
          </span>

          <h2 data-dc-entra className="display text-display-2">
            {copy.titulo}
            {/* El remate. Mismo calco que el manifiesto: sobre fondo claro
                el filete va oscuro, porque amarillo sobre crema da 1.5:1 y
                lo que dibuja la letra es el contorno. */}
            <span className="mt-1 block">
              <span className="manuscrita manuscrita-calco manuscrita-calco--tinta text-manuscrita text-amarillo">
                {copy.tituloRemate}
              </span>
            </span>
          </h2>
        </header>

        {/* El buscador es lo único con peso acá: es lo que la sección hace. */}
        <div data-dc-entra className="mx-auto mt-10 max-w-xl">
          <label htmlFor={inputId} className="sr-only">
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
            className="w-full rounded-[--radius-card] border-2 border-tinta/15 bg-blanco px-4 py-3.5 text-center text-tinta transition-colors placeholder:text-tinta-suave/70 focus:border-verde"
          />
          <datalist id={listaId}>
            {listaLocalidades.map((l) => (
              <option key={l} value={l} />
            ))}
          </datalist>
        </div>

        {/* Región viva: el resultado de la búsqueda se anuncia solo. */}
        <div aria-live="polite" className="mt-8">
          {!buscando && (
            <p className="mx-auto max-w-2xl text-center text-sm text-tinta-suave">
              <span className="font-bold text-verde-profundo">
                {total} puntos de venta en {totalProvincias} de {PROVINCIAS_ARGENTINA}{' '}
                provincias
              </span>
              {' — '}
              {listaProvincias.map((p) => p.nombre).join(', ')}.
            </p>
          )}

          {buscando && resultados.length > 0 && (
            <div className="mx-auto max-w-3xl">
              <p className="mb-2 text-center text-sm text-tinta-suave">
                {resultados.length === 1
                  ? '1 punto de venta'
                  : `${resultados.length} puntos de venta`}
              </p>
              {/* Sin cards: una lista separada por filetes. Las fichas con
                  borde eran el tercer objeto rectangular de la pantalla. */}
              <ul className="divide-y divide-tinta/10 border-y border-tinta/10">
                {resultados.slice(0, 6).map((d) => (
                  <li
                    key={d.id}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3.5"
                  >
                    <span className="font-bold text-tinta">{d.nombre}</span>
                    <span className="text-sm text-tinta-suave">
                      {d.localidad} · {d.provincia}
                      {d.direccion ? ` · ${d.direccion}` : ''}
                    </span>
                    {d.telefono && (
                      <a
                        href={`tel:${d.telefono.replace(/[^\d+]/g, '')}`}
                        className="ml-auto text-sm font-semibold text-verde-profundo underline underline-offset-4"
                      >
                        {d.telefono}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              {resultados.length > 6 && (
                <p className="mt-3 text-center text-sm text-tinta-suave">
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

          {/* El estado que más se va a ver, y el único bloque con forma
              propia de la sección: es el que convierte una búsqueda
              fallida en un lead. Se le sacó la sombra dura —era el objeto
              más ruidoso de la pantalla— pero conserva el borde verde:
              tiene que distinguirse de un resultado vacío. */}
          {sinResultados && (
            <div className="mx-auto max-w-2xl rounded-[--radius-card] border-2 border-verde bg-blanco p-6 text-center lg:p-8">
              <h3 className="display mb-2 text-display-3">{copy.sinResultados.titulo}</h3>
              <p className="mb-7 text-tinta-suave">{copy.sinResultados.cuerpo}</p>

              <ul className="grid gap-6 sm:grid-cols-2">
                {copy.sinResultados.opciones.map((op) => (
                  <li key={op.id} className="flex flex-col items-center gap-3">
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

        {/* El pie: las dos presentaciones en texto y las dos salidas como
            botones, el mismo par que el hero —amarillo relleno y contorno—
            para que la página tenga un solo modo de ofrecer una acción.

            El orden es el del hero al revés a propósito: allá la acción
            principal es buscar dónde comprar, y acá eso ya lo hiciste
            arriba con el campo. Lo que queda es comprar. */}
        <div
          data-dc-entra
          className="mx-auto mt-12 max-w-2xl border-t border-tinta/10 pt-8 text-center"
        >
          <p className="text-sm text-tinta-suave">
            {copy.presentaciones.etiqueta}:{' '}
            <span className="font-bold text-tinta">
              {presentaciones.map((p) => p.gramaje).join(' y ')}
            </span>
            . {copy.presentaciones.nota}
          </p>

          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {/* Sin tienda online no hay botón de compra: queda la salida
                real (el listado). Vuelve solo cuando contacto.tienda exista. */}
            {contacto.tienda && (
              <Boton href={contacto.tienda} externo variante="primario">
                {copy.presentaciones.cta}
              </Boton>
            )}
            <Boton href="/donde-comprar" variante={contacto.tienda ? 'secundario' : 'primario'}>
              {copy.verTodos}
            </Boton>
          </div>
        </div>
      </div>
    </section>
  )
}
