import Image from 'next/image'
import { Greca } from '@/components/ui/Greca'
import { Etiqueta, FilaFicha } from '@/components/ui/Etiqueta'
import { firma } from '@/content/site'

/**
 * EL ELEMENTO FIRMA — dos mates, un solo scroll.
 *
 * Reemplaza al "contador de 1 a 40 mates" del brief por dos motivos que
 * conviene tener escritos donde se construye:
 *
 *  1. "Rinde más" lo dicen todas las yerbas de la góndola. Montar el
 *     momento de máxima audacia del sitio sobre el claim más disputado de
 *     la categoría es gastar el presupuesto de movimiento en el único
 *     terreno donde LaTiNa no gana. Lo que no puede copiar nadie de este
 *     lado del río es el padrón uruguayo.
 *  2. El número 40 no está en el envase, ni en el folleto aprobado, ni en
 *     MARCA.md. El brief prohíbe claims inventados; el contador arranca
 *     sin cifra final hasta que el cliente confirme una.
 *
 * Además fusiona el comparador de molienda (5.4) con la cebada (5.5): un
 * solo pin en vez de dos secciones, y el slider draggable —que es un
 * widget de antes/después que le queda igual a una crema facial— deja de
 * ser un widget y pasa a ser la demostración.
 *
 * En Fase 3 esta sección se pinea y el scroll ceba los dos mates a la vez.
 * Acá está el estado estático: los dos macros lado a lado, la ficha y el
 * cierre. Es también el estado de `prefers-reduced-motion`, y por eso
 * tiene que leerse solo, sin movimiento.
 */
export function Firma() {
  const { contador } = firma

  return (
    <section className="relative overflow-hidden py-seccion">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <header className="mb-12 max-w-3xl lg:mb-16">
          <Etiqueta className="mb-4 block">{firma.etiqueta}</Etiqueta>
          <h2 className="display mb-5 text-display-2">{firma.titulo}</h2>
          <p className="text-body-lg text-papel-suave">{firma.bajada}</p>
        </header>

        {/* Los dos lados. Mismo encuadre en las dos fotos o la comparación
            no prueba nada: está anotado en el manifest de assets. */}
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-8">
          {firma.lados.map((lado) => (
            <figure key={lado.id}>
              <div
                className={`relative aspect-square overflow-hidden border ${
                  lado.id === 'latina' ? 'border-dorado' : 'border-yerba-alta'
                }`}
              >
                <Image
                  src={lado.imagen}
                  alt={lado.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="pt-4">
                <Etiqueta acento={lado.id === 'latina'} className="mb-2 block">
                  {lado.etiqueta}
                </Etiqueta>
                <p className="text-papel-suave">{lado.descripcion}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* El contador. En Fase 3 lo scrubbea el scroll; acá muestra la
            unidad sin afirmar una cifra que todavía no tenemos. */}
        <div className="mt-16 text-center lg:mt-24">
          <p className="display text-dato text-dorado" aria-hidden="true">
            {contador.hasta ?? '—'}
          </p>
          <Etiqueta as="p" className="mt-2 block">
            {contador.unidad}
          </Etiqueta>
          {contador.hasta === null && (
            <p className="mt-4 text-sm text-papel-suave">
              {/* Visible a propósito mientras dure: si el dato no llega, la
                  sección se rediseña, no se completa con un número creíble. */}
              [VERIFICAR: cuántas cebadas sostiene el sabor]
            </p>
          )}
        </div>

        <div className="mx-auto mt-16 max-w-lg lg:mt-24">
          <Greca tono="dorado" alto={12} opacidad={0.6} className="mb-8" />
          <dl>
            {firma.ficha.map((fila) => (
              <FilaFicha key={fila.campo} campo={fila.campo} valor={fila.valor} />
            ))}
          </dl>
        </div>

        <p className="display mt-16 text-center text-display-2 lg:mt-24">
          {firma.cierre}
        </p>
      </div>
    </section>
  )
}
