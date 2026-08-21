'use client'

import { useEffect } from 'react'

/**
 * "Ya lo viste": marca el preloader para que no se repita en la sesión.
 *
 * Es lo único del preloader que necesita JavaScript, y está aislado acá a
 * propósito. La lógica corre en una sola dirección:
 *
 *   · Si el JS funciona y ya lo vio → le pone `data-visto="1"` al velo y
 *     el CSS lo saca de una, sin animar. Volver a la home no lo repite.
 *   · Si el JS NO funciona → el velo corre su animación normal y termina
 *     igual, porque los tiempos son de CSS.
 *
 * Nunca puede dejar el sitio tapado: el peor caso es que el preloader se
 * vea una vez de más.
 *
 * `useEffect` y no `useLayoutEffect` a propósito: si ya lo vio, que la
 * animación arranque y se corte en el primer frame es preferible a
 * bloquear el pintado para consultarlo.
 */
export function CargaVista() {
  useEffect(() => {
    const velo = document.querySelector<HTMLElement>('.preloader')
    if (!velo) return

    try {
      if (sessionStorage.getItem('latina:carga')) {
        velo.dataset.visto = '1'
      } else {
        sessionStorage.setItem('latina:carga', '1')
      }
    } catch {
      // Modo incógnito con storage bloqueado: se muestra siempre y listo.
    }
  }, [])

  return null
}
