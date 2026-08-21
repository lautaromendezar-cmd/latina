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
      ancho: 1080,
      alto: 1420,
      descripcion:
        'Paquete de 1 kg recortado. YA EXISTE: ../contenido-latina/assets/img/pack-cutout.png',
      pendiente: false,
      transparente: true,
    },
    {
      path: '/imagenes/cutouts/palo.png',
      ancho: 1200,
      alto: 600,
      descripcion:
        'Un palo de yerba suelto, nítido. Es el cutout que se va de cuadro donde el copy dice despalada: tiene que leerse como palo, no como ramita genérica.',
      pendiente: true,
      transparente: true,
    },
    {
      path: '/imagenes/cutouts/hoja-entera.png',
      ancho: 1000,
      alto: 1200,
      descripcion: 'Hoja de yerba entera, con nervadura visible.',
      pendiente: true,
      transparente: true,
    },
    {
      path: '/imagenes/cutouts/hoja-partida.png',
      ancho: 1000,
      alto: 900,
      descripcion: 'Hoja partida, borde irregular.',
      pendiente: true,
      transparente: true,
    },
    {
      path: '/imagenes/cutouts/polvo.png',
      ancho: 1200,
      alto: 800,
      descripcion:
        'Polvo de molienda suspendido. Es el que sostiene el argumento del padrón: tiene que verse fino, no arena gruesa.',
      pendiente: true,
      transparente: true,
    },
    {
      path: '/imagenes/cutouts/bombilla.png',
      ancho: 500,
      alto: 1200,
      descripcion: 'Bombilla de alpaca, sin mate.',
      pendiente: true,
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
        'Frame del loop del hero. Es el LCP en mobile y en conexiones lentas es lo único que se ve, así que tiene que funcionar como foto fija.',
      pendiente: true,
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

  /* --- la firma: las dos moliendas --- */
  firma: [
    {
      path: '/imagenes/molienda-comun.jpg',
      ancho: 2000,
      alto: 2000,
      descripcion:
        'Macro extremo de molienda argentina común, con palo visible. MISMO ENCUADRE, MISMA LUZ Y MISMA DISTANCIA que la siguiente: si no coinciden, la comparación no prueba nada.',
      pendiente: true,
    },
    {
      path: '/imagenes/molienda-padron.jpg',
      ancho: 2000,
      alto: 2000,
      descripcion:
        'Macro extremo del padrón despalado de LaTiNa. MISMO ENCUADRE que la anterior.',
      pendiente: true,
    },
    {
      path: '/imagenes/textura-molienda.jpg',
      ancho: 1600,
      alto: 800,
      descripcion:
        'Macro de la molienda real para el relleno tipográfico. RESUELTO con yerba.jpg del banco (foto real del producto, no IA).',
      pendiente: false,
    },
  ],

  /* --- producto --- */
  producto: [
    {
      path: '/imagenes/pack-1kg.png',
      ancho: 1080,
      alto: 1420,
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
 * El loop del hero todavía no existe.
 *
 * Mientras esto sea `false`, el hero muestra el poster como foto fija —que
 * es exactamente lo que va a ver igual quien entre con conexión lenta, así
 * que no es un estado degradado, es un estado que hay que diseñar—. Cuando
 * lleguen `hero-loop.webm` y `hero-loop.mp4`, se pone en `true` y no se
 * toca nada más.
 */
export const heroVideoListo = false
