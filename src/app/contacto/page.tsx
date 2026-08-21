import type { Metadata } from 'next'
import { Boton } from '@/components/ui/Boton'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { paginas, contacto } from '@/content/site'

export const metadata: Metadata = {
  title: paginas.contacto.titulo,
  description: paginas.contacto.bajada,
  alternates: { canonical: '/contacto' },
}

/** FASE 1 — canales reales. El formulario entra en Fase 2. */
export default function ContactoPage() {
  return (
    <div className="pt-28 lg:pt-36">
      <div className="mx-auto max-w-[1400px] px-4 py-seccion sm:px-6 lg:px-10">
        <header className="mb-12 max-w-3xl">
          <h1 className="display mb-5 text-display-2">{paginas.contacto.titulo}</h1>
          <p className="text-body-lg text-papel-suave">{paginas.contacto.bajada}</p>
        </header>

        <dl className="max-w-md">
          <div className="border-b border-yerba-alta py-4">
            <dt className="etiqueta mb-1 text-yerba-seca">WhatsApp</dt>
            <dd>
              <a
                href={`https://wa.me/${contacto.whatsappE164}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dorado underline underline-offset-4"
              >
                {contacto.whatsapp}
              </a>
            </dd>
          </div>
          <div className="border-b border-yerba-alta py-4">
            <dt className="etiqueta mb-1 text-yerba-seca">Instagram</dt>
            <dd>
              <a
                href={contacto.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dorado underline underline-offset-4"
              >
                @{contacto.instagram}
              </a>
            </dd>
          </div>
        </dl>

        <div className="mt-10">
          <Etiqueta as="p" className="mb-3 block">
            Comprar online
          </Etiqueta>
          <Boton href={contacto.tienda} externo variante="secundario">
            Ir a la tienda
          </Boton>
        </div>
      </div>
    </div>
  )
}
