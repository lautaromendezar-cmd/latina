'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { analitica } from '@/content/site'
import { contactoPorWhatsApp, verPagina } from '@/lib/analitica'

/**
 * Pixel de Meta.
 *
 * Igual que `contacto.tienda`: mientras `analitica.pixelMeta` sea null NO
 * se inyecta absolutamente nada —ni script, ni noscript, ni listener—, así
 * que el sitio no carga un pixel roto ni le pide un dominio de más a nadie
 * mientras el ID no exista. Cuando se ponga el ID en site.ts, empieza a
 * medir solo.
 *
 * `afterInteractive` y no `beforeInteractive`: el pixel no puede pelearle
 * la red al LCP del hero. Meta pierde unas décimas de nada y la home no
 * paga un script de terceros bloqueando el primer render.
 *
 * Dos cosas que el snippet oficial de Meta NO hace solo y sí necesitamos:
 *
 *  1. PageView en las navegaciones internas. Esto es un SPA: al pasar de
 *     la home a /donde-comprar no hay recarga, así que el snippet —que
 *     dispara una única vez al cargar— vería el sitio entero como una
 *     sola visita. El efecto de abajo cubre el resto.
 *
 *  2. Clics a WhatsApp. Los links `wa.me` están repartidos por medio
 *     sitio y casi todos viven en componentes de servidor (footer,
 *     contacto, vendé LaTiNa, buscador). En vez de convertirlos a
 *     cliente uno por uno para colgarles un onClick, escuchamos UN clic
 *     delegado en el documento: cualquier `<a href="...wa.me...">` que
 *     exista hoy o se agregue mañana queda medido sin tocar nada.
 *     El formulario avisa aparte, porque abre WhatsApp con window.open y
 *     no hay anchor que interceptar.
 */
export function MetaPixel() {
  const pixel = analitica.pixelMeta
  const ruta = usePathname()
  const primeraRuta = useRef(true)

  // El snippet ya cuenta la vista con la que entraron: si la disparáramos
  // otra vez acá, toda visita de entrada valdría doble.
  useEffect(() => {
    if (!pixel) return
    if (primeraRuta.current) {
      primeraRuta.current = false
      return
    }
    verPagina()
  }, [pixel, ruta])

  useEffect(() => {
    if (!pixel) return

    const alClic = (evento: MouseEvent) => {
      const destino = evento.target as Element | null
      const enlace = destino?.closest?.('a[href*="wa.me"]')
      if (!enlace) return
      // El data-origen lo pone quien quiera separar ese botón en el
      // Administrador de eventos; si no está, alcanza con la ruta.
      contactoPorWhatsApp(enlace.getAttribute('data-origen') ?? ruta)
    }

    // En captura: así lo contamos aunque algo más abajo frene el evento.
    document.addEventListener('click', alClic, true)
    return () => document.removeEventListener('click', alClic, true)
  }, [pixel, ruta])

  if (!pixel) return null

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixel}');
fbq('track', 'PageView');`}
      </Script>

      {/* Fallback sin JavaScript. Mide poco y nada, pero es lo que revisa
          el verificador de Meta cuando dice "el pixel no está instalado". */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${pixel}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}
