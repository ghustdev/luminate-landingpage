import { Suspense } from 'react'
import { VisionModule } from '@/components/vision-module'

export const metadata = {
  title: 'Visão IA — Luminate',
  description: 'Descreva a cena ou leia textos usando a câmera dos óculos e a IA.',
}

/**
 * Tela do Módulo de IA e Processamento Visual.
 * O <h1> vem primeiro na ordem de foco, seguido pelos controles de captura.
 */
export default function VisaoPage() {
  return (
    <div className="flex flex-col gap-5 pt-2">
      <div>
        <h1 className="text-3xl leading-tight font-black text-balance">Visão IA</h1>
        <p className="text-muted-foreground mt-1 text-base leading-relaxed">
          A câmera dos óculos captura, o celular processa e a resposta volta em voz pelos
          alto-falantes open-ear.
        </p>
      </div>
      <Suspense
        fallback={
          <p role="status" aria-live="polite" className="text-base">
            Carregando o módulo de visão…
          </p>
        }
      >
        <VisionModule />
      </Suspense>
    </div>
  )
}
