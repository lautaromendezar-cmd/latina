# Assets

Todo se construye con un placeholder del tamaño exacto **en el path final**.
Reemplazar un asset es pisar el archivo en `public/imagenes/`: cero cambios
de código.

```
node tools/placeholders.mjs          # escribe sólo los que faltan
node tools/placeholders.mjs --force  # reescribe todos
```

El inventario vive en `src/data/assets.ts`, que es el mismo archivo que lee
el generador. Al llegar un asset real se pone `pendiente: false` ahí.

> Nota sobre el brief: los paths apuntan a `/imagenes/`, no a
> `/placeholders/`. Con dos carpetas, reemplazar obligaba a editar el path
> en el código — justo lo que el brief prohíbe dos renglones más abajo.

---

## Resueltos · 9 de 14

| Path | De dónde salió |
|---|---|
| `imagenes/cutouts/pack-1kg.png` | Foto real del paquete, **matting rehecho**. Ver nota ⚠ abajo. |
| `imagenes/pack-1kg.png` | El mismo archivo. |
| `imagenes/cutouts/palo.png` | Generado (Nano Banana Pro) + matting. |
| `imagenes/cutouts/hoja-entera.png` | Generado + recorte por luminancia. |
| `imagenes/cutouts/hoja-partida.png` | Generado + recorte por luminancia. |
| `imagenes/hero-poster.jpg` | Generado: nube de yerba a contraluz, sin paquete. |
| `imagenes/origen-brasil.jpg` | `brasil.jpg` del banco, 3:2 nativo. |
| `imagenes/origen-uruguay.jpg` | `mate-close.jpg`, recortado 3:2 para sacarle el logo quemado del pie. |
| `imagenes/origen-argentina.jpg` | `amigos.jpg` del banco. |
| `imagenes/textura-molienda.jpg` | `yerba.jpg`, macro **real** de la molienda. |

> ⚠ **`pack-cutout.png` del banco nunca estuvo recortado.** Trae la mesa de
> madera y la pared de fondo; el `remove_background` con el que se hizo
> falló y quedó guardado igual. Se rehízo el matting sobre la misma foto y
> ahora sí tiene alfa. Si alguien vuelve a tomar ese archivo de
> `contenido-latina`, va a repetir el error.

---

## Pendientes

### En cola (generación arrancada, no bloquean)

| Path | Estado |
|---|---|
| `imagenes/cutouts/polvo.png` | Generado OK, esperando el matting. El keyer de luminancia no sirve: el polvo es casi tan claro como el fondo blanco y quedó 33% semitransparente. |
| `imagenes/cutouts/bombilla.png` | Ídem, peor: la plata dejó sólo 2% de píxeles opacos. Un objeto metálico claro sobre blanco no se puede separar por luminancia. |

### Los tiene que sacar una cámara — no se generan

| Path | Medidas |
|---|---|
| `imagenes/molienda-comun.jpg` | 2000×2000 |
| `imagenes/molienda-padron.jpg` | 2000×2000 |

**Estas dos son el elemento firma: son la prueba del sitio.** Generarlas con
IA sería fabricar la evidencia de un claim de producto. No se hace.

La buena noticia es que `yerba.jpg` demuestra que la toma sale con un
teléfono. Son quince minutos:

1. Tabla de madera, luz de ventana, teléfono apoyado o en trípode.
2. Un montoncito de LaTiNa, cenital o casi. Foto.
3. **Sin mover la cámara ni la luz**, se cambia el montón por cualquier
   yerba de supermercado con palo. Foto.

Lo único que no puede cambiar entre las dos tomas es la cámara. Si el
encuadre no coincide, la comparación no prueba nada y se nota.

### Los tiene que mandar Nahuel

| Path | Nota |
|---|---|
| `imagenes/pack-500g.png` | **No existe en ningún lado**: todo el material del cliente es del kilo. |

> Cuidado con lo que mande: mezcla fotos reales con renders de IA. `pack-dark.jpg`
> y `pack-hero.jpg` de `contenido-latina` tienen el microtexto roto
> ("lex picagrammeic" en vez de *Ilex paraguariensis*). Mirar con lupa siempre.

### Video del hero — RESUELTO

Generado con Kling 3.0 a partir del propio poster, así que el poster ES el
primer frame del loop y no hay salto al arrancar. 1280×720, 4s, mudo,
cosido: el último segundo se funde sobre el primero. Medida la costura:
2,88 de diferencia media por píxel contra 16,82 del movimiento real, o sea
seis veces menos que un corte normal.

Quién lo reproduce lo decide `HeroFondo` en el cliente: con
`prefers-reduced-motion`, `saveData` o conexión 2G/3G se queda el poster.

**El loop va SIN el paquete**, igual que el poster. El paquete entra como
cutout encima, en su propio plano de parallax. Dos motivos: es lo que pide
la arquitectura de capas del brief, y evita el problema de la etiqueta
generada (ver abajo).

---

## ⚠ La etiqueta generada no aguanta el tamaño de un sitio

Las dos tomas que probaste en Higgsfield con el paquete como referencia
quedan muy bien de composición, pero el microtexto del envase salió mal en
las dos:

| Toma | Dice | Tendría que decir |
|---|---|---|
| Campo, atardecer | `YERBA MATE ELAGRRADA DESPALADA LIBRE DE OLUTEO` | `…ELABORADA DESPALADA LIBRE DE GLUTEN` |
| Verde, flotando | `YERBA MATE ELABORADA DESTILLARA LIBRE DE GLUTEN` | `…ELABORADA DESPALADA…` |

En un slide de Instagram a 1080 px eso pasa. En el hero de un sitio, que se
sirve a 1920 px y en pantallas retina, esa línea **se lee**. Y el sitio cita
el envase en dos lugares: el pilar "Libre de gluten, dice el envase" y la
denominación legal del pie. Contradecir nuestro propio claim con la etiqueta
mal escrita es el tipo de detalle que después no se puede defender.

**Por eso el sitio no usa ningún paquete generado.** Donde el paquete
aparece grande usa la foto real recortada, que tiene la etiqueta perfecta y
ya está resuelta. Si en algún momento hace falta una escena generada con el
paquete, la receta es la de `MARCA.md`: `nano_banana_pro` a **4k** (a 2k el
microtexto se rompe siempre), pedir integración y no collage, y revisar la
etiqueta letra por letra antes de usarla.

---

## Datos que faltan, no archivos

| Qué | Dónde bloquea |
|---|---|
| **Cuántas cebadas sostiene el sabor** | El contador del elemento firma. Hoy muestra `[VERIFICAR]` en pantalla a propósito. |
| **Lista mayorista al día** | `src/data/mayorista.ts`. La escalera se muestra sin importes hasta que llegue. |
| **Mail de destino de los formularios** | Fase 2. La marca no tiene mail público y Resend necesita un destinatario. |
| **¿Está viva `tienda.yerbamatelatina.com.ar`?** | Es el destino del fallback de "no llegamos a tu ciudad", el camino más transitado de `/donde-comprar`. |

---

## Dos cosas del material

**El `logo.PNG` dice `ERVA-MATE`.** Es la versión brasilera. El paquete real
—`images/PAQUETE-USAR.jpg`— dice `YERBA-MATE` en castellano. Para un sitio
dirigido al mercado argentino conviene la versión en castellano, y esa foto
sirve de fuente para redibujarla.

**Falta el logo en vector.** No hay ningún `.svg` en `contenido-latina`,
`latina-links` ni `pdf-latina`. El único vector posible es el que se pueda
extraer de `pdf-latina/export/Folleto-Latina.pdf`. No bloquea nada hoy: el
load orquestado de la Fase 3 va sin DrawSVG.

---

## Dos erratas en `src/data/distribuidores.ts`

Vienen del scrape del sitio viejo, no se tocaron a mano:

- **`Rosario del Talar`** (Entre Ríos) es casi seguro **Rosario del Tala**.
- **`Zona Oeste`** (Buenos Aires) no es una localidad y no va a matchear con
  nada que escriba una persona en el buscador.
