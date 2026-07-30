import { generateText } from 'ai'

/**
 * Módulo de Processamento Visual — o "cérebro" do Luminate.
 *
 * FLUXO DISTRIBUÍDO:
 *   Óculos (câmera) --BLE--> App (este endpoint) --IA--> TTS --BLE--> Óculos
 *
 * O app envia o frame + um prompt de contexto para um modelo multimodal.
 * A resposta é curta e acionável de propósito: quem está caminhando precisa
 * de informação imediata, não de um parágrafo descritivo.
 */

export const maxDuration = 30

type Mode = 'cena' | 'texto' | 'obstaculos'

const PROMPTS: Record<Mode, string> = {
  cena:
    'Você é o assistente de visão de uma pessoa cega que está caminhando. Descreva a cena em no máximo 3 frases curtas, em português do Brasil. Comece SEMPRE pelo que representa risco imediato (obstáculos, degraus, buracos, veículos, pessoas no caminho) e indique a direção usando referências de relógio (ex.: "às 2 horas") ou "à esquerda/direita/à frente". Depois cite brevemente o contexto do lugar. Não use listas, não use emojis, não descreva cores decorativas.',
  texto:
    'Você é o assistente de leitura de uma pessoa cega. Leia em voz alta TODO o texto visível na imagem, em português do Brasil, na ordem natural de leitura. Se for um cardápio, placa, etiqueta ou documento, informe primeiro o tipo em uma frase e depois leia o conteúdo. Se não houver texto legível, diga apenas "Não encontrei texto legível nesta imagem." Não invente conteúdo.',
  obstaculos:
    'Você analisa a calçada à frente de uma pessoa cega. Responda em português do Brasil com no máximo 2 frases. Identifique apenas obstáculos físicos relevantes para a caminhada (buraco, obra, degrau, poste, galho baixo, lixo, veículo na calçada) e sua posição aproximada. Se a passagem estiver livre, diga "Caminho livre à frente."',
}

export async function POST(req: Request) {
  try {
    const { image, mode = 'cena' } = (await req.json()) as {
      image?: string
      mode?: Mode
    }

    if (!image) {
      return Response.json({ error: 'Imagem não enviada.' }, { status: 400 })
    }

    const prompt = PROMPTS[mode] ?? PROMPTS.cena

    const result = await generateText({
      // Modelo multimodal rápido: latência importa quando o usuário está andando.
      model: 'google/gemini-3.6-flash',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'file', mediaType: 'image/jpeg', data: image },
          ],
        },
      ],
    })

    return Response.json({ description: result.text.trim() })
  } catch (error) {
    console.log('[v0] Erro na descrição de cena:', error)
    return Response.json(
      {
        error:
          'Não consegui processar a imagem agora. Você pode tentar de novo ou chamar a Rede de Apoio.',
      },
      { status: 500 },
    )
  }
}
