'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Núcleo de GSAP: sólo core + ScrollTrigger.
 *
 * ScrollTrigger está acá porque lo necesita SmoothScroll, que vive en el
 * layout y por lo tanto viaja en todas las rutas.
 *
 * SplitText, Observer y DrawSVG NO se registran acá a propósito. Desde
 * 3.13 vienen en el paquete público, así que la tentación es registrar los
 * cuatro de entrada — pero eso los mete en el chunk del layout aunque
 * ninguna sección los use. Medido: el chunk de GSAP pasa de 92K a 84K sin
 * comprimir con sólo sacarlos de acá. Es poco, pero es peso que en Fase 1
 * no hace absolutamente nada. Cada sección que necesite uno lo importa y
 * lo registra en su propio archivo, y así cae en el chunk de esa ruta:
 *
 *   import { SplitText } from 'gsap/SplitText'
 *   gsap.registerPlugin(SplitText)
 *
 * `registerPlugin` es idempotente, así que registrar de a poco no rompe
 * nada.
 */
let registrado = false

if (typeof window !== 'undefined' && !registrado) {
  gsap.registerPlugin(ScrollTrigger)

  // Los pines y los cutouts se miden contra el layout ya asentado: sin
  // esto, en mobile la barra del browser al aparecer y desaparecer
  // dispara un refresh y el pin salta.
  ScrollTrigger.config({ ignoreMobileResize: true })

  registrado = true
}

export { gsap, ScrollTrigger }
