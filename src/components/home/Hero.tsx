import Image from 'next/image'
import { Boton } from '@/components/ui/Boton'
import { hero } from '@/content/site'
import { HeroTitulo } from '@/components/home/HeroTitulo'

/**
 * Hero.
 *
 * El fondo es el yerbal: monte de araucarias del sur de Brasil con los
 * arbustos de yerba adelante. Es el lugar donde se elabora, no un paisaje
 * de stock. Se mueve con un travelling lentisimo en CSS (`.fondo-vivo`)
 * hasta que exista el video; ese dia se cambia el <Image> por un <video>
 * con este mismo archivo de poster, se borra la clase y no se mueve nada
 * mas.
 *
 * EL VELO NO ES ESTETICA, ES CONTRASTE. Sobre la parte mas clara de la
 * foto, crema necesita que el velo del lado del texto sea verde-profundo:
 * asi la bajada queda en ~5.3:1 en el peor pixel y pasa AA. Del lado
 * derecho el velo se abre hasta transparente, porque ahi no hay texto y
 * el monte se tiene que ver. En telefono no hay "derecha": el texto ocupa
 * todo el ancho, asi que el velo es parejo.
 *
 * A la derecha, el collage, con la logica de la pieza "No sos vos, es tu
 * yerba" del cliente: el producto en el centro y los stickers pisandolo.
 *  · El PAQUETE es el ancla, y esta quieto. Es foto real recortada: es lo
 *    unico del hero con la etiqueta a la vista y la IA le rompe el
 *    microtexto.
 *  · Los DOS STICKERS flotan (clase `.cutout`, la deriva se la pone
 *    CutoutsAmbiente) y salen del arte propio de la marca — se recortaron
 *    de `IMG_4579.PNG`, no se dibujaron de nuevo.
 *
 * Reglas que se mantienen:
 *  · Mide exactamente una pantalla (`h-[100svh]`, red de `min-h` para
 *    telefonos acostados). La tira amarilla es lo primero al scrollear.
 *  · Los dos CTAs visibles SIN scroll, tambien en 360x640.
 *  · En telefono no se muestra el collage: a una columna se le monta al
 *    titulo. El paquete aparece grande en Presentaciones.
 */
export function Hero() {
  return (
    <section
      data-bloque="verde"
      className="relative flex h-[100svh] min-h-[34rem] flex-col overflow-hidden bg-verde-profundo text-crema"
    >
      <Image
        src="/imagenes/hero-yerbal.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="fondo-vivo object-cover object-center"
      />

      {/* Velo, en dos capas: una pareja que lleva la foto al verde de
          marca, y otra que carga la tinta del lado donde va el texto. */}
      <div aria-hidden="true" className="absolute inset-0 bg-verde/32" />
      <div aria-hidden="true" className="absolute inset-0 bg-verde-profundo/74 md:hidden" />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-gradient-to-r from-verde-profundo/94 via-verde-profundo/68 to-transparent md:block"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-4 pb-16 pt-24 sm:px-6 lg:px-10 lg:pt-28">
        {/* El collage. Vive en su propia columna y no en el flujo: asi el
            texto de la izquierda no negocia ancho con el, y a la vez
            tiene el ancho acotado para que los stickers no se le vengan
            encima a los botones. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-2 hidden w-[42%] items-center justify-center pb-16 pt-24 md:flex lg:right-6 lg:pt-28"
        >
          <div className="relative w-[80%] max-w-[290px]">
            {/* El ancla: quieto, derecho, con la sombra dura del sistema. */}
            <Image
              src="/imagenes/cutouts/pack-1kg.png"
              alt=""
              width={960}
              height={1547}
              priority
              sizes="(max-width: 768px) 1px, 24vw"
              className="block h-auto w-full rotate-[3deg] drop-shadow-[12px_12px_0_rgba(11,58,28,0.45)]"
            />

            {/* Los dos stickers, pisando el paquete en diagonal: uno
                arriba a la derecha y otro abajo a la izquierda. Nunca
                sobre la etiqueta — el paquete es lo unico que tiene que
                leerse entero. */}
            <Image
              src="/imagenes/stickers/messi.png"
              alt=""
              width={470}
              height={730}
              priority
              sizes="(max-width: 768px) 1px, 12vw"
              data-plano="frente"
              className="cutout absolute -right-[30%] -top-[6%] w-[54%] rotate-[9deg] drop-shadow-[7px_8px_0_rgba(11,58,28,0.4)]"
            />
            <Image
              src="/imagenes/stickers/mate.png"
              alt=""
              width={364}
              height={536}
              priority
              sizes="(max-width: 768px) 1px, 10vw"
              data-plano="fondo"
              className="cutout absolute -bottom-[4%] -left-[26%] w-[44%] rotate-[-13deg] drop-shadow-[7px_8px_0_rgba(11,58,28,0.4)]"
            />
          </div>
        </div>

        {/* La columna de texto. El tope de ancho lo pone ESTE contenedor y
            no cada hijo: si no, la fila de botones se estira por debajo
            del collage. */}
        <div className="md:max-w-[56%]">
          <HeroTitulo />

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
      </div>
    </section>
  )
}
