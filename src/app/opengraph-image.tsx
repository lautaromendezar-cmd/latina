import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { hero, contacto } from '@/content/site'

/**
 * La imagen OG, con `next/og` como pide el brief (Fase 4).
 *
 * Es la composicion del hero, no un arte nuevo: el titulo en tres lineas
 * con el remate manuscrito y el paquete al lado. Lo que ya funciona para
 * abrir el sitio funciona para la tarjeta de WhatsApp — que es donde este
 * sitio se va a compartir de verdad.
 *
 * SIN la foto del tucan, y es una decision. A 1200x630 comprimido por
 * WhatsApp el fondo fotografico se hace ruido y obliga al velo negro y a
 * su cuenta de contraste. El bloque verde plano es el gesto del rediseno
 * (la pagina es bloques de color del packaging) y deja el titulo y el
 * paquete como unicas figuras.
 *
 * LAS FUENTES SON ARCHIVOS ESTATICOS en `_og/`, no las de next/font, y no
 * puede ser de otra forma: Satori no soporta fuentes variables — usa la
 * instancia por defecto (wdth 100, wght 400) e ignora los ejes. El TTF de
 * `_og/` es la variable de Google Fonts INSTANCIADA con fontTools en
 * wdth 78 / wght 850, exactamente el corte que `.display` pide en
 * globals.css. Si el display cambia de corte, hay que reinstanciar:
 *
 *   python -m fontTools.varLib.instancer "Archivo[wdth,wght].ttf" \
 *     wdth=78 wght=850 -o Archivo-Condensada-850.ttf
 *
 * EL CALCO del remate se falsea con ocho sombras crema en anillo: Satori
 * tampoco soporta text-stroke. A este cuerpo el filete de 3px se ve igual
 * que el de verdad; la novena sombra es la dura del sistema.
 *
 * El paquete va como data URI leido del propio repo (la foto real
 * recortada, la unica con la etiqueta sana — regla de ASSETS-PENDIENTES).
 * Se paga una vez en build: la ruta es estatica y lo que se sirve es el
 * PNG ya renderizado.
 */

export const alt =
  'LaTiNa Yerba Mate — El mate cambia cuando cambiás la yerba'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/* Tokens de globals.css. Copiados porque aca no hay CSS: si cambian alla,
   cambiarlos aca. */
const VERDE = '#17813a'
const CREMA = '#fcfbf7'
const AMARILLO = '#ffc81a'
const TINTA = '#0b3a1c'

/** Filete crema en anillo + la sombra dura del sistema. */
const CALCO = [
  `-3px 0 0 ${CREMA}`,
  `3px 0 0 ${CREMA}`,
  `0 -3px 0 ${CREMA}`,
  `0 3px 0 ${CREMA}`,
  `-2px -2px 0 ${CREMA}`,
  `2px -2px 0 ${CREMA}`,
  `-2px 2px 0 ${CREMA}`,
  `2px 2px 0 ${CREMA}`,
  `9px 10px 0 rgba(11, 58, 28, 0.55)`,
].join(', ')

export default async function OgImage() {
  const raiz = process.cwd()
  const [archivo, pacifico, pack] = await Promise.all([
    readFile(join(raiz, 'src/app/_og/Archivo-Condensada-850.ttf')),
    readFile(join(raiz, 'src/app/_og/Pacifico-Regular.ttf')),
    readFile(join(raiz, 'public/imagenes/cutouts/pack-1kg.png')),
  ])

  // Las mismas tres lineas del hero, de la misma fuente de contenido.
  const [linea1, linea2, remate] = hero.titulo.map((l) => l.texto)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: VERDE,
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            padding: '0 72px',
            gap: 48,
          }}
        >
          {/* El titulo, tres lineas como el hero. */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {/* 86 y no mas: a 96 "cuando cambiás" no entra en la columna
                y Satori lo parte en dos renglones — cinco lineas en vez
                de las tres del hero. El nowrap es el cinturon: si una
                linea no entra, que se note en el render y no partiendose
                en silencio. */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'Archivo',
                fontSize: 86,
                lineHeight: 0.94,
                letterSpacing: '-0.01em',
                color: CREMA,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              <span>{linea1}</span>
              <span>{linea2}</span>
            </div>
            <span
              style={{
                fontFamily: 'Pacifico',
                fontSize: 132,
                lineHeight: 1.15,
                color: AMARILLO,
                textShadow: CALCO,
                transform: 'rotate(-2.5deg)',
                transformOrigin: 'left center',
                marginTop: 4,
              }}
            >
              {remate}
            </span>
            {/* En crema y no en amarillo: amarillo sobre verde da 3.1:1 y
                la regla del sistema lo permite solo en display grande.
                El amarillo de esta pieza ya lo ponen el remate y la
                banda. */}
            <span
              style={{
                marginTop: 40,
                fontFamily: 'Archivo',
                fontSize: 27,
                letterSpacing: '0.08em',
                color: CREMA,
                textTransform: 'uppercase',
              }}
            >
              {contacto.sitio}
            </span>
          </div>

          {/* El paquete: la foto real recortada, apenas girado como en el
              hero. Sin sombra dura: sobre un cutout con alfa, la sombra de
              caja de Satori dibujaria un rectangulo. */}
          <img
            src={`data:image/png;base64,${pack.toString('base64')}`}
            width={317}
            height={511}
            style={{ transform: 'rotate(3deg)' }}
          />
        </div>

        {/* La banda amarilla al pie: el gesto de la tira. */}
        <div
          style={{
            display: 'flex',
            height: 18,
            backgroundColor: AMARILLO,
            borderTop: `4px solid ${TINTA}`,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Archivo', data: archivo, weight: 800, style: 'normal' },
        { name: 'Pacifico', data: pacifico, weight: 400, style: 'normal' },
      ],
    },
  )
}
