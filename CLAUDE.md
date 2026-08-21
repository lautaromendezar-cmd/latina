# LaTiNa — reglas de trabajo

El brief completo está en `BRIEF.md`. Leelo antes de tocar nada.
Assets faltantes: `ASSETS-PENDIENTES.md`.

## Revisión visual

- **No saques screenshots.** No instales Playwright para revisión visual.
- Terminás una sección → `npm run dev` → me decís qué ruta mirar → **parás**.
- **Nada de loops de auto-crítica.** Una pasada de implementación por sección. Si algo te parece flojo, decímelo en texto; no lo iteres solo.
- No me devuelvas la sección "revisada y mejorada" por tu cuenta. Espero mi feedback.

## Ritmo

- Un commit por sección, mensaje descriptivo.
- Si te trabás dos veces con el mismo bug, **pará y preguntame**. No parchees a ciegas.
- Si algo del brief te parece equivocado, decilo antes de construirlo.
- No arranques la fase siguiente sin mi OK.

## Stack — no negociable

Next.js 15 App Router · TypeScript strict · Tailwind v4 · GSAP 3.13+ (ScrollTrigger, SplitText, Observer, DrawSVG) · Lenis · Resend

**No instales**: Framer Motion, three.js, shadcn/ui, librerías de carrusel, Playwright.
**No uses canvas ni WebGL.** Profundidad = cutouts PNG + blur + parallax.

## Contenido

- Todo el copy en **castellano rioplatense con voseo**. Nunca neutro.
- Dato que no tenés → `[VERIFICAR: xxx]` y seguís. No inventes claims ni testimonios.
- Dos presentaciones: **1 kg y ½ kg**. No hay más SKUs, no hay variantes, no hay catálogo.
  No importes patrones de sitio multiproducto.

## Piso de calidad

- `prefers-reduced-motion` con estado estático **diseñado** por sección, no un `if` global.
- Contraste AA. `--amarillo` sobre `--papel` no pasa.
- Responsive hasta 360px.
- Cutouts con `aria-hidden` y `pointer-events: none`.

## Antes de dar algo por terminado

Mirá la sección y sacale un efecto. El que menos aporte. Siempre hay uno.
