import { SupportNetwork } from '@/components/support-network'

export const metadata = {
  title: 'Rede de Apoio — Luminate',
  description: 'Chame um familiar ou voluntário e transmita o que os óculos estão vendo.',
}

export default function ApoioPage() {
  return (
    <div className="flex flex-col gap-5 pt-2">
      <div>
        <h1 className="text-3xl leading-tight font-black text-balance">Rede de Apoio</h1>
        <p className="text-muted-foreground mt-1 text-base leading-relaxed">
          Quando a IA não resolve, uma pessoa resolve. O vídeo dos óculos é transmitido e a voz do
          voluntário volta pelos alto-falantes.
        </p>
      </div>
      <SupportNetwork />
    </div>
  )
}
