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
  titulo: [
    { texto: 'El mate cambia', contorno: false },
    { texto: 'cuando cambiás', contorno: false },
    { texto: 'la yerba', contorno: true },
  ],
  // Sin números: no tenemos una cifra de cebadas confirmada y no se
  // inventa una para que la frase suene mejor.
  bajada:
    'Padrón uruguayo: molienda fina, mucho polvo, despalada. Más cuerpo en el primer mate, y el mismo sabor cuando el termo ya va por la mitad.',
  cta: {
    primario: { href: '/donde-comprar', texto: 'Dónde comprar' },
    secundario: { href: '/vende-latina', texto: 'Quiero distribuir' },
  },
  etiquetas: ['Padrón uruguayo', 'Despalada', 'Sin T.A.C.C.', '1 kg y ½ kg'],
  video: {
    // Alt del poster: el video es decorativo, pero el poster carga primero.
    poster: 'Nube de yerba suspendida a contraluz',
  },
} as const

export const manifiesto = {
  antes: 'Cuando cambiás la yerba,',
  despues: 'cambia el mate.',
  // Las dos palabras que se rellenan con la molienda real en Fase 3.
  // Se eligen porque son las dos que están impresas en el envase: el
  // efecto sólo se sostiene si lo que se llena es verificable.
  palabras: ['Padrón', 'Despalada'],
  cierre: 'Con LaTiNa, cambia tu ritual.',
  cuerpo: [
    'El padrón uruguayo es otra molienda. Más hoja, más polvo, sin palo grueso. Del otro lado del río el mate se toma así hace décadas y por algo es.',
    '«Despalada» no es una palabra de marketing: está impresa en el envase. Es el término técnico de sacarle el palo. Menos relleno adentro del paquete es más yerba haciendo el trabajo.',
  ],
} as const

export const origen = {
  etiqueta: 'Origen',
  titulo: 'De las montañas al río',
  // Trayectoria, no geografía: Brasil donde se hace, Uruguay donde se
  // probó el padrón, Argentina donde recién llega. Sin fechas (MARCA.md).
  momentos: [
    {
      id: 'brasil',
      lugar: 'Sur de Brasil',
      titulo: 'Acá se hace',
      cuerpo:
        'Entre montañas, con productores chicos y un secado que no se apura. La yerba sale con el sabor que tenía la hoja, no con el que le deja la máquina.',
      imagen: '/imagenes/origen-brasil.jpg',
      alt: 'Yerbal en las montañas del sur de Brasil al atardecer',
    },
    {
      id: 'uruguay',
      lugar: 'Uruguay',
      titulo: 'Acá se probó',
      cuerpo:
        'Fuimos de los primeros en llevar este padrón a Uruguay, donde el mate se toma con molienda fina y mucho polvo. Ese padrón, el que allá es normal, es el que hoy está adentro del paquete.',
      imagen: '/imagenes/origen-uruguay.jpg',
      alt: 'Mate cebado con molienda fina, macro',
    },
    {
      id: 'argentina',
      lugar: 'Argentina',
      titulo: 'Acá recién llegamos',
      cuerpo:
        'Estamos entrando. Todavía no hay LaTiNa en todas las góndolas del país: hay distribuidores en algunas provincias y una lista que se agranda cada mes. Si en tu ciudad no está, puede ser tu ciudad la próxima.',
      imagen: '/imagenes/origen-argentina.jpg',
      alt: 'Ronda de mate en contexto rioplatense',
    },
  ],
} as const

/**
 * El elemento firma. Reemplaza al "contador de 40 mates" del brief.
 *
 * Motivo (queda escrito acá para que no se pierda): "rinde más" es el
 * claim más disputado de la categoría — lo dicen todas las marcas — y el
 * número 40 no está en MARCA.md, ni en el folleto aprobado, ni en la
 * etiqueta. La sección compara moliendas en vez de afirmar un número, y
 * el conteo queda sin cifra final dura hasta que el cliente la confirme.
 */
export const firma = {
  etiqueta: 'La prueba',
  titulo: 'El mismo mate, dos yerbas',
  bajada:
    'Mismo mate, misma agua, misma mano. Lo único que cambia es lo que hay adentro.',
  lados: [
    {
      id: 'comun',
      etiqueta: 'Yerba con palo',
      descripcion: 'Se lava antes. El sabor se va cayendo cebada a cebada.',
      imagen: '/imagenes/molienda-comun.jpg',
      alt: 'Macro extremo de molienda gruesa con palo',
    },
    {
      id: 'latina',
      etiqueta: 'Padrón despalado',
      descripcion: 'Aguanta. El cuerpo se sostiene hasta el final del termo.',
      imagen: '/imagenes/molienda-padron.jpg',
      alt: 'Macro extremo de molienda fina de padrón uruguayo',
    },
  ],
  contador: {
    unidad: 'Cebadas',
    /**
     * [VERIFICAR: cuántas cebadas sostiene el sabor.]
     *
     * Mientras esto sea null la sección corre con `hastaProvisorio` y deja
     * el aviso a la vista. La cifra no se inventa: el "40" del brief no
     * está en el envase, ni en el folleto aprobado, ni en MARCA.md.
     */
    hasta: null as number | null,
    /** Sólo para que el contador tenga hasta dónde correr. No es un claim. */
    hastaProvisorio: 30,
  },
  ficha: [
    { campo: 'Hoja', valor: 'Fina, alta proporción' },
    { campo: 'Palo', valor: 'Despalada' },
    { campo: 'Polvo', valor: 'Alto — más cuerpo' },
    { campo: 'Cebadas', valor: 'Sostiene el sabor' },
  ],
  cierre: 'No sos vos, es tu yerba.',
} as const

export const pilares = {
  etiqueta: 'Qué la hace distinta',
  items: [
    {
      id: 'rendimiento',
      pestana: 'Más rendimiento',
      titulo: 'Rinde más por paquete',
      cuerpo:
        'Sin palo grueso ocupando lugar, lo que cebás es hoja y polvo. Para el que toma muchos mates por día la diferencia se nota en cuántas veces vuelve a cargar el mate, no en la primera cebada.',
    },
    {
      id: 'padron',
      pestana: 'Padrón uruguayo',
      titulo: 'El padrón que no se consigue acá',
      cuerpo:
        'No es una molienda argentina con otro nombre: es el estándar uruguayo, más fino y con más polvo. Es la única parte de esta yerba que ninguna marca de este lado del río puede copiar.',
    },
    {
      id: 'sintacc',
      pestana: 'Sin T.A.C.C.',
      titulo: 'Libre de gluten, con sello',
      cuerpo:
        'El envase lo dice y lo lleva impreso: yerba mate elaborada despalada, libre de gluten. Apta para celíacos.',
    },
  ],
} as const

/**
 * Las dos presentaciones.
 *
 * Es una franja, no una sección de catálogo: sin selector de variante, sin
 * carrusel, sin precios. Sólo dice que el paquete viene en dos tamaños,
 * porque si no el sitio da a entender que hay uno solo y el ½ kg se pierde.
 */
export const presentacionesCopy = {
  etiqueta: 'El paquete',
  titulo: 'Viene en dos',
  bajada:
    'Las dos son la misma yerba: mismo padrón, misma molienda. Cambia cuánta llevás.',
  ctaTienda: 'Comprar online',
} as const

export const dondeComprarPreview = {
  etiqueta: 'Dónde comprar',
  titulo: '¿Quién te la vende cerca?',
  bajada:
    'Buscá tu localidad. Si todavía no llegamos, te la mandamos igual — o la traés vos a tu ciudad.',
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
  cuerpo:
    'Una yerba que rinde más se repone menos seguido y deja mejor margen por kilo. Escribinos y te pasamos la lista por escala: unidad, funda de 12 kg y palet.',
  cta: { href: '/vende-latina', texto: 'Ver condiciones' },
} as const

export const footer = {
  credito: 'Diseño y desarrollo: Lautaro Mendez',
  creditoUrl: 'https://lautaromendez.com.ar',
  legal: 'Yerba mate elaborada despalada · Industria brasilera · Libre de gluten',
  seguinos: 'Seguinos',
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
    bajada: 'Lo más rápido es WhatsApp. Si preferís escribir, este formulario llega al mismo lugar.',
  },
} as const

export const meta = {
  titulo: 'LaTiNa Yerba Mate · El verdadero sabor del padrón uruguayo',
  descripcion:
    'Yerba mate de padrón uruguayo, despalada y sin T.A.C.C., elaborada en el sur de Brasil. Molienda fina, más cuerpo y más cebadas. Buscá dónde comprarla o sumate como distribuidor.',
  locale: 'es_AR',
} as const
