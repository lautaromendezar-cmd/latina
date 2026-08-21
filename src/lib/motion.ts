'use client'

import { useEffect, useLayoutEffect, useState } from 'react'

/**
 * useLayoutEffect en el cliente, useEffect en el servidor.
 *
 * Es la pieza que permite no esconder nada con CSS: el estado inicial de
 * un reveal lo pone GSAP acá, ANTES del primer pintado, así que no hay
 * parpadeo. Y si el JavaScript no corre, no hay ninguna regla de CSS
 * escondiendo el texto: se ve, que es lo que tiene que pasar.
 *
 * (La versión anterior escondía con `.js [data-linea]` y confiaba en que
 * el JS lo revelara. Cuando el reveal no corría, el título del hero
 * quedaba invisible. Un reveal no puede ser la única forma de ver el
 * contenido.)
 */
export const useLayoutEffectSeguro =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Movimiento reducido.
 *
 * El brief pide que cada sección tenga su estado estático DISEÑADO, no un
 * `if` global que apaga todo y deja huecos. Este hook es el que le permite
 * a cada sección decidir qué muestra en vez de la animación, y escucha el
 * cambio en vivo: alguien puede activar la preferencia con el sitio
 * abierto y no tiene que recargar para que le haga caso.
 *
 * Devuelve `false` en el primer render del cliente para que el HTML del
 * servidor y el del cliente coincidan; el efecto corrige al instante.
 */
export function useMovimientoReducido(): boolean {
  const [reducido, setReducido] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducido(mq.matches)

    const alCambiar = (e: MediaQueryListEvent) => setReducido(e.matches)
    mq.addEventListener('change', alCambiar)
    return () => mq.removeEventListener('change', alCambiar)
  }, [])

  return reducido
}

/** Lectura sincrónica, para cuando hay que decidir antes de montar un tween. */
export function movimientoReducido(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
