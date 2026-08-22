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
    // 72 es la de los fondos de Origen: son tres pantallas completas y van
    // atrás de un velo al 75%, así que el detalle fino no se ve. Next 16
    // exige declarar toda calidad que no sea la de fábrica (75).
    qualities: [72, 75],
  },

  async redirects() {
    return []
  },
}

export default nextConfig
