import Link from 'next/link'

/**
 * Botón. Único gesto redondo del sistema (999px); todo lo demás es radio 0.
 *
 * `primario` es el dorado y significa acción — el token nunca se usa como
 * decoración. `secundario` es contorno de papel. Sobre fondo claro entra
 * `oscuro`, porque el dorado sobre papel da 1.45:1 y no se puede leer.
 */

type Variante = 'primario' | 'secundario' | 'oscuro'

const VARIANTES: Record<Variante, string> = {
  primario:
    'bg-dorado text-yerba-oscuro hover:bg-dorado-claro active:bg-dorado-oscuro',
  secundario:
    'border border-papel text-papel hover:bg-papel hover:text-yerba-oscuro',
  oscuro:
    'bg-yerba-oscuro text-papel hover:bg-yerba-alta',
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 ' +
  'text-sm font-bold tracking-wide transition-colors duration-200 ' +
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
