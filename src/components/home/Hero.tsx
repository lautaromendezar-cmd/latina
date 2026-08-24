import Image from 'next/image'
import { Boton } from '@/components/ui/Boton'
import { TexturaGreca } from '@/components/ui/TexturaGreca'
import { hero } from '@/content/site'
import { HeroTitulo } from '@/components/home/HeroTitulo'

/**
 * Hero — rediseño diurno.
 *
 * El hero anterior era la nube de yerba a contraluz sobre verde oscuro y
 * el cliente lo leyó como una radiografía. Este es el lenguaje de las
 * piezas de Instagram: bloque de verde pasto, título condensado en caps
 * con la línea clave en amarillo, y el PAQUETE como protagonista — el
 * blanco del envase reventando sobre el verde, igual que en los posteos.
 *
 * Reglas que se mantienen del sistema anterior:
 *  · Mide exactamente una pantalla (`h-[100svh]`, red de `min-h` para
 *    teléfonos acostados). La tira amarilla es lo primero al scrollear.
 *  · Los dos CTAs visibles SIN scroll, también en 360×640.
 *  · En teléfono el paquete no se muestra: a una columna se le monta al
 *    título. Aparece grande en Presentaciones.
 */
export function Hero() {
  return (
    <section
      data-bloque="verde"
      className="relative flex h-[100svh] min-h-[34rem] flex-col overflow-hidden bg-verde text-crema"
    >
      {/* La greca del packaging como trama, apenas: saca el plano sin
          leerse como empapelado. */}
      <TexturaGreca tono="verde-vivo" escala={120} opacidad={0.16} />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-4 pb-16 pt-24 sm:px-6 lg:px-10 lg:pt-28">
        {/* El paquete: derecho, grande, con una inclinación de sticker.
            La deriva se la pone CutoutsAmbiente por la clase .cutout. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-4 hidden items-center pb-16 pt-24 sm:right-6 md:flex lg:right-10 lg:pt-28"
        >
          <Image
            src="/imagenes/cutouts/pack-1kg.png"
            alt=""
            width={960}
            height={1547}
            priority
            sizes="(max-width: 768px) 1px, (max-width: 1024px) 32vw, 28vw"
            data-plano="frente"
            className="cutout cutout--frente w-[32vw] max-w-[260px] rotate-[4deg] drop-shadow-[10px_10px_0_rgba(11,58,28,0.35)] lg:w-[28vw] lg:max-w-[380px]"
          />
        </div>

        <div className="md:max-w-[62%]">
          <HeroTitulo />
        </div>

        <p data-hero-entra className="mt-7 max-w-[38ch] text-body-lg font-semibold">
          {hero.bajada}
        </p>

        <div data-hero-entra className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <Boton href={hero.cta.primario.href} variante="primario">
            {hero.cta.primario.texto}
          </Boton>
          <Boton href={hero.cta.secundario.href} variante="secundario">
            {hero.cta.secundario.texto}
          </Boton>
        </div>
      </div>
    </section>
  )
}
