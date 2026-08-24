'use client'

import { useId, useState } from 'react'
import { Boton } from '@/components/ui/Boton'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { contacto } from '@/content/site'

/**
 * Formulario que termina en WhatsApp.
 *
 * DESVÍO DEL BRIEF, a conciencia. El brief pide Server Actions + Zod +
 * Resend. Resend necesita un destinatario, y la marca NO TIENE MAIL
 * PÚBLICO: no hay a dónde mandar el lead. Un formulario que valida
 * perfecto y después no le llega a nadie es peor que no tenerlo.
 *
 * Mientras tanto esto arma el mensaje y abre WhatsApp, que es como este
 * cliente recibe el negocio de verdad. Ventajas colaterales: cero
 * servicios, cero claves, cero cuota mensual, y el lead le entra al
 * teléfono con el que ya trabaja.
 *
 * La validación es de este lado y los errores son específicos —"Falta el
 * teléfono", no "Error al enviar"— como pide el brief.
 *
 * Cuando haya mail de destino: se agrega la Server Action y este mismo
 * componente pasa a mandar por los dos lados. Los campos ya están
 * descritos como datos, así que no hay que rearmar nada.
 */

export type Campo = {
  nombre: string
  etiqueta: string
  tipo?: 'texto' | 'email' | 'tel' | 'textarea' | 'select'
  opciones?: readonly string[]
  requerido?: boolean
  /** Mensaje exacto si falta. Específico, nunca genérico. */
  error?: string
  ancho?: 'medio' | 'entero'
}

type Props = {
  campos: Campo[]
  /** Encabezado del mensaje de WhatsApp, para que él sepa de dónde vino. */
  asunto: string
  textoBoton: string
  nota?: string
}

export function Formulario({ campos, asunto, textoBoton, nota }: Props) {
  const [valores, setValores] = useState<Record<string, string>>({})
  const [errores, setErrores] = useState<Record<string, string>>({})
  const [enviado, setEnviado] = useState(false)
  const idBase = useId()

  const set = (nombre: string, valor: string) => {
    setValores((v) => ({ ...v, [nombre]: valor }))
    if (errores[nombre]) {
      setErrores((e) => {
        const { [nombre]: _, ...resto } = e
        return resto
      })
    }
  }

  const validar = () => {
    const nuevos: Record<string, string> = {}
    for (const campo of campos) {
      const valor = (valores[campo.nombre] ?? '').trim()
      if (campo.requerido && !valor) {
        nuevos[campo.nombre] = campo.error ?? `Falta ${campo.etiqueta.toLowerCase()}`
        continue
      }
      if (campo.tipo === 'email' && valor && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)) {
        nuevos[campo.nombre] = 'Ese mail no parece estar bien escrito'
      }
      if (campo.tipo === 'tel' && valor && valor.replace(/\D/g, '').length < 8) {
        nuevos[campo.nombre] = 'El teléfono queda corto: ¿le falta la característica?'
      }
    }
    return nuevos
  }

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot: si un bot completa el campo escondido, no pasa nada.
    if ((valores['_dejar_vacio'] ?? '') !== '') return

    const nuevos = validar()
    setErrores(nuevos)

    if (Object.keys(nuevos).length > 0) {
      const primero = campos.find((c) => nuevos[c.nombre])
      if (primero) document.getElementById(`${idBase}-${primero.nombre}`)?.focus()
      return
    }

    const lineas = [asunto, '']
    for (const campo of campos) {
      const valor = (valores[campo.nombre] ?? '').trim()
      if (valor) lineas.push(`${campo.etiqueta}: ${valor}`)
    }

    window.open(
      `https://wa.me/${contacto.whatsappE164}?text=${encodeURIComponent(lineas.join('\n'))}`,
      '_blank',
      'noopener,noreferrer',
    )
    setEnviado(true)
  }

  // Confirmación en la misma página, sin redirect a un /gracias vacío.
  if (enviado) {
    return (
      <div className="rounded-[--radius-card] border-2 border-verde bg-blanco p-6 sombra-dura lg:p-10">
        <h3 className="display mb-3 text-display-3">Listo, te abrimos el chat.</h3>
        <p className="mb-6 max-w-[46ch] text-tinta-suave">
          Si no se abrió solo, escribinos al {contacto.whatsapp} y contanos lo mismo. Te
          contestamos en el día.
        </p>
        <button
          type="button"
          onClick={() => setEnviado(false)}
          className="etiqueta text-verde-profundo underline underline-offset-4"
        >
          Volver al formulario
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} noValidate className="grid gap-5 sm:grid-cols-2">
      {campos.map((campo) => {
        const id = `${idBase}-${campo.nombre}`
        const error = errores[campo.nombre]
        const entero = campo.ancho !== 'medio'
        const clases = `w-full rounded-xl border-2 bg-blanco px-4 py-3 text-tinta transition-colors placeholder:text-tinta-suave/70 focus:border-verde ${
          error ? 'border-sello' : 'border-tinta/15'
        }`

        return (
          <div key={campo.nombre} className={entero ? 'sm:col-span-2' : undefined}>
            <label htmlFor={id} className="etiqueta mb-2 block text-verde-profundo">
              {campo.etiqueta}
              {!campo.requerido && <span className="text-tinta-suave"> (opcional)</span>}
            </label>

            {campo.tipo === 'textarea' ? (
              <textarea
                id={id}
                name={campo.nombre}
                rows={4}
                value={valores[campo.nombre] ?? ''}
                onChange={(e) => set(campo.nombre, e.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className={clases}
              />
            ) : campo.tipo === 'select' ? (
              <select
                id={id}
                name={campo.nombre}
                value={valores[campo.nombre] ?? ''}
                onChange={(e) => set(campo.nombre, e.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className={clases}
              >
                <option value="">Elegí una opción</option>
                {campo.opciones?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                name={campo.nombre}
                type={campo.tipo === 'email' ? 'email' : campo.tipo === 'tel' ? 'tel' : 'text'}
                value={valores[campo.nombre] ?? ''}
                onChange={(e) => set(campo.nombre, e.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className={clases}
              />
            )}

            {error && (
              <p id={`${id}-error`} className="mt-2 text-sm text-sello">
                {error}
              </p>
            )}
          </div>
        )
      })}

      {/* Honeypot: invisible para una persona, irresistible para un bot. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor={`${idBase}-hp`}>No completes esto</label>
        <input
          id={`${idBase}-hp`}
          name="_dejar_vacio"
          tabIndex={-1}
          autoComplete="off"
          value={valores['_dejar_vacio'] ?? ''}
          onChange={(e) => set('_dejar_vacio', e.target.value)}
        />
      </div>

      <div className="sm:col-span-2">
        <Boton type="submit" variante="primario">
          {textoBoton}
        </Boton>
        {nota && (
          <Etiqueta as="p" className="mt-4 block max-w-[46ch]">
            {nota}
          </Etiqueta>
        )}
      </div>
    </form>
  )
}
