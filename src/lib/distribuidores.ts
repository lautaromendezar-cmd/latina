import { distribuidores, type Distribuidor } from '@/data/distribuidores'

/** Saca tildes y baja a minúscula, para que "parana" encuentre "Paraná". */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

/**
 * Provincias con al menos un punto de venta, ordenadas por cantidad.
 * Son 8 de 23, y esa es exactamente la razón por la que el buscador se
 * diseña desde el caso "no hay nadie cerca" y no desde el caso feliz.
 */
export function provincias(): Array<{ nombre: string; cantidad: number }> {
  const cuenta = new Map<string, number>()
  for (const d of distribuidores) {
    cuenta.set(d.provincia, (cuenta.get(d.provincia) ?? 0) + 1)
  }
  return [...cuenta.entries()]
    .map(([nombre, cantidad]) => ({ nombre, cantidad }))
    .sort((a, b) => b.cantidad - a.cantidad || a.nombre.localeCompare(b.nombre, 'es'))
}

/** Localidades únicas, para el autocomplete. */
export function localidades(): string[] {
  return [...new Set(distribuidores.map((d) => d.localidad))].sort((a, b) =>
    a.localeCompare(b, 'es'),
  )
}

/** Busca por localidad o provincia. Devuelve [] cuando no hay nadie: ese
 *  vacío es un estado diseñado, no un error. */
export function buscar(consulta: string, provincia?: string): Distribuidor[] {
  const q = normalizar(consulta)
  return distribuidores.filter((d) => {
    if (provincia && d.provincia !== provincia) return false
    if (!q) return true
    return (
      normalizar(d.localidad).includes(q) ||
      normalizar(d.provincia).includes(q) ||
      normalizar(d.nombre).includes(q)
    )
  })
}

export const total = distribuidores.length
export const totalProvincias = provincias().length

/** Argentina tiene 23 provincias más CABA. Sirve para escribir la cobertura
 *  sin inflarla: se dice en cuántas estamos, no "en todo el país". */
export const PROVINCIAS_ARGENTINA = 24
