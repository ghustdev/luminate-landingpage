/**
 * GlassesService — gerencia a conexao com os Meta Ray-Ban Smart Glasses.
 *
 * ARQUITETURA (processamento distribuido):
 *   Oculos (captura de imagem/audio)  --BLE-->  App (processamento + IA)  --BLE-->  Oculos (TTS)
 *
 * NO APP NATIVO este arquivo seria implementado com `react-native-ble-plx`:
 *
 *   const manager = new BleManager()
 *   manager.startDeviceScan([LUMINATE_SERVICE_UUID], null, (error, device) => { ... })
 *   const device = await manager.connectToDevice(id)
 *   await device.discoverAllServicesAndCharacteristics()
 *   device.monitorCharacteristicForAndUpdate(SERVICE, FRAME_CHAR, (e, c) => onFrame(c.value))
 *   await device.writeCharacteristicWithResponseForService(SERVICE, AUDIO_CHAR, base64Audio)
 *
 * Como o navegador nao expoe o SDK da Meta, aqui mantemos a MESMA interface publica
 * com um transporte simulado. Trocar a implementacao interna nao afeta a UI.
 */

export type GlassesStatus = 'disconnected' | 'connecting' | 'connected'

export type GlassesState = {
  status: GlassesStatus
  battery: number
  deviceName: string
  firmware: string
  /** Sinal BLE em dBm — usado para avisar o usuario quando o celular esta longe. */
  signalDbm: number
}

// UUIDs do perfil BLE fictício do Luminate (documentam o contrato com o firmware).
export const LUMINATE_SERVICE_UUID = '0000fe80-0000-1000-8000-00805f9b34fb'
export const CHAR_FRAME_STREAM = '0000fe81-0000-1000-8000-00805f9b34fb' // oculos -> app (frames)
export const CHAR_AUDIO_OUT = '0000fe82-0000-1000-8000-00805f9b34fb' // app -> oculos (TTS)
export const CHAR_BATTERY = '00002a19-0000-1000-8000-00805f9b34fb' // padrao Battery Service
export const CHAR_BUTTON_EVENT = '0000fe83-0000-1000-8000-00805f9b34fb' // toque na haste

const initialState: GlassesState = {
  status: 'disconnected',
  battery: 0,
  deviceName: 'Ray-Ban Meta • Wayfarer',
  firmware: '14.2.1',
  signalDbm: -100,
}

let state: GlassesState = { ...initialState }
const listeners = new Set<(s: GlassesState) => void>()
let batteryTimer: ReturnType<typeof setInterval> | null = null

function emit() {
  const snapshot = { ...state }
  listeners.forEach((l) => l(snapshot))
}

export function subscribeGlasses(listener: (s: GlassesState) => void) {
  listeners.add(listener)
  listener({ ...state })
  return () => listeners.delete(listener)
}

export function getGlassesState(): GlassesState {
  return { ...state }
}

/** Faz o "scan + connect" BLE. Retorna quando o handshake termina. */
export async function connectGlasses(): Promise<GlassesState> {
  if (state.status === 'connected') return { ...state }
  state = { ...state, status: 'connecting' }
  emit()

  // Simula scan BLE + descoberta de servicos + handshake de autenticacao.
  await new Promise((resolve) => setTimeout(resolve, 1400))

  state = {
    ...state,
    status: 'connected',
    battery: 78,
    signalDbm: -52,
  }
  emit()
  startBatteryMonitor()
  return { ...state }
}

export function disconnectGlasses() {
  stopBatteryMonitor()
  state = { ...initialState }
  emit()
}

/** Assinatura da CHAR_BATTERY: o firmware notifica o nivel periodicamente. */
function startBatteryMonitor() {
  stopBatteryMonitor()
  batteryTimer = setInterval(() => {
    if (state.status !== 'connected') return
    const drained = Math.max(4, state.battery - 1)
    const jitter = Math.round((Math.random() - 0.5) * 6)
    state = {
      ...state,
      battery: drained,
      signalDbm: Math.min(-38, Math.max(-78, state.signalDbm + jitter)),
    }
    emit()
  }, 45000)
}

function stopBatteryMonitor() {
  if (batteryTimer) clearInterval(batteryTimer)
  batteryTimer = null
}

/**
 * Envia audio (TTS) de volta para os alto-falantes open-ear dos oculos.
 * No nativo: writeCharacteristic(CHAR_AUDIO_OUT, base64Pcm).
 * Na web nao ha canal BLE de audio, entao o audio sai pelo dispositivo atual.
 */
export function routeAudioToGlasses(): boolean {
  return state.status === 'connected'
}

/** Rotulo legivel do nivel de bateria — usado em labels de leitor de tela. */
export function describeBattery(battery: number) {
  if (battery <= 10) return 'bateria crítica'
  if (battery <= 25) return 'bateria baixa'
  if (battery <= 60) return 'bateria média'
  return 'bateria boa'
}

/** Rotulo legivel do status — evita depender de cor para transmitir informacao. */
export function describeStatus(s: GlassesState) {
  if (s.status === 'connected') {
    return `Óculos conectados. ${s.battery} por cento de bateria, ${describeBattery(s.battery)}.`
  }
  if (s.status === 'connecting') return 'Procurando os óculos por Bluetooth.'
  return 'Óculos desconectados.'
}
