import type { Metadata } from 'next'
import { Boton } from '@/components/ui/Boton'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { paginas, contacto } from '@/content/site'
import { escalas, preciosPublicados, piePrecios } from '@/data/mayorista'

export const metadata: Metadata = {
  title: paginas.vendeLatina.titulo,
  description: paginas.vendeLatina.bajada,
  alternates: { canonical: '/vende-latina' },
}

/**
 * FASE 1 — la escalera y los dos canales de contacto.
 *
 * El formulario (Server Action + Zod + Resend, honeypot y rate limit)
 * entra en Fase 2, y está bloqueado por un dato: la marca no tiene mail
 * público, así que no hay a dónde mandar el lead. Ver [VERIFICAR] en
 * content/site.ts.
 *
 * Mientras tanto WhatsApp NO es el plan B: es como este cliente recibe el
 * negocio de verdad. Cuando esté el formulario, los dos van a convivir con
 * la misma jerarquía.
 */
export default function VendeLatinaPage() {
  return (
    <div className="pt-28 lg:pt-36">
      <div className="mx-auto max-w-[1400px] px-4 py-seccion sm:px-6 lg:px-10">
        <header className="mb-14 max-w-3xl">
          <h1 className="display mb-5 text-display-2">{paginas.vendeLatina.titulo}</h1>
          <p className="text-body-lg text-papel-suave">{paginas.vendeLatina.bajada}</p>
        </header>

        <section className="mb-16 max-w-2xl">
          <Etiqueta as="h2" className="mb-5 block">
            Escalas de compra · paquete de 1 kg
          </Etiqueta>
          <ol className="border-t border-yerba-alta">
            {escalas.map((escala) => (
              <li
                key={escala.id}
                className="flex items-baseline justify-between gap-4 border-b border-yerba-alta py-4"
              >
                <span className="font-medium">{escala.nombre}</span>
                <span className="text-right text-sm text-papel-suave">{escala.detalle}</span>
              </li>
            ))}
          </ol>
          {preciosPublicados ? (
            <p className="etiqueta mt-4 text-yerba-seca">{piePrecios}</p>
          ) : (
            <p className="mt-4 text-sm text-papel-suave">
              Los precios cambian seguido, así que no los publicamos: escribinos y te
              pasamos la lista del día.
            </p>
          )}
          <p className="mt-2 text-sm text-papel-suave">El ½ kg no tiene precio mayorista.</p>
        </section>

        <Boton href={`https://wa.me/${contacto.whatsappE164}`} externo variante="primario">
          Pedir la lista por WhatsApp
        </Boton>
      </div>
    </div>
  )
}
