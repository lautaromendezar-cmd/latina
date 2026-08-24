import Image from 'next/image'
import { Boton } from '@/components/ui/Boton'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { TexturaGreca } from '@/components/ui/TexturaGreca'
import { presentacionesCopy as copy, contacto } from '@/content/site'
import { presentaciones } from '@/data/producto'

/**
 * Las dos presentaciones: 1 kg y ½ kg.
 *
 * Franja, no catálogo: sin selector de variante, sin carrusel y sin
 * precios (la venta online vive en Tienda Nube y el precio lo pone ella).
 *
 * Bloque verde: el paquete blanco sobre el verde de marca es la imagen
 * de las piezas de IG. El 1 kg va más grande a propósito — es el
 * protagonista y el único con precio mayorista.
 */
export function Presentaciones() {
  return (
    <section data-bloque="verde" className="relative overflow-hidden bg-verde py-seccion text-crema">
      <TexturaGreca tono="verde-vivo" escala={120} opacidad={0.16} />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <header className="mb-12 max-w-2xl">
          <Etiqueta fondo="verde" className="mb-4 block">
            {copy.etiqueta}
          </Etiqueta>
          <h2 className="display mb-5 text-display-2">{copy.titulo}</h2>
          <p className="text-body-lg font-semibold">{copy.bajada}</p>
        </header>

        <ul className="flex flex-wrap items-end gap-10 lg:gap-16">
          {presentaciones.map((p, i) => (
            <li
              key={p.id}
              className={p.id === '1kg' ? 'w-[46%] max-w-[340px]' : 'w-[34%] max-w-[240px]'}
            >
              <Image
                src={p.imagen}
                alt={p.alt}
                width={p.ancho}
                height={p.alto}
                sizes="(max-width: 640px) 46vw, 340px"
                className={`h-auto w-full drop-shadow-[8px_8px_0_rgba(11,58,28,0.3)] ${
                  i === 0 ? 'rotate-[-2deg]' : 'rotate-[3deg]'
                }`}
              />
              <p className="display mt-6 text-display-3">{p.gramaje}</p>
              <p className="mt-2 text-sm font-semibold">{p.descripcion}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Boton href={contacto.tienda} externo variante="primario">
            {copy.ctaTienda}
          </Boton>
        </div>
      </div>
    </section>
  )
}
