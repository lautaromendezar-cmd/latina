import type { Metadata } from 'next'
import { EncabezadoPagina } from '@/components/ui/EncabezadoPagina'
import { Buscador } from '@/components/donde-comprar/Buscador'
import { paginas } from '@/content/site'

export const metadata: Metadata = {
  title: paginas.dondeComprar.titulo,
  description: paginas.dondeComprar.bajada,
  alternates: { canonical: '/donde-comprar' },
}

/**
 * El slug se mantiene: hay SEO indexado en /donde-comprar/.
 *
 * No hace falta virtualizar: son 29 items, no los ~80 que anticipaba el
 * brief. Y no hay geolocalización porque no hay una sola coordenada en los
 * datos — el detalle está en el componente.
 */
export default function DondeComprarPage() {
  return (
    <>
      <EncabezadoPagina
        etiqueta="Puntos de venta"
        titulo="Dónde comprar"
        bajada={paginas.dondeComprar.bajada}
        imagen="/imagenes/paginas/donde-comprar.jpg"
        alt="Almacén de barrio con estantería de madera y bolsas a granel"
        posicion="50% 40%"
      />
      <Buscador />
    </>
  )
}
