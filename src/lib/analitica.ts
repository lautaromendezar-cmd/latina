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

/* ---------- GA4 ----------
 *
 * Va por separado del pixel y no adentro de `contactoPorWhatsApp`: los
 * links los mide el listener de cada uno (MetaPixel y GoogleAnalytics), y
 * si esa función mandara a los dos, cada clic contaría doble en GA4. Así
 * apagar uno no le saca datos al otro.
 *
 * Los nombres son los que se marcan como evento clave en GA4: cambiarlos
 * corta la serie.
 */

type Gtag = (comando: 'js' | 'config' | 'event', ...args: unknown[]) => void

declare global {
  interface Window {
    gtag?: Gtag
  }
}

function seguirGA(evento: string, parametros?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', evento, parametros)
}

/** Salida a WhatsApp, para GA4. `origen` = data-origen del link o la ruta. */
export function clicWhatsAppGA(origen: string) {
  seguirGA('click_whatsapp', { origen })
}

/** Salida a la tienda online (Tienda Nube), para GA4. */
export function clicTiendaGA(origen: string) {
  seguirGA('click_tienda', { origen })
}
