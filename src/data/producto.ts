/**
 * El producto. Dos presentaciones, nada más: no hay catálogo ni variantes.
 *
 * Los precios NO viven acá a propósito:
 *   · El precio público es de la tienda (Tienda Nube), que es la que cobra.
 *     Duplicarlo en el sitio garantiza que en algún momento digan distinto.
 *   · El precio mayorista cambia seguido — MARCA.md lo marca en negrita —
 *     así que vive en `mayorista.ts` con su propia nota de verificación.
 */

export type Presentacion = {
  id: string
  nombre: string
  gramaje: string
  descripcion: string
  /** El ½ kg no tiene precio mayorista. */
  mayorista: boolean
  imagen: string
  /**
   * Medidas reales del archivo. Van acá y no hardcodeadas en el componente
   * porque los dos paquetes tienen proporciones distintas: el 1 kg ya es la
   * foto recortada de verdad y el ½ kg todavía es un placeholder. Con un
   * solo par de medidas para los dos, el que no coincide se estira.
   */
  ancho: number
  alto: number
  alt: string
}

export const presentaciones: Presentacion[] = [
  {
    id: '1kg',
    nombre: 'Paquete de 1 kg',
    gramaje: '1 kg',
    descripcion: 'La de todos los días. Es la que se vende por escala.',
    mayorista: true,
    imagen: '/imagenes/pack-1kg.png',
    ancho: 960,
    alto: 1547,
    alt: 'Paquete de LaTiNa yerba mate de 1 kg',
  },
  {
    id: '500g',
    nombre: 'Paquete de ½ kg',
    gramaje: '½ kg',
    descripcion: 'La presentación chica, para probarla o para llevar.',
    mayorista: false,
    imagen: '/imagenes/pack-500g.png',
    ancho: 960,
    alto: 1547,
    alt: 'Paquete de LaTiNa yerba mate de medio kilo',
  },
]

/**
 * Lo que dice el envase, textual. Verificado contra la foto del paquete
 * real (versión argentina, no la portuguesa) en agosto de 2026.
 *
 * Si una pieza del sitio afirma algo del envase, tiene que salir de acá.
 */
export const etiqueta = {
  denominacion: 'Yerba mate elaborada despalada',
  especie: 'Ilex paraguariensis',
  origen: 'Industria brasilera',
  padron: 'Padrón uruguayo',
  gluten: 'Libre de gluten',
  sello: 'Sin gluten',
} as const
