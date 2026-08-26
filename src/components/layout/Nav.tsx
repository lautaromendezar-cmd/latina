'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { nav, marca } from '@/content/site'

/**
 * Nav. Fija arriba. Arriba de todo es transparente (el hero verde o la
 * foto de las internas pasan por detrás, texto en crema); en cuanto se
 * scrollea se vuelve crema con tinta. El botón "Tienda" es amarillo
 * siempre: funciona sobre los dos fondos.
 *
 * El menú de mobile es un panel a pantalla completa, no un drawer.
 */
export function Nav() {
  const [scrolleado, setScrolleado] = useState(false)
  const [abierto, setAbierto] = useState(false)
  const ruta = usePathname()

  useEffect(() => {
    const alScrollear = () => setScrolleado(window.scrollY > 24)
    alScrollear()
    window.addEventListener('scroll', alScrollear, { passive: true })
    return () => window.removeEventListener('scroll', alScrollear)
  }, [])

  // Cerrar al navegar, y con Escape.
  useEffect(() => setAbierto(false), [ruta])

  useEffect(() => {
    if (!abierto) return
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAbierto(false)
    }
    document.addEventListener('keydown', alTeclear)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', alTeclear)
      document.body.style.overflow = ''
    }
  }, [abierto])

  const opaco = scrolleado || abierto
  const colorLink = opaco ? 'text-tinta hover:text-verde' : 'text-crema hover:text-amarillo'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        opaco ? 'border-b-2 border-tinta/10 bg-crema/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${marca.nombreLargo}, ir al inicio`}
        >
          {/* El logo es el isotipo sobre círculo blanco: funciona sobre
              cualquiera de los dos estados. */}
          <Image
            src="/marca/logo.png"
            alt=""
            width={44}
            height={44}
            priority
            className="h-9 w-9 sm:h-11 sm:w-11"
          />
          <span className="sr-only">{marca.nombreLargo}</span>
        </Link>

        <nav aria-label="Principal" className="ml-auto hidden items-center gap-7 lg:flex">
          {nav.principal.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={ruta === item.href ? 'page' : undefined}
              className={`text-[0.9375rem] font-bold tracking-[0.01em] transition-colors ${colorLink} ${
                ruta === item.href ? 'underline decoration-amarillo decoration-[3px] underline-offset-8' : ''
              }`}
            >
              {item.texto}
            </Link>
          ))}
          {nav.externo && (
            <a
              href={nav.externo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-amarillo px-4 py-2 text-[0.9375rem] font-bold text-tinta transition-colors hover:bg-amarillo-claro"
            >
              {nav.externo.texto}
              <span aria-hidden="true"> ↗</span>
            </a>
          )}
        </nav>

        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="menu-mobile"
          className="ml-auto flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <span className="sr-only">{abierto ? nav.cerrarMenu : nav.abrirMenu}</span>
          <span aria-hidden="true" className="relative block h-3.5 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 transition-transform duration-200 ${
                opaco ? 'bg-tinta' : 'bg-crema'
              } ${abierto ? 'top-1.5 rotate-45' : 'top-0'}`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 transition-transform duration-200 ${
                opaco ? 'bg-tinta' : 'bg-crema'
              } ${abierto ? 'top-1.5 -rotate-45' : 'top-3'}`}
            />
          </span>
        </button>
      </div>

      {abierto && (
        <div id="menu-mobile" className="border-t-2 border-tinta/10 bg-crema lg:hidden">
          <nav aria-label="Principal" className="flex flex-col px-4 py-2 sm:px-6">
            {nav.principal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={ruta === item.href ? 'page' : undefined}
                className={`border-b-2 border-tinta/10 py-4 text-lg font-bold ${
                  ruta === item.href ? 'text-verde' : 'text-tinta'
                }`}
              >
                {item.texto}
              </Link>
            ))}
            {nav.externo && (
              <a
                href={nav.externo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 text-lg font-bold text-tinta"
              >
                {nav.externo.texto}
                <span aria-hidden="true"> ↗</span>
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
