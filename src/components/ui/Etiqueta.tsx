/**
 * Etiqueta: el registro de "ficha técnica" del sitio.
 *
 * Va en Montserrat 500 traqueado a 0.14em, no en una mono. Razones, en
 * orden: MARCA.md prohíbe una tercera familia; el panel legal del envase
 * real no está en mono; y una mono de las que se usan hoy en la web
 * (Geist, JetBrains) fecha el sitio en 2026 y lo hermana con cualquier
 * landing de producto SaaS.
 *
 * Regla de color medida: `yerba-seca` da 2.48:1 sobre papel, así que sobre
 * fondo claro la etiqueta pasa a `verde` (7.44:1). El componente lo
 * resuelve solo para que no haya que acordarse en cada uso.
 */

type Fondo = 'oscuro' | 'papel'

type Props = {
  children: React.ReactNode
  fondo?: Fondo
  /** Acento: el dorado sólo cuando la etiqueta señala algo accionable. */
  acento?: boolean
  as?: 'span' | 'p' | 'h2' | 'div'
  className?: string
}

export function Etiqueta({
  children,
  fondo = 'oscuro',
  acento = false,
  as: Tag = 'span',
  className = '',
}: Props) {
  const color = acento
    ? 'text-dorado'
    : fondo === 'oscuro'
      ? 'text-yerba-seca'
      : 'text-verde'

  return <Tag className={`etiqueta ${color} ${className}`}>{children}</Tag>
}

/**
 * Fila de una ficha: campo a la izquierda, valor a la derecha. Es la forma
 * que tiene una especificación impresa.
 *
 * Va en `dt`/`dd` envueltos en un `div` —que es lo que HTML permite dentro
 * de un `dl`— porque es literalmente una lista de definiciones: un lector
 * de pantalla tiene que poder anunciar "Palo: despalada", no dos textos
 * sueltos que casualmente están cerca.
 */
export function FilaFicha({
  campo,
  valor,
  fondo = 'oscuro',
}: {
  campo: string
  valor: string
  fondo?: Fondo
}) {
  const tinta = fondo === 'oscuro' ? 'text-papel' : 'text-yerba-oscuro'
  const linea = fondo === 'oscuro' ? 'border-yerba-alta' : 'border-verde/30'
  const etiquetaColor = fondo === 'oscuro' ? 'text-yerba-seca' : 'text-verde'

  return (
    <div className={`flex items-baseline gap-3 border-b py-2.5 ${linea}`}>
      <dt className={`etiqueta shrink-0 ${etiquetaColor}`}>{campo}</dt>
      <dd className={`ml-auto text-right text-sm ${tinta}`}>{valor}</dd>
    </div>
  )
}
