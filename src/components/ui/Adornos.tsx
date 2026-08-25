/**
 * Adornos dibujados: la flecha y el sello.
 *
 * Son los dos gestos de la referencia que trajo Lautaro (el bloque "Find
 * our location"): un garabato que apunta al título y un sello de goma
 * redondo pisándolo. Van en SVG y no como imagen porque toman el color de
 * `currentColor`, pesan nada y quedan nítidos a cualquier tamaño.
 *
 * Los dos son decoración: salen `aria-hidden` y no dicen nada que no esté
 * escrito al lado.
 */

/**
 * Flecha a mano alzada, con un rulo.
 *
 * DIBUJADA A OJO, y conviene saberlo: no sale de ningún material de la
 * marca. Si el cliente manda sus propios garabatos —las piezas de
 * Instagram tienen varios—, este se reemplaza y no se pierde nada.
 */
export function Flecha({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 62"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* Sale de la izquierda, hace el rulo y se endereza hacia el título. */}
      <path d="M6 48C6 22 34 13 44 27c8 11-8 20-12 8-5-15 24-20 46-10 18 8 28 16 40 16" />
      {/* La punta. */}
      <path d="M111 33l11 8-11 8" />
    </svg>
  )
}

/**
 * Sello de goma: el mate de la marca con dos vueltas de texto alrededor.
 *
 * Lo que dice sale del ENVASE, no de una frase de marketing: «padrón
 * uruguayo» y «despalada» están impresas en el paquete (ver
 * `data/producto.ts`). Un sello que afirma algo que no está en ningún
 * lado es un adorno que miente.
 *
 * El `id` del anillo es fijo porque hay UN sello por página. Si algún día
 * hay dos, hay que pasarlo por prop: dos ids iguales y el segundo
 * `textPath` apunta al primero.
 */
export function Sello({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <path
          id="sello-anillo"
          d="M60 18a42 42 0 1 1 0 84 42 42 0 1 1 0-84"
        />
      </defs>

      <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="1.5" />

      <text
        fill="currentColor"
        fontSize="10.5"
        fontWeight="700"
        letterSpacing="1.6"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        <textPath href="#sello-anillo" startOffset="50%" textAnchor="middle">
          PADRÓN URUGUAYO · DESPALADA ·
        </textPath>
      </text>

      {/* El mate de la marca, el mismo de la tira. */}
      <g transform="translate(36 34) scale(1)">
        <path d="M9.1 20.5h29.8" stroke="currentColor" strokeWidth="6.2" />
        <circle cx="24" cy="27.5" r="16.5" stroke="currentColor" strokeWidth="3.4" />
        <path
          d="M17.5 34.5 39.5 12"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}
