import type { Metadata, Viewport } from 'next'
import { Archivo, Montserrat } from 'next/font/google'
import './globals.css'

import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFlotante } from '@/components/layout/WhatsAppFlotante'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { CutoutsAmbiente } from '@/components/layout/CutoutsAmbiente'
import { meta, marca, nav } from '@/content/site'

/**
 * Display: Archivo variable. Un solo archivo cubre wght 100-900 y wdth
 * 62-125, así que el eje ancho del sistema (110 en desktop, 100 en
 * mobile, ver .display en globals.css) no cuesta una request extra.
 */
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--fuente-display',
})

/**
 * Cuerpo y etiquetas: Montserrat. Es la familia que ya usa la marca en
 * Instagram (MARCA.md), así que el sitio y las piezas comparten espina.
 *
 * Sin `weight`: así next/font trae la VARIABLE, un solo archivo con toda
 * la escala de pesos. Antes venían tres archivos (400/500/600) y encima el
 * cuerpo quedaba en 400, que sobre el verde oscuro se veía deshilachado.
 * Ahora el cuerpo va en 500 y los pesos intermedios no cuestan una
 * request más.
 */
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--fuente-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://yerbamatelatina.com.ar'),
  title: {
    default: meta.titulo,
    template: `%s · ${marca.nombreLargo}`,
  },
  description: meta.descripcion,
  openGraph: {
    title: meta.titulo,
    description: meta.descripcion,
    url: '/',
    siteName: marca.nombreLargo,
    locale: meta.locale,
    type: 'website',
  },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#06250f',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${archivo.variable} ${montserrat.variable}`}>
      <body>
        <a
          href="#contenido"
          className="sr-only rounded-full focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-dorado focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-yerba-oscuro"
        >
          {nav.saltarAlContenido}
        </a>

        <SmoothScroll />
        <CutoutsAmbiente />
        <Nav />

        <main id="contenido">{children}</main>

        <Footer />
        <WhatsAppFlotante />

        {/* Grano al final: va arriba de todo pero no participa del flujo. */}
        <div className="grano" aria-hidden="true" />
      </body>
    </html>
  )
}
