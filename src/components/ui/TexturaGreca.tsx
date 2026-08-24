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
 * La opacidad por defecto (4%) está pensada para no comerle contraste al
 * texto que tenga encima: sobre los bloques verdes se usa verde-vivo a
 * ~16%, que sigue dejando a la crema por encima de AA.
 */

type Tono = 'amarillo' | 'crema' | 'verde' | 'verde-vivo' | 'tinta'

const TONOS: Record<Tono, string> = {
  amarillo: 'var(--color-amarillo)',
  crema: 'var(--color-crema)',
  verde: 'var(--color-verde)',
  'verde-vivo': 'var(--color-verde-vivo)',
  tinta: 'var(--color-tinta)',
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
  tono = 'verde',
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
