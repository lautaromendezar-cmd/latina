import type { NextConfig } from 'next'

/**
 * Los slugs del sitio viejo se mantienen (/donde-comprar, /vende-latina,
 * /contacto), así que hoy no hace falta ningún 301. Si en algún momento
 * cambia alguno, el redirect va acá y no en el hosting: así viaja con el
 * repo y sobrevive a una migración de plataforma.
 *
 * `/br` (portugués) queda preparado en la capa de contenido —toda la copy
 * vive en src/content/site.ts— pero NO se construye todavía.
 */
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  async redirects() {
    return []
  },
}

export default nextConfig
