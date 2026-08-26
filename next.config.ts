import type { NextConfig } from 'next'

/**
 * Los slugs de las PÁGINAS del sitio viejo se mantienen (/donde-comprar,
 * /vende-latina, /contacto): esas no necesitan 301. Los redirects de abajo
 * cubren lo que sí muere con el traspaso del dominio: las URLs del
 * WooCommerce viejo (tienda, carrito, productos y taxonomías), relevadas
 * de los cinco sitemaps de yerbamatelatina.com.ar el 26-08-2026. Van acá
 * y no en el hosting: así viajan con el repo y sobreviven a una migración
 * de plataforma.
 *
 * Todas apuntan a /donde-comprar porque es la página que hereda la
 * intención de compra. Cuando exista la tienda nueva (hoy
 * tienda.yerbamatelatina.com.ar NO resuelve), /tienda y /producto/*
 * deberían pasar a apuntarle.
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
    const aDondeComprar = (source: string) => ({
      source,
      destination: '/donde-comprar',
      permanent: true,
    })
    return [
      aDondeComprar('/tienda'),
      aDondeComprar('/carrito'),
      aDondeComprar('/finalizar-compra'),
      aDondeComprar('/mi-cuenta'),
      aDondeComprar('/producto/:path*'),
      aDondeComprar('/categoria-producto/:path*'),
      // OJO: /marca NO puede ser wildcard — public/marca/ (el logo) vive en
      // ese prefijo y los redirects corren ANTES que los archivos estáticos.
      // El brand-sitemap viejo sólo tiene esta URL, así que va exacta.
      aDondeComprar('/marca/latina'),
      // El category-sitemap viejo sólo tiene /category/sin-categoria/.
      aDondeComprar('/category/:path*'),
    ]
  },
}

export default nextConfig
