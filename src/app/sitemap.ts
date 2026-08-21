import type { MetadataRoute } from 'next'

const BASE = 'https://yerbamatelatina.com.ar'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/donde-comprar`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/vende-latina`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/contacto`, changeFrequency: 'yearly', priority: 0.5 },
  ]
}
