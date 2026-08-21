import Image from 'next/image'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { manifiesto } from '@/content/site'

/**
 * Manifiesto.
 *
 * En Fase 3 las dos palabras del centro se rellenan con una macro real de
 * la molienda, scrubbeada con el scroll (background-clip: text + máscara
 * que sube). Acá quedan en contorno estático, que es también el estado de
 * `prefers-reduced-motion`.
 *
 * Por qué se rellenan ESAS dos y no otras: «Padrón» y «Despalada» son las
 * dos que están impresas en el envase. Si el texto que se llena de yerba
 * dijera cualquier otra cosa, el efecto sería decorativo — y el brief
 * prohíbe el contorno decorativo.
 */
export function Manifiesto() {
  return (
    <section className="relative overflow-hidden py-seccion">
      {/* El palo se va de cuadro justo donde el copy dice despalada.
          Es el único cutout de esta sección y no está de adorno: en Fase 3
          su deriva sale del encuadre, no vuelve. */}
      <Image
        aria-hidden="true"
        src="/imagenes/cutouts/palo.png"
        alt=""
        width={1200}
        height={600}
        sizes="40vw"
        className="cutout cutout--fondo -right-[12%] top-[12%] w-[52vw] max-w-[520px] rotate-[8deg]"
      />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <p className="display text-display-3 text-papel-suave">{manifiesto.antes}</p>

        <div className="my-6 lg:my-10">
          {manifiesto.palabras.map((palabra) => (
            <p key={palabra} className="display text-display-1">
              <span className="contorno">{palabra}</span>
            </p>
          ))}
        </div>

        <p className="display text-display-3">{manifiesto.despues}</p>

        <div className="mt-14 grid max-w-4xl gap-8 sm:grid-cols-2 lg:mt-20">
          {manifiesto.cuerpo.map((parrafo, i) => (
            <div key={parrafo}>
              <Etiqueta className="mb-3 block">
                {i === 0 ? 'El padrón' : 'La palabra'}
              </Etiqueta>
              <p className="text-body-lg text-papel-suave">{parrafo}</p>
            </div>
          ))}
        </div>

        <p className="display mt-14 text-display-2 text-dorado lg:mt-20">
          {manifiesto.cierre}
        </p>
      </div>
    </section>
  )
}
