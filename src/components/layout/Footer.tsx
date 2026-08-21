import Link from 'next/link'
import Image from 'next/image'
import { Greca } from '@/components/ui/Greca'
import { Etiqueta } from '@/components/ui/Etiqueta'
import { nav, contacto, footer, marca } from '@/content/site'
import { etiqueta as etiquetaEnvase } from '@/data/producto'

export function Footer() {
  return (
    <footer className="bg-yerba-media">
      <Greca tono="dorado" alto={14} opacidad={0.5} />

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
              <Etiqueta as="h2" className="mb-4 block">
                Navegación
              </Etiqueta>
              <ul className="space-y-2.5">
                {nav.principal.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-papel transition-colors hover:text-dorado">
                      {item.texto}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={nav.externo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-papel transition-colors hover:text-dorado"
                  >
                    {nav.externo.texto}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                </li>
              </ul>
            </nav>

            <div>
              <Etiqueta as="h2" className="mb-4 block">
                {footer.escribinos}
              </Etiqueta>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={`https://wa.me/${contacto.whatsappE164}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-papel transition-colors hover:text-dorado"
                  >
                    WhatsApp {contacto.whatsapp}
                  </a>
                </li>
                <li>
                  <a
                    href={contacto.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-papel transition-colors hover:text-dorado"
                  >
                    @{contacto.instagram}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <p className="max-w-[16rem] text-sm text-papel-suave lg:text-right">
            {marca.slogan}
          </p>
        </div>

        <div className="mt-16 border-t border-yerba-alta pt-6">
          {/* Lo que dice el envase, textual. No es copy: es la denominación legal. */}
          <Etiqueta as="p" className="mb-3 block">
            {etiquetaEnvase.denominacion} · {etiquetaEnvase.origen} · {etiquetaEnvase.gluten}
          </Etiqueta>
          <p className="text-sm text-papel-suave">
            <a
              href={footer.creditoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-dorado"
            >
              {footer.credito}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
