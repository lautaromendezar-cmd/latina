import Image from 'next/image'
import { Greca } from '@/components/ui/Greca'
import { Boton } from '@/components/ui/Boton'
import { hero } from '@/content/site'
import { HeroTitulo } from '@/components/home/HeroTitulo'
import { heroVideoListo } from '@/data/assets'

/**
 * Hero.
 *
 * Reglas que gobiernan esta sección:
 *  · Los dos CTAs tienen que estar visibles SIN scroll, también en 360×640.
 *    Por eso el alto es 100svh (no 100vh: en mobile la barra del browser se
 *    come 60-100px y con vh los botones quedan abajo del pliegue) y el
 *    display tiene el clamp con piso 2rem.
 *  · El velo sobre el video es VERDE, no negro. MARCA.md: nunca fondo
 *    negro puro.
 *  · "La yerba" va en contorno porque en Fase 3 se rellena con el scroll.
 *    Si no se rellenara, iría sólida: contorno sin relleno es decoración.
 *  · Mientras no esté el loop, se muestra el poster como foto fija. El día
 *    que llegue el video se cambia un booleano en assets.ts y nada más.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* --- fondo --- */}
      <div className="absolute inset-0" aria-hidden="true">
        {heroVideoListo ? (
          <video
            className="h-full w-full object-cover"
            poster="/imagenes/hero-poster.jpg"
            preload="metadata"
            playsInline
            muted
            loop
            autoPlay
          >
            <source src="/imagenes/hero-loop.webm" type="video/webm" />
            <source src="/imagenes/hero-loop.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            src="/imagenes/hero-poster.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        {/* Velo verde, no negro (MARCA.md). Un solo plano plano: el brief
            prohíbe gradientes de color, así que el enganche con la sección
            siguiente lo hace la greca, no un degradé. */}
        <div className="absolute inset-0 bg-yerba-oscuro/72" />
      </div>

      {/* --- cutouts ---
          Van DENTRO del mismo contenedor centrado de 1400px que el texto.
          Antes estaban posicionados contra el ancho completo de la ventana,
          así que en una pantalla grande el paquete se despegaba del marco y
          dejaba de leerse como parte de la misma composición que el título. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="relative mx-auto h-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Image
            src="/imagenes/cutouts/hoja-entera.png"
            alt=""
            width={1000}
            height={1200}
            sizes="20vw"
            data-plano="fondo"
            className="cutout cutout--fondo absolute hidden md:block md:left-0 md:top-[6%] md:w-[22vw] md:max-w-[200px] lg:left-2 lg:w-[15vw]"
          />
        </div>
      </div>

      {/* --- contenido ---
          Desde tablet el texto se queda en su columna (66% del marco) en vez
          de correr a lo ancho: si no, el título pasa por debajo del paquete
          y las dos cosas se pelean el mismo lugar. */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-4 pb-8 pt-24 sm:px-6 lg:px-10 lg:pt-28">
        {/* El paquete vive DENTRO de esta caja y se centra con flexbox
            contra ella. Es el mismo centro óptico que usa el texto: la
            sección entera no sirve de referencia porque arriba tiene el nav
            y abajo la banda de especificaciones, así que su centro cae más
            alto que el del contenido.

            En teléfono no se muestra: a 360px hay una sola columna y el
            paquete, en cualquier tamaño útil, se le monta al título o a los
            botones. El producto igual aparece en grande más abajo. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-4 hidden items-center pb-8 pt-24 sm:right-6 md:flex lg:right-10 lg:pt-28"
        >
          <Image
            src="/imagenes/cutouts/pack-1kg.png"
            alt=""
            width={960}
            height={1547}
            priority
            sizes="(max-width: 768px) 1px, (max-width: 1024px) 30vw, 26vw"
            data-plano="frente"
            className="cutout cutout--frente w-[30vw] max-w-[240px] lg:w-[26vw] lg:max-w-[340px]"
          />
        </div>

        <div className="md:max-w-[66%]">
          <HeroTitulo />
        </div>

        <p className="mt-8 max-w-[42ch] text-body-lg text-papel-suave">{hero.bajada}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Boton href={hero.cta.primario.href} variante="primario">
            {hero.cta.primario.texto}
          </Boton>
          <Boton href={hero.cta.secundario.href} variante="secundario">
            {hero.cta.secundario.texto}
          </Boton>
        </div>
      </div>

      {/* --- pie: la banda de especificaciones ---
          Dorada y quieta. Es el corte de color que la home necesitaba —
          venía siendo siete secciones verdes seguidas— y es el mismo
          recurso que usa el folleto, que alterna oro, crema y verde.

          Quieta y no una tira que scrollea: acá viven las cuatro
          especificaciones del producto, y es el único lugar del sitio
          donde la legibilidad le gana al efecto. Moverlas las hace más
          difíciles de leer, no más vistosas. Además una tira infinita es
          el elemento más templado de la web de estos años, y contenido en
          movimiento automático que dura más de 5s necesita un control de
          pausa por accesibilidad.

          El separador es la greca del packaging, en verde sobre el oro
          (5.11:1). El texto va en yerba-oscuro (9.99:1). */}
      <div className="relative z-10 mt-auto bg-dorado text-yerba-oscuro">
        <Greca tono="verde" alto={12} opacidad={0.55} />
        <ul className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-7 gap-y-2 px-4 py-4 sm:px-6 lg:gap-x-16 lg:px-10">
          {hero.etiquetas.map((e, i) => (
            <li key={e} className="flex items-center gap-x-7 lg:gap-x-16">
              {i > 0 && (
                <span aria-hidden="true" className="hidden text-verde/60 lg:inline">
                  ◇
                </span>
              )}
              <span className="etiqueta font-semibold">{e}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
