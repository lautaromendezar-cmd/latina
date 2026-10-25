'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { analitica, contacto } from '@/content/site'
import { clicTiendaGA, clicWhatsAppGA } from '@/lib/analitica'

/**
 * GA4.
 *
 * Mismo interruptor que el pixel: con `analitica.ga4` en null no se
 * inyecta nada.
 *
 * gtag.js pesa ~150 KB y, cargado en el `load`, frena el LCP del hero (en
 * otro sitio lo llevó de 1,7 a 4 s en Lighthouse móvil). Por eso el
 * script de Google recién se pide con la PRIMERA interacción, o 3,5 s
 * después del load si nadie toca nada. No se pierde nada en el medio:
 * `gtag()` y el `config` se definen ya, empujan al dataLayer, y todo lo
 * que haya en cola sale cuando el script llega. Los links que medimos
 * abren en pestaña nueva, así que un clic que justo dispara la carga no
 * se va con la página.
 *
 * Las navegaciones internas NO se disparan a mano: el flujo tiene activa
 * la medición mejorada de "cambios de página según el historial", y gtag
 * cuenta solo cada pushState. Si además se mandaran acá, valdrían doble.
 *
 * Los clics a WhatsApp y a la tienda se cazan con un listener delegado,
 * igual que en MetaPixel y por la misma razón (casi todos los links viven
 * en componentes de servidor). Es un listener propio y no el del pixel:
 * así cada herramienta mide aunque la otra esté apagada.
 */
export function GoogleAnalytics() {
  const id = analitica.ga4
  const ruta = usePathname()

  useEffect(() => {
    if (!id) return
    const hostTienda = contacto.tienda ? new URL(contacto.tienda).host : null

    const alClic = (evento: MouseEvent) => {
      const destino = evento.target as Element | null
      const enlace = destino?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!enlace) return
      const origen = enlace.getAttribute('data-origen') ?? ruta
      if (enlace.href.includes('wa.me')) clicWhatsAppGA(origen)
      else if (hostTienda && enlace.host === hostTienda) clicTiendaGA(origen)
    }

    document.addEventListener('click', alClic, true)
    return () => document.removeEventListener('click', alClic, true)
  }, [id, ruta])

  if (!id) return null

  return (
    <Script id="ga4" strategy="afterInteractive">
      {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('js',new Date());
gtag('config','${id}');
(function(){
  var cargado=false,eventos=['pointerdown','touchstart','keydown','scroll','wheel'];
  function cargar(){
    if(cargado)return;cargado=true;
    eventos.forEach(function(e){removeEventListener(e,cargar,true)});
    var s=document.createElement('script');s.async=true;
    s.src='https://www.googletagmanager.com/gtag/js?id=${id}';
    document.head.appendChild(s);
  }
  eventos.forEach(function(e){addEventListener(e,cargar,{once:true,passive:true,capture:true})});
  function plazo(){setTimeout(cargar,3500)}
  if(document.readyState==='complete')plazo();else addEventListener('load',plazo,{once:true});
})();`}
    </Script>
  )
}
