/**
 * La greca de rombos del packaging.
 *
 * Es el ornamento oficial de la marca y el único permitido (MARCA.md), y
 * está adentro del propio isotipo: la banda que cruza el mate del logo es
 * esta misma greca. Reemplaza al sistema de hairlines + etiquetas mono que
 * proponía el brief, que era el andamiaje "ficha técnica premium" que le
 * queda igual a cualquier yerba, café o vino natural.
 *
 * El dibujo son dos zigzags cruzados entre dos reglas: donde se cruzan
 * queda el rombo y el negativo entre rombos queda en triángulo.
 *
 * Notas de implementación:
 *  · Es un `<pattern>` con su propio viewBox, así que TILEA a cualquier
 *    ancho en vez de estirarse (que es lo que pasa con
 *    preserveAspectRatio="none" sobre el svg entero).
 *  · Las reglas de arriba y abajo van dentro del tile: repetidas forman
 *    una línea continua y la greca queda sellada en un solo elemento.
 *  · Sin hooks y sin 'use client': el id se deriva del tono, y dos grecas
 *    del mismo tono comparten una definición idéntica. Es ornamento, no
 *    puede costar un kilobyte de JavaScript.
 */

type Tono = 'dorado' | 'papel' | 'yerba-seca' | 'verde'

const TONOS: Record<Tono, string> = {
  dorado: 'var(--color-dorado)',
  papel: 'var(--color-papel)',
  'yerba-seca': 'var(--color-yerba-seca)',
  verde: 'var(--color-verde)',
}

const RATIO = 20 / 14 // el tile del packaging es más ancho que alto

type Props = {
  tono?: Tono
  /** Alto de la banda en px. El patrón escala solo y sigue tileando. */
  alto?: number
  opacidad?: number
  className?: string
}

export function Greca({
  tono = 'yerba-seca',
  alto = 16,
  opacidad = 1,
  className = '',
}: Props) {
  const color = TONOS[tono]
  const id = `greca-${tono}-${alto}`

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="100%"
      height={alto}
      className={`block ${className}`}
      style={{ opacity: opacidad }}
    >
      <defs>
        <pattern
          id={id}
          width={alto * RATIO}
          height={alto}
          patternUnits="userSpaceOnUse"
          viewBox="0 0 20 14"
        >
          <path
            d="M0 14 L10 0 L20 14"
            fill="none"
            stroke={color}
            strokeWidth="0.9"
          />
          <path
            d="M0 0 L10 14 L20 0"
            fill="none"
            stroke={color}
            strokeWidth="0.9"
          />
          {/* el punto en el centro del rombo, como en el mate del logo */}
          <circle cx="10" cy="7" r="1.3" fill={color} />
          {/* reglas: repetidas por el tile, arman una línea continua */}
          <line x1="0" y1="0.45" x2="20" y2="0.45" stroke={color} strokeWidth="0.9" />
          <line x1="0" y1="13.55" x2="20" y2="13.55" stroke={color} strokeWidth="0.9" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

/**
 * El par de reglas doradas que encierran el wordmark en el logo.
 *
 * No es una hairline decorativa suelta —de esas no va ninguna—: es el
 * gesto que la marca ya usa para enmarcar una palabra, así que sólo
 * existe envolviendo contenido, nunca flotando solo.
 */
export function Reglas({
  children,
  tono = 'dorado',
  className = '',
}: {
  children: React.ReactNode
  tono?: Tono
  className?: string
}) {
  return (
    <div className={`border-y py-3 ${className}`} style={{ borderColor: TONOS[tono] }}>
      {children}
    </div>
  )
}
