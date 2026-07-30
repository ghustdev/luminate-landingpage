/**
 * MappingService — o "Waze da Acessibilidade".
 *
 * COMO FUNCIONA NO APP NATIVO:
 * 1. Um Foreground Service (Android) / Background Location (iOS) mantém o GPS ativo.
 *    - `expo-location`: startLocationUpdatesAsync com accuracy BestForNavigation.
 * 2. O acelerômetro é amostrado a ~50Hz (`expo-sensors` / `react-native-sensors`).
 * 3. Um tropeço é detectado quando a magnitude do vetor de aceleração passa de
 *    ~2.5g seguida de uma queda abrupta (assinatura de impacto + parada).
 * 4. Nesse instante, gravamos a última posição GPS como pin e sincronizamos com
 *    o backend (Supabase/Firebase) quando houver rede.
 *
 * AQUI (protótipo web) usamos a DeviceMotion API quando disponível e, em
 * desktop, um gerador simulado — mantendo a mesma interface pública.
 */

export type DetectedPin = {
  lat: number
  lng: number
  type: 'buraco' | 'obra' | 'degrau' | 'galho' | 'poste' | 'outro'
  note: string
  source: 'ia' | 'queda' | 'manual'
}

/** Limiar de impacto em m/s². 1g ≈ 9.8; usamos ~2.5g. */
const IMPACT_THRESHOLD = 24

const FALLBACK_CENTER = { lat: -23.5629, lng: -46.6544 }

async function currentPosition(): Promise<{ lat: number; lng: number }> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) return FALLBACK_CENTER
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => resolve(FALLBACK_CENTER),
      { enableHighAccuracy: true, timeout: 4000 },
    )
  })
}

/**
 * Inicia a detecção de tropeços/quedas em segundo plano.
 * Retorna a função de parada (equivalente a remover o listener do sensor).
 */
export function startFallDetection(onDetect: (pin: DetectedPin) => void): () => void {
  if (typeof window === 'undefined') return () => {}

  let lastTrigger = 0

  const handleMotion = async (event: DeviceMotionEvent) => {
    const a = event.accelerationIncludingGravity
    if (!a || a.x == null || a.y == null || a.z == null) return
    const magnitude = Math.sqrt(a.x ** 2 + a.y ** 2 + a.z ** 2)
    // Debounce de 20s: evita registrar o mesmo tropeço várias vezes.
    if (magnitude < IMPACT_THRESHOLD || Date.now() - lastTrigger < 20000) return
    lastTrigger = Date.now()
    const { lat, lng } = await currentPosition()
    onDetect({
      lat,
      lng,
      type: 'outro',
      note: 'Impacto detectado pelo acelerômetro (possível tropeço)',
      source: 'queda',
    })
  }

  if ('DeviceMotionEvent' in window) {
    window.addEventListener('devicemotion', handleMotion)
    return () => window.removeEventListener('devicemotion', handleMotion)
  }

  // Sem sensor (desktop): nada é gerado, apenas devolvemos um no-op.
  return () => {}
}

/**
 * Correlaciona detecções repetidas da IA no mesmo ponto.
 * Se o mesmo tipo de obstáculo é visto 3+ vezes num raio de ~15m,
 * ele se torna um pin permanente do mapa colaborativo.
 */
export function shouldPromoteToPin(
  detections: { lat: number; lng: number; type: string }[],
  candidate: { lat: number; lng: number; type: string },
): boolean {
  const RADIUS_DEG = 0.00013 // ~15 metros
  const nearby = detections.filter(
    (d) =>
      d.type === candidate.type &&
      Math.abs(d.lat - candidate.lat) < RADIUS_DEG &&
      Math.abs(d.lng - candidate.lng) < RADIUS_DEG,
  )
  return nearby.length >= 2
}

/** Distância aproximada em metros entre duas coordenadas (Haversine). */
export function distanceMeters(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371000
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLng = ((b.lng - a.lng) * Math.PI) / 180
  const lat1 = (a.lat * Math.PI) / 180
  const lat2 = (b.lat * Math.PI) / 180
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return Math.round(2 * R * Math.asin(Math.sqrt(h)))
}
