import type { Metadata, Viewport } from 'next'
import { Archivo, Montserrat, Pacifico } from 'next/font/google'
import './globals.css'

import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFlotante } from '@/components/layout/WhatsAppFlotante'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { CutoutsAmbiente } from '@/components/layout/CutoutsAmbiente'
import { MetaPixel } from '@/components/layout/MetaPixel'
import { meta, marca, nav } from '@/content/site'

/**
 * Display: Archivo variable. Un solo archivo cubre wght 100-900 y wdth
 * 62-125. El rediseño usa el extremo CONDENSADO del eje (wdth 78, ver
 * .display en globals.css): el registro de las piezas de Instagram sin
 * costear una request extra.
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

/**
 * La tercera familia, y es una excepcion con nombre y apellido: UNA
 * palabra del hero. Nada mas.
 *
 * Sale de una pieza del propio cliente —el "Mate y skate" que esta en
 * pdf-latina/latina-material— que es una brush pesada, monolineal y de
 * altura de x grande, contorneada en crema. Esa pieza no trae la fuente:
 * es un PNG, asi que esto es la CANDIDATA MAS CERCANA de Google Fonts,
 * no la original. Las otras ocho estan servidas en tools/fuentes.html.
 *
 * Pacifico y no Caveat (lo que habia): Caveat es escritura con marcador,
 * fina y de cuaderno. La pieza del cliente es brush de cartel, gorda y
 * casi vertical. Son dos registros distintos y el suyo ya esta elegido.
 *
 * OJO: Pacifico tiene un solo peso (400). Si se cambia por una familia
 * con bold de verdad, hay que subir --peso-manuscrita en globals.css: si
 * se pide 700 a una fuente que no lo tiene, el navegador lo falsea
 * engordando el trazo y la manuscrita se empasta.
 */
const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--fuente-manuscrita',
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
  // La imagen NO se declara aca: sale de `opengraph-image.tsx` por
  // convencion de archivo, y Next la mete en og:image y twitter:image
  // con la URL absoluta de metadataBase.
  twitter: {
    card: 'summary_large_image',
    title: meta.titulo,
    description: meta.descripcion,
  },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#17813a',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-AR"
      className={`${archivo.variable} ${montserrat.variable} ${pacifico.variable}`}
    >
      <body>
        <a
          href="#contenido"
          className="sr-only rounded-full focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-amarillo focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-tinta"
        >
          {nav.saltarAlContenido}
        </a>

        <SmoothScroll />
        <CutoutsAmbiente />
        <Nav />

        <main id="contenido">{children}</main>

        <Footer />
        <WhatsAppFlotante />
        <MetaPixel />
      </body>
    </html>
  )
}
