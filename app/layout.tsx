import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Roboto, Roboto_Mono } from 'next/font/google'
import { LuminateProvider } from '@/lib/luminate-store'
import { AppShell } from '@/components/app-shell'
import { LiveRegions } from '@/components/live-regions'
import './globals.css'

const _roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700', '900'] })
const _robotoMono = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Luminate — Autonomia com os Meta Glasses',
  description:
    'Luminate conecta os Meta Ray-Ban Smart Glasses à inteligência artificial, à rede de apoio humano e ao mapa colaborativo de acessibilidade.',
  applicationName: 'Luminate',
  generator: 'v0.app',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Luminate',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: [
      { url: '/logo.svg', media: '(prefers-color-scheme: light)' },
      { url: '/logo.svg', media: '(prefers-color-scheme: dark)' },
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: 'logo.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  // Nunca bloquear o zoom: usuarios com baixa visao dependem dele.
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className="bg-background text-foreground font-sans antialiased">
        <LuminateProvider>
          {/* Atalho de teclado: primeiro item na ordem de foco */}
          <a
            href="#conteudo"
            className="bg-primary text-primary-foreground focus:top-2 fixed -top-40 left-2 z-50 rounded-lg px-4 py-3 text-base font-bold"
          >
            Pular para o conteúdo principal
          </a>
          {/* Live regions ARIA usadas por todo o app para anunciar mudanças */}
          <LiveRegions />
          <AppShell>{children}</AppShell>
        </LuminateProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
