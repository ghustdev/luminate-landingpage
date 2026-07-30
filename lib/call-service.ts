/**
 * CallService — chamada de vídeo/áudio com a Rede de Apoio.
 *
 * ARQUITETURA REAL (WebRTC):
 * 1. O app cria uma RTCPeerConnection e adiciona o track de vídeo que vem dos
 *    óculos (no nativo, um MediaStream alimentado pelo frame stream BLE; num
 *    fallback, a câmera traseira do celular).
 * 2. A sinalização (offer/answer/ICE) trafega por um servidor — Supabase
 *    Realtime, Firebase RTDB ou um serviço como Twilio/Agora.
 * 3. O áudio remoto do voluntário é roteado para os alto-falantes open-ear:
 *    `setAudioOutput('bluetooth')` (react-native-incall-manager).
 *
 * Esqueleto da implementação real:
 *
 *   const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] })
 *   localStream.getTracks().forEach((t) => pc.addTrack(t, localStream))
 *   const offer = await pc.createOffer()
 *   await pc.setLocalDescription(offer)
 *   await signaling.send({ type: 'offer', sdp: offer.sdp, to: contactId })
 *
 * Nesta versão a sinalização é simulada (sem backend), mas os estados da
 * chamada e o ciclo de vida do stream local são reais.
 */

export type CallStatus = 'idle' | 'ringing' | 'active' | 'ended' | 'failed'

export const ICE_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:global.stun.twilio.com:3478' },
]

/** Abre o stream local (a "visão" que o voluntário vai receber). */
export async function openLocalStream(): Promise<MediaStream> {
  return navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment', width: { ideal: 1280 } },
    audio: true,
  })
}

export function closeStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop())
}

/** Cria a peer connection já configurada (usada quando há sinalização real). */
export function createPeerConnection(stream: MediaStream): RTCPeerConnection {
  const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS })
  stream.getTracks().forEach((track) => pc.addTrack(track, stream))
  return pc
}

/** Formata a duração da chamada em texto legível para o TTS. */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

/** Versão falada da duração, sem símbolos que o TTS leria mal. */
export function speakableDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (mins === 0) return `${secs} segundos`
  return `${mins} ${mins === 1 ? 'minuto' : 'minutos'} e ${secs} segundos`
}
