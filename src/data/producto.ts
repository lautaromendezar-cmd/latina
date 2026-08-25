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
}

/**
 * SIN IMAGEN, y es una decision.
 *
 * Cada presentacion traia su `imagen`, y la del ½ kg apuntaba a
 * `pack-500g.png`, que era una COPIA EXACTA del archivo del 1 kg: el
 * sitio mostraba un envase con 1KG impreso abajo del rotulo "½ kg".
 * Se borro el archivo y se borraron los campos, porque mientras el
 * campo exista alguien lo va a volver a llenar con lo que haya a mano.
 *
 * El DATO es cierto y se queda: hay dos tamanos y solo el de 1 kg tiene
 * escala mayorista. Cuando llegue la foto real del ½ kg se vuelven a
 * agregar los campos de imagen aca.
 */
export const presentaciones: Presentacion[] = [
  {
    id: '1kg',
    nombre: 'Paquete de 1 kg',
    gramaje: '1 kg',
    descripcion: 'La de todos los días. Es la que se vende por escala.',
    mayorista: true,
  },
  {
    id: '500g',
    nombre: 'Paquete de ½ kg',
    gramaje: '½ kg',
    descripcion: 'La presentación chica, para probarla o para llevar.',
    mayorista: false,
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
