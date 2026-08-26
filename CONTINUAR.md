# LaTiNa — dónde quedó esto

Última sesión: **26-ago-2026**.

---

## LA DEVOLUCIÓN DEL CLIENTE, PRIMERA TANDA (26-ago)

Llegó por WhatsApp en cuentagotas y se aplicó todo, pusheado y en
producción:

- **"Mucho polvo" murió en todo el sitio** (hero, Origen-Uruguay,
  /vende-latina — el cliente lo pidió para el hero pero era la frase lo
  que le molestaba). La bajada del hero remata con su frase textual:
  "La mejor montañita que vas a armar". OJO: la palabra "polvo" suelta
  sigue en el manifiesto y en dos Pilares ("más hoja, más polvo", "hoja
  y polvo", "con más polvo"); son explicativas y quedaron, pero si el
  cliente las ve y saltan, ya está detectado dónde están.
- **Manifiesto**: el remate pasó a "El mate." (E mayúscula, textual del
  cliente) y el fondo dejó de ser blanco liso: entró la TexturaGreca
  con los mismos parámetros que Pilares — "la parte blanca del paquete"
  no es blanco, es blanco con la greca.
- **Origen: el velo bajó del 65% al 56%** (pedido: que las fotos se
  noten). No fue gratis: las tres fotos tienen píxeles casi blancos y
  la etiqueta amarilla de 12px pedía 4.5:1. La salida fue subir las
  etiquetas amarillas de la sección a 19px (peso 700 ya lo tenían): como
  texto grande WCAG piden 3:1, y al 56% dan 3.18:1 con crema en 4.77:1.
  **Si alguien achica esas etiquetas, el velo vuelve al 65** — está
  comentado en el componente.
- **La foto de "Acá se hace" es GENERADA** (nano_banana_pro) a partir
  de una foto vertical que trajo el cliente (guardada en
  images/aca-se-hace.jfif): la original a 1272px en desktop se veía
  horrible. Misma escena en 16:9 a 2752px, sol a la izquierda para que
  el centro (donde cae el texto) quede en niebla. Sin paquete ni
  etiqueta en cuadro, que es donde las generadas se rompen. Hay una
  variante descartada (sol al centro) en el chat de la sesión si el
  cliente pide otra.

---

## EL HERO Y ORIGEN EN TELÉFONO (25-ago, al final)

Lautaro abrió el sitio en un iPhone y aparecieron dos problemas. Lo que
había y lo que se hizo:

### El video del hero no arrancaba en iPhone (botón de play)

Dos causas apiladas, las dos documentadas en `HeroVideo.tsx` (nuevo
componente cliente que reemplaza al `<video>` inline):

1. **React no escribe `muted` en el HTML del servidor** (bug conocido
   de react-dom). Safari parsea un `<video autoplay>` sin muted y niega
   el autoplay en el acto. En desktop la hidratación le ganaba a la
   carga del video y no se notaba.
2. **El modo de bajo consumo de iOS** bloquea todo autoplay hasta un
   gesto (la captura de Lautaro tenía la batería al 14%, en amarillo).

La solución: reponer `muted` por propiedad + `play()` a mano al montar,
y reintento único en el primer toque/scroll. Con reduced-motion no se
intenta nada (los `<source>` ya filtran por media query).

**Y en teléfono el video arranca en el segundo 5,5** (pedido de
Lautaro: ver el tucán de una). Medido cuadro por cuadro: el loop dura
12,1s y en la franja central que ve un teléfono el tucán entra a los
~5s y sale a los 8,5. El salto del poster al 5,5 no se ve porque la
cámara está quieta. Desktop arranca de cero, como siempre. Detalle en
`HeroVideo.tsx`.

### El layout del hero en teléfono taparía el vuelo

Se miró el video cuadro por cuadro: **el tucán vuela por la banda
superior del encuadre (45% de arriba)**, y en un teléfono object-cover
conserva todo el alto, así que esa banda es la misma en pantalla. El
texto centrado le caía encima. Ahora, SOLO abajo de `md` (desktop
intacto):

- El bloque de texto va **al pie** (`justify-end`): la mitad de arriba
  queda libre para el tucán y el atardecer.
- **El collage aparece también en teléfono**: paquete y stickers en
  chico, arriba del título a la derecha, con la deriva de `.cutout`.
  Sólo con viewport de 42rem de alto o más (`.hero-collage-movil` en
  globals.css): abajo de eso empujaría los CTAs fuera de pantalla,
  que es regla del hero.

  **El umbral se mide contra el viewport CHICO, aprendido rompiéndolo:**
  la primera versión pedía 50rem y en el iPhone de Lautaro el collage
  aparecía recién al scrollear — al cargar, con las barras de Safari
  desplegadas, la media query de alto ve ~734px, y al plegar las
  barras pasa a 844 y el collage "nacía" en medio del gesto. El hero
  mide 100svh (viewport chico, fijo), así que la columna entera tiene
  que entrar en ese número. La cuenta completa está en globals.css.

### Origen en teléfono: la banda verde y la entrada que faltaba

- El encabezado ("Origen") era un bloque del flujo con `pt-24 pb-10`
  sobre fondo verde → una **banda verde vacía de ~200px** entre la tira
  y la primera foto. Ahora es overlay absoluto sobre la primera foto,
  como en desktop. El contraste ya estaba pagado (velo negro 65%).
- Abajo de 1024px no corría **ninguna** animación (el gate del pin
  cortaba todo), contra la regla de "cada sección con su entrada".
  Ahora cada slide apilada dispara su entrada al entrar en cuadro:
  lugar, título y cuerpo, sin SplitText.

---

## PASADA DE TEXTOS + LAS INTERNAS ALCANZAN AL REDISEÑO (25-ago, más tarde)

Lectura de la home de punta a punta buscando texto que hubiera quedado
mal tras tanto agregar y sacar secciones, y ajuste de las internas al
criterio nuevo. Lo que se tocó:

**Textos (el diseño no se tocó):**

- **Cierre B2B** enumeraba tres escalas ("unidad, funda de 12 kg y
  palet") con la escalera de CUATRO peldaños abajo. Ahora dice "de la
  unidad al palet".
- **Redes** decía "acá al lado" y en teléfono el muro queda ARRIBA.
  Igual que "el formulario de al lado" en /contacto. Deixis fuera.
- **/vende-latina** tenía un "Estamos en 8 provincias" escrito a mano;
  ahora sale de `totalProvincias`, como todo el resto del sitio.
- **/contacto** decía "Lo más rápido es WhatsApp…" dos veces casi
  textual (bajada de cabecera + título de sección). La bajada ahora
  presenta los canales; el ranking lo hace la sección.
- Copy muerta fuera de `site.ts` (etiqueta y bajada del preview de
  Dónde comprar, `footer.legal`, `footer.seguinos`) y los comentarios
  de la manuscrita puestos al día (hoy: hero, manifiesto, Dónde comprar).

**El velo de las cabeceras internas pasó a negro (68%).** Era el
verde-profundo/65 viejo, el criterio que la home ya abandonó. El 68 no
es a ojo: dos de las tres fotos tienen blanco PURO (medido píxel por
píxel), y al 65 la etiqueta amarilla queda en 4.49:1. La cuenta está en
`EncabezadoPagina.tsx`.

**Pendiente que quedó anotado**: la foto de cabecera de /donde-comprar
es un almacén sepia de banco, cero LaTiNa. Pedirle al cliente una foto
real de góndola o punto de venta (ver `ASSETS-PENDIENTES.md`).

**No se tocó** (necesita confirmación del cliente): las dos erratas del
scrape en `distribuidores.ts` — "Rosario del Talar" (¿del Tala?) y
"Zona Oeste", que no es una localidad y nunca matchea una búsqueda.

**LA IMAGEN OG QUEDÓ HECHA** (`src/app/opengraph-image.tsx`, con
`next/og` como pedía el brief — era el pendiente de Fase 4). Es la
composición del hero sobre el bloque verde plano: dos líneas
condensadas, el remate manuscrito con calco y el paquete real al lado,
banda amarilla al pie. Tres cosas que hay que saber:

- **Satori no soporta fuentes variables**: los TTF de `src/app/_og/`
  son la Archivo INSTANCIADA con fontTools en wdth 78 / wght 850 (el
  corte exacto de `.display`) más Pacifico. Si el display cambia de
  corte, reinstanciar (el comando está en el comentario del archivo).
- El calco del remate se falsea con ocho sombras en anillo (tampoco
  hay text-stroke en Satori).
- La ruta es estática: se renderiza una vez en build. Twitter card
  agregada en `layout.tsx`; la URL de la imagen sale sola de
  `metadataBase`.

---

## LA SEGUNDA MITAD DE LA HOME (25-ago)

Cuatro secciones tocadas y una nueva, todas sobre referencias que trajo
Lautaro. Lo que hay que saber de cada una:

### PRESENTACIONES: eliminada

Su único dato —viene en dos tamaños— ya lo dice la tira, y el paquete ya
aparece grande en el hero y cayendo en Pilares. Pero el motivo de fondo fue
otro: **`pack-500g.png` era el MISMO ARCHIVO que `pack-1kg.png`, byte por
byte**, así que la tarjeta del ½ kg mostraba un envase con 1KG impreso. Eso
no es un placeholder que se degrada bien, es una afirmación falsa sobre el
producto.

Se borró el archivo Y los campos de imagen de `data/producto.ts`: mientras
el campo exista, el próximo que pase lo llena con lo que haya a mano. El
dato (dos tamaños, sólo el de 1 kg con escala mayorista) se queda.

Los dos gramajes y el botón a la tienda viven ahora al pie de Dónde comprar.
**Cuando llegue la foto real del ½ kg**, los dos paquetes juntos y en escala
vuelven a merecer un momento propio.

### DÓNDE COMPRAR: el tratamiento de "Find our location"

Título centrado con el remate manuscrito, el garabato a la izquierda y el
sello de goma a la derecha (`components/ui/Adornos.tsx`). **La flecha está
dibujada a ojo** y no sale de ningún material de la marca; el sello dice lo
que dice el ENVASE, no una frase inventada.

Después se adelgazó: la primera versión apilaba cinco estilos de componente
y se leía como una ensalada. Se fueron la etiqueta, la bajada, la card de
las presentaciones y las ocho pastillas de provincias (ahora una línea de
texto). **Quedan tres cosas con forma**: el campo de búsqueda, la lista de
resultados y el bloque del fallback. El resto es tipografía.

### VENDÉ LATINA: bloque a sangre estilo Paput

La grilla cuelga de la SECCIÓN y no del contenedor de 1400, así la foto
llega al borde del viewport. **La escalera de compra va DENTRO de la columna
izquierda**, en dos por dos: estuvo un rato abajo y a lo ancho, y el costo
era que la grilla terminaba donde terminaba el texto y la foto no llegaba al
piso del bloque.

### REDES: sección nueva, el muro de Instagram

Dos columnas en marquesina vertical, una sube y otra baja, con **piezas
REALES** del cliente sacadas de `pdf-latina/latina-material`. Cambiarlas es
pisar los diez archivos de `public/imagenes/redes/`.

Tres cosas que costaron tiempo:

1. **El que recorta tiene que tener alto DEFINIDO.** La pista mide más de
   5000px; con la celda en `h-auto` + `min-h-full`, el alto lo ponía el
   contenido y la sección se iba a cinco mil píxeles. Va `absolute inset-0`
   adentro de una celda estirada.
2. **Las dos columnas no duran lo mismo** (46s y 54s). Si duran igual,
   vuelven al punto de partida en el mismo instante y el salto se ve.
3. **Botón de pausa obligatorio**: adentro de las piezas hay texto y WCAG
   2.2.2 pide control para movimiento automático de más de 5s.

### EL VELO PASÓ DE VERDE A NEGRO (hero y Origen)

El velo verde hacía DOS trabajos —dar contraste y pintar de marca— y el
segundo se comía la foto: todo quedaba en monocromo verde. Ahora es negro
parejo: baja la luz sin tocar el tono.

**Los números no son a ojo y son distintos en cada sección**, porque cada
foto tiene su peor píxel:

| | peor píxel | velo | resultado |
|---|---|---|---|
| Hero | 255,248,232 | negro 60% | bajada 5.80:1 |
| Origen | 255,250,247 | negro 65% | bajada 6.89:1, etiqueta amarilla 4.59:1 |

Origen va al 65 y no al 60 porque **la etiqueta amarilla de 12px** ("Sur de
Brasil", etc.) necesita 4.5:1 y al 60% se quedaba en 3.80. Con el velo verde
que había estaba en **2.18:1**: esto no lo empeoró, lo arregló.

Si se cambia una foto, hay que rehacer la cuenta contra la nueva.

### HERO: el fondo es VIDEO

El tucán cruzando el monte al atardecer, de una referencia del propio
cliente. El loop cierra solo: el primer cuadro y el último son el monte
vacío. Del master de 15,2 MB salieron webm 665 KB / mp4 960 KB a 1600px, sin
audio.

- **El poster es el CUADRO CERO del video**, no una foto suelta: cualquier
  otra imagen da un salto cuando arranca la reproducción.
- **Movimiento reducido sin JavaScript**: los dos `<source>` llevan
  `media="(prefers-reduced-motion: no-preference)"`. Si el visitante pidió
  no moverse, ninguna fuente coincide y el navegador ni descarga el video.
- Murió `.fondo-vivo` (el travelling en CSS que reemplazaba al video) y
  murieron los tres archivos del hero oscuro viejo.

### OJO CON LAS ETIQUETAS GENERADAS

Las dos imágenes nuevas del cliente tienen el paquete con la etiqueta rota
(emblema convertido en mancha, microtexto ilegible). Están puestas igual
**porque a tamaño de pantalla no se leen**, pero el margen es corto:

- `vende-latina.webp`: el paquete adentro de los anteojos.
- El video del hero: el paquete en el pico. En la foto fija medía 210px en
  1920 y era el caso más riesgoso; en el video vuela lejos y en movimiento,
  así que dejó de ser legible.

**La solución definitiva es la misma para las dos**: regenerar con el hueco
vacío —lentes opacos, pico sin nada— y componer encima el recorte del
paquete REAL, que es lo que ya se hace en el hero y en Pilares.

---

## EL HERO SE REHIZO ENCIMA (24-ago, más tarde)

Al cliente le gustó el rediseño diurno, y el hero cambió otra vez sobre esa
base. Lo de abajo (el rediseño) sigue valiendo para todo el resto del sitio;
esto es lo que pasó con el hero:

- **El fondo es una foto del yerbal**, no un bloque de verde plano: monte de
  araucarias del sur de Brasil, que es donde se elabora. **Es el poster del
  video que falta**: cuando exista, se cambia el `<Image>` por un `<video>`
  con este mismo archivo, se borra `.fondo-vivo` y no se mueve nada más.
- **Se mueve**, con un travelling en CSS puro (`.fondo-vivo`), 26s ida y
  vuelta. En GSAP no: es un bucle que no depende del scroll, no necesita
  línea de tiempo y así no le pesa al LCP. El grueso del recorrido es el
  desplazamiento y no la escala, porque la foto mide 1280 de ancho y cada
  punto de zoom es un punto de blandura.
- **El velo no es estética, es contraste.** Sobre el cielo claro de la foto,
  crema no llega a AA ni con el verde de marca al 88%. Del lado del texto el
  velo es verde-profundo (la bajada queda en ~5.3:1 en el peor píxel) y se
  abre a transparente hacia la derecha, donde no hay texto. En teléfono es
  parejo: ahí el texto ocupa todo el ancho.
- **El remate del título va MANUSCRITO**: "la yerba" sale de la condensada,
  en amarillo y con el *calco* de las piezas de la marca (filete crema +
  sombra dura sobre la letra). Es la tercera familia del sitio y es una
  excepción de una palabra.
- **A la derecha, el collage** con la lógica de la pieza "No sos vos, es tu
  yerba": el paquete quieto de ancla y dos stickers pisándolo en diagonal,
  flotando con la deriva que ya existía. La greca de trama salió del hero:
  sobre una foto es ruido sobre ruido.

**El presupuesto de movimiento sigue en siete**: el fondo vivo ocupa el hueco
que dejó el preloader.

### Lo que falta del hero

1. **Elegir la manuscrita.** Pacifico es provisional: es la más parecida de
   Google Fonts a la brush de la pieza `skate.png.png` del cliente, pero esa
   pieza es un PNG y no trae la fuente. Las nueve candidatas están servidas
   en **`tools/fuentes.html`** (doble clic), cada una escribiendo el hero real
   y cotejando "Mate y skate" contra el original. **Si se cambia, hay que
   rehacer la cuenta del `pb` de la máscara** en `HeroTitulo.tsx`: la cola de
   la "y" es distinta en cada familia y con la de Pacifico ya salió cortada
   una vez. Y revisar `--peso-manuscrita`: Pacifico tiene un solo peso.
2. **El video del fondo.** Falta generarlo a partir de `hero-yerbal.webp`.
3. **Messi.** Ver la nota en `ASSETS-PENDIENTES.md`: es uso comercial de la
   imagen de una persona real sin licencia, y la decisión es del cliente.

---

## PILARES: se fue el acordeón (24-ago)

El acordeón escondía detrás de un click las tres razones para comprar:
para leer la segunda había que cerrar la primera. Son claims paralelos, no
pasos, así que ahora se ven los tres juntos. El paquete grande en el centro
y los claims orbitándolo en pastillas inclinadas que flotan; abajo, los tres
títulos con su cuerpo.

Se fue con el toda su maquinaria de accesibilidad (botones con
`aria-expanded`, panel que nunca se desmontaba, `onFocus` que abría
tabulando) y no se perdió nada: ya no hay estado que comunicar porque no hay
nada cerrado. Los chips del escenario son `aria-hidden` — el mismo texto
está en la lista de abajo.

**Los colores salen de COMBINACIONES, no de tonos nuevos.** La paleta tiene
dos, verde y amarillo. Los tres pares son amarillo/tinta (8.6:1),
verde/crema (4.7:1) y verde-profundo/amarillo (6.2:1). Si hacen falta más
colores es una decisión de marca, no se resuelve en el componente.

**Entra en una pantalla** (`lg:h-[100svh]`): columna flex donde encabezado y
lista miden lo que miden y el escenario se queda con lo que sobra. El
`min-h-0` del hijo flexible NO es opcional: sin el, el mínimo automático de
una caja flex es su contenido y la sección desborda apenas el viewport es
bajo.

### Tres trampas que costaron tiempo acá

1. **La flotación y la entrada NO pueden compartir elemento.** Las dos
   escriben `transform`, y una animación CSS activa le gana por cascada a un
   estilo en línea: la entrada existía pero no se veía nunca. Por eso cada
   chip son dos nodos, uno flota y el otro entra.
2. **Un solo ScrollTrigger atado a la sección no sirve** cuando la sección
   mide una pantalla: arrancaba al cruzar el borde de arriba y para cuando
   el paquete aparecía en cuadro la animación había terminado. Van dos, uno
   para el encabezado y otro para el escenario.
3. **El recorte de la caída lo hace el contenedor del producto**, no la
   sección. Si recortara la sección, el paquete pasaría por encima del
   encabezado durante toda la caída.

`imagenes/pilares/sello-sin-gluten.png` quedó sin uso: decía lo mismo que el
chip "Sin T.A.C.C." y encima el sello ya está impreso en el envase, o sea que
estaba tres veces en el mismo cuadro. No se borró: es arte real del producto.

---

## LA TIRA Y EL MANIFIESTO (24-ago)

**El separador de la tira es el mate de la marca, no un rombo.** El emblema
real no sirve a ese tamaño: a 34px la greca se hace papilla y el oliva del
porongo sobre el amarillo casi no contrasta. `MarcaMate.tsx` es ese mismo
isotipo simplificado a lo que sobrevive a 30px — greca maciza, porongo de
contorno — en verde-profundo, porque el verde de marca da 3.2:1 sobre
amarillo y un icono de trazo fino ahí se deshilacha. Sin `clipPath`: se
repite dieciocho veces y serian dieciocho ids iguales.

**El manifiesto perdió el relleno de molienda.** PADRON y DESPALADA se
dibujaban de contorno y se llenaban con la macro real al scrollear; sobre el
fondo casi blanco la yerba adentro de la letra quedaba como una mancha. Las
dos palabras siguen encabezando las columnas del cuerpo, que es donde se
explican.

En su lugar: la frase del cliente entera con el remate MANUSCRITO, y **la
ronda** — la foto real de cuatro pibes cebando en una rampa, en circulo con
aro verde y el sticker del mate mordiendo el borde.

El calco sobre fondo claro lleva **filete verde-profundo y mas gordo**, no
crema. Amarillo sobre crema da 1.5:1 y no pasa ni como display: con el
contorno oscuro lo que dibuja la letra es el filete (9.2:1) y el amarillo es
relleno. **Vale solo para el remate manuscrito**, que es enorme.

### La regla nueva de movimiento

Lautaro pidió que **cada seccion que toquemos tenga una animacion de
entrada**. Convive con el presupuesto de siete si cada seccion aporta
tambien lo que saca: aca entro la entrada del manifiesto y salio el relleno
de molienda. Si en alguna no hay nada que sacar, hay que avisarle.

---

## REDISEÑO DIURNO — PUSHEADO Y EN PRODUCCIÓN (24-ago)

Lautaro lo revisó y dio el OK; el push a main del 24-ago lo deployó en
Vercel. Lo que sigue abajo es el detalle de ese rediseño.

Al cliente NO le gustó el sitio oscuro/premium (leyó el hero como una
"radiografía de huesos" y el palo del manifiesto como un hueso volando).
Quiere algo joven, en la línea de su Instagram. El 24-ago se aplicó un
rediseño total del sistema visual sobre la misma base:

- **Página CLARA** (casi blanco #fcfbf7) con bloques de color de marca:
  hero VERDE → tira AMARILLA → manifiesto claro → Origen fotos → pilares
  claro → presentaciones VERDE → dónde-comprar claro → B2B AMARILLO →
  footer verde profundo. Paleta extraída del packaging.
- **Display Archivo CONDENSADA** (wdth 78, weight 850, caps): el registro
  de las piezas de IG, mismo archivo de fuente variable, cero requests
  nuevas. Escala con techo moderado (preferencia de Lautaro).
- **Muertos**: el video/poster oscuro del hero, los 3 palos del
  manifiesto, el preloader de 2,75s (salda la deuda del presupuesto de
  movimiento), el grano.
- **Sobreviven**: tira marquee (pedido del cliente, con pausa WCAG),
  relleno tipográfico con la molienda real, pin de Origen (velo más
  liviano, 60%), acordeón de Pilares, buscador, formularios→WhatsApp,
  toda la arquitectura y el contenido.
- Nuevo gesto del sistema: sombra dura (5px sin blur, color tinta) en
  CTAs y cards de énfasis; cards radius 16px, botones píldora.
- `tsc` limpio, `next build` limpio (todas las rutas estáticas).

**Para revisar**: `npm run dev` y mirar la home + las 3 internas.
Puntos donde el gusto de Lautaro y el brief juvenil chocan (decidir
antes de pushear): (1) la tira marquee, (2) el pin de Origen, (3) el
tamaño del display del hero. Se pusheó: push a main = deploy.

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build
```

> ⚠ **No corras `npm run build` con el dev server abierto.** Comparten la
> carpeta `.next` y se pisan; el dev queda tirando 500 hasta que borrás
> `.next` y lo levantás de nuevo.

Documentos: `BRIEF.md` (el pedido original), `CLAUDE.md` (reglas de
trabajo), `ASSETS-PENDIENTES.md` (qué falta y de dónde salió cada imagen).

---

## Estado

| Fase | |
|---|---|
| 1 · Fundaciones | hecha |
| 2 · Páginas internas | hecha, con un desvío (ver abajo) |
| 3 · Movimiento | hecha |
| 4 · Performance, a11y, OG, deploy | **pendiente** |

La home son 8 secciones: Hero → Tira → Manifiesto → Origen → Pilares →
Presentaciones → Dónde comprar → Cierre B2B.

Las cuatro rutas responden 200, `tsc` limpio.

---

## Decisiones que se apartan del brief

Están todas argumentadas en el commit correspondiente. Resumen para no
tener que revisar el historial:

**Los formularios van a WhatsApp, no a Resend.** El brief pide Server
Actions + Zod + Resend, pero Resend necesita un destinatario y la marca no
tiene mail público. Un formulario que valida perfecto y no le llega a
nadie es peor que no tenerlo. `Formulario.tsx` arma el mensaje y abre
WhatsApp. Cuando haya mail se agrega la Server Action y el mismo
componente manda por los dos lados: los campos ya están descritos como
datos.

**Dos presentaciones, no una.** 1 kg y ½ kg. El brief decía un solo SKU.

**Sin la sección "La prueba".** Era el elemento firma del plan —la
comparación de las dos moliendas— y se eliminó por decisión del cliente:
dependía de una toma que no se puede hacer. Está entera en el historial
de git si algún día aparecen las fotos. Lo que se perdió: era el único
argumento incopiable (padrón uruguayo despalado), que ahora se dice pero
no se demuestra.

**La tira de especificaciones se mueve, y por pedido del cliente.** Estaba
quieta al pie del hero con un argumento escrito: contenido en movimiento
automático que dura más de 5s necesita un control de pausa (WCAG 2.2.2).
Ahora es una sección propia entre el hero y el manifiesto, en movimiento —
y con botón de pausa, que es lo que hacía que la objeción se cayera. El
hero, sin la banda, mide exactamente una pantalla.

**Origen dejó de ser papel.** Era una de las dos secciones crema que rompían
la corrida de verde; ahora son tres fotos a pantalla completa con velo. La
corrida la rompen la tira dorada arriba y Presentaciones abajo, y los
cielos de las tres fotos son claros, así que no quedó un bloque de verde
seguido. Si en algún momento se ve pesado, la que tiene que volver a crema
es Pilares, no Origen.

**Dos familias tipográficas, no tres.** Se cayó Geist Mono; el registro de
"ficha técnica" lo hace Montserrat traqueado. Las dos familias son
variables: un archivo cada una.

**Paleta del packaging, no la del brief.** Los hex salen de `MARCA.md`
(`../contenido-latina/`), que es lo que ya usan las piezas de Instagram.
Los contrastes medidos están anotados arriba de `globals.css`, incluidos
los pares que NO pasan y que por eso son reglas del sistema.

**El rojo del sello no es un acento.** Sólo se usa en errores de
formulario. Sobre papel el acento es la tinta más oscura.

---

## Presupuesto de movimiento

Siete efectos, y la regla es: si entra uno, sale otro. El séptimo entró
por pedido del cliente (la tira) y todavía no salió ninguno: es la deuda
abierta del presupuesto.

1. Origen: tres pantallas que se pasan con el scroll (la transición del
   swipe-slider de GSAP: dos máscaras encastradas, fondo con desfasaje y el
   título rearmándose letra por letra) — **el único pin del sitio**
2. Cutouts ambiente (deriva + parallax por plano)
3. Manifiesto: el contorno se llena con la macro real de la molienda
4. Entrada del hero encadenada
5. Preloader, CSS puro, 2,75s, una vez por sesión
6. Acordeón de Pilares (lo dispara el click, no el scroll)
7. La tira de especificaciones, con botón de pausa

**Dos reglas que ya se rompieron una vez y costaron caro:**

- **El contenido nunca se esconde con CSS esperando que el JS lo revele.**
  El HTML sale visible y GSAP esconde y anima dentro de un
  `useLayoutEffect` (`useLayoutEffectSeguro` en `lib/motion.ts`), que corre
  antes del primer pintado. Si el bundle no carga, se ve igual.
- **Nada de opacidad para atenuar texto.** El activo/inactivo va por
  color. Un 28% de opacidad sobre papel da 1.80:1.

---

## Falta

### Fase 4
Lighthouse real ahora que entró el video del hero y accesibilidad de
punta a punta. El OG ya está (ver arriba); el deploy es cada push.

### Del cliente
- **Foto del ½ kg.** Hoy muestra el paquete de 1 kg, que dice "1KG"
  impreso. Decisión tomada a sabiendas.
- **Lista mayorista al día.** La escalera se muestra sin importes;
  `mayorista.ts` tiene `preciosPublicados = false`.
- **Mail de destino** para los formularios.
- **¿Está viva `tienda.yerbamatelatina.com.ar`?** Es el destino del
  fallback de "no llegamos a tu ciudad", que es el camino más transitado
  de `/donde-comprar`.

### Ojo con el material
El banco mezcla fotos reales con generadas, y algunas tienen la etiqueta
rota. Descartadas: `exhibidor.jpg` (los paquetes dicen **LAïNA**),
`pack-dark.jpg` y `pack-hero.jpg`. **Mirar con lupa antes de usar
cualquier cosa nueva.** Detalle en `ASSETS-PENDIENTES.md`.
