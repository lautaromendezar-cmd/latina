import Image from 'next/image'
import { Boton } from '@/components/ui/Boton'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { presentacionesCopy as copy, contacto } from '@/content/site'
import { presentaciones } from '@/data/producto'

/**
 * Las dos presentaciones: 1 kg y ½ kg.
 *
 * Franja, no catálogo. Sin selector de variante, sin carrusel y sin
 * precios: la venta online vive en Tienda Nube y el precio lo pone ella.
 * Duplicarlo acá garantiza que en algún momento digan cosas distintas.
 *
 * El 1 kg va más grande que el ½ kg a propósito: es el protagonista y el
 * único que tiene precio mayorista. Dos tamaños iguales dan a entender dos
 * productos.
 */
export function Presentaciones() {
  return (
    <section className="bg-papel py-seccion text-yerba-oscuro">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <header className="mb-12 max-w-2xl">
          <Etiqueta fondo="papel" className="mb-4 block">
            {copy.etiqueta}
          </Etiqueta>
          <h2 className="display mb-5 text-display-2">{copy.titulo}</h2>
          <p className="text-body-lg text-verde">{copy.bajada}</p>
        </header>

        <ul className="flex flex-wrap items-end gap-10 lg:gap-16">
          {presentaciones.map((p) => (
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
                className="h-auto w-full"
              />
              <p className="display mt-5 text-display-3">{p.gramaje}</p>
              <p className="mt-2 text-sm text-verde">{p.descripcion}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Boton href={contacto.tienda} externo variante="oscuro">
            {copy.ctaTienda}
          </Boton>
        </div>
      </div>
    </section>
  )
}
