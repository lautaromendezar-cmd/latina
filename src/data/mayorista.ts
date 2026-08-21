/**
 * Escalas de compra mayorista del paquete de 1 kg.
 *
 * ⚠ MARCA.md, en negrita: «Los precios cambian seguido. Antes de publicar
 * cualquier pieza con números, pedirle la lista al día.» Los valores que
 * circulan son de una pieza de Canva de julio de 2026, así que el sitio
 * arranca SIN precios publicados: muestra la escala (que es el argumento)
 * y manda a pedir la lista.
 *
 * Cuando llegue la lista al día: completar `precioKg` y poner
 * `preciosPublicados = true`. No hay que tocar ningún componente.
 */

export const preciosPublicados = false

export type Escala = {
  id: string
  nombre: string
  detalle: string
  /** Pesos por kilo. null mientras no haya lista confirmada. */
  precioKg: number | null
}

export const escalas: Escala[] = [
  {
    id: 'unidad',
    nombre: 'Unidad',
    detalle: 'Paquete de 1 kg suelto',
    // [VERIFICAR: lista mayorista al día — la de jul-2026 decía $5.600]
    precioKg: null,
  },
  {
    id: 'funda',
    nombre: 'Funda',
    detalle: '12 paquetes de 1 kg',
    // [VERIFICAR: lista mayorista al día — la de jul-2026 decía $67.200 la funda]
    precioKg: null,
  },
  {
    id: '200kg',
    nombre: 'Desde 200 kg',
    detalle: 'Compra por volumen',
    // [VERIFICAR: lista mayorista al día — la de jul-2026 decía $5.300]
    precioKg: null,
  },
  {
    id: 'palet',
    nombre: 'Palet',
    detalle: '64 fundas · 768 kg',
    // [VERIFICAR: lista mayorista al día — la de jul-2026 decía $4.900]
    precioKg: null,
  },
]

/** Pie obligatorio cuando se publiquen precios. Sin fecha, es a propósito. */
export const piePrecios =
  'Precios por unidad de 1 kg · sujetos a modificación sin previo aviso'

export const tiposDeNegocio = [
  'Almacén / autoservicio',
  'Kiosco',
  'Dietética',
  'Supermercado',
  'Distribuidora',
  'Venta online',
  'Otro',
] as const

export const comoNosConociste = [
  'Instagram',
  'Un conocido',
  'Lo vi en un comercio',
  'Buscando en Google',
  'Otro',
] as const
