import type { Metadata } from 'next'
import { ObstacleMapModule } from '@/components/obstacle-map-module'

export const metadata: Metadata = {
  title: 'Mapa colaborativo de obstáculos',
  description:
    'Mapa comunitário de buracos, obras e degraus registrados por outros usuários do Luminate.',
}

export default function MapaPage() {
  return (
    <>
      <h1 className="mt-2 text-3xl font-black tracking-tight">Mapa colaborativo</h1>
      <p className="text-muted-foreground mt-1 text-base leading-relaxed">
        Obstáculos relatados pela comunidade. Os mais próximos de você aparecem primeiro na
        lista.
      </p>
      <ObstacleMapModule />
    </>
  )
}
