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
            src="/imagenes/cutouts/pack-1kg.png"
            alt=""
            width={960}
            height={1547}
            priority
            sizes="(max-width: 1024px) 42vw, 30vw"
            data-plano="frente"
            className="cutout cutout--frente right-4 top-[16%] w-[42vw] max-w-[380px] sm:right-6 lg:right-10 lg:top-[13%] lg:w-[30vw]"
          />
          <Image
            src="/imagenes/cutouts/hoja-entera.png"
            alt=""
            width={1000}
            height={1200}
            sizes="20vw"
            data-plano="fondo"
            className="cutout cutout--fondo left-0 top-[6%] w-[34vw] max-w-[260px] lg:left-2 lg:w-[15vw]"
          />
        </div>
      </div>

      {/* --- contenido --- */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-4 pb-8 pt-24 sm:px-6 lg:px-10 lg:pt-28">
        <HeroTitulo />

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

      {/* --- pie: la greca del packaging con las especificaciones --- */}
      <div className="relative z-10 mt-auto bg-yerba-oscuro">
        <Greca tono="dorado" alto={12} opacidad={0.5} />
        <ul className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-7 gap-y-2 px-4 py-4 sm:px-6 lg:gap-x-16 lg:px-10">
          {hero.etiquetas.map((e) => (
            <li key={e} className="etiqueta text-papel">
              {e}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
