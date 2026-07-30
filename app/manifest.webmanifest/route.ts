/** Manifest PWA — permite instalar o Luminate na tela inicial do celular. */
export function GET() {
  return Response.json({
    name: 'Luminate — Autonomia com os Meta Glasses',
    short_name: 'Luminate',
    description:
      'Assistente de navegação e visão para pessoas cegas ou com baixa visão, integrado aos Meta Ray-Ban Smart Glasses.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#000000',
    theme_color: '#0064e0',
    lang: 'pt-BR',
    dir: 'ltr',
    categories: ['accessibility', 'navigation', 'utilities'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  })
}
