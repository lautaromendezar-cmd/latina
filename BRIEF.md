# BRIEF — Yerba Mate LaTiNa · Sitio 2026

> Pegá esto como `BRIEF.md` en la raíz del repo. En el chat de Claude Code decile: "leé BRIEF.md y hacé la Fase 0".
> Rev. 2 — incorpora referencia de movimiento.

---

## 0. Rol

Sos el design lead + dev de un estudio chico conocido por darle a cada cliente una identidad visual que no se confunde con la de nadie. Este cliente ya rechazó una versión templated (la actual). Te está pagando por un punto de vista.

**No escribas código hasta la Fase 0.** Leé todo, hacé el plan, mostrámelo, discutimos, después construís.

---

## 1. Contexto de negocio (esto no puede fallar)

**LaTiNa / Yerba Mate Latina.** Yerba de origen brasilero (sur de Brasil), con blend de **padrón uruguayo**, que ahora entra al mercado argentino. Sitio actual: `yerbamatelatina.com.ar` (WordPress + WooCommerce, a reemplazar).

**El negocio real no es vender yerba online.** Es:

1. **Captar distribuidores** (B2B). Es la página que hace plata. `/vende-latina`.
2. **Que la gente encuentre dónde comprar** (retail físico + online). `/donde-comprar`.
3. La venta online se muda a **Tienda Nube** en subdominio. El sitio nuevo NO tiene carrito.

**Dos presentaciones: el paquete de 1 kg y el de ½ kg.** Nada más. No hay catálogo, no hay variantes, no hay "elegí tu sabor". El 1 kg es el protagonista y el único que tiene precio mayorista; el ½ kg es la presentación chica y se nombra, no se le arma una sección propia. Esto condiciona toda la arquitectura — no importes patrones de sitios multiproducto.

Por más Awwwards que quede, si un tipo de Gualeguay no encuentra en 10 segundos quién le vende LaTiNa cerca, el sitio fracasó. **La conversión gana sobre el efecto, siempre.** Cuando haya tensión, resolvé a favor de la conversión y avisame.

### Diferenciadores reales (usar, no inventar otros)

- **Padrón uruguayo**: molienda más fina, más polvo, más cuerpo, amargor que no se lava rápido.
- **Rinde más**: pensada para quien toma muchos mates por día. Sostiene el sabor cebada tras cebada.
- **Origen sur de Brasil**: pequeños productores, procesos que respetan el sabor natural.
- **Sin TACC**, apta celíacos.

### Prohibido en el copy

- "Soluciones innovadoras", "experiencia única", "pasión por el mate", "tradición y calidad".
- Traducir literal. Todo en **castellano rioplatense con voseo** (tenés, cebás, probála, sumate).
- Claims que no estén arriba. Si necesitás un dato duro que no tenés, poné `[VERIFICAR: xxx]` y seguí.

---

## 2. Stack

```
Next.js 15 (App Router) + TypeScript (strict)
Tailwind CSS v4
GSAP 3.13+ · ScrollTrigger · SplitText · Observer · DrawSVG  (todos gratis desde 3.13)
Lenis (smooth scroll, sincronizado con ScrollTrigger via lenis.on('scroll', ScrollTrigger.update))
Resend + React Email para formularios
Vercel
```

**Sin canvas ni WebGL.** La profundidad se logra con cutouts PNG + blur + parallax en CSS/GSAP. Es más barato, más rápido y se ve mejor.

Sin CMS en la v1. Datos en archivos TS tipados. Si más adelante Nahuel necesita editar solo, migramos distribuidores a Sanity o a un Google Sheet → JSON en build.

**No instales**: Framer Motion, three.js, shadcn/ui, ninguna librería de carrusel (los hacés con GSAP Observer).

---

## 3. Design system

### Paleta — derivada del packaging real, no del sitio actual

El sitio actual es navy + amarillo. Eso ignora el verde y el crema que SON la marca. Corregilo.

```css
--yerba-oscuro:  #101A12;  /* verde casi negro — color de la yerba mojada en el mate. Fondo dominante */
--papel:         #E9E3D2;  /* el papel del paquete. Texto sobre oscuro, fondos de sección clara */
--amarillo:      #F2C230;  /* la banda superior del pack. Acento primario, CTAs */
--verde:         #1E5C30;  /* el verde del pack. Estructura, no acento */
--yerba-seca:    #94A06A;  /* verde-gris de la yerba en seco. Texturas, estados secundarios */
--sello:         #B8402B;  /* el rojo del sello. Máximo dos apariciones por página */
```

`--amarillo` es acción, nunca decoración.

### Tipografía

- **Display**: `Monument Extended` o `PP Right Grotesk Compact`. Fallback libre: **Archivo Expanded 800**. Mayúsculas, tracking -0.03em, clamp hasta 14vw.
- **Body**: **Inter Tight** (o Söhne con licencia). 400/500, line-height 1.5.
- **Utility/data**: **Geist Mono**. Directorio de distribuidores, etiquetas, especificaciones, números. Deliberado: le da al sitio un registro de "ficha técnica" que sostiene el posicionamiento de demo de producto.

**No uses** Playfair, Cormorant, ni ningún serif de contraste alto. Ni tipografías con trazo dibujado a mano o wobble — el registro de LaTiNa es preciso, no artesanal-simpático.

### Device tipográfico: outline / sólida

En la display, algunas palabras van en **contorno** (`-webkit-text-stroke: 1px var(--papel)`, fill transparente) y otras sólidas, dentro de la misma frase. El contorno marca lo que todavía no pasó; el sólido, lo que se afirma.

Esto **tiene que hacer trabajo**, no ser decoración: donde se usa, el contorno se rellena con el scroll (ver §5.2). Si en alguna sección no podés justificar por qué una palabra está en outline, ponela sólida.

### Sistema de reglas y etiquetas

Hairlines de 1px en `--yerba-seca` al 30%, con etiquetas en Mono uppercase 11px ancladas a los extremos:

```
PADRÓN URUGUAYO ─────────────────────────────── 01 / ORIGEN
```

Es el andamiaje que le da al sitio aire de especificación técnica. Usalo entre secciones, en el hero, y en el comparador de molienda.

### Textura

Grano de film sutil (SVG feTurbulence, opacity ≤ 0.04) sobre `--yerba-oscuro`. Sin gradientes de color. Sin glassmorphism. Sin sombras difusas grandes. Radios: 0 en casi todo; botones full-round (999px) como único gesto redondo.

---

## 4. Arquitectura

```
/                    Home (one-pager, 7 secciones)
/donde-comprar       Directorio de distribuidores
/vende-latina        Landing B2B + formulario
/contacto            Formulario + datos
                     TIENDA → link externo a tienda.yerbamatelatina.com.ar
```

**Mantené los slugs actuales.** Hay SEO indexado. Si cambiás alguno, escribí el 301 en `next.config.ts`.

Preparado para `/br` (portugués) pero **no lo construyas**. Solo dejá la estructura de rutas lista y los strings fuera de los componentes.

---

## 5. La capa de movimiento

### 5.A · Capa ambiente: cutouts

Recortes PNG con fondo transparente flotando sobre el fondo oscuro, en tres planos de profundidad:

| Plano | Blur | Escala | Velocidad parallax | Opacidad |
|---|---|---|---|---|
| Fondo | 8px | 0.6 | 0.2 | 0.4 |
| Medio | 2px | 0.85 | 0.5 | 0.7 |
| Frente | 0 | 1.0 | 0.9 | 1.0 |

Elementos: hoja de yerba entera, hoja partida, palo, polvo de molienda, bombilla, el paquete. **Nada abstracto.** Cada cutout muestra producto.

Deriva suave permanente (`gsap.to` con `yoyo`, 8-12s por ciclo, `sine.inOut`) + desplazamiento por scroll. Máximo 6 cutouts visibles a la vez. Se apagan con `prefers-reduced-motion`.

### 5.B · Load orquestado (una vez por sesión)

Tres tiempos, **1.4s total máximo**:

1. **0–500ms**: círculo centrado en `--yerba-oscuro` sobre negro. Se rellena de abajo hacia arriba en `--yerba-seca`, como un mate que se ceba. El isotipo de LaTiNa se dibuja encima con DrawSVG.
2. **500–1000ms**: el círculo se disuelve. Los cutouts entran desde los bordes con stagger y frenan en sus posiciones (`expo.out`).
3. **1000–1400ms**: entra el hero. Handoff, no corte.

Si el sitio ya está cargado, corta y va directo. Skip total con `prefers-reduced-motion`.

### 5.C · Home, sección por sección

#### 5.1 Hero

Video loop full-bleed detrás (nube de yerba en bullet-time, backlit). Cutouts encima. Display:

```
EL MATE CAMBIA
CUANDO CAMBIÁS
LA YERBA          ← "LA YERBA" en outline
```

Reveal por líneas con SplitText, stagger 0.08, `expo.out`. Abajo, hairline con etiquetas: `PADRÓN URUGUAYO ···· 1KG ···· SIN TACC`.

Dos CTAs: `Dónde comprar` (amarillo, primario) y `Quiero distribuir` (outline). **Ambos visibles sin scroll.**

#### 5.2 Manifiesto — outline que se rellena

Fondo `--yerba-oscuro`. Frase corta en display, palabras clave arrancan en outline. Con ScrollTrigger `scrub`, cada palabra se **rellena con una textura de yerba real** (imagen de molienda macro clipeada al texto vía `background-clip: text`, revelada con una máscara animada de abajo hacia arriba).

El texto literalmente se llena de yerba mientras leés que la yerba cambia el mate. Ese es el punto.

#### 5.3 Origen — sticky vertical

Tres momentos: **Sur de Brasil** → **Padrón uruguayo** → **Argentina**.

Columna izquierda sticky con la imagen (crossfade entre las tres, scrubbeado). Columna derecha scrollea con los tres bloques de texto. Un hairline vertical marca el avance.

**No hagas scroll horizontal acá.** El pineo se reserva para 5.5. Nombres de lugares como marcadores, no `01/02/03`.

En mobile: stack simple, imagen arriba de cada bloque.

#### 5.4 La molienda — comparador

Split draggable entre macro de **molienda argentina común** y **molienda padrón LaTiNa**. Mismo encuadre exacto en ambas fotos. Al costado, ficha en Mono:

```
HOJA        fina, alta proporción
PALO        bajo
POLVO       alto — más cuerpo
CEBADAS     sostiene el sabor
```

Esto es el demo de producto. Es lo que ninguna otra yerba muestra.

#### 5.5 La cebada — ELEMENTO FIRMA

Sección pineada. El scroll scrubbea un contador de **1 a 40 mates**. Mientras avanza:

- El mate se vacía y se recarga (secuencia de frames scrubbeada).
- Un indicador de intensidad de color se mantiene alto en vez de caer.
- El contador en display, gigante, centrado.

Cierra con: **`40 mates. El mismo sabor.`**

Único momento de audacia máxima del sitio. Todo lo demás queda quieto para que este pegue. Si hay que sacrificar animación por performance, sacrificá en otro lado.

`prefers-reduced-motion`: estado estático con el número final y el copy. Sin pin, sin scrub.

#### 5.6 Los tres pilares — cards apiladas

Tres cards que se apilan con el scroll, cada una con una **pestaña superior** que lee como una especificación del paquete:

```
┌──── MÁS RENDIMIENTO ────┐
│                          │
│   [copy]                 │
└──────────────────────────┘
    ┌──── PADRÓN URUGUAYO ────┐
    │                          │
```

Cada card entra desde abajo con leve rotación (±1.5°) y se apoya sobre la anterior. Sombra dura, no difusa. La de arriba a full opacidad, las de abajo al 60%.

En mobile: stack normal, sin apilado.

#### 5.7 Dónde comprar (preview)

Buscador de localidad con autocomplete + los 3 distribuidores más cercanos si hay geolocalización (con permiso, fallback a input manual). Botón a `/donde-comprar`. Si no hay nadie cerca: **"Todavía no llegamos a tu ciudad. Pedila online →"** con link a Tienda Nube. Ese fallback es importante, no lo escondas.

#### 5.8 Vendé LaTiNa (cierre)

Bloque de alto contraste. Copy corto, un CTA a `/vende-latina`. Sin formulario acá.

#### 5.9 Footer

Isotipo grande. Nav. Instagram. WhatsApp flotante (mantenelo, funciona). Crédito: `Diseño y desarrollo: Lautaro Mendez`.

### 5.D · Presupuesto de movimiento

Nueve efectos ya son demasiados. **Si agregás uno, sacá otro.** Orden de prioridad si hay que recortar:

1. La Cebada (intocable)
2. Cutouts ambiente
3. Manifiesto outline→fill
4. Load orquestado
5. Comparador de molienda
6. Cards apiladas
7. Origen sticky

---

## 6. Datos y formularios

### Distribuidores

Scrapeá `https://yerbamatelatina.com.ar/donde-comprar/` y armá `src/data/distribuidores.ts`:

```ts
type Distribuidor = {
  id: string
  nombre: string
  provincia: string
  localidad: string
  direccion?: string
  telefono?: string
  instagram?: string
  coords?: [number, number]
}
```

En `/donde-comprar`: filtro por provincia (chips, no dropdown), búsqueda por localidad, resultados en grilla usando el sistema de hairlines + Mono. Si la lista pasa ~80 items, virtualizá.

### Formularios

Server Actions + Zod + Resend. Honeypot + rate limit por IP. Errores específicos ("Falta el teléfono", no "Error al enviar"). Confirmación en la misma página, sin redirect a un `/gracias` vacío.

`/vende-latina`: nombre, apellido, email, teléfono, provincia, tipo de negocio, cómo nos conoció, mensaje.
`/contacto`: nombre, email, mensaje.

---

## 7. Assets — manifest

**Los assets los genero yo aparte y te los paso.** Construí con placeholders en `/public/placeholders/` y dejá los paths finales documentados.

### Cutouts (PNG, fondo transparente, 1200px lado largo)

`hoja-entera.png` · `hoja-partida.png` · `palo.png` · `polvo.png` · `bombilla.png` · `pack-1kg.png` · `pack-500g.png`

### Fotografía

| Path | Qué es | Notas |
|---|---|---|
| `hero-loop.mp4` | Nube de yerba suspendida, bullet-time, backlit | 1920×1080, loop ~6s, webm + mp4 |
| `textura-molienda.jpg` | Macro de molienda para el fill tipográfico | 2400px, textura pareja, sin foco dominante |
| `origen-brasil.jpg` | Yerbal, montañas del sur de Brasil, atardecer | 2400px |
| `origen-uruguay.jpg` | Mate cebado, padrón, macro | 2400px |
| `origen-argentina.jpg` | Ronda de mate, contexto rioplatense | 2400px |
| `molienda-comun.jpg` | Macro extremo, molienda gruesa | 2000px, **mismo encuadre que la siguiente** |
| `molienda-padron.jpg` | Macro extremo, molienda fina | 2000px, **mismo encuadre** |
| `cebada-sequence/` | Mate cebándose, scrubbeable | 60 frames webp |

Todo con `next/image`, `sizes` correctos, LQIP. Video del hero con `poster`, `preload="metadata"`, `playsInline muted loop`.

### Política de placeholders

**Nunca te frenes por un asset que falta.** Si no está:

1. Generá un placeholder del tamaño y aspect ratio exactos (bloque sólido en `--yerba-seca` con el nombre del archivo en Mono encima).
2. Dejá el path final ya escrito en el código, apuntando a `/public/placeholders/`.
3. Anotá el faltante en `ASSETS-PENDIENTES.md` en la raíz, con path, dimensiones y una línea de qué tiene que mostrar.

Reemplazar un placeholder tiene que ser mover un archivo, nada más. Si para reemplazarlo hay que tocar código, lo armaste mal.

---

## 8. Calidad — piso no negociable

- **Lighthouse ≥ 95** Performance en mobile con el hero video. Si no llega, el video degrada a poster estático según `navigator.connection`.
- **LCP < 2.5s** · **CLS < 0.05** · **INP < 200ms**.
- `prefers-reduced-motion` respetado en **todas** las secciones. No es un `if` global: cada sección tiene su estado estático diseñado.
- Foco de teclado visible con estilo propio.
- Navegación completa por teclado.
- Contraste AA en todo texto. `--amarillo` sobre `--papel` no pasa — no lo uses así.
- Los cutouts van con `aria-hidden` y `pointer-events: none`.
- Responsive real hasta 360px.
- Metadata, OG con `next/og`, sitemap, robots.

---

## 9. Cómo quiero que trabajes

### Fase 0 — Plan (NO código)

Devolveme en un solo mensaje:

1. **Tokens finales**: 6 hex con nombre, 3 tipografías con roles, escala tipográfica.
2. **Wireframes en ASCII** de hero, manifiesto y cebada.
3. **El elemento firma** en una frase.
4. **Auto-crítica**: recorré tu plan y marcá qué parte la habrías producido igual para cualquier marca de yerba. Cambiala y decime qué cambiaste y por qué.
5. **Presupuesto de movimiento**: listá los efectos que vas a implementar y justificá cada uno en una línea. Si son más de siete, cortá.

Esperá mi OK antes de la Fase 1.

### Fase 1 — Fundaciones
Scaffold, tokens en Tailwind v4, tipografías, layout, Lenis + GSAP configurados, sistema de hairlines y etiquetas. Home sin animaciones, con estructura y contenido real.

### Fase 2 — Páginas internas
`/donde-comprar` con datos scrapeados y filtros. `/vende-latina` y `/contacto` con formularios andando de punta a punta.

### Fase 3 — Movimiento
En este orden: **Cebada → cutouts → manifiesto → load → molienda → cards → origen.** Si la Cebada no pega, el resto no importa.

### Fase 4 — Pulido
Performance, a11y, meta, 301s, deploy.

### Reglas de proceso

- **No saques screenshots.** No instales Playwright para revisión visual. Terminás una sección, corrés `npm run dev`, me decís qué mirar y en qué ruta, y parás. La revisión visual la hago yo en el browser.
- **No entres en loops de auto-crítica visual.** Una pasada de implementación por sección. Si algo te parece flojo, decímelo en texto en vez de iterarlo solo.
- Un commit por sección.
- Si algo en este brief te parece equivocado, decilo antes de construirlo.
- Si te trabás dos veces con el mismo bug de GSAP, pará y preguntame.
- Antes de dar algo por terminado: mirá la sección y sacale un efecto. El que menos aporte. Siempre hay uno.

---

## 10. Antipatrones

- Marcadores `01 / 02 / 03` en contenido que no es secuencia.
- Gradientes de color. Cualquiera.
- Cards con `border-radius: 16px` y sombra difusa. Eso es un dashboard.
- Fade-in genérico de cada elemento al entrar en viewport.
- Hero con un número grande + label chiquito + tres stats.
- Serif de contraste alto sobre crema con acento terracota.
- Outline tipográfico usado como decoración sin que se rellene o signifique algo.
- Patrones de sitio multiproducto (selectores de variante, carruseles de catálogo, comparadores de SKU). **Hay un producto en dos tamaños, no un catálogo.**
- Copy en neutro. Voseo o nada.
- Cualquier animación que sume más de 100ms al LCP.
