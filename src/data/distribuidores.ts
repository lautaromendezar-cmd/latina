export type Distribuidor = {
  id: string
  nombre: string
  provincia: string
  localidad: string
  direccion?: string
  telefono?: string
  instagram?: string
}

// Fuentes, en orden de autoridad:
//
//  1. "Puntos de Venta.pdf" que trajo el cliente (26-08-2026). Es la lista
//     oficial y cubre Entre Ríos (Gualeguaychú y alrededores, sobre todo),
//     CABA, Córdoba y Jujuy. Se transcribió entera, tal cual, corrigiendo
//     sólo mayúsculas y tildes; los datos que el PDF no informa se omiten.
//  2. El relevo viejo de https://yerbamatelatina.com.ar/donde-comprar/
//     (20-08-2026), que era la única fuente hasta ahora. Se CONSERVAN de ahí
//     únicamente los distribuidores de zonas que el PDF no cubre (interior
//     de Buenos Aires, La Pampa, Misiones, Santa Fe, Tucumán, Chubut) y
//     algún teléfono/Instagram de puntos que el PDF repite sin ese dato.
//     Donde el PDF y el relevo nombran el mismo punto, manda el PDF.
//
// El PDF confirmó una errata que estaba anotada: es "Rosario del Tala",
// no "Rosario del Talar".
//
// Con este volumen (~300 puntos) el formato entrada-por-entrada se volvía
// inmanejable: cada localidad es una llamada a pv() con filas
// [nombre, dirección?, teléfono?, instagram?] y el id sale del nombre.

type Fila = readonly [string, string?, string?, string?]

const idsUsados = new Map<string, number>()

function slug(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Puntos de venta de una localidad. Ante nombres repetidos (sucursales,
 *  "Kiosco" a secas) el id se numera solo, para que la key sea estable. */
function pv(provincia: string, localidad: string, filas: Fila[]): Distribuidor[] {
  return filas.map(([nombre, direccion, telefono, instagram]) => {
    const base = `${slug(nombre)}-${slug(localidad)}`
    const vez = (idsUsados.get(base) ?? 0) + 1
    idsUsados.set(base, vez)
    return {
      id: vez === 1 ? base : `${base}-${vez}`,
      nombre,
      provincia,
      localidad,
      ...(direccion ? { direccion } : {}),
      ...(telefono ? { telefono } : {}),
      ...(instagram ? { instagram } : {}),
    }
  })
}

export const distribuidores: Distribuidor[] = [
  // ─── Entre Ríos · Gualeguaychú (PDF, págs. 1-4) ────────────────────────
  // Tres pares del PDF eran el mismo punto escrito dos veces (mismo teléfono
  // y misma esquina): Súper El Remanso, Frutería La Feria y Despensa El
  // Tata. Acá figuran una sola vez.
  ...pv('Entre Ríos', 'Gualeguaychú', [
    ['Supermercado Malambo', 'Rocamora y 3 de Caballería', '11-63668808'],
    ['Supermercado Malambo', 'Rivadavia y Seguí'],
    ['Supermercado Malambo', 'Bvr. Jurado y Urquiza'],
    ['Supertim', 'Bvr. Montana y 1ra Junta', '3446-603633'],
    ['Súper Otto', 'Bvr. Montana y Sgo. Díaz', '3446-514680'],
    ['Súper Los 5', 'San Martín y Ayacucho', '3446-620929'],
    ['Súper Los 5', 'Artigas 1772'],
    ['Súper Los Hermanos', 'Gervasio Méndez 2172', '3446-387027'],
    ['Súper Nubes', 'Sagrado Corazón y San Juan', '3446-315931'],
    ['Distribuidora Urquiza', 'Urquiza 2045', '3446-671929'],
    ['Distribuidora Urquiza', 'Frente al Corsódromo', '3446-631230'],
    ['Despensa La Esquina', 'Hernández y Artigas', '3446-600410'],
    ['La Favorita', 'Pasteur y Artigas', '3446-598523'],
    ['Distribuidora La Estrella', 'Artigas 1734', '3446-207612'],
    ['Súper Matías 3', 'Urquiza 1900', '3446-644762'],
    ['Frutería La Feria', '25 de Mayo y Camila Nievas', '291-4413319'],
    ['Pollería Campbell', '3 de Febrero y Del Valle', '3446-506161'],
    ['Frutería El Pela2', 'Pellegrini y Del Valle', '3446-517059'],
    ['Frutería Basigalupo', 'Seguí y Rivadavia', '3446-640995'],
    ['Verdulería Lo de Guille', '2 de Abril 1900', '3446-620949'],
    ['Stopfiambre', 'Sarmiento 511', '3446-513529'],
    ['Distribuidora LF', 'Del Valle 1428', '3446-376659'],
    ['Martín Ima Bocchi', 'Bolívar y Rucci', '221-6803112'],
    ['Súper El Remanso', 'Rioja y 1ro de Mayo', '11-63676907'],
    ['La Frutería (Brandon)', 'Pellegrini y San Martín', '3446-220590'],
    ['Kiosco Eliseo Delfino', 'Andrade y España', '3446-376084'],
    ['Distribuidora 2 de Abril', 'Puerto Argentino y 2 de Abril', '3446-364121'],
    ['Pastelería Carro', 'Ayacucho 130', '3446-207974'],
    ['Frutería del Centro', '25 de Mayo 1173', '3446-622180'],
    ['Supermercadito 2000', 'Perón y 3 de Caballería', '3446-638205'],
    ['Alfajores Marukis', 'Gualeguay y Bolívar', '3446-597251'],
    ['El Bebedero', 'Del Valle y 3 de Febrero', '3446-601404'],
    ['Carpa Azul', 'San Lorenzo 348', '3446-598083'],
    ['Carpa Azul', 'Urquiza 50'],
    ['Carnicería La Monumental', 'Pellegrini y 3 de Caballería', '3446-589336'],
    ['Depósito El Abuelo Juan', 'Urquiza 2691', '3446-597436'],
    ['Autoservicio Lo de Jack', 'Agustina Andrade 1977', '3446-543039'],
    ['Autoservicio Lo de Miguel', 'Lisandro de la Torre 1660', '3446-560002'],
    ['Panadería Avellaneda', 'Urquiza y Avellaneda', '3446-235868'],
    ['Despensa Nadia', 'Quijano y Laxague', '3446-531515'],
    ['Autoservicio Don Eladio', 'Primera Junta 934', '3446-220044'],
    ['Distribuidora Marcelo', 'Primera Junta 334', '3446-583531'],
    ['Maxikiosco Urquiza', 'Urquiza y Maipú', '3446-227547'],
    ['Kiosco Molinari Soria Clara', 'B° Molinari M4 C32', '3446-378462'],
    ['Distribuidora Nico Aguilar', 'Río Gallegos 518', '3446-608244'],
    ['Mates y Bombillas Gchu', 'Urquiza y Bosques', '3446-641057'],
    ['Autoservicio El Mostry', 'Pancho Ramírez 182', '3446-357867'],
    ['Shell El Mirador', 'Bolívar y Pellegrini', '3444-636688'],
    ['SG Mates y Tablas', '2 de Abril 1537 y Alsina', '3446-400486'],
    ['Hierros M', 'Jeannot Sueyro 2315', '3446-203699'],
    ['Panadería Boulevard', 'Artigas 2070', '3446-500586'],
    ['Súper Triunfo', 'Brasil 66', '11-56257678'],
    ['Pix Distri', 'Mitre 332', '11-32970239'],
    ['Autoservicio Jonel', 'Urquiza 2528', '3446-240657'],
    ['Martín Nisero', 'J. Ingenieros 710', '3446-576269'],
    ['Súper Rocamora', 'Rocamora 271', '3446-617107'],
    ['Pollería Mike', 'Primera Junta y Libertad', '3446-650306'],
    ['Carnicería Chicha Rebecca', 'Eva Perón 817', '3446-509084'],
    ['Despensa La Esquina', 'Rioja y San José', '3446-624758'],
    ['Autoservicio Súper Pollo', 'Fray Mocho y Clavarino', '3446-405827'],
    ['Buena Esperanza', 'Italia 145', '3446-479594'],
    ['Panadería La Catalana', 'Artigas 2010', '3446-375098'],
    ['Despensa El Desafío', 'B° Casvac, Pablo Daneri 200', '3446-418564'],
    ['Ferre', 'Artigas 2115', '3447-463067'],
    ['Despensa La Esperanza', 'Gervasio Méndez y Pasteur', '3446-639995'],
    ['Bodega Cárnica', 'Margalot y Alsina', '3446-229273'],
    ['El Viejo Valle', 'Artigas 2115', '3446-643839'],
    ['Almacén Al Paso', 'Sarmiento y Bolívar', '3446-662234'],
    ['Quesería De Mí Sin Ti', 'Del Valle y Maipú', '3446-659087'],
    ['Autoservicio Kiko', '1ro de Mayo y San Juan', '3446-645758'],
    ['Despensa El Tata', 'Rioja y Fray Mocho', '3446-403921'],
    ['Autoservicio Nico', 'Güemes y España', '3446-636566'],
    ['Despensa Dinona', 'Churruarín 545', '3442-654106'],
    ['La Burrata', 'Irigoyen y Rivadavia', '3446-616244'],
    ['Forrajería Del Valle', 'Del Valle 766', '3446-597043'],
    ['Sano y Natural', '1ra Junta 195', '3446-608256'],
    ['Puma Energy', 'Rawson y 2 de Abril', '3446-561298'],
    ['Mis 4 Estaciones Frutería', 'Bvr. Daneri 291', '3446-213626'],
    ['El Gauchito Gil', 'Schachtel 237', '3446-405035'],
    ['Autoservicio Lucas', 'Sarmiento 524', '3446-572478'],
    ['Autoservicio El Gauchito', 'Clavarino 300', '3446-211371'],
    ['Panadería La Nueva San Martín', 'L. N. Palma y Brasil', '11-31463256'],
    ['Frutería La Nro 1', 'Bvr. Montana 871', '3446-636150'],
    ['El Bocado', '2 de Abril y Héctor Irigoyen', '3487-532276'],
    ['El Ceibo', 'L. N. Palma 396', '3446-666719'],
    ['Gularte', 'Gervasio Méndez y Nágera', '3446-671663'],
    ['Carnicería La Estancia', 'Julio Irazusta 1125', '3446-642993'],
    ['Kiosco Chapita', 'Andrade y Perón', '3446-668822'],
    ['La Huerta', 'Schachtel 1125', '3446-410826'],
    ['Panadería MG', 'San Juan 236', '3446-674046'],
    ['El Trébol', 'Estrada y Maipú', '3446-587235'],
    ['Imperio del Fiambre', 'Primera Junta 611', '3446-597645'],
    ['Puerto Matero', 'Concordia 217', '3446-525376'],
    ['Despensa Rubén Rodríguez', 'Franco y Primera Junta', '3446-386375'],
    ['Despensa Anahí', 'Ayacucho y Doello Jurado', '3446-411733'],
    ['Verdulería Génesis', 'Bvr. P. Jurado 347', '3446-212540'],
    ['Cerruti', 'Aguado 235', '3446-565329'],
    ['Panadería Carles', 'Bolívar y Aguado', '3446-416700'],
    // Las dos "La Costa" van sin localidad en el PDF, entre filas de Pueblo
    // Belgrano; las direcciones (Doello Jurado, Artigas) son de Gualeguaychú.
    ['La Costa Regionales', 'Doello Jurado 253', '3446-365858'],
    ['La Costa Regionales', 'Artigas y Avellaneda'],
    ['Drugstore Puente', 'Puente M. Casariego y L. N. Palma'],
    ['El Galpón', 'Montiel 230', '3446-225424'],
    ['Autoservicio Singara', 'Mostto y L. N. Palma', '3446-617850'],
    ['Autoservicio Ral', '25 de Mayo 283', '3446-228385'],
    ['Autoservicio Soberanía', '1ro de Mayo y L. N. Palma', '3446-350124'],
    ['Vinoteca Mitre', '25 de Mayo y 3 de Febrero', '3446-525133'],
    ['Kiosco', 'Mitre y Urquiza', '3446-675132'],
    ['Drugstore 25', '25 de Mayo 669'],
    ['Kiosco 25', '25 de Mayo 638', '3446-356661'],
    ['Kiosco El Chino', 'Urquiza 691'],
    ['Kiosco Arlequín', 'Urquiza y Roca'],
    ['Frioteka Centro', 'L. N. Palma y Roca', '3446-203411'],
    ['Frioteka Urquiza', 'Urquiza y Alsina', '3446-573429'],
    ['Kiosco Cente', 'Rivadavia y Roca', '3446-360790'],
    ['Súper Nubes', 'Roca 491', '11-56680966'],
    ['Quesería y Fiambrería', 'Bvr. Montana y 9 de Julio', '3446-630784'],
    ['Maxikiosco', 'San Martín y Montevideo', '3446-401145'],
    ['Híper del Pollo', 'San Martín y Mitre', '3446-660926'],
    ['Súper Nubes', 'España e Islas Malvinas', '11-67163197'],
    ['Despensa El Chivo', 'B° Esperanza', '3446-387307'],
    ['Panadería Ricas Masas', 'Goldaracena 740'],
    ['Lo de Claudia', 'Churruarín 339', '3446-592367'],
    ['Pollería El Cardenal', 'Alberdi y Del Valle'],
    ['Súper Market', 'Irigoyen 221', '11-50262237'],
    ['Kiosco Pipas', 'Urquiza 905 y Alberdi', '3446-612990'],
    ['Kiosco Italia 15', 'Italia 22', '11-31729110'],
    ['Despensa El Ruso', 'Magnasco 760'],
    ['Proveeduría ATM', 'Seguí y Clavarino'],
    ['Dietética Ximena Garelli', 'Magnasco 403', '3446-667283'],
    ['Verdulería Los Rusitos', 'Juan La Palma y Rosario', '3446-507053'],
    ['Almacén Las 7 Colinas', 'Rocamora 232', '3446-527104'],
    ['Kiosco El Tati', '25 de Mayo y Rocamora'],
    ['Kiosco Patt', '1ra Junta y Rivadavia'],
    ['Panadería Luisana', 'Primera Junta 420'],
    ['Dapsa Maelho', 'Primera Junta y Rodó', '3446-355762'],
    ['Maxikiosco del Valle', 'Del Valle 1260'],
    ['La Bodega', 'Del Valle 1271', '3446-366271'],
    ['La Bodega', 'Frente a la terminal'],
    ['Alí Market', 'Juan Díaz 1760', '3446-620617'],
    ['Despensa Juanky', 'Del Valle y Moreno'],
    ['Frutería Vida (González)', 'Del Valle 1490'],
    ['Maxikiosco', 'Sarmiento y 25 de Mayo', '3446-364121'],
    ['Los Anca', 'Alsina y L. N. Palma'],
    ['Autoservicio Sturla', 'Urquiza 1573', '3446-608745'],
    ['Autoservicio Eva', 'Landa 1425', '3446-559564'],
    ['Estación Rahsa', 'Ruta Nac. 14 y 16'],
    ['Estación Puma Energy', 'Ruta Nac. 14 km 56'],
    ['Rey del Queso', 'Ruta Nac. 14'],
  ]),

  // ─── Entre Ríos · Pueblo Belgrano (PDF) ────────────────────────────────
  // CAMA va acá y no en Gualeguaychú: el PDF no le marca localidad, pero
  // Fioroto es calle de Pueblo Belgrano (aparece en otras tres filas).
  ...pv('Entre Ríos', 'Pueblo Belgrano', [
    ['Autoservicio Sofía', '1ro de Diciembre y Veronesi', '3446-502948'],
    ['Autoservicio Vane', 'Fioroto y Pehuajó', '3446-358083'],
    ['El Gauchito', '1ro de Diciembre 125', '11-31426924'],
    ['Autoservicio Alza', 'Ruta Prov. 42', '3446-330408'],
    ['Autoservicio Fiototo', 'Fioroto y Mariano Sánchez'],
    ['Despensa Ema', 'Federal 175'],
    ['Frutas Don Agustín', '1ro de Diciembre 187', '3446-212457'],
    ['Súper El Triunfo', 'Ruta Prov. 42 y Villaguay'],
    ['Petróbel', 'Veronesi y 13 de Marzo', '3446-364631'],
    ['El Gigante', 'Fioroto y 30 de Marzo', '11-58839840'],
    ['CAMA', 'Fioroto 395', '3446-643295'],
    ['Puesto La Paz', 'Ruta Internacional 36'],
  ]),

  // ─── Entre Ríos · resto (PDF) ──────────────────────────────────────────
  ...pv('Entre Ríos', 'Larroque', [
    ['Autoservicio MP Flavio Monti', '25 de Mayo 497', '3446-349412'],
    ['Kiosco Amaya', 'Mario Loud 168'],
  ]),
  ...pv('Entre Ríos', 'Gualeguay', [
    ['Mercadito El Cumpa', 'Moreno y Palacios', '3444-564112'],
    ['Súper Guay', 'Antártida Argentina 32', '3444-444330'],
    ['Súper Oso', 'Belgrano 449', '3444-437845'],
    ['Súper El Pampita 2', 'Monte Caseros 120'],
    ['Súper América', 'Martín Fierro 208'],
    ['Supermercado La Estación', 'Alem 777'],
    ['Supermercado del Sol', 'Belgrano 27'],
  ]),
  ...pv('Entre Ríos', 'Urdinarrain', [
    ['Representante Maira Villanoba', 'Libertad 1149', '3446-630545'],
    ['Supermercado Nuevo Siglo', 'Libertad 1316'],
    ['Carnicería Don Lito', 'Bvr. 3 de Febrero 443'],
    ['Minimercado Misejo', 'Salta 45'],
    ['Almacén de Bebidas', 'Libertad 516'],
    ['Punto Azul', 'Libertad 801'],
    ['Minimercado Malena', 'Bvr. Inchausti 41'],
  ]),
  // El teléfono y el Instagram de Mate Ideal vienen del relevo viejo (el
  // PDF no los trae); la dirección y la localidad bien escrita son del PDF.
  ...pv('Entre Ríos', 'Rosario del Tala', [
    ['Mate Ideal', 'Centenario 100', '3445-478285', 'mateideal'],
    ['Ro Tal GNC', 'Ruta 20 y Grimaux de Gil'],
  ]),
  ...pv('Entre Ríos', 'Ceibas', [['Jesús de Armas', 'Las Calandrias 327']]),
  ...pv('Entre Ríos', 'Concepción del Uruguay', [
    ['Súper Maipú Yong Quantum', 'Maipú 10', '3442-338888'],
    ['Casa Nostra', '14 de Julio y Posadas', '3442-667001'],
    ['Frioteka', 'Galarza y Larroque', '3442-555356'],
  ]),
  ...pv('Entre Ríos', 'Colón', [
    ['Representante Micaela Coronel', undefined, '3447-405055'],
    ['Quesos Flash', '3 de Febrero 621', '3447-456829'],
    ['Costumbres Regionales', '12 de Abril 113', '3447-413120'],
    ['La Súper Pera', 'Salta 463'],
    ['Pollería Las Hermanas', 'Castelli 259'],
    ['Kiosco Eros', '12 de Abril 453'],
    ['Súper Colón', 'San Martín 716'],
  ]),
  // El teléfono de Yerbas Viale es del relevo viejo (mismo local, Córdoba 446).
  ...pv('Entre Ríos', 'Viale', [
    ['Yerbas Viale', 'Córdoba 446', '343-5009735'],
    ['Vamo Arriba Mates', '25 de Mayo y Sarmiento'],
  ]),
  ...pv('Entre Ríos', 'Paraná', [
    ['Dietética Natura', 'Buenos Aires 147'],
    ['Mate Cheto', 'Juan Garrigó 1491'],
    ['Mate Cheto', 'Av. Churruarín 628'],
    ['Mate Entrerriano', 'Av. Almafuerte 1470'],
    ['Canario Mates', 'Urquiza 1050'],
    ['Rincón Mágico', 'Gualeguaychú 73'],
    ["Coquito's Paraná", '25 de Mayo 236'],
    ['Almacén Froilán', 'Corrientes esq. Uruguay'],
    ['Sentir Matero', '25 de Junio 65'],
    ['Drugstore Modelo', 'San Martín 1256'],
    ['La Espiga de Oro', 'Laprida 301'],
    ['Raúl Brugo', 'Feria Salta y Nogoyá'],
    ['Mates Paraná', 'Urquiza 785'],
    ['Mates Paraná', 'Padre Kentenich 825'],
    ['Pach Barber Club', 'Colón 334'],
    ['Shell Di Rondo 5 Esquinas', 'Av. Ramírez 2591'],
    ['Reitchter Sports', 'Chajá 3404, Lomas del Golf'],
    ['Panaderías Don Mateo', 'Sucursales Paraná'],
    ['Club del Mate', 'La Paz 432'],
    ['Yerba Mate Paraná', 'Av. Ejército 1713'],
    ['Autoservicio El Gringo', 'Empalme Ruta 12 y 127'],
    ['Sentir Lo Nuestro', 'Online'],
    ['JV Mates', 'Online'],
    ['Aromas de Té', 'Online'],
    ['Sapecá', 'Online'],
    // Del relevo viejo; no figura en el PDF nuevo.
    ['David Bresler', undefined, '343-5004004', 'yerbacentenariaparana'],
  ]),
  ...pv('Entre Ríos', 'San Benito', [['Canaan Yerbas', 'Online']]),
  ...pv('Entre Ríos', 'Oro Verde', [['La Estación Tienda Orgánica', 'Los Halcones 305']]),
  ...pv('Entre Ríos', 'Libertador', [['Cervecería La Esquina', 'Rivadavia 935']]),
  ...pv('Entre Ríos', 'Alcaraz', [['Súper 12', 'San Juan 213']]),
  ...pv('Entre Ríos', 'Hasenkamp', [['Mates MAF', 'Belgrano 282']]),
  ...pv('Entre Ríos', 'Ramírez', [['Néstor Lodi']]),
  ...pv('Entre Ríos', 'Crespo', [
    ['Clauser Supermercados', 'Moreno 956'],
    ['Alquimia Mates y Regalos', 'Moreno 1505'],
  ]),
  ...pv('Entre Ríos', 'María Grande', [['Mateando Entre Ríos', 'Belgrano 910']]),
  // El teléfono es del relevo viejo; el PDF sólo dice "online".
  ...pv('Entre Ríos', 'Cerrito', [['Julieta Gabas', 'Online', '3434-716872']]),
  ...pv('Entre Ríos', 'Lucas González', [['Dalma Cabrera', 'Mitre 755']]),
  // El teléfono y el Instagram de A Mate Firme son del relevo viejo (era la
  // entrada "Juan Pablo Monzón", mismo local de Maipú 1399).
  ...pv('Entre Ríos', 'Nogoyá', [
    ['A Mate Firme', 'Maipú 1399', '3435-462810', 'amatefirme'],
    ['BV Drugstore', 'Bvar. España y Fitz Gerald'],
    ['Punto Campero', 'Bvar. España 1384'],
    ['Al Paso Drugstore', 'Avellaneda 1915'],
    ['Chiche Bombom', 'San Martín 686'],
    ['Quesería Paso', 'Tucumán 1140'],
    ['Bull Suplementos', 'Mosconi 93'],
    ['Pollería Maipú', 'Maipú 1386'],
    ['Despensa La Villa', 'Gualeguay 716'],
  ]),
  // El teléfono de Pilar de la Torre es del relevo viejo.
  ...pv('Entre Ríos', 'Federación', [
    ['Pilar de la Torre (online)', 'Ñandubay 1949', '3456-521590'],
    ['Súper Coco', 'Av. San Martín y Misiones'],
    ['Supermercado La Plaza', 'Azaleas 2778'],
  ]),
  ...pv('Entre Ríos', 'Diamante', [['Eric Zapata (online)', 'Valentín Vergara 867']]),
  ...pv('Entre Ríos', 'San José', [['Mara Medina', 'Online']]),
  // El teléfono de Perlo Rocío es del relevo viejo. "Centemacia" está así
  // en el PDF; [VERIFICAR: si es el nombre del local o una dirección].
  ...pv('Entre Ríos', 'Maciá', [
    ['Perlo Rocío (online)', 'Centemacia', '3446-605034'],
    ['Súper Moletta', 'Güemes 14'],
    ['Kiosco Lo de Moncho', 'Gualeguaychú 859'],
  ]),
  ...pv('Entre Ríos', 'Villaguay', [['Mateando Villaguay', 'Arrieta 1033']]),
  ...pv('Entre Ríos', 'Villa Elisa', [['Nahuel Cabrera', 'Online', '3447-640865']]),
  // Del relevo viejo; no figuran en el PDF nuevo.
  ...pv('Entre Ríos', 'Concepción del Uruguay', [
    ['Alina María Olague', undefined, '3442-648822'],
  ]),
  ...pv('Entre Ríos', 'Caseros', [['Verónica Montani', undefined, '3442-642184']]),
  ...pv('Entre Ríos', 'Villa Paranacito', [
    ['María Fernanda Eckerdt', undefined, '3446-640167'],
  ]),

  // ─── CABA (PDF) ────────────────────────────────────────────────────────
  ...pv('CABA', 'CABA', [
    ['Mate Store', 'Av. Córdoba 550, Galerías Pacífico'],
    ['Museo del Mate', 'Av. de Mayo 853'],
    ['Yerbassanta (online)', 'Beiró 2875', '11-38972274'],
    ['Mailin Regionales', 'Online', undefined, 'mailinmates'],
    ['Solo Materos', 'Online', undefined, 'solomateros'],
  ]),
  ...pv('CABA', 'Villa Lugano', [['Yerba Store', 'Goleta Sarandí 5900']]),
  ...pv('CABA', 'La Boca', [['Centenaria La Boca', 'Filiberto 1066']]),
  ...pv('CABA', 'Villa Devoto', [['Districhado (online)', undefined, '11-57000831']]),
  ...pv('CABA', 'Agronomía', [
    ['Fiambrería Taglio Fino', 'Beiró 2501'],
    ['El Paisa Yerba (online)', undefined, '11-23159839'],
  ]),

  // ─── Buenos Aires ──────────────────────────────────────────────────────
  // Los dos primeros vienen del PDF; el resto es del relevo viejo (el PDF
  // no cubre el interior de la provincia).
  ...pv('Buenos Aires', 'Vicente López', [['Puro Ritual (online)', undefined, '11-31663176']]),
  ...pv('Buenos Aires', 'Zona Oeste', [
    // "Zona Oeste" no es una localidad y nunca matchea una búsqueda; los dos
    // orígenes la escriben así, con teléfonos distintos.
    ['El Club de la Yerba (representante)', undefined, '11-36811023'],
    ['Sebastián Matías Gallardo', undefined, '11-68841900'],
  ]),
  ...pv('Buenos Aires', 'Capilla del Señor', [
    ['Distribuidora La Cruz', undefined, '11-65851588', 'distribuidoralacruz'],
  ]),
  ...pv('Buenos Aires', 'Olavarría', [
    ['Joaquín Stabile de Paulo', undefined, '2284-501864', 'fullyerba.olav'],
  ]),
  // Listado en Buenos Aires; el teléfono tiene característica 3794 (Corrientes).
  ...pv('Buenos Aires', 'Lincoln', [['Pablo Cler', undefined, '3794-561372']]),
  ...pv('Buenos Aires', 'Luján', [['Francisco Diego Novoa', undefined, '11-53788686']]),
  ...pv('Buenos Aires', 'Morón', [
    ['Maximiliano Raimonde', undefined, '11-30951405', 'unacebada'],
  ]),
  ...pv('Buenos Aires', 'La Plata', [
    ['Alejandro Marcelo Russo', undefined, '221-5641512'],
  ]),
  ...pv('Buenos Aires', 'Baradero', [
    ['Adriana Inés Pacini', undefined, '3329-694438', 'yerbacentenariabaradero'],
  ]),
  ...pv('Buenos Aires', 'Mar del Plata', [['Pablo Contreras', undefined, '2236-697558']]),

  // ─── Córdoba (PDF; Torresi y Borgognone son del relevo viejo) ──────────
  ...pv('Córdoba', 'Córdoba Capital', [
    ['Jaque Mates (representante)', 'Larrañaga y Buenos Aires'],
    ['Distribuidora Efra (representante)', undefined, '351-2164008'],
    ['Jota Mates', 'Rondeaux 310'],
    ['Primer Mate', 'Trejo 705'],
    ['Cultura Yerbera', 'Obispo Salguero 615'],
    ['Casa Nostra', 'Oncativo 169'],
    ['Compa Mates', 'Tejeda 3883'],
    ['Nuestra Pacha', '9 de Julio 377'],
    ['Tercer Tiempo', 'Gral. Paz 120'],
    ['Al Campo', 'Av. Los Álamos 557'],
    ['La Yerbatería', '9 de Julio 777'],
    ['Distribuidora Caju'],
    ['Bruno Torresi', undefined, '351-3094195', 'yerbacentenariacba'],
  ]),
  ...pv('Córdoba', 'San Francisco', [
    ['Del Mate', 'Online'],
    ['Mates San Francisco', '9 de Julio 2424'],
    ['Yerbas Cba', 'Pellegrini 844'],
    ['Davis Agustín Borgognone', undefined, '3564-470181'],
  ]),
  ...pv('Córdoba', 'Río Cuarto', [
    ['Amatera', 'Zanni 818'],
    ['Mate-Mática', 'Marconi 853'],
    ['Río Sur Distribución', 'Sobremonte 3055'],
    ['India Yerba Mate', 'San Martín 100'],
  ]),
  ...pv('Córdoba', 'Villa Carlos Paz', [
    ['Samate', '9 de Julio 80'],
    ['Mateoli', 'Lisandro de la Torre 38'],
    ['África Mate Bar', 'Salta 42'],
    ['Drugstore Punto G', 'Garzón esq. Illia'],
  ]),
  ...pv('Córdoba', 'Río Tercero', [['Aromo Mates', 'Río Limay 611']]),
  ...pv('Córdoba', 'Monte Maíz', [['Peperina Regalos', '9 de Julio 2126']]),

  // ─── Jujuy (PDF) ───────────────────────────────────────────────────────
  ...pv('Jujuy', 'San Salvador de Jujuy', [['Mates Tata', 'Gral. Otero 178']]),

  // ─── Resto del país (relevo viejo; el PDF no cubre estas provincias) ───
  ...pv('La Pampa', 'Gral. Pico', [
    ['Emanuel Hermida', undefined, '2302-518650', 'yerbaslapampa'],
  ]),
  // El origen repite @yerbacentenariacba (mismo usuario que Bruno Torresi).
  ...pv('Misiones', 'Oberá', [
    ['Ervin Norman Rasmuser', undefined, '3757-507650', 'yerbacentenariacba'],
  ]),
  ...pv('Santa Fe', 'Rafaela', [['Fausto Fernández', undefined, '3496-443634']]),
  // OJO: el origen viejo no indicaba provincia (figuraba suelto en "resto
  // del país"); "Santa Fe" está puesto por ubicación geográfica.
  ...pv('Santa Fe', 'Venado Tuerto', [['Lautaro Zerbino', undefined, '3462-264444']]),
  ...pv('Tucumán', 'San Miguel Capital', [
    ['Gonzalo Argañaraz Ponce', undefined, '381-6156792', 'yerbacentenariatucuman'],
  ]),
  ...pv('Chubut', 'Comodoro Rivadavia', [
    ['Santiago Fagnani', undefined, '2974-110514'],
  ]),
]
