import { Hero } from '@/components/home/Hero'
import { Tira } from '@/components/home/Tira'
import { Manifiesto } from '@/components/home/Manifiesto'
import { Origen } from '@/components/home/Origen'
import { Pilares } from '@/components/home/Pilares'
import { DondeComprar } from '@/components/home/DondeComprar'
import { CierreB2B } from '@/components/home/CierreB2B'
import { Redes } from '@/components/home/Redes'

/**
 * Home.
 *
 * Orden pensado como un argumento, no como una lista de secciones:
 *
 *   Hero            la promesa
 *   Tira            la ficha del producto, de un vistazo
 *   Manifiesto      qué significa (padrón, despalada)
 *   Origen          de dónde viene y por qué recién llega
 *   Pilares         los tres argumentos, ya con la prueba vista
 *   Dónde comprar   en qué tamaños viene y quién te la vende (y el fallback,
 *                   que es el camino más probable)
 *   Cierre B2B      la conversión que hace plata
 *   Redes           la salida blanda, después de las dos conversiones
 *
 * La sección "La prueba" —la comparación de las dos moliendas— se eliminó
 * por decisión del cliente. Era el elemento firma del plan original, pero
 * dependía de una toma de foto que no se puede hacer: las dos macros
 * tenían que compartir encuadre exacto y esas fotos no existen. Una
 * sección que no se puede terminar no es un elemento firma, es una deuda.
 *
 * Lo que se perdió queda anotado para no olvidarlo: era el único argumento
 * incopiable del sitio (padrón uruguayo despalado). "Despalada" se sigue
 * diciendo en el manifiesto y en los pilares, pero ya no se demuestra.
 *
 * PRESENTACIONES también se eliminó, y por dos motivos. El bloque tenía
 * un solo dato adentro —viene en dos tamaños— que la tira ya dice, y el
 * paquete ya aparece grande en el hero y cayendo en Pilares: era la
 * tercera vez seguida. Pero sobre todo: `pack-500g.png` era el MISMO
 * ARCHIVO que `pack-1kg.png`, byte por byte, así que la tarjeta del ½ kg
 * mostraba un envase con 1KG impreso. Eso no es un placeholder que se
 * degrada bien, es una afirmación falsa sobre el producto.
 *
 * Lo que servía —los dos gramajes y el botón a la tienda— se mudó al
 * encabezado de Dónde comprar, que es donde se decide comprar. Cuando
 * llegue la foto real del ½ kg, los dos paquetes juntos y en escala vuelven
 * a merecer un momento propio; con una sola foto duplicada, no.
 *
 * Efecto colateral bueno: el sitio vuelve a tener UN SOLO pin, el de
 * Origen, que es lo que el brief pedía desde el principio.
 */
export default function Home() {
  return (
    <>
      {/* El preloader de 2,75s se fue con el rediseño: un sitio juvenil
          abre de una. De paso salda la deuda del presupuesto de
          movimiento (siete efectos con la tira; ahora seis). */}
      <Hero />
      {/* La tira no es parte del hero: el hero mide una pantalla exacta y
          esto es lo primero que aparece al scrollear. */}
      <Tira />
      <Manifiesto />
      <Origen />
      <Pilares />
      <DondeComprar />
      <CierreB2B />
      {/* Va DESPUéS del cierre mayorista y no antes: es una invitación,
          no una conversión, y meterla en el medio le corta el argumento
          a las dos que sí lo son. */}
      <Redes />
    </>
  )
}
