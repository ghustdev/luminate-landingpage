/**
 * Roteador de comandos de voz.
 *
 * Interpreta a transcrição do usuário e devolve a intenção + a resposta falada.
 * Mantido puro (sem React) para poder ser reutilizado pelo evento de toque na
 * haste dos óculos (CHAR_BUTTON_EVENT) ou por um wake word em background.
 */

export type VoiceIntent =
  | { kind: 'describe'; spoken: string }
  | { kind: 'read-text'; spoken: string }
  | { kind: 'call-support'; spoken: string }
  | { kind: 'map'; spoken: string }
  | { kind: 'report-obstacle'; spoken: string }
  | { kind: 'battery'; spoken: string }
  | { kind: 'settings'; spoken: string }
  | { kind: 'unknown'; spoken: string }

const RULES: { kind: VoiceIntent['kind']; patterns: RegExp; spoken: string }[] = [
  {
    kind: 'describe',
    patterns: /(descrev|o que|à minha frente|na minha frente|cena|ambiente|enxerg)/i,
    spoken: 'Descrevendo o que os óculos estão vendo.',
  },
  {
    kind: 'read-text',
    patterns: /(ler|leia|texto|placa|cardápio|cardapio|etiqueta|bula)/i,
    spoken: 'Procurando texto na imagem para ler em voz alta.',
  },
  {
    kind: 'call-support',
    patterns: /(ajuda|socorro|voluntári|volunt|liga|chama|emergência|emergencia|apoio)/i,
    spoken: 'Abrindo a Rede de Apoio.',
  },
  {
    kind: 'report-obstacle',
    patterns: /(obstáculo|obstaculo|buraco|tropec|caí|cai aqui|obra|degrau|registrar)/i,
    spoken: 'Registrando um obstáculo na sua posição atual.',
  },
  {
    kind: 'map',
    patterns: /(mapa|rota|caminho|onde estou|navega)/i,
    spoken: 'Abrindo o mapa colaborativo.',
  },
  {
    kind: 'battery',
    patterns: /(bateria|carga|conexão|conexao|conectad)/i,
    spoken: 'Verificando o status dos óculos.',
  },
  {
    kind: 'settings',
    patterns: /(ajuste|configura|velocidade|contato|permiss)/i,
    spoken: 'Abrindo as configurações de acessibilidade.',
  },
]

export function parseVoiceCommand(transcript: string): VoiceIntent {
  const text = transcript.trim()
  for (const rule of RULES) {
    if (rule.patterns.test(text)) {
      return { kind: rule.kind, spoken: rule.spoken } as VoiceIntent
    }
  }
  return {
    kind: 'unknown',
    spoken:
      'Não entendi. Você pode dizer: descreva a cena, ler texto, pedir ajuda, registrar obstáculo ou abrir o mapa.',
  }
}

/** Lista de exemplos apresentada na tela e lida pelo leitor de tela. */
export const COMMAND_EXAMPLES = [
  'Descreva o que está à minha frente',
  'Leia esse texto para mim',
  'Preciso de ajuda de um voluntário',
  'Registrar um obstáculo aqui',
  'Qual a bateria dos óculos?',
]
