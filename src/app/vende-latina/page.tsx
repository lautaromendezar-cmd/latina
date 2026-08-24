import type { Metadata } from 'next'
import Image from 'next/image'
import { EncabezadoPagina } from '@/components/ui/EncabezadoPagina'
import { Formulario, type Campo } from '@/components/ui/Formulario'
import { Boton } from '@/components/ui/Boton'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { Greca } from '@/components/ui/Greca'
import { paginas, contacto } from '@/content/site'
import { escalas, preciosPublicados, piePrecios, tiposDeNegocio, comoNosConociste } from '@/data/mayorista'
import { PROVINCIAS } from '@/data/provincias'

export const metadata: Metadata = {
  title: paginas.vendeLatina.titulo,
  description: paginas.vendeLatina.bajada,
  alternates: { canonical: '/vende-latina' },
}

const ARGUMENTOS = [
  {
    titulo: 'Se repone menos seguido',
    cuerpo:
      'Una yerba que rinde más se termina más tarde. El cliente vuelve igual, pero el kilo en góndola le dura, y eso es margen que no se va en reposición.',
  },
  {
    titulo: 'Un solo SKU, dos tamaños',
    cuerpo:
      'No hay diez variantes para ordenar ni surtido que armar. Entra el kilo, y el medio kilo para el que quiere probar.',
  },
  {
    titulo: 'Una marca que recién entra',
    cuerpo:
      'Estamos en 8 provincias. Si en tu zona todavía no hay nadie vendiéndola, sos el primero, no el quinto.',
  },
]

const CAMPOS: Campo[] = [
  { nombre: 'nombre', etiqueta: 'Nombre', requerido: true, ancho: 'medio', error: 'Falta el nombre' },
  { nombre: 'apellido', etiqueta: 'Apellido', requerido: true, ancho: 'medio', error: 'Falta el apellido' },
  { nombre: 'email', etiqueta: 'Email', tipo: 'email', ancho: 'medio' },
  { nombre: 'telefono', etiqueta: 'Teléfono', tipo: 'tel', requerido: true, ancho: 'medio', error: 'Falta el teléfono' },
  { nombre: 'provincia', etiqueta: 'Provincia', tipo: 'select', opciones: PROVINCIAS, requerido: true, ancho: 'medio', error: 'Elegí tu provincia' },
  { nombre: 'localidad', etiqueta: 'Localidad', requerido: true, ancho: 'medio', error: 'Falta la localidad' },
  { nombre: 'negocio', etiqueta: 'Tipo de negocio', tipo: 'select', opciones: tiposDeNegocio, requerido: true, ancho: 'medio', error: 'Contanos qué comercio tenés' },
  { nombre: 'conociste', etiqueta: 'Cómo nos conociste', tipo: 'select', opciones: comoNosConociste, ancho: 'medio' },
  { nombre: 'mensaje', etiqueta: 'Mensaje', tipo: 'textarea' },
]

export default function VendeLatinaPage() {
  return (
    <>
      <EncabezadoPagina
        etiqueta="Mayoristas"
        titulo="Vendé LaTiNa"
        bajada={paginas.vendeLatina.bajada}
        imagen="/imagenes/paginas/vende-latina.jpg"
        alt="Depósito con bolsas de yerba apiladas y big bags sobre pallets"
        posicion="50% 55%"
      />

      {/* --- por qué --- */}
      <section className="mx-auto max-w-[1400px] px-4 py-seccion sm:px-6 lg:px-10">
        <Etiqueta as="h2" className="mb-10 block">
          Por qué conviene
        </Etiqueta>
        <ul className="grid gap-10 lg:grid-cols-3 lg:gap-8">
          {ARGUMENTOS.map((a) => (
            <li key={a.titulo}>
              <Greca tono="amarillo" alto={10} opacidad={0.9} className="mb-5 max-w-[7rem]" />
              <h3 className="display mb-3 text-display-3">{a.titulo}</h3>
              <p className="text-tinta-suave">{a.cuerpo}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* --- la escalera, en bloque amarillo: es el argumento de plata --- */}
      <section className="bg-amarillo text-tinta">
        <Greca tono="verde" alto={12} opacidad={0.5} />
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-seccion sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <div>
            <p className="etiqueta mb-4 block">Escalas de compra</p>
            <h2 className="display mb-6 text-display-2">Cuanto más llevás, menos te sale el kilo</h2>
            <p className="mb-8 max-w-[46ch] text-body-lg font-semibold">
              La escalera es siempre sobre el paquete de 1 kg. El ½ kg no tiene precio
              mayorista.
            </p>
            {preciosPublicados ? (
              <p className="etiqueta">{piePrecios}</p>
            ) : (
              <p className="text-sm font-semibold">
                Los precios cambian seguido, así que no los publicamos: pedí la lista del día y
                te la pasamos al momento.
              </p>
            )}
          </div>

          <ol className="divide-y-2 divide-tinta/20">
            {escalas.map((escala) => (
              <li key={escala.id} className="flex items-baseline justify-between gap-4 py-5">
                <span className="display text-display-3">{escala.nombre}</span>
                <span className="text-right text-sm font-semibold">{escala.detalle}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --- el exhibidor --- */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-seccion sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <div className="relative aspect-[4/5] max-w-sm overflow-hidden">
            <Image
              src="/imagenes/pack-1kg.png"
              alt="Paquete de LaTiNa yerba mate de 1 kg"
              fill
              sizes="(max-width: 1024px) 80vw, 380px"
              className="object-contain"
            />
          </div>
          <div>
            <Etiqueta className="mb-4 block">El producto</Etiqueta>
            <h2 className="display mb-6 text-display-2">Padrón uruguayo, sin T.A.C.C.</h2>
            <p className="mb-8 max-w-[46ch] text-body-lg text-tinta-suave">
              Yerba mate elaborada despalada, libre de gluten, de industria brasilera. Molienda
              fina y mucho polvo: es la que le vas a vender al que toma muchos mates por día.
            </p>
            <Boton href="/#manifiesto" variante="secundario">
              Qué es el padrón despalado
            </Boton>
          </div>
        </div>
      </section>

      {/* --- formulario --- */}
      <section id="formulario" className="border-t-2 border-tinta/10">
        <div className="mx-auto max-w-[1400px] px-4 py-seccion sm:px-6 lg:px-10">
          <div className="mb-10 max-w-2xl">
            <Etiqueta className="mb-4 block">Pedí la lista</Etiqueta>
            <h2 className="display mb-5 text-display-2">Contanos qué comercio tenés</h2>
            <p className="text-body-lg text-tinta-suave">
              Te pasamos la lista al día, los plazos de entrega y cómo llega a tu zona.
            </p>
          </div>

          <div className="max-w-3xl">
            <Formulario
              campos={CAMPOS}
              asunto="Consulta mayorista desde el sitio"
              textoBoton="Pedir la lista"
              nota="Se abre WhatsApp con el mensaje ya escrito. Podés revisarlo antes de mandarlo."
            />
          </div>

          <p className="mt-10 text-sm text-tinta-suave">
            Si preferís escribir directo:{' '}
            <a
              href={`https://wa.me/${contacto.whatsappE164}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-verde-profundo underline underline-offset-4"
            >
              {contacto.whatsapp}
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
