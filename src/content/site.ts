/**
 * Toda la copy del sitio vive acá, fuera de los componentes.
 *
 * Motivo: el brief pide dejar preparado `/br` (portugués) sin construirlo.
 * Mientras haya un solo idioma esto es un objeto plano; cuando entre el
 * segundo, se convierte en `es.ts` / `pt.ts` con la misma forma y ningún
 * componente cambia.
 *
 * Reglas de escritura, del brief y de MARCA.md:
 *   · Castellano rioplatense con voseo. Nunca neutro.
 *   · Nada de "experiencia única", "pasión por el mate", "tradición y calidad".
 *   · Cero emojis.
 *   · Dato que no tenemos → [VERIFICAR: xxx]. No se inventan claims.
 *   · Sin año de fundación ni fechas: la marca no publica uno.
 */

export const marca = {
  nombre: 'LaTiNa',
  nombreLargo: 'LaTiNa Yerba Mate',
  slogan: 'El verdadero sabor del padrón uruguayo.',
  descripcionCorta:
    'Yerba mate de padrón uruguayo, despalada, elaborada en el sur de Brasil.',
} as const

export const contacto = {
  whatsapp: '3446 31-3763',
  whatsappE164: '5493446313763',
  instagram: 'latinayerbamate',
  instagramUrl: 'https://www.instagram.com/latinayerbamate/',
  sitio: 'yerbamatelatina.com.ar',
  // La venta online se muda a Tienda Nube en subdominio.
  tienda: 'https://tienda.yerbamatelatina.com.ar',
  // [VERIFICAR: mail de contacto — la marca no tiene uno público, y las
  // Server Actions de Resend necesitan un destinatario real.]
  email: null,
} as const

export const nav = {
  principal: [
    { href: '/donde-comprar', texto: 'Dónde comprar' },
    { href: '/vende-latina', texto: 'Vendé LaTiNa' },
    { href: '/contacto', texto: 'Contacto' },
  ],
  externo: { href: contacto.tienda, texto: 'Tienda' },
  saltarAlContenido: 'Saltar al contenido',
  abrirMenu: 'Abrir el menú',
  cerrarMenu: 'Cerrar el menú',
} as const

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  // Reordenamiento de la frase madre del cliente:
  // "Cuando cambiás la yerba, cambia el mate."
  //
  // `destacada`: la línea que va en amarillo, el gesto de las piezas de IG.
  // `manuscrita`: la línea que sale de la condensada y se escribe a mano.
  //   La regla es UNA por sección como mucho y siempre sobre el remate de
  //   una frase (hoy: hero, manifiesto y Dónde comprar). Suelta o repetida
  //   deja de ser un gesto y pasa a ser una fuente más.
  //
  titulo: [
    { texto: 'El mate cambia', destacada: false, manuscrita: false },
    { texto: 'cuando cambiás', destacada: false, manuscrita: false },
    { texto: 'la yerba', destacada: true, manuscrita: true },
  ],
  // Sin números: no tenemos una cifra de cebadas confirmada y no se
  // inventa una para que la frase suene mejor.
  bajada:
    'Molienda fina, mucho polvo, cero palo: padrón uruguayo. Más cuerpo en el primer mate y en el último del termo.',
  cta: {
    primario: { href: '/donde-comprar', texto: 'Dónde comprar' },
    secundario: { href: '/vende-latina', texto: 'Quiero distribuir' },
  },
} as const

/* ------------------------------------------------------------------ */
/* La tira                                                             */
/*                                                                     */
/* Las especificaciones vivían en una banda quieta al pie del hero.    */
/* Ahora son una sección propia entre el hero y el manifiesto: el hero */
/* mide exactamente una pantalla y la tira es lo primero que aparece   */
/* al scrollear.                                                       */
/*                                                                     */
/* Los seis ítems ya estaban escritos: cuatro venían de la banda y los */
/* otros dos salen de `marca.descripcionCorta` y de `hero.bajada`.     */
/* Ninguno es un claim nuevo.                                          */
/* ------------------------------------------------------------------ */

export const tira = {
  items: [
    'Padrón uruguayo',
    'Despalada',
    'Molienda fina',
    'Sin T.A.C.C.',
    '1 kg y ½ kg',
    'Elaborada en el sur de Brasil',
  ],
  pausar: 'Pausar la tira',
  reanudar: 'Reanudar la tira',
} as const

export const manifiesto = {
  // La frase madre del cliente, entera y partida en renglones.
  //
  // El remate va MANUSCRITO y en amarillo: la misma logica que
  // "la yerba" en el hero. La regla es una por seccion como mucho,
  // siempre sobre el REMATE de una frase y nunca sobre una palabra
  // suelta (hoy la usan el hero, este manifiesto y Donde comprar): si
  // se usa en cualquier lado deja de ser un gesto y pasa a ser una
  // fuente mas.
  frase: ['Cuando cambiás', 'la yerba, cambia'],
  remate: 'el mate.',
  // La ronda. Foto REAL del cliente, no de un banco: cuatro pibes
  // cebando en una rampa al atardecer, con el paquete apoyado al
  // borde. Es lo mas cerca que tiene la marca de mostrar a quien le
  // habla.
  foto: {
    src: '/imagenes/manifiesto-ronda.webp',
    alt: 'Cuatro amigos sentados en una rampa de skate al atardecer, cebando un mate, con un paquete de LaTiNa apoyado al lado',
  },
  cuerpo: [
    'El padrón uruguayo es otra molienda. Más hoja, más polvo, sin palo grueso. Del otro lado del río el mate se toma así hace décadas y por algo es.',
    '«Despalada» no es una palabra de marketing: está impresa en el envase. Es el término técnico de sacarle el palo. Menos relleno adentro del paquete es más yerba haciendo el trabajo.',
  ],
  // Estaban escritas a mano adentro del componente, que es justo lo
  // que este archivo existe para evitar.
  etiquetas: ['El padrón', 'La palabra'],
  cierre: 'Con LaTiNa, cambia tu ritual.',
} as const

export const origen = {
  etiqueta: 'Origen',
  // El titulo de la seccion se elimino: los tres momentos ya dicen cada
  // uno donde estan, y "De las montanas al rio" competia con ellos desde
  // una esquina. La etiqueta quedo de encabezado.
  // Trayectoria, no geografía: Brasil donde se hace, Uruguay donde se
  // probó el padrón, Argentina donde recién llega. Sin fechas (MARCA.md).
  momentos: [
    {
      id: 'brasil',
      lugar: 'Sur de Brasil',
      titulo: 'Acá se hace',
      cuerpo:
        'Entre montañas, con productores chicos y un secado que no se apura. La yerba sale con el sabor que tenía la hoja, no con el que le deja la máquina.',
      imagen: '/imagenes/origen/brasil.jpg',
      alt: 'Yerbales en terrazas sobre las montañas del sur de Brasil, con niebla en el valle',
    },
    {
      id: 'uruguay',
      lugar: 'Uruguay',
      titulo: 'Acá se probó',
      cuerpo:
        'Fuimos de los primeros en llevar este padrón a Uruguay, donde el mate se toma con molienda fina y mucho polvo. Ese padrón, el que allá es normal, es el que hoy está adentro del paquete.',
      imagen: '/imagenes/origen/uruguay.jpg',
      alt: 'Campo uruguayo al atardecer, con un ombú y el Río de la Plata al fondo',
    },
    {
      id: 'argentina',
      lugar: 'Argentina',
      titulo: 'Acá recién llegamos',
      cuerpo:
        'Estamos entrando. Todavía no hay LaTiNa en todas las góndolas del país: hay distribuidores en algunas provincias y una lista que se agranda cada mes. Si en tu ciudad no está, puede ser tu ciudad la próxima.',
      imagen: '/imagenes/origen/argentina.jpg',
      alt: 'Ruta vacía cruzando la pampa argentina al amanecer',
    },
  ],
} as const

export const pilares = {
  etiqueta: 'Qué la hace distinta',
  titulo: 'Por qué cambia el mate',
  // El paquete en el centro y los tres claims orbitandolo. Es foto
  // real recortada, como en el hero: es lo unico con la etiqueta a la
  // vista y la IA le rompe el microtexto.
  producto: {
    imagen: '/imagenes/cutouts/pack-1kg.png',
    alt: 'Paquete de LaTiNa de 1 kg de yerba mate elaborada despalada',
  },
  // `chip` es lo que va en la pastilla que flota: corto, de un
  // vistazo. `titulo` y `cuerpo` son la lectura, abajo. No repiten
  // palabras entre si a proposito: el chip no es el titulo abreviado.
  items: [
    {
      id: 'rendimiento',
      chip: 'Más rendimiento',
      titulo: 'Rinde más por paquete',
      cuerpo:
        'Sin palo grueso ocupando lugar, lo que cebás es hoja y polvo. Para el que toma muchos mates por día la diferencia se nota en cuántas veces vuelve a cargar el mate, no en la primera cebada.',
    },
    {
      id: 'padron',
      chip: 'Padrón uruguayo',
      titulo: 'El padrón que no se consigue acá',
      cuerpo:
        'No es una molienda argentina con otro nombre: es el estándar uruguayo, más fino y con más polvo. Es la única parte de esta yerba que ninguna marca de este lado del río puede copiar.',
    },
    {
      id: 'sintacc',
      chip: 'Sin T.A.C.C.',
      titulo: 'Libre de gluten, con sello',
      cuerpo:
        'El envase lo dice y lo lleva impreso: yerba mate elaborada despalada, libre de gluten. Apta para celíacos.',
    },
  ],
  // Lo que orbita con los chips, ademas del paquete.
  //
  // Era esto y el sello SIN GLUTEN, que salio: decia exactamente lo
  // mismo que el chip 'Sin T.A.C.C.' que tiene al lado, y encima el
  // sello ya esta impreso en el envase, o sea que estaba tres veces en
  // el mismo cuadro.
  orbita: [{ src: '/imagenes/cutouts/polvo.png', ancho: 1200, alto: 800 }],
} as const

export const dondeComprarPreview = {
  // La etiqueta y la bajada que habia aca se fueron con la seccion
  // adelgazada: la etiqueta decia lo mismo que el titulo y la bajada
  // explicaba el fallback antes de que pase. No quedan como campos
  // muertos porque un campo que existe alguien lo vuelve a renderizar.
  //
  // El titulo se parte para que el remate vaya manuscrito, igual que en
  // el hero y en el manifiesto. El texto no cambio: es la misma
  // pregunta, escrita en dos registros.
  titulo: '¿Quién te la vende',
  tituloRemate: 'cerca?',
  // Lo que quedo de la seccion Presentaciones, que se elimino. Los dos
  // gramajes salen de `data/producto.ts`; esto es lo que los acompana.
  presentaciones: {
    etiqueta: 'Viene en dos',
    nota:
      'Las dos son la misma yerba: mismo padrón, misma molienda. Cambia cuánta llevás.',
    cta: 'Comprar online',
  },
  placeholderBusqueda: 'Escribí tu localidad',
  etiquetaBusqueda: 'Buscá tu localidad',
  verTodos: 'Ver todos los puntos de venta',
  // El estado que más se va a ver: cubrimos 8 provincias de 23.
  // Por eso está escrito antes que el estado de éxito, y no escondido.
  sinResultados: {
    titulo: 'Todavía no llegamos a tu ciudad.',
    cuerpo: 'Hay dos formas de tomar LaTiNa igual.',
    opciones: [
      {
        id: 'online',
        titulo: 'Pedila online',
        cuerpo: 'Te llega a cualquier punto del país.',
        cta: 'Ir a la tienda',
        href: contacto.tienda,
        externo: true,
      },
      {
        id: 'distribuir',
        titulo: 'Traela vos',
        cuerpo: 'Si tenés un comercio, podés ser el primero que la venda acá.',
        cta: 'Quiero distribuir',
        href: '/vende-latina',
        externo: false,
      },
    ],
  },
} as const

export const cierreB2B = {
  etiqueta: 'Mayoristas',
  titulo: 'Vendé LaTiNa',
  // Sin enumerar las escalas: la escalera está justo abajo y tiene CUATRO
  // peldaños — la versión anterior nombraba tres y se contradecía sola.
  cuerpo:
    'Una yerba que rinde más se repone menos seguido y deja mejor margen por kilo. Escribinos y te pasamos la lista por escala, de la unidad al palet.',
  cta: { href: '/vende-latina', texto: 'Ver condiciones' },
  // La pieza es del propio cliente: tres pibes riendose y el paquete
  // adentro de los anteojos. Es el argumento B2B dicho al reves — no
  // "compranos", sino "esto te lo van a pedir".
  foto: {
    src: '/imagenes/vende-latina.webp',
    alt:
      'Tres personas jovenes riendose; el del medio tiene anteojos de sol donde se refleja un paquete de LaTiNa',
  },
  escalasEtiqueta: 'Escalas de compra · paquete de 1 kg',
  escalasNota: 'El ½ kg no tiene precio mayorista.',
} as const

/* ------------------------------------------------------------------ */
/* Redes                                                               */
/*                                                                     */
/* El muro son piezas REALES del Instagram de la marca, sacadas de     */
/* `pdf-latina/latina-material`. No son placeholders ni banco de       */
/* imagenes: por eso el cuerpo puede decir que lo que se ve al lado    */
/* salio de ahi.                                                       */
/* ------------------------------------------------------------------ */

export const redes = {
  etiqueta: 'Instagram',
  titulo: 'Seguinos en Instagram',
  // "Acá" y no "acá al lado": en teléfono el muro queda ARRIBA del texto,
  // no al lado, y la frase tiene que funcionar en los dos layouts.
  cuerpo:
    'Ahí se cuenta primero a dónde está llegando y quién la está tomando. Todo lo que ves acá salió de ese Instagram.',
  cta: 'Ver el Instagram',
  // El muro se mueve solo y adentro hay TEXTO: sin control de pausa
  // no cumple WCAG 2.2.2, la misma regla que hizo que la tira
  // tuviera boton.
  pausar: 'Pausar el muro',
  reanudar: 'Reanudar el muro',
  posteos: [
    { src: '/imagenes/redes/01.webp', alt: 'Pieza de la marca: un pibe saltando en skate sobre una pila de paquetes de LaTiNa' },
    { src: '/imagenes/redes/02.webp', alt: 'Pieza de la marca con la frase «No sos vos, es tu yerba» y el paquete de 1 kg' },
    { src: '/imagenes/redes/03.webp', alt: 'Pieza de la marca: «Buenos días» sobre un mate dibujado en amarillo' },
    { src: '/imagenes/redes/04.webp', alt: 'Pieza de la marca: el paquete de LaTiNa con la leyenda «padrón uruguayo»' },
    { src: '/imagenes/redes/05.webp', alt: 'Foto de la marca: un mate en la mano dentro de un auto, con la pregunta «¿Viajás?»' },
    { src: '/imagenes/redes/06.webp', alt: 'Pieza de la marca: el paquete de LaTiNa sobre un paisaje de monte al atardecer' },
    { src: '/imagenes/redes/07.webp', alt: 'Foto de la marca: termo, mate y alfajores sobre una mesa oscura' },
    { src: '/imagenes/redes/08.webp', alt: 'Foto de la marca: alguien cebando un mate con un termo' },
    { src: '/imagenes/redes/09.webp', alt: 'Pieza de la marca: el logotipo de LaTiNa sobre un fondo verde con rayos' },
    { src: '/imagenes/redes/10.webp', alt: 'Foto de la marca: primer plano de un mate cebado con molienda fina' },
  ],
} as const

export const footer = {
  credito: 'Diseño y desarrollo: Lautaro Mendez',
  creditoUrl: 'https://lautaromendez.com.ar',
  // La linea legal NO vive aca: el footer la arma desde `data/producto.ts`
  // (etiqueta del envase), que es la unica fuente de lo que dice el envase.
  escribinos: 'Escribinos',
} as const

/* ------------------------------------------------------------------ */
/* Páginas internas — Fase 2                                           */
/* ------------------------------------------------------------------ */

export const paginas = {
  dondeComprar: {
    titulo: 'Dónde comprar',
    bajada:
      'Estos son los puntos que hoy tienen LaTiNa. La lista se actualiza a mano, así que si sabés de uno que falta, avisanos.',
  },
  vendeLatina: {
    titulo: 'Vendé LaTiNa',
    bajada:
      'Precio por escala, funda de 12 kg y palet. Contanos qué comercio tenés y te pasamos la lista al día.',
  },
  contacto: {
    titulo: 'Contacto',
    // Sin "lo más rápido es WhatsApp": esa frase es el título de la
    // sección de canales, media pantalla más abajo, y la página la decía
    // dos veces casi textual. La bajada presenta los canales; el ranking
    // lo hace la sección. (También es la meta description de /contacto,
    // por eso no dice "acá abajo".)
    bajada: 'Escribinos por WhatsApp, por Instagram o con el formulario: todo llega al mismo teléfono.',
  },
} as const

export const meta = {
  titulo: 'LaTiNa Yerba Mate · El verdadero sabor del padrón uruguayo',
  descripcion:
    'Yerba mate de padrón uruguayo, despalada y sin T.A.C.C., elaborada en el sur de Brasil. Molienda fina, más cuerpo y más cebadas. Buscá dónde comprarla o sumate como distribuidor.',
  locale: 'es_AR',
} as const
