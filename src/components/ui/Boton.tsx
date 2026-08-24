import Link from 'next/link'

/**
 * Botón. Píldora (999px), mayúsculas, y el primario lleva la sombra dura
 * del sistema: es un sticker, no un botón de app.
 *
 * `primario` es el amarillo y significa acción — el token nunca se usa
 * como decoración. `secundario` es contorno de currentColor, así el mismo
 * componente sirve sobre crema (tinta) y sobre verde (crema). `oscuro`
 * es el bloque verde, para cuando el fondo es amarillo o crema.
 */

type Variante = 'primario' | 'secundario' | 'oscuro'

const VARIANTES: Record<Variante, string> = {
  primario:
    'bg-amarillo text-tinta sombra-dura-chica hover:bg-amarillo-claro active:bg-amarillo-oscuro active:shadow-none active:translate-x-[3px] active:translate-y-[3px]',
  secundario:
    'border-2 border-current hover:-translate-y-[2px] active:translate-y-0',
  oscuro:
    'bg-verde text-crema sombra-dura-chica hover:bg-verde-profundo active:shadow-none active:translate-x-[3px] active:translate-y-[3px]',
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 ' +
  'text-sm font-bold uppercase tracking-[0.06em] transition-[transform,background-color,box-shadow] duration-150 ' +
  'min-h-11 text-center'

type Props = {
  children: React.ReactNode
  href?: string
  variante?: Variante
  externo?: boolean
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
}

export function Boton({
  children,
  href,
  variante = 'primario',
  externo = false,
  className = '',
  type = 'button',
  onClick,
  disabled,
}: Props) {
  const clases = `${BASE} ${VARIANTES[variante]} ${className}`

  if (href && externo) {
    return (
      <a href={href} className={clases} target="_blank" rel="noopener noreferrer">
        {children}
        <span aria-hidden="true">↗</span>
        <span className="sr-only">(se abre en una pestaña nueva)</span>
      </a>
    )
  }

  if (href) {
    return (
      <Link href={href} className={clases}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={clases} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
