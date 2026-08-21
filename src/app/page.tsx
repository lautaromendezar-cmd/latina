import { Hero } from '@/components/home/Hero'
import { Manifiesto } from '@/components/home/Manifiesto'
import { Origen } from '@/components/home/Origen'
import { Firma } from '@/components/home/Firma'
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
 *   Manifiesto      qué significa (padrón, despalada)
 *   Origen          de dónde viene y por qué recién llega
 *   Firma           la prueba: los dos mates ← el único momento de audacia
 *   Pilares         los tres argumentos, ya con la prueba vista
 *   Presentaciones  en qué tamaños existe
 *   Dónde comprar   la conversión de retail (y su fallback, que es el camino más probable)
 *   Cierre B2B      la conversión que hace plata
 *
 * Fase 1: estructura y contenido real, sin animaciones. El movimiento
 * entra en Fase 3 y en este orden: firma → cutouts → manifiesto → load →
 * origen. Si la firma no pega, el resto no importa.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Manifiesto />
      <Origen />
      <Firma />
      <Pilares />
      <Presentaciones />
      <DondeComprar />
      <CierreB2B />
    </>
  )
}
