/**
 * SpeechService — camada de Text-to-Speech (TTS) e Speech-to-Text (STT).
 *
 * ACESSIBILIDADE:
 * - Todo retorno da IA e toda mudanca de estado relevante do app passa por `speak()`,
 *   garantindo que o usuario cego receba a informacao por audio sem depender da tela.
 * - No app nativo (React Native), o `speak()` seria substituido por `expo-speech` /
 *   `react-native-tts` com a saida roteada por Bluetooth para os alto-falantes
 *   open-ear dos Meta Ray-Ban. Aqui usamos a Web Speech API como equivalente.
 * - `announce()` usa uma live region ARIA para leitores de tela (VoiceOver/TalkBack),
 *   evitando "fala dupla" quando o leitor de tela do sistema ja esta ativo.
 */

export type SpeechRate = 1 | 1.5 | 2 | 2.5 | 3

let currentRate: SpeechRate = 1
let ttsEnabled = true

export function setSpeechRate(rate: SpeechRate) {
  currentRate = rate
}

export function getSpeechRate(): SpeechRate {
  return currentRate
}

export function setTtsEnabled(enabled: boolean) {
  ttsEnabled = enabled
  if (!enabled) cancelSpeech()
}

export function isTtsSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/** Fala um texto em pt-BR. Interrompe a fala anterior por padrao (prioridade "assertive"). */
export function speak(text: string, options?: { interrupt?: boolean; rate?: number }) {
  if (!ttsEnabled || !isTtsSupported() || !text.trim()) return
  const synth = window.speechSynthesis
  if (options?.interrupt !== false) synth.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'pt-BR'
  utterance.rate = options?.rate ?? currentRate
  utterance.pitch = 1

  // Prefere uma voz pt-BR quando disponivel no dispositivo.
  const ptVoice = synth.getVoices().find((v) => v.lang?.toLowerCase().startsWith('pt'))
  if (ptVoice) utterance.voice = ptVoice

  synth.speak(utterance)
}

export function cancelSpeech() {
  if (!isTtsSupported()) return
  window.speechSynthesis.cancel()
}

/**
 * Anuncia em uma live region ARIA. Usado em conjunto com o TTS para que
 * leitores de tela tambem recebam a atualizacao sem precisar mover o foco.
 */
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
  if (typeof document === 'undefined') return
  const id = priority === 'assertive' ? 'luminate-live-assertive' : 'luminate-live-polite'
  const region = document.getElementById(id)
  if (!region) return
  // Limpa antes para forcar o leitor de tela a reanunciar mensagens repetidas.
  region.textContent = ''
  window.setTimeout(() => {
    region.textContent = message
  }, 60)
}

/** Fala + anuncia na live region de uma vez. */
export function notify(message: string, priority: 'polite' | 'assertive' = 'polite') {
  speak(message, { interrupt: priority === 'assertive' })
  announce(message, priority)
}

/**
 * Feedback tatil (haptics). No React Native seria `Haptics.impactAsync()`.
 * Na web usamos a Vibration API, que existe no Android/Chrome.
 */
export function haptic(pattern: 'light' | 'success' | 'error' = 'light') {
  if (typeof navigator === 'undefined' || !('vibrate' in navigator)) return
  const patterns: Record<string, number | number[]> = {
    light: 20,
    success: [30, 60, 30],
    error: [80, 60, 80, 60, 80],
  }
  try {
    navigator.vibrate(patterns[pattern])
  } catch {
    // Silencioso: vibracao e um reforco, nunca o unico canal de feedback.
  }
}

/* ------------------------------------------------------------------ */
/* Reconhecimento de voz (comandos manuais)                            */
/* ------------------------------------------------------------------ */

type RecognitionHandle = { stop: () => void }

export function isRecognitionSupported() {
  if (typeof window === 'undefined') return false
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
}

export function startListening(handlers: {
  onResult: (transcript: string) => void
  onError?: (message: string) => void
  onEnd?: () => void
}): RecognitionHandle | null {
  if (!isRecognitionSupported()) {
    handlers.onError?.('Reconhecimento de voz não suportado neste dispositivo.')
    return null
  }
  const Ctor =
    (window as unknown as { SpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition ??
    (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognition })
      .webkitSpeechRecognition
  if (!Ctor) return null

  const recognition = new Ctor()
  recognition.lang = 'pt-BR'
  recognition.interimResults = false
  recognition.maxAlternatives = 1

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = event.results[0]?.[0]?.transcript ?? ''
    handlers.onResult(transcript)
  }
  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    handlers.onError?.(
      event.error === 'not-allowed'
        ? 'Permissão de microfone negada.'
        : 'Não consegui ouvir. Tente novamente.',
    )
  }
  recognition.onend = () => handlers.onEnd?.()

  recognition.start()
  return { stop: () => recognition.stop() }
}
