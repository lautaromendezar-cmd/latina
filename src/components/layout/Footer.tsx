import Link from 'next/link'
import Image from 'next/image'
import { Greca } from '@/components/ui/Greca'
import { nav, contacto, footer, marca } from '@/content/site'
import { etiqueta as etiquetaEnvase } from '@/data/producto'

/**
 * Footer — verde profundo, el cierre de la corrida de bloques.
 * Links en crema con hover amarillo (6.2:1 sobre verde profundo).
 */
export function Footer() {
  return (
    <footer data-bloque="verde" className="bg-verde-profundo text-crema">
      <Greca tono="amarillo" alto={14} opacidad={0.6} />

      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-16">
          <Link href="/" className="inline-block" aria-label={`${marca.nombreLargo}, ir al inicio`}>
            <Image
              src="/marca/logo.png"
              alt=""
              width={160}
              height={160}
              className="h-28 w-28 lg:h-40 lg:w-40"
            />
          </Link>

          <div className="grid gap-10 sm:grid-cols-2">
            <nav aria-label="Pie de página">
              <h2 className="etiqueta mb-4 block text-amarillo">Navegación</h2>
              <ul className="space-y-2.5">
                {nav.principal.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-semibold text-crema transition-colors hover:text-amarillo"
                    >
                      {item.texto}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={nav.externo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-crema transition-colors hover:text-amarillo"
                  >
                    {nav.externo.texto}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                </li>
              </ul>
            </nav>

            <div>
              <h2 className="etiqueta mb-4 block text-amarillo">{footer.escribinos}</h2>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={`https://wa.me/${contacto.whatsappE164}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-crema transition-colors hover:text-amarillo"
                  >
                    WhatsApp {contacto.whatsapp}
                  </a>
                </li>
                <li>
                  <a
                    href={contacto.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-crema transition-colors hover:text-amarillo"
                  >
                    @{contacto.instagram}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <p className="max-w-[16rem] font-semibold lg:text-right">{marca.slogan}</p>
        </div>

        <div className="mt-16 border-t-2 border-crema/15 pt-6">
          {/* Lo que dice el envase, textual: es la denominación legal. */}
          <p className="etiqueta mb-3 block text-crema">
            {etiquetaEnvase.denominacion} · {etiquetaEnvase.origen} · {etiquetaEnvase.gluten}
          </p>
          <p className="text-sm">
            <a
              href={footer.creditoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-amarillo"
            >
              {footer.credito}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
