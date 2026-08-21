# Assets pendientes

Todo lo de acá está construido con un placeholder del tamaño exacto, en el
path final. **Reemplazar es pisar el archivo en `public/imagenes/`. No hay
que tocar código.**

Los placeholders se regeneran con:

```
node tools/placeholders.mjs          # sólo los que faltan
node tools/placeholders.mjs --force  # todos
```

El inventario vive en `src/data/assets.ts`, que es el mismo archivo que lee
el generador. Cuando llega un asset real, poner `pendiente: false` ahí para
que esta lista quede al día.

> Nota sobre el brief: los paths finales apuntan a `/imagenes/`, no a
> `/placeholders/`. Con dos carpetas separadas, reemplazar un asset obliga
> a editar el path en el código, que es justo lo que el brief prohíbe dos
> renglones más abajo ("reemplazar un placeholder tiene que ser mover un
> archivo, nada más").

---

## Ya resueltos

| Path | De dónde salió |
|---|---|
| `imagenes/cutouts/pack-1kg.png` | `../contenido-latina/assets/img/pack-cutout.png`, 1080×1420 con alfa |
| `marca/logo.png` | `images/logo.PNG`, recortado circular con alfa en las esquinas |

---

## Cutouts — PNG, fondo transparente

| Path | Medidas | Qué tiene que mostrar |
|---|---|---|
| `imagenes/cutouts/palo.png` | 1200×600 | Un palo de yerba suelto, nítido. **Es el cutout que más trabaja del sitio**: se va de cuadro justo donde el copy dice *despalada*. Tiene que leerse como palo, no como ramita. |
| `imagenes/cutouts/polvo.png` | 1200×800 | Polvo de molienda suspendido. Fino, no arena gruesa: sostiene el argumento del padrón. |
| `imagenes/cutouts/hoja-entera.png` | 1000×1200 | Hoja de yerba entera, nervadura visible. |
| `imagenes/cutouts/hoja-partida.png` | 1000×900 | Hoja partida, borde irregular. |
| `imagenes/cutouts/bombilla.png` | 500×1200 | Bombilla de alpaca, sin mate. |

## Producto

| Path | Medidas | Qué tiene que mostrar |
|---|---|---|
| `imagenes/pack-1kg.png` | 1200×1500 | Paquete de 1 kg, **foto real**. |
| `imagenes/pack-500g.png` | 1200×1500 | Paquete de ½ kg, **foto real**. ⚠ No existe en el banco: todo el material del cliente es del 1 kg. |

> **No usar `pack-dark.jpg` ni `pack-hero.jpg`** de `contenido-latina`: son
> renders de IA con el microtexto de la etiqueta roto ("lex picagrammeic"
> en vez de *Ilex paraguariensis*). En pantalla grande se lee.

## Hero

| Path | Medidas | Qué tiene que mostrar |
|---|---|---|
| `imagenes/hero-poster.jpg` | 1920×1080 | Frame del loop. **Es el LCP en mobile.** Mientras el video no exista es lo único que se ve, así que tiene que funcionar como foto fija. |
| `imagenes/hero-loop.webm` + `.mp4` | 1920×1080, ~6s | Nube de yerba suspendida, contraluz. Cuando estén, poner `heroVideoListo = true` en `src/data/assets.ts`. |

## Origen

| Path | Medidas | Qué tiene que mostrar |
|---|---|---|
| `imagenes/origen-brasil.jpg` | 2400×1600 | Yerbal en las montañas, atardecer. **Ya hay una buena**: `../contenido-latina/assets/img/brasil.jpg`. |
| `imagenes/origen-uruguay.jpg` | 2400×1600 | Mate cebado con molienda fina, macro. Tiene que verse el polvo: es el panel que explica qué es el padrón. |
| `imagenes/origen-argentina.jpg` | 2400×1600 | Ronda de mate rioplatense. Es el panel donde la marca todavía no está instalada: mejor calle y gente que góndola. |

## La firma — las dos moliendas

| Path | Medidas | Qué tiene que mostrar |
|---|---|---|
| `imagenes/molienda-comun.jpg` | 2000×2000 | Macro extremo de molienda común, con palo visible. |
| `imagenes/molienda-padron.jpg` | 2000×2000 | Macro extremo del padrón despalado. |

> ⚠ **Mismo encuadre, misma luz, misma distancia y mismo fondo en las dos.**
> Es una comparación: si las tomas no coinciden, no prueba nada y se nota.
> Lo ideal es no mover el trípode entre una y otra.

| Path | Medidas | Qué tiene que mostrar |
|---|---|---|
| `imagenes/textura-molienda.jpg` | 2400×1200 | Macro para el relleno tipográfico del manifiesto. Textura pareja, sin foco dominante ni zonas vacías: se ve a través de las letras. |
| `imagenes/cebada-sequence/` | 60 frames webp | **Fase 3.** Secuencia scrubbeable de los dos mates cebándose. Definir junto con la sección, no antes. |

---

## Datos que faltan, no archivos

| Qué | Dónde bloquea |
|---|---|
| **Cuántas cebadas sostiene el sabor** | El contador del elemento firma. Hoy muestra `[VERIFICAR]` en pantalla, a propósito. Sin el dato la sección se rediseña; no se completa con un número creíble. |
| **Lista mayorista al día** | `src/data/mayorista.ts`. Los precios que circulan son de julio y MARCA.md avisa que cambian seguido. La escalera se muestra sin importes hasta que llegue. |
| **Mail de destino de los formularios** | Fase 2. La marca no tiene mail público y Resend necesita un destinatario real. |
| **¿Está viva `tienda.yerbamatelatina.com.ar`?** | Es el destino del fallback de "no llegamos a tu ciudad", que es el camino más transitado de `/donde-comprar`. Si no está viva, ese fallback manda a la nada. |

---

## Dos cosas del material que conviene mirar

**El logo dice `ERVA-MATE`, no `YERBA-MATE`.** El `images/logo.PNG` que
pasaste es la versión brasilera/portuguesa. MARCA.md aclara que la etiqueta
argentina dice *YERBA-MATE ELABORADA*. Para un sitio dirigido al mercado
argentino, conviene la versión en castellano si existe. Está usado igual
por ahora.

**Falta una versión del logo en vector o en monocromo claro.** Hoy es un
PNG con el disco blanco: funciona como sello, pero sobre el verde oscuro un
isotipo en `--papel` se vería mejor, y el load orquestado de la Fase 3
necesitaría paths SVG. No hay ningún `.svg` en `contenido-latina`,
`latina-links` ni `pdf-latina`; el único vector posible es el que se pueda
extraer de `pdf-latina/export/Folleto-Latina.pdf`.

---

## Dos erratas en `src/data/distribuidores.ts`

Vienen del scrape del sitio viejo, no se tocaron a mano:

- **`Rosario del Talar`** (Entre Ríos) es casi seguro **Rosario del Tala**.
- **`Zona Oeste`** (Buenos Aires) no es una localidad, y no va a matchear
  con nada que escriba una persona en el buscador.
