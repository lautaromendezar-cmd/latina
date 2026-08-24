import { Hero } from '@/components/home/Hero'
import { Tira } from '@/components/home/Tira'
import { Manifiesto } from '@/components/home/Manifiesto'
import { Origen } from '@/components/home/Origen'
import { Pilares } from '@/components/home/Pilares'
import { Presentaciones } from '@/components/home/Presentaciones'
import { DondeComprar } from '@/components/home/DondeComprar'
import { CierreB2B } from '@/components/home/CierreB2B'

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
 *   Presentaciones  en qué tamaños existe
 *   Dónde comprar   la conversión de retail (y su fallback, que es el camino más probable)
 *   Cierre B2B      la conversión que hace plata
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
      <Presentaciones />
      <DondeComprar />
      <CierreB2B />
    </>
  )
}
