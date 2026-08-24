import { Boton } from '@/components/ui/Boton'
import { Greca } from '@/components/ui/Greca'
import { cierreB2B } from '@/content/site'
import { escalas } from '@/data/mayorista'

/**
 * Cierre mayorista — bloque AMARILLO, el único de la home.
 *
 * Es la página que hace plata: el bloque más ruidoso del sitio va acá,
 * no en un adorno. Muestra la escalera de compra (unidad → funda →
 * volumen → palet), que es el argumento real para un comercio.
 *
 * Sin precios: la lista cambia seguido y se pide al día (mayorista.ts,
 * `preciosPublicados = false`). Cuando llegue la lista confirmada, los
 * importes aparecen solos.
 *
 * Tinta sobre amarillo: 8.6:1. El CTA va en verde (`oscuro`), porque un
 * botón amarillo sobre el bloque amarillo desaparece.
 */
export function CierreB2B() {
  return (
    <section className="bg-amarillo text-tinta">
      <Greca tono="verde" alto={14} opacidad={0.5} />

      <div className="mx-auto max-w-[1400px] px-4 py-seccion sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="etiqueta mb-4 text-tinta">{cierreB2B.etiqueta}</p>
            <h2 className="display mb-6 text-display-2">{cierreB2B.titulo}</h2>
            <p className="mb-9 max-w-[48ch] text-body-lg font-semibold">{cierreB2B.cuerpo}</p>
            <Boton href={cierreB2B.cta.href} variante="oscuro">
              {cierreB2B.cta.texto}
            </Boton>
          </div>

          <div>
            <p className="etiqueta mb-5 text-tinta">Escalas de compra · paquete de 1 kg</p>
            <ol className="divide-y-2 divide-tinta/20">
              {escalas.map((escala) => (
                <li
                  key={escala.id}
                  className="flex items-baseline justify-between gap-4 py-4"
                >
                  <span className="display text-lg">{escala.nombre}</span>
                  <span className="text-right text-sm font-semibold">{escala.detalle}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm font-semibold">El ½ kg no tiene precio mayorista.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
