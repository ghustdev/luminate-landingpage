import type { Metadata } from 'next'
import { AccessibilitySettings } from '@/components/accessibility-settings'

export const metadata: Metadata = {
  title: 'Ajustes de acessibilidade',
  description:
    'Velocidade da voz, alto contraste, tamanho da fonte, vibração e permissões do Luminate.',
}

export default function AjustesPage() {
  return (
    <>
      <h1 className="mt-2 text-3xl font-black tracking-tight">Ajustes</h1>
      <p className="text-muted-foreground mt-1 text-base leading-relaxed">
        Tudo aqui pode ser alterado por voz. Diga &quot;aumentar a voz&quot; ou &quot;alto
        contraste&quot; na tela inicial.
      </p>
      <AccessibilitySettings />
    </>
  )
}
