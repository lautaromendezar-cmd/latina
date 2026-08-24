# LaTiNa — dónde quedó esto

Última sesión: **24-ago-2026**.

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
tamaño del display del hero. **NO está pusheado**: push a main = deploy.

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
Lighthouse real ahora que entró el video del hero, accesibilidad de punta
a punta, OG con `next/og`, deploy.

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
