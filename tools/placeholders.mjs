/**
 * Genera un placeholder por cada asset que falta, del tamaño exacto y en
 * el path final. Así el sitio se puede armar completo sin frenarse por un
 * archivo, y reemplazar el asset real es pisar el archivo: cero cambios
 * de código.
 *
 *   node tools/placeholders.mjs          escribe sólo los que faltan
 *   node tools/placeholders.mjs --force  reescribe todos
 *
 * Usa sharp (build-time). La regla de "sin canvas" del brief es sobre el
 * runtime del sitio, no sobre las herramientas.
 */

import { mkdir, writeFile, access } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC = join(RAIZ, 'public')
const FORZAR = process.argv.includes('--force')

const YERBA_SECA = '#94a06a'
const YERBA_OSCURO = '#06250f'

/** Lee el manifest de TypeScript sin compilarlo: alcanza con los campos. */
async function leerManifest() {
  const { readFile } = await import('node:fs/promises')
  const fuente = await readFile(join(RAIZ, 'src/data/assets.ts'), 'utf8')

  const assets = []
  const bloques = fuente.split('{').slice(1)
  for (const bloque of bloques) {
    const path = bloque.match(/path:\s*'([^']+)'/)?.[1]
    const ancho = bloque.match(/ancho:\s*(\d+)/)?.[1]
    const alto = bloque.match(/alto:\s*(\d+)/)?.[1]
    const pendiente = bloque.match(/pendiente:\s*(true|false)/)?.[1]
    const transparente = /transparente:\s*true/.test(bloque)
    if (path && ancho && alto) {
      assets.push({
        path,
        ancho: Number(ancho),
        alto: Number(alto),
        pendiente: pendiente === 'true',
        transparente,
      })
    }
  }
  return assets
}

function escapar(texto) {
  return texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * El placeholder es deliberadamente feo y legible: bloque sólido en
 * yerba-seca con el nombre del archivo y las medidas encima. Tiene que
 * cantar que falta un asset, no disimularlo.
 */
function svgPlaceholder({ path, ancho, alto, transparente }) {
  const nombre = path.split('/').pop()
  const cuerpo = Math.max(14, Math.round(Math.min(ancho, alto) / 18))
  const chico = Math.round(cuerpo * 0.62)
  const fondo = transparente
    ? `<rect width="${ancho}" height="${alto}" fill="${YERBA_SECA}" fill-opacity="0.35"/>`
    : `<rect width="${ancho}" height="${alto}" fill="${YERBA_SECA}"/>`

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${ancho}" height="${alto}">
  ${fondo}
  <rect x="${cuerpo}" y="${cuerpo}" width="${ancho - cuerpo * 2}" height="${alto - cuerpo * 2}"
        fill="none" stroke="${YERBA_OSCURO}" stroke-width="${Math.max(2, cuerpo / 8)}" stroke-dasharray="${cuerpo} ${cuerpo / 2}"/>
  <text x="50%" y="48%" text-anchor="middle" fill="${YERBA_OSCURO}"
        font-family="Montserrat, Arial, sans-serif" font-weight="600"
        font-size="${cuerpo}" letter-spacing="${cuerpo * 0.06}">${escapar(nombre)}</text>
  <text x="50%" y="58%" text-anchor="middle" fill="${YERBA_OSCURO}" fill-opacity="0.7"
        font-family="Montserrat, Arial, sans-serif" font-weight="500"
        font-size="${chico}" letter-spacing="${chico * 0.14}">${ancho} × ${alto} · FALTA</text>
</svg>`)
}

async function existe(ruta) {
  try {
    await access(ruta)
    return true
  } catch {
    return false
  }
}

const assets = await leerManifest()
let escritos = 0
let salteados = 0

for (const asset of assets) {
  const destino = join(PUBLIC, asset.path)
  await mkdir(dirname(destino), { recursive: true })

  if (!FORZAR && (await existe(destino))) {
    salteados++
    continue
  }

  const svg = svgPlaceholder(asset)
  const img = sharp(svg, { density: 96 })

  if (asset.path.endsWith('.png')) {
    await writeFile(destino, await img.png({ compressionLevel: 9 }).toBuffer())
  } else {
    await writeFile(destino, await img.jpeg({ quality: 70 }).toBuffer())
  }

  escritos++
  console.log(`  escrito  ${asset.path}  ${asset.ancho}×${asset.alto}`)
}

console.log(`\n${escritos} placeholders escritos, ${salteados} ya estaban.`)
if (salteados && !FORZAR) console.log('Para reescribirlos: node tools/placeholders.mjs --force')
