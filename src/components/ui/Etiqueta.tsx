/**
 * Etiqueta: el registro de "ficha técnica" del sitio.
 *
 * Montserrat 700 traqueado a 0.14em, no una mono: MARCA.md prohíbe una
 * tercera familia.
 *
 * Reglas de color medidas del rediseño claro:
 *  · Sobre claro va en `verde-profundo` (9.2:1). El verde de marca da
 *    4.3:1, que a 12px no alcanza.
 *  · Sobre verde va en `crema` (4.7:1). El amarillo sobre verde da
 *    3.1:1: sólo sirve para display grande, nunca para una etiqueta.
 */

type Fondo = 'claro' | 'verde'

type Props = {
  children: React.ReactNode
  fondo?: Fondo
  /** Énfasis: la tinta plena sobre claro. Sobre verde no hay escalón. */
  acento?: boolean
  as?: 'span' | 'p' | 'h2' | 'div'
  className?: string
}

export function Etiqueta({
  children,
  fondo = 'claro',
  acento = false,
  as: Tag = 'span',
  className = '',
}: Props) {
  const color =
    fondo === 'verde' ? 'text-crema' : acento ? 'text-tinta' : 'text-verde-profundo'

  return <Tag className={`etiqueta ${color} ${className}`}>{children}</Tag>
}

/**
 * Fila de una ficha: campo a la izquierda, valor a la derecha, en
 * `dt`/`dd` dentro de un `div` (lo que HTML permite dentro de un `dl`).
 */
export function FilaFicha({
  campo,
  valor,
  fondo = 'claro',
}: {
  campo: string
  valor: string
  fondo?: Fondo
}) {
  const tinta = fondo === 'verde' ? 'text-crema' : 'text-tinta'
  const linea = fondo === 'verde' ? 'border-crema/25' : 'border-tinta/15'
  const etiquetaColor = fondo === 'verde' ? 'text-crema' : 'text-verde-profundo'

  return (
    <div className={`flex items-baseline gap-3 border-b py-2.5 ${linea}`}>
      <dt className={`etiqueta shrink-0 ${etiquetaColor}`}>{campo}</dt>
      <dd className={`ml-auto text-right text-sm ${tinta}`}>{valor}</dd>
    </div>
  )
}
