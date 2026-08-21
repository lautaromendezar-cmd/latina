'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { nav, marca } from '@/content/site'

/**
 * Nav. Fija arriba, transparente sobre el hero y opaca en cuanto se
 * scrollea, para que el wordmark no compita con el display.
 *
 * El menú de mobile es un panel a pantalla completa, no un drawer: con
 * cuatro links, un drawer es una animación que no compra nada.
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolleado || abierto
          ? 'bg-yerba-oscuro/95 backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${marca.nombreLargo}, ir al inicio`}
        >
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
              className={`text-sm transition-colors hover:text-dorado ${
                ruta === item.href ? 'text-dorado' : 'text-papel'
              }`}
            >
              {item.texto}
            </Link>
          ))}
          <a
            href={nav.externo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-papel/35 px-4 py-2 text-sm text-papel transition-colors hover:border-dorado hover:text-dorado"
          >
            {nav.externo.texto}
            <span aria-hidden="true"> ↗</span>
          </a>
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
              className={`absolute left-0 block h-0.5 w-6 bg-papel transition-transform duration-200 ${
                abierto ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-papel transition-transform duration-200 ${
                abierto ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </div>

      {abierto && (
        <div
          id="menu-mobile"
          className="border-t border-yerba-alta bg-yerba-oscuro lg:hidden"
        >
          <nav aria-label="Principal" className="flex flex-col px-4 py-2 sm:px-6">
            {nav.principal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={ruta === item.href ? 'page' : undefined}
                className={`border-b border-yerba-alta py-4 text-lg ${
                  ruta === item.href ? 'text-dorado' : 'text-papel'
                }`}
              >
                {item.texto}
              </Link>
            ))}
            <a
              href={nav.externo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 text-lg text-papel"
            >
              {nav.externo.texto}
              <span aria-hidden="true"> ↗</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
