export type Distribuidor = {
  id: string
  nombre: string
  provincia: string
  localidad: string
  direccion?: string
  telefono?: string
  instagram?: string
}

// Fuente: https://yerbamatelatina.com.ar/donde-comprar/ (relevado el 20-08-2026).
// Los campos que la página no informa se omiten. Nada se completó a mano salvo
// donde hay un comentario que lo aclara. Se normalizaron mayúsculas y acentos.
export const distribuidores: Distribuidor[] = [
  {
    id: 'david-bresler-parana',
    nombre: 'David Bresler',
    provincia: 'Entre Ríos',
    localidad: 'Paraná',
    telefono: '343-5004004',
    instagram: 'yerbacentenariaparana',
  },
  // el origen dice "CORDOBA 446, Viale, Paraná"
  {
    id: 'geronimo-jose-urchueguia-viale',
    nombre: 'Gerónimo José Urchueguía',
    provincia: 'Entre Ríos',
    localidad: 'Viale',
    direccion: 'Córdoba 446',
    telefono: '343-500-9735',
    instagram: 'ger.the.panass',
  },
  {
    id: 'de-la-torre-maria-del-pilar-federacion',
    nombre: 'De la Torre María del Pilar',
    provincia: 'Entre Ríos',
    localidad: 'Federación',
    telefono: '3456-521590',
    instagram: 'yerbacentenariafederacion',
  },
  {
    id: 'rocio-lorena-perlo-macia',
    nombre: 'Rocío Lorena Perlo',
    provincia: 'Entre Ríos',
    localidad: 'Macia',
    telefono: '3446-605034',
    instagram: 'yerbacentenariamacia',
  },
  {
    id: 'alina-maria-olague-concepcion-del-uruguay',
    nombre: 'Alina María Olague',
    provincia: 'Entre Ríos',
    localidad: 'Concepción del Uruguay',
    telefono: '3442-648822',
  },
  {
    id: 'nelson-sebastian-spadillero-gualeguay',
    nombre: 'Nelson Sebastián Spadillero',
    provincia: 'Entre Ríos',
    localidad: 'Gualeguay',
    telefono: '3444-564112',
  },
  {
    id: 'julieta-gabas-cerrito',
    nombre: 'Julieta Gabàs',
    provincia: 'Entre Ríos',
    localidad: 'Cerrito',
    direccion: 'Uruguay 148',
    telefono: '3434-716872',
  },
  // el origen dice "ROSARIO DEL TALAR"
  {
    id: 'fernando-mate-ideal-rosario-del-talar',
    nombre: 'Fernando Mate Ideal',
    provincia: 'Entre Ríos',
    localidad: 'Rosario del Talar',
    direccion: 'Centenario 102',
    telefono: '3445-478285',
    instagram: 'mateideal',
  },
  {
    id: 'daniel-jourdan-colon',
    nombre: 'Daniel Jourdan',
    provincia: 'Entre Ríos',
    localidad: 'Colón',
    direccion: '12 de Abril 113',
    telefono: '3447-413120',
  },
  {
    id: 'veronica-montani-caseros',
    nombre: 'Verónica Montani',
    provincia: 'Entre Ríos',
    localidad: 'Caseros',
    telefono: '3442-642184',
  },
  {
    id: 'juan-pablo-monzon-nogoya',
    nombre: 'Juan Pablo Monzón',
    provincia: 'Entre Ríos',
    localidad: 'Nogoyá',
    direccion: 'Maipú y Fitz Gerald 1399',
    telefono: '3435-462810',
    instagram: 'amatefirme',
  },
  {
    id: 'maria-fernanda-eckerdt-villa-paranacito',
    nombre: 'María Fernanda Eckerdt',
    provincia: 'Entre Ríos',
    localidad: 'Villa Paranacito',
    telefono: '3446-640167',
  },
  {
    id: 'distribuidora-la-cruz-capilla-del-senor',
    nombre: 'Distribuidora La Cruz',
    provincia: 'Buenos Aires',
    localidad: 'Capilla del Señor',
    telefono: '11-65851588',
    instagram: 'distribuidoralacruz',
  },
  // el origen sólo dice "ZONA OESTE"
  {
    id: 'sebastian-matias-gallardo-zona-oeste',
    nombre: 'Sebastián Matías Gallardo',
    provincia: 'Buenos Aires',
    localidad: 'Zona Oeste',
    telefono: '11-6884 1900',
  },
  {
    id: 'joaquin-stabile-de-paulo-olavarria',
    nombre: 'Joaquín Stabile de Paulo',
    provincia: 'Buenos Aires',
    localidad: 'Olavarría',
    telefono: '2284-501864',
    instagram: 'fullyerba.olav',
  },
  // listado en Buenos Aires; el teléfono tiene característica 3794 (Corrientes)
  {
    id: 'pablo-cler-lincoln',
    nombre: 'Pablo Cler',
    provincia: 'Buenos Aires',
    localidad: 'Lincoln',
    telefono: '3794-561372',
  },
  {
    id: 'francisco-diego-novoa-lujan',
    nombre: 'Francisco Diego Novoa',
    provincia: 'Buenos Aires',
    localidad: 'Luján',
    telefono: '11-5378 8686',
  },
  {
    id: 'maximiliano-raimonde-moron',
    nombre: 'Maximiliano Raimonde',
    provincia: 'Buenos Aires',
    localidad: 'Morón',
    telefono: '11-30951405',
    instagram: 'unacebada',
  },
  {
    id: 'alejandro-marcelo-russo-la-plata',
    nombre: 'Alejandro Marcelo Russo',
    provincia: 'Buenos Aires',
    localidad: 'La Plata',
    telefono: '221-5641512',
  },
  {
    id: 'adriana-ines-pacini-baradero',
    nombre: 'Adriana Inés Pacini',
    provincia: 'Buenos Aires',
    localidad: 'Baradero',
    telefono: '3329-694438',
    instagram: 'yerbacentenariabaradero',
  },
  {
    id: 'pablo-contreras-mar-del-plata',
    nombre: 'Pablo Contreras',
    provincia: 'Buenos Aires',
    localidad: 'Mar del Plata',
    telefono: '2236-697558',
  },
  {
    id: 'bruno-torresi-cordoba-capital',
    nombre: 'Bruno Torresi',
    provincia: 'Córdoba',
    localidad: 'Córdoba Capital',
    telefono: '351-309 4195',
    instagram: 'yerbacentenariacba',
  },
  {
    id: 'davis-agustin-borgognone-san-francisco',
    nombre: 'Davis Agustín Borgognone',
    provincia: 'Córdoba',
    localidad: 'San Francisco',
    telefono: '3564-470181',
  },
  {
    id: 'emanuel-hermida-gral-pico',
    nombre: 'Emanuel Hermida',
    provincia: 'La Pampa',
    localidad: 'Gral. Pico',
    telefono: '2302-518650',
    instagram: 'yerbaslapampa',
  },
  // el origen repite @YERBACENTENARIACBA (mismo usuario que Bruno Torresi)
  {
    id: 'ervin-norman-rasmuser-obera',
    nombre: 'Ervin Norman Rasmuser',
    provincia: 'Misiones',
    localidad: 'Oberá',
    telefono: '3757-507650',
    instagram: 'yerbacentenariacba',
  },
  {
    id: 'fausto-fernandez-rafaela',
    nombre: 'Fausto Fernández',
    provincia: 'Santa Fe',
    localidad: 'Rafaela',
    telefono: '3496-443634',
  },
  // OJO: el origen no indica provincia (figura suelto en "resto del pais");
  // "Santa Fe" lo puse yo por ubicacion geografica, no sale de la pagina
  {
    id: 'lautaro-zerbino-venado-tuerto',
    nombre: 'Lautaro Zerbino',
    provincia: 'Santa Fe',
    localidad: 'Venado Tuerto',
    telefono: '3462-264444',
  },
  {
    id: 'gonzalo-arganaraz-ponce-san-miguel-capital',
    nombre: 'Gonzalo Argañaraz Ponce',
    provincia: 'Tucumán',
    localidad: 'San Miguel Capital',
    telefono: '381-615 6792',
    instagram: 'yerbacentenariatucuman',
  },
  {
    id: 'santiago-fagnani-comodoro-rivadavia',
    nombre: 'Santiago Fagnani',
    provincia: 'Chubut',
    localidad: 'Comodoro Rivadavia',
    telefono: '2974110514',
  },
]
