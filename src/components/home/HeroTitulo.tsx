'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useLayoutEffectSeguro, movimientoReducido } from '@/lib/motion'
import { hero } from '@/content/site'

/**
 * La entrada del hero, y la composicion del titulo.
 *
 * UNA sola linea de tiempo: las lineas suben desde atras de su mascara y
 * el resto —bajada, botones— las sigue, escalonado. Un solo efecto del
 * presupuesto: es la entrada del hero, no un fade-in por elemento (que el
 * brief prohibe explicitamente).
 *
 * REGLA, aprendida rompiendola: el contenido nunca se esconde con CSS
 * esperando que el JS lo revele. El HTML del servidor sale VISIBLE y GSAP
 * lo esconde y lo anima dentro de un useLayoutEffect, que corre antes del
 * primer pintado. Si el bundle no carga, si GSAP falla, si el efecto tira
 * error: el hero se ve igual.
 *
 * Sobre SplitText: no se usa a proposito. Las lineas ya estan escritas
 * como lineas en `site.ts`, asi que no hay nada que partir. Lo unico que
 * aportaria es el wrapper con overflow oculto, que son cinco lineas de
 * markup — y el hero es el LCP.
 *
 * Hubo una version con stickers metidos entre las palabras (un vapor, una
 * bombilla cruzada, un destello). Se fueron enteros: recortes fotograficos
 * y garabatos SVG mezclados con la tipografia quedaban sucios. Lo que
 * sobrevive de esa idea es el CALCO sobre la manuscrita —filete crema y
 * sombra dura—, que es como esta tratada la tipografia en las piezas de
 * la marca, y que ahi si funciona porque el filete esta sobre la letra y
 * no alrededor de un objeto.
 */
export function HeroTitulo() {
  const raiz = useRef<HTMLHeadingElement>(null)

  useLayoutEffectSeguro(() => {
    if (!raiz.current) return
    if (movimientoReducido()) return

    const seccion = raiz.current.closest('section')
    if (!seccion) return

    const ctx = gsap.context(() => {
      const lineas = gsap.utils.toArray<HTMLElement>('[data-linea]')
      const siguen = gsap.utils.toArray<HTMLElement>('[data-hero-entra]')

      // Ya no hay preloader: la entrada arranca casi de una.
      const tl = gsap.timeline({ delay: 0.1 })

      if (lineas.length) {
        // fromTo con valores explicitos: si GSAP tuviera que leer el estado
        // inicial del CSS, un transform en % se le vuelve px.
        // back.out en vez de expo: el rebote corto es el caracter del
        // rediseno — sticker, no telon.
        tl.fromTo(
          lineas,
          { yPercent: 108, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.09, ease: 'back.out(1.4)' },
        )
      }

      if (siguen.length) {
        tl.fromTo(
          siguen,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.09, ease: 'power3.out' },
          // se solapa con el final del titulo: encadenado, no en fila india
          '-=0.45',
        )
      }
    }, seccion)

    return () => ctx.revert()
  }, [])

  return (
    <h1 ref={raiz} className="display text-display-1">
      {hero.titulo.map((linea) => (
        /**
         * La mascara.
         *
         * `overflow-hidden` recorta en la caja de RELLENO, no en la de
         * contenido: por eso el relleno se agranda y despues se cancela
         * con un margen negativo del mismo tamano. La ventana de recorte
         * queda mas alta —entra el filete del calco y la cola de la "y"
         * de yerba— y el interlineado no se mueve ni un pixel.
         *
         * LA CUENTA, porque estos numeros no son a ojo. La caja de
         * linea de la manuscrita mide 0.78em de SU cuerpo, y su cuerpo
         * es 1.55x el del display. La cola de la "y" de Pacifico se va
         * ~0.35em por debajo de esa caja, mas los 5px que le agrega el
         * filete del calco: en total ~0.56em del cuerpo del display.
         * Con `pb-[0.42em]` que habia, la cola salia cortada. Va 0.72.
         *
         * El margen negativo compensa el relleno para no abrir un
         * hueco, pero NO lo compensa entero: si lo cancelara del todo,
         * la cola —que ahora se dibuja completa— se le montaria a la
         * bajada. Quedan ~6px de aire entre la punta de la cola y la
         * primera linea del parrafo.
         */
        <span
          key={linea.texto}
          className={
            linea.manuscrita
              ? // La manuscrita va inclinada, y la que gira es la MASCARA,
                // no el texto: girar el contenido adentro de una ventana
                // recta le come las puntas. `origin-left` para que la
                // inclinacion arranque en el margen y no descuadre la
                // columna.
                'block origin-left -rotate-[2.5deg] overflow-hidden pb-[0.72em] pt-[0.2em] -mb-[0.42em] -mt-[0.2em]'
              : 'block overflow-hidden pb-[0.12em] -mb-[0.06em]'
          }
        >
          <span data-linea className="block">
            <span
              className={[
                // La linea destacada va en amarillo, el gesto de las
                // piezas de IG. Amarillo sobre verde da 3.1:1: alcanza
                // porque esto es display grande, nunca repetir en texto
                // chico.
                linea.destacada ? 'text-amarillo' : '',
                // La manuscrita se sale de la condensada: otra familia,
                // otro cuerpo, sin caps, con el calco de la marca encima.
                linea.manuscrita ? 'manuscrita manuscrita-calco text-manuscrita' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {linea.texto}
            </span>
          </span>
        </span>
      ))}
    </h1>
  )
}
