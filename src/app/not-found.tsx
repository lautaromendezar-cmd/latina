import type { Metadata } from 'next'
import { Boton } from '@/components/ui/Boton'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { Greca } from '@/components/ui/Greca'

export const metadata: Metadata = {
  title: 'Página no encontrada',
}

/**
 * La 404 tiene tráfico real: el dominio viene de un WordPress con años de
 * links repartidos, y todo lo que no cubran los redirects de
 * next.config.ts cae acá. Por eso no es un callejón: ofrece las dos
 * salidas que ya usa el resto del sitio (inicio y dónde comprar).
 *
 * El min-h deja el bloque ocupando la pantalla aun con poco contenido,
 * para que el footer no quede flotando a media altura.
 */
export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-[1400px] flex-col justify-center px-4 py-seccion sm:px-6 lg:px-10">
      <Etiqueta as="p" className="mb-4 block">
        Error 404
      </Etiqueta>
      <h1 className="display mb-6 max-w-[16ch] text-display-1">
        Esta página no existe.
      </h1>
      <p className="mb-8 max-w-[46ch] text-tinta-suave">
        Puede que el link esté viejo o que la página se haya mudado cuando
        renovamos el sitio. Lo que buscás seguro sale de acá:
      </p>

      <Greca tono="amarillo" alto={10} opacidad={0.9} className="mb-10 max-w-xs" />

      <div className="flex flex-wrap gap-4">
        <Boton href="/" variante="primario">
          Ir al inicio
        </Boton>
        <Boton href="/donde-comprar" variante="secundario">
          Ver dónde comprar
        </Boton>
      </div>
    </section>
  )
}
