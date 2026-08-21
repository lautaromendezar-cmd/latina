'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

/**
 * Carga orquestada, versión corta.
 *
 * El brief pedía 1.4s en tres tiempos, con el isotipo dibujado con
 * DrawSVG. Quedó en ~700ms y sin DrawSVG, por dos motivos distintos:
 *
 *  · No existe el isotipo en vector. No hay un solo .svg en todo el
 *    material del cliente; el logo es un PNG. Sin paths no hay DrawSVG.
 *  · El piso es Lighthouse 95 en mobile con video en el hero. Un velo
 *    opaco de 1.4s encima del LCP es exactamente lo que no se puede
 *    pagar. Y la regla del brief manda: si hay tensión entre el efecto y
 *    la conversión, gana la conversión. El tipo de Gualeguay que entra a
 *    buscar quién le vende no espera un segundo y medio.
 *
 * Lo que queda es el gesto que valía: un círculo que se ceba de abajo
 * hacia arriba, como el mate cargándose, y el handoff al hero.
 *
 * Detalles que importan:
 *  · Una sola vez por sesión (sessionStorage). Volver de /contacto no lo
 *    dispara de nuevo.
 *  · El velo NO bloquea el render del hero: el hero ya está pintado abajo.
 *    Si el JS muere, el velo nunca aparece y no pasa nada.
 *  · Con movimiento reducido no existe.
 */

const CLAVE = 'latina:carga'

export function Carga() {
  const [mostrar, setMostrar] = useState(false)
  const velo = useRef<HTMLDivElement>(null)
  const relleno = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (sessionStorage.getItem(CLAVE)) return

    sessionStorage.setItem(CLAVE, '1')
    setMostrar(true)
  }, [])

  useEffect(() => {
    if (!mostrar || !velo.current || !relleno.current) return

    const tl = gsap.timeline({
      onComplete: () => setMostrar(false),
    })

    tl.fromTo(
      relleno.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.42, ease: 'power2.out' },
    )
      .to(velo.current, { opacity: 0, duration: 0.28, ease: 'power1.inOut' }, '>-0.02')

    return () => {
      tl.kill()
    }
  }, [mostrar])

  if (!mostrar) return null

  return (
    <div
      ref={velo}
      aria-hidden="true"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-yerba-oscuro"
    >
      <div className="relative h-24 w-24 overflow-hidden rounded-full border border-yerba-seca/50">
        <div ref={relleno} className="absolute inset-0 bg-yerba-seca" />
      </div>
    </div>
  )
}
