/**
 * Capa fina sobre el pixel de Meta.
 *
 * Todo pasa por acá y no por `fbq()` suelto en cada componente por dos
 * razones: el pixel puede no estar (sin ID cargado no se inyecta nada, y
 * un bloqueador de publicidad lo tumba igual aunque esté), y así los
 * nombres de los eventos viven en un solo lugar en vez de repetirse como
 * strings sueltos por el árbol.
 *
 * Si mañana entra GA4 o un pixel de TikTok, se agregan acá adentro y
 * ningún componente se entera.
 */

type Fbq = (
  comando: 'init' | 'track' | 'trackCustom',
  evento: string,
  parametros?: Record<string, unknown>,
) => void

declare global {
  interface Window {
    fbq?: Fbq
  }
}

/** Nunca tira: si no hay pixel, la llamada se evapora en silencio. */
function seguir(evento: string, parametros?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq('track', evento, parametros)
}

/** Visita de página. La primera la dispara el snippet; ésta es para las
 *  navegaciones del lado del cliente, que Meta no ve solas. */
export function verPagina() {
  seguir('PageView')
}

/**
 * Alguien se va a WhatsApp. Es LA conversión del sitio: el cliente no
 * tiene mail público, así que todo el negocio entra por ahí, y `Contact`
 * es el evento estándar de Meta para eso (sirve para optimizar campañas,
 * un evento inventado no).
 *
 * `origen` viaja como parámetro para poder separar en el Administrador de
 * eventos el botón flotante del formulario de distribuidores, que valen
 * cosas muy distintas.
 */
export function contactoPorWhatsApp(origen: string) {
  seguir('Contact', { origen })
}
