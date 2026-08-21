/**
 * Manifest de assets.
 *
 * Es la fuente de verdad de dos cosas a la vez: los paths que usa el
 * código y la lista de lo que falta. `tools/placeholders.mjs` lee este
 * mismo archivo y escribe un placeholder del tamaño exacto en cada path
 * que todavía no tiene el asset real.
 *
 * Por eso los paths finales apuntan a `/imagenes/`, no a `/placeholders/`
 * como decía el brief: así reemplazar un asset es pisar un archivo y
 * listo, sin tocar una línea de código. Con dos carpetas distintas,
 * reemplazar obligaba a editar el path — que es justo lo que el brief
 * prohíbe dos renglones más abajo.
 *
 * Cuando llega un asset real: se pisa el archivo en /public/imagenes/ y
 * se pone `pendiente: false` acá (sólo para que el inventario de
 * ASSETS-PENDIENTES.md quede al día; el sitio no lo lee para renderizar).
 */

export type Asset = {
  path: string
  ancho: number
  alto: number
  /** Qué tiene que mostrar. Va al placeholder y al inventario. */
  descripcion: string
  pendiente: boolean
  /** Los cutouts salen en PNG con fondo transparente. */
  transparente?: boolean
}

export const assets = {
  /* --- cutouts: PNG con fondo transparente, 1200px lado largo --- */
  cutouts: [
    {
      path: '/imagenes/cutouts/pack-1kg.png',
      ancho: 960,
      alto: 1547,
      descripcion:
        'Paquete de 1 kg, foto REAL recortada con alfa. El pack-cutout.png del banco NO estaba recortado (traía la mesa y la pared): se rehizo el matting. Etiqueta verificada letra por letra.',
      pendiente: false,
      transparente: true,
    },
    {
      path: '/imagenes/cutouts/palo.png',
      ancho: 1200,
      alto: 600,
      descripcion:
        'Palo de yerba suelto. RESUELTO: generado y matteado (el keyer de luminancia le dejaba la sombra como halo). Es el cutout que se va de cuadro donde el copy dice despalada.',
      pendiente: false,
      transparente: true,
    },
    {
      path: '/imagenes/cutouts/hoja-entera.png',
      ancho: 1000,
      alto: 1200,
      descripcion:
        'Hoja de yerba entera, nervadura visible. RESUELTO: generada (Nano Banana Pro) y recortada con keyer de luminancia. No lleva producto ni etiqueta.',
      pendiente: false,
      transparente: true,
    },
    {
      path: '/imagenes/cutouts/hoja-partida.png',
      ancho: 1000,
      alto: 900,
      descripcion:
        'Hoja partida, borde irregular. RESUELTO: generada y recortada igual que la entera.',
      pendiente: false,
      transparente: true,
    },
    {
      path: '/imagenes/cutouts/polvo.png',
      ancho: 1200,
      alto: 800,
      descripcion:
        'Polvo de molienda. RESUELTO: generado + matting + defringe contra blanco (traía fleco claro en el borde).',
      pendiente: false,
      transparente: true,
    },
    {
      path: '/imagenes/cutouts/bombilla.png',
      ancho: 500,
      alto: 1200,
      descripcion:
        'Bombilla de alpaca. RESUELTO: generada + matting. El keyer de luminancia no servía: la plata es casi tan clara como el fondo.',
      pendiente: false,
      transparente: true,
    },
  ],

  /* --- hero --- */
  hero: [
    {
      path: '/imagenes/hero-poster.jpg',
      ancho: 1920,
      alto: 1080,
      descripcion:
        'Nube de yerba a contraluz sobre verde profundo, con el tercio izquierdo vacío para el display. RESUELTO: generada sin paquete a propósito (ver nota abajo). Es el LCP en mobile.',
      pendiente: false,
    },
  ],

  /* --- origen: la trayectoria, no el mapa --- */
  origen: [
    {
      path: '/imagenes/origen-brasil.jpg',
      ancho: 1536,
      alto: 1024,
      descripcion:
        'Yerbal en las montañas al atardecer. RESUELTO con brasil.jpg del banco.',
      pendiente: false,
    },
    {
      path: '/imagenes/origen-uruguay.jpg',
      ancho: 1080,
      alto: 720,
      descripcion:
        'Mate cebado, se ve la montañita y el polvo. RESUELTO con mate-close.jpg, recortado 3:2 para dejar afuera el logo quemado del pie.',
      pendiente: false,
    },
    {
      path: '/imagenes/origen-argentina.jpg',
      ancho: 1600,
      alto: 1067,
      descripcion:
        'Ronda de mate en la calle, con el paquete apoyado. RESUELTO con amigos.jpg del banco.',
      pendiente: false,
    },
  ],

  /* --- textura para el relleno tipografico del manifiesto --- */
  textura: [
    {
      path: '/imagenes/textura-molienda.jpg',
      ancho: 1600,
      alto: 800,
      descripcion:
        'Macro de la molienda real para el relleno tipografico del manifiesto. RESUELTO con yerba.jpg del banco: foto real del producto, no IA.',
      pendiente: false,
    },
  ],

  /* --- producto --- */
  producto: [
    {
      path: '/imagenes/pack-1kg.png',
      ancho: 960,
      alto: 1547,
      descripcion: 'Paquete de 1 kg, foto real recortada. RESUELTO (mismo archivo que el cutout).',
      pendiente: false,
      transparente: true,
    },
    {
      path: '/imagenes/pack-500g.png',
      ancho: 1200,
      alto: 1500,
      descripcion:
        'Paquete de ½ kg, foto real. NO EXISTE en el banco actual: todas las fotos del cliente son del 1 kg.',
      pendiente: true,
      transparente: true,
    },
  ],
} satisfies Record<string, Asset[]>

export const todosLosAssets: Asset[] = Object.values(assets).flat()

/**
 * ¿Existen los archivos del loop del hero?
 *
 * Esto dice si el asset ESTÁ, no si se va a reproducir. Quién lo reproduce
 * lo decide `HeroFondo` en el cliente, mirando prefers-reduced-motion y
 * navigator.connection: con datos ahorrados o en 3G se queda el poster.
 *
 * El poster es exactamente el primer frame del loop, extraído del video ya
 * cosido, así que el cambio de foto fija a video no se nota.
 */
export const heroVideoListo = true
