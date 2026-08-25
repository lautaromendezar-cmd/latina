import Image from 'next/image'
import { Boton } from '@/components/ui/Boton'
import { hero } from '@/content/site'
import { HeroTitulo } from '@/components/home/HeroTitulo'
import { HeroVideo } from '@/components/home/HeroVideo'

/**
 * Hero.
 *
 * El fondo es el tucan sobre el monte al atardecer, elegido de una
 * referencia del propio cliente (el mismo tucan aparece en sus piezas de
 * Instagram). Antes era el yerbal de araucarias del sur de Brasil, que era
 * mas fiel al LUGAR donde se elabora; este es mas fiel al lenguaje visual
 * de la MARCA. Gano la marca, y esta bien que gane.
 *
 * YA ES EL VIDEO. El travelling en CSS (`.fondo-vivo`) que lo reemplazaba
 * se borro junto con la clase, como estaba previsto: el tucan entra por la
 * izquierda, cruza el cuadro y sale. El loop cierra solo porque el primer
 * cuadro y el ultimo son el monte vacio.
 *
 * De paso mejora lo del paquete del pico. En la foto fija media el 11% del
 * ancho —unos 210px en una pantalla de 1920— con la etiqueta generada y
 * rota. En el video el tucan vuela mas lejos y en movimiento, asi que el
 * paquete es chico y nunca esta quieto: la etiqueta deja de ser algo que
 * se pueda leer.
 *
 * MOVIMIENTO REDUCIDO SIN JAVASCRIPT. Los dos <source> llevan
 * `media="(prefers-reduced-motion: no-preference)"`. Si el visitante pidio
 * no moverse, ninguna fuente coincide, el navegador no elige ninguna y no
 * DESCARGA el video: se queda el poster. Es el estado estatico disenado,
 * gratis y sin un `if` de cliente.
 *
 * El poster es EL CUADRO CERO del video, no la foto suelta: cualquier otra
 * imagen daria un salto en el instante en que arranca la reproduccion.
 * Tambien es lo que pinta el LCP, por eso pesa 66 KB y el video va con
 * `preload="metadata"`: primero se ve, despues se mueve.
 *
 * EL VELO ES NEGRO Y PAREJO, y eso es un cambio de criterio.
 *
 * Antes eran tres capas de verde: una pareja que llevaba la foto al color
 * de marca y un degrade que cargaba la tinta del lado del texto. Funcionaba
 * para el contraste, pero convertia la foto en un monocromo verde: el
 * atardecer naranja, las montanas azules y el tucan desaparecian. El velo
 * estaba haciendo dos trabajos —dar contraste y pintar de marca— y el
 * segundo se comia a la foto.
 *
 * Ahora hace uno solo. Negro puro al 60%, igual en todo el cuadro: baja la
 * luz sin tocar el tono, asi que la foto conserva sus colores y el hero
 * pasa a ser foto + tipografia. La marca la ponen el amarillo del remate y
 * el del boton, que es donde tiene que estar.
 *
 * EL NUMERO NO ES A OJO. El pixel mas claro de la zona donde vive el texto
 * es 255,248,232 —casi blanco puro—, y su luminancia es 0.942. Para que
 * crema pase AA encima (4.5:1) el fondo tiene que quedar en 0.176 o menos:
 *
 *   negro al 50% -> 4.03:1   NO pasa
 *   negro al 55% -> 4.81:1   pasa raspando
 *   negro al 60% -> 5.80:1   pasa comodo
 *
 * Por eso 60 y no 50. Si alguna vez se aclara, hay que rehacer la cuenta
 * contra la foto que este puesta: cada imagen tiene su propio pixel peor.
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
 *
 * EN TELEFONO EL LAYOUT ES OTRO, y sale de mirar el video cuadro por
 * cuadro: el tucan vuela por la BANDA SUPERIOR del encuadre (el 45% de
 * arriba), y como en un telefono el recorte de object-cover conserva
 * todo el alto, esa banda es la misma en pantalla. El texto centrado le
 * caia justo encima del vuelo. Entonces:
 *
 *  · El bloque de texto va AL PIE (justify-end abajo de md): la mitad
 *    superior queda libre para el tucan y el atardecer, y el espacio
 *    muerto que habia abajo lo ocupa el contenido.
 *  · El collage aparece tambien en telefono, mas chico, arriba del
 *    titulo y a la derecha, con la misma deriva (.cutout). SOLO si el
 *    viewport tiene alto para pagarlo: por debajo de 50rem se esconde
 *    (`.hero-collage-movil` en globals.css, la cuenta esta ahi), porque
 *    los CTAs sin scroll son regla y el collage es lo primero que se
 *    sacrifica. El tucan le pasa por atras un instante por bucle; un
 *    cutout pisando el fondo es lenguaje del collage, no un texto
 *    ilegible.
 */
export function Hero() {
  return (
    <section
      data-bloque="verde"
      className="relative flex h-[100svh] min-h-[34rem] flex-col overflow-hidden bg-verde-profundo text-crema"
    >
      {/* El video vive en un componente cliente por el autoplay de iOS:
          la historia entera esta contada en HeroVideo.tsx. */}
      <HeroVideo />

      {/* Velo: UNA capa de negro pareja, y nada de verde.
          Ver la nota de arriba para el porqué y para el número. */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-end px-4 pb-10 pt-24 sm:px-6 md:justify-center md:pb-16 lg:px-10 lg:pt-28">
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
          {/* El collage de telefono: el mismo trio que el de desktop, en
              chico y en flujo, arriba del titulo y a la derecha. Mismos
              archivos (ya estan en cache) y misma deriva por .cutout.
              `.hero-collage-movil` lo esconde en pantallas bajas y de md
              para arriba, donde manda la columna de la derecha. */}
          <div aria-hidden="true" className="hero-collage-movil pointer-events-none mb-5 justify-end pr-3">
            <div className="relative w-[8.5rem]">
              <Image
                src="/imagenes/cutouts/pack-1kg.png"
                alt=""
                width={960}
                height={1547}
                sizes="(min-width: 768px) 1px, 40vw"
                className="block h-auto w-full rotate-[3deg] drop-shadow-[8px_8px_0_rgba(11,58,28,0.45)]"
              />
              <Image
                src="/imagenes/stickers/messi.png"
                alt=""
                width={470}
                height={730}
                sizes="(min-width: 768px) 1px, 22vw"
                data-plano="frente"
                className="cutout absolute -right-[28%] -top-[7%] w-[54%] rotate-[9deg] drop-shadow-[5px_6px_0_rgba(11,58,28,0.4)]"
              />
              <Image
                src="/imagenes/stickers/mate.png"
                alt=""
                width={364}
                height={536}
                sizes="(min-width: 768px) 1px, 18vw"
                data-plano="fondo"
                className="cutout absolute -bottom-[5%] -left-[24%] w-[44%] rotate-[-13deg] drop-shadow-[5px_6px_0_rgba(11,58,28,0.4)]"
              />
            </div>
          </div>

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
