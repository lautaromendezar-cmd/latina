/**
 * El mate de la marca, simplificado para tamano chico.
 *
 * Es el isotipo de LaTiNa —porongo redondo, la greca cruzandolo y la
 * bombilla saliendo en diagonal— reducido a lo que sobrevive a 30px.
 * El emblema real (`pdf-latina/assets/emblema.webp`, o el que esta dentro
 * de `images/logo.PNG`) NO se puede usar aca: se probo, y a 34px la greca
 * se hace papilla y el oliva del porongo sobre el amarillo de la tira
 * casi no contrasta. Asi que la greca es una banda maciza y el porongo es
 * contorno, sin relleno.
 *
 * Es una simplificacion, no el logo: si alguna vez aparece el logo en
 * vector, el que manda es ese. Hoy no existe ninguno (ver
 * ASSETS-PENDIENTES).
 *
 * Sin `clipPath` a proposito. La banda esta recortada por geometria —el
 * ancho es la cuerda del circulo a esa altura, y el contorno se dibuja
 * ENCIMA para tapar los ~2 puntos que sobresalen en las esquinas de
 * arriba—. Un `clipPath` necesita un `id`, y esto se repite dieciocho
 * veces en la tira: serian dieciocho ids iguales en el documento.
 *
 * Toma el color de `currentColor`, asi sirve sobre amarillo y sobre
 * verde sin duplicar nada.
 */
export function MarcaMate({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* La greca. Va primero: el contorno del porongo la termina. */}
      <path d="M9.1 20.5h29.8" stroke="currentColor" strokeWidth="6.2" />
      {/* El porongo. */}
      <circle cx="24" cy="27.5" r="16.5" stroke="currentColor" strokeWidth="3.4" />
      {/* La bombilla, cruzando la greca y saliendo por arriba a la derecha. */}
      <path
        d="M17.5 34.5 39.5 12"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
