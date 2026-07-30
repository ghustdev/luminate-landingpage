'use client'

/**
 * AppShell — moldura do app: header de status + conteúdo + navegação inferior.
 *
 * ACESSIBILIDADE:
 * - Ordem de foco lógica top-down: skip link -> header -> main -> navegação.
 * - `<nav>` com `aria-label` e cada item com `aria-current="page"` para o
 *   leitor de tela informar onde o usuário está.
 * - Alvos de toque de 64px de altura (muito acima do mínimo de 44x44pt).
 * - Ícone + rótulo textual sempre juntos: nunca dependemos só do ícone.
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Eye, Home, Map, Settings, Users } from 'lucide-react'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useLuminate } from '@/lib/luminate-store'
import { describeStatus } from '@/lib/glasses-service'
import Image from 'next/image'

const NAV_ITEMS = [
  { href: '/', label: 'Início', icon: Home, hint: 'Tela principal com o botão de voz' },
  { href: '/visao', label: 'Visão IA', icon: Eye, hint: 'Descrever a cena com inteligência artificial' },
  { href: '/apoio', label: 'Apoio', icon: Users, hint: 'Chamar um voluntário ou familiar' },
  { href: '/mapa', label: 'Mapa', icon: Map, hint: 'Mapa colaborativo de obstáculos' },
  { href: '/ajustes', label: 'Ajustes', icon: Settings, hint: 'Configurações de acessibilidade' },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { glasses, say } = useLuminate()

  // Feedback de voz automático ao abrir o app: "Luminate ativo..."
  useEffect(() => {
    const timer = window.setTimeout(() => {
      say(`Luminate ativo. ${describeStatus(glasses)}`, 'assertive')
    }, 700)
    return () => window.clearTimeout(timer)
    // Executa apenas na montagem inicial, de propósito.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      <StatusHeader />

      <main
        id="conteudo"
        tabIndex={-1}
        className="flex flex-1 flex-col px-4 pt-2 pb-28 outline-none"
      >
        {children}
      </main>

      <nav
        aria-label="Navegação principal do Luminate"
        className="bg-background/95 border-border fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t backdrop-blur"
      >
        <ul className="flex items-stretch justify-between px-1 py-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href
            const Icon = item.icon
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  aria-label={item.label}
                  title={item.hint}
                  className={cn(
                    'flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-xs font-bold',
                    active
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                  )}
                >
                  <Icon aria-hidden="true" className="size-6 shrink-0" />
                  <span className="text-center leading-tight">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

/**
 * StatusHeader — status de conexão dos óculos, sempre visível.
 * O texto do estado é redundante ao ícone e à cor (WCAG 1.4.1).
 */
function StatusHeader() {
  const { glasses } = useLuminate()
  const connected = glasses.status === 'connected'
  const connecting = glasses.status === 'connecting'

  return (
    <header className="border-border flex items-center justify-between gap-3 border-b px-4 py-3">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo Luminate" width={24} height={24} />
        <p className="text-lg font-black tracking-tight">Luminate</p>
      </div>
      <p
        role="status"
        aria-live="polite"
        className="text-muted-foreground text-right text-xs font-bold uppercase"
      >
        {connected
          ? `Conectado · ${glasses.battery}%`
          : connecting
            ? 'Conectando…'
            : 'Desconectado'}
      </p>
    </header>
  )
}
