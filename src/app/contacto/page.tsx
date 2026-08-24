import type { Metadata } from 'next'
import { EncabezadoPagina } from '@/components/ui/EncabezadoPagina'
import { Formulario, type Campo } from '@/components/ui/Formulario'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { Greca } from '@/components/ui/Greca'
import { Boton } from '@/components/ui/Boton'
import { paginas, contacto } from '@/content/site'

export const metadata: Metadata = {
  title: paginas.contacto.titulo,
  description: paginas.contacto.bajada,
  alternates: { canonical: '/contacto' },
}

const CAMPOS: Campo[] = [
  { nombre: 'nombre', etiqueta: 'Nombre', requerido: true, ancho: 'medio', error: 'Falta el nombre' },
  { nombre: 'email', etiqueta: 'Email', tipo: 'email', ancho: 'medio' },
  { nombre: 'mensaje', etiqueta: 'Mensaje', tipo: 'textarea', requerido: true, error: 'Escribinos qué necesitás' },
]

const ATAJOS = [
  {
    titulo: '¿Dónde la consigo?',
    cuerpo: 'Buscá tu localidad en el listado de puntos de venta.',
    cta: 'Ver dónde comprar',
    href: '/donde-comprar',
    externo: false,
  },
  {
    titulo: 'Quiero venderla',
    cuerpo: 'Escalas de compra, plazos y lista de precios para comercios.',
    cta: 'Vendé LaTiNa',
    href: '/vende-latina',
    externo: false,
  },
  {
    titulo: 'Comprar online',
    cuerpo: 'Te llega a cualquier punto del país.',
    cta: 'Ir a la tienda',
    href: contacto.tienda,
    externo: true,
  },
]

export default function ContactoPage() {
  return (
    <>
      <EncabezadoPagina
        etiqueta="Escribinos"
        titulo="Contacto"
        bajada={paginas.contacto.bajada}
        imagen="/imagenes/paginas/contacto.jpg"
        alt="Mate y termo al aire libre, en la costa"
        posicion="50% 45%"
      />

      {/* --- atajos: la mayoría de las consultas ya tienen página propia --- */}
      <section className="mx-auto max-w-[1400px] px-4 pt-seccion sm:px-6 lg:px-10">
        <Etiqueta as="h2" className="mb-8 block">
          Lo que más nos preguntan
        </Etiqueta>
        <ul className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          {ATAJOS.map((a) => (
            <li
              key={a.titulo}
              className="flex flex-col gap-3 rounded-[--radius-card] border-2 border-tinta/10 bg-blanco p-6 lg:p-8"
            >
              <h3 className="display text-display-3">{a.titulo}</h3>
              <p className="flex-1 text-tinta-suave">{a.cuerpo}</p>
              <div>
                <Boton href={a.href} externo={a.externo} variante="secundario">
                  {a.cta}
                </Boton>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* --- canales + formulario --- */}
      <section className="mx-auto max-w-[1400px] px-4 py-seccion sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <Etiqueta className="mb-4 block">Directo</Etiqueta>
            <h2 className="display mb-6 text-display-2">Lo más rápido es WhatsApp</h2>
            <p className="mb-8 max-w-[42ch] text-tinta-suave">
              Te contestamos en el día. Si preferís dejarlo escrito, el formulario de al lado
              llega al mismo lugar.
            </p>

            <Greca tono="amarillo" alto={10} opacidad={0.9} className="mb-8 max-w-[10rem]" />

            <dl>
              <div className="border-b-2 border-tinta/10 py-4">
                <dt className="etiqueta mb-1 text-verde-profundo">WhatsApp</dt>
                <dd>
                  <a
                    href={`https://wa.me/${contacto.whatsappE164}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-verde-profundo underline underline-offset-4"
                  >
                    {contacto.whatsapp}
                  </a>
                </dd>
              </div>
              <div className="border-b-2 border-tinta/10 py-4">
                <dt className="etiqueta mb-1 text-verde-profundo">Instagram</dt>
                <dd>
                  <a
                    href={contacto.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-tinta underline underline-offset-4 hover:text-verde"
                  >
                    @{contacto.instagram}
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="etiqueta mb-1 text-verde-profundo">Tienda online</dt>
                <dd>
                  <a
                    href={contacto.tienda}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-tinta underline underline-offset-4 hover:text-verde"
                  >
                    tienda.yerbamatelatina.com.ar
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <Etiqueta className="mb-4 block">O escribinos acá</Etiqueta>
            <Formulario
              campos={CAMPOS}
              asunto="Consulta desde el sitio"
              textoBoton="Enviar"
              nota="Se abre WhatsApp con el mensaje ya escrito. Podés revisarlo antes de mandarlo."
            />
          </div>
        </div>
      </section>
    </>
  )
}
