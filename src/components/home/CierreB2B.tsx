import { Boton } from '@/components/ui/Boton'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { Greca } from '@/components/ui/Greca'
import { cierreB2B } from '@/content/site'
import { escalas } from '@/data/mayorista'

/**
 * Cierre mayorista.
 *
 * Es la página que hace plata, así que el cierre de la home no es un
 * botón suelto: muestra la escalera de compra (unidad → funda → volumen →
 * palet), que es el argumento real para un comercio.
 *
 * Sin precios. MARCA.md avisa en negrita que la lista cambia seguido y
 * que hay que pedirla al día antes de publicar números; los que circulan
 * son de julio. Cuando llegue la lista confirmada se completa
 * `mayorista.ts` y los importes aparecen solos.
 *
 * Bloque de alto contraste: es la única sección en papel de la home, y por
 * eso el dorado NO se usa acá (1.45:1 sobre papel). El CTA va en oscuro.
 */
export function CierreB2B() {
  return (
    <section className="bg-papel text-yerba-oscuro">
      <Greca tono="verde" alto={14} opacidad={0.35} />

      <div className="mx-auto max-w-[1400px] px-4 py-seccion sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Etiqueta fondo="papel" className="mb-4 block">
              {cierreB2B.etiqueta}
            </Etiqueta>
            <h2 className="display mb-6 text-display-2">{cierreB2B.titulo}</h2>
            <p className="mb-9 max-w-[48ch] text-body-lg">{cierreB2B.cuerpo}</p>
            <Boton href={cierreB2B.cta.href} variante="oscuro">
              {cierreB2B.cta.texto}
            </Boton>
          </div>

          <div>
            <Etiqueta fondo="papel" className="mb-5 block">
              Escalas de compra · paquete de 1 kg
            </Etiqueta>
            <ol className="border-t border-verde/25">
              {escalas.map((escala) => (
                <li
                  key={escala.id}
                  className="flex items-baseline justify-between gap-4 border-b border-verde/25 py-4"
                >
                  <span className="font-semibold">{escala.nombre}</span>
                  <span className="text-right text-sm text-verde">{escala.detalle}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-verde">
              El ½ kg no tiene precio mayorista.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
