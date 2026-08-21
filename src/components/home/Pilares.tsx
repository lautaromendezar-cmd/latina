import { Etiqueta } from '@/components/ui/Etiqueta'
import { pilares } from '@/content/site'

/**
 * Los tres pilares.
 *
 * El brief los pedía como cards que se apilan con el scroll. Se cae el
 * apilado: es la animación de plantilla del período y se la haría igual a
 * cualquier marca. Queda la parte que sí valía —la pestaña superior, que
 * lee como una especificación pegada al paquete— y las tres se ven juntas,
 * que además es lo que conviene para comparar.
 *
 * Sombra dura, no difusa. Radio 0. Sin degradés.
 */
export function Pilares() {
  return (
    <section className="border-t border-yerba-alta py-seccion">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Etiqueta as="h2" className="mb-12 block lg:mb-16">
          {pilares.etiqueta}
        </Etiqueta>

        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {pilares.items.map((item) => (
            <li key={item.id} className="flex flex-col">
              {/* la pestaña */}
              <p className="etiqueta w-fit bg-dorado px-3 py-1.5 text-yerba-oscuro">
                {item.pestana}
              </p>
              <div className="flex-1 border border-yerba-alta bg-yerba-media p-6 shadow-[4px_4px_0_0_var(--color-yerba-alta)] lg:p-8">
                <h3 className="display mb-4 text-display-3">{item.titulo}</h3>
                <p className="text-papel-suave">{item.cuerpo}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
