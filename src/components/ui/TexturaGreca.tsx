/**
 * La greca del packaging usada como TEXTURA de fondo.
 *
 * El verde plano a sangre queda muerto, y la salida obvia —un degradé, un
 * glow, un patrón geométrico cualquiera— está prohibida por el brief o le
 * queda igual a cualquier marca. Esto no: la greca de rombos es el
 * ornamento propio de LaTiNa, está impresa dos veces en el envase (encima
 * y debajo del wordmark) y adentro del isotipo.
 *
 * La diferencia con el componente `Greca` es el uso, no el dibujo:
 *  · `Greca` es una BANDA: separa dos cosas, se ve, tiene sus dos reglas.
 *  · `TexturaGreca` es un ENREJADO que tilea en los dos ejes y vive al 4%
 *    de opacidad. No tiene que leerse como un motivo repetido; tiene que
 *    hacer que el fondo deje de ser un color plano y nada más.
 *
 * Por eso va sin las reglas horizontales: apiladas cada 90px serían rayas,
 * y ahí sí se convertiría en un empapelado.
 *
 * Medido: sobre el trazo de la greca al 4,5%, el fondo pasa de #06250f a
 * #0c2b13, y el texto pierde menos de un punto de contraste — papel va de
 * 14.54:1 a 13.57:1, papel-suave de 9.93 a 9.27, dorado de 9.99 a 9.33.
 * Todos siguen muy por encima del 4.5:1 de AA.
 */

type Tono = 'yerba-seca' | 'dorado' | 'verde' | 'papel'

const TONOS: Record<Tono, string> = {
  'yerba-seca': 'var(--color-yerba-seca)',
  dorado: 'var(--color-dorado)',
  verde: 'var(--color-verde)',
  papel: 'var(--color-papel)',
}

const RATIO = 20 / 14

type Props = {
  tono?: Tono
  /** Alto del rombo en px. Grande = textura; chico = empapelado. */
  escala?: number
  opacidad?: number
  className?: string
}

export function TexturaGreca({
  tono = 'yerba-seca',
  escala = 96,
  opacidad = 0.04,
  className = '',
}: Props) {
  const color = TONOS[tono]
  const id = `trama-${tono}-${escala}`

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ opacity: opacidad }}
    >
      <svg width="100%" height="100%" className="block">
        <defs>
          <pattern
            id={id}
            width={escala * RATIO}
            height={escala}
            patternUnits="userSpaceOnUse"
            viewBox="0 0 20 14"
          >
            {/* los dos zigzags cruzados: donde se cruzan queda el rombo.
                Tocan y=0 e y=14, así que apilados forman un enrejado
                continuo también en vertical. */}
            <path d="M0 14 L10 0 L20 14" fill="none" stroke={color} strokeWidth="0.5" />
            <path d="M0 0 L10 14 L20 0" fill="none" stroke={color} strokeWidth="0.5" />
            <circle cx="10" cy="7" r="0.9" fill={color} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  )
}
