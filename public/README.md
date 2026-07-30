# ![alt text](logo.svg) Luminate

<div align="center">
  <h3>Assistente de Autonomia e Navegação para Pessoas com Deficiência Visual</h3>
  <p><i>Desenvolvido para o Programa AI Glasses Brasil (CEIA/UFG/FUNAPE + Meta) </i></p>
</div>

---

## 📖 Sobre o Projeto

Luminate é uma solução de autonomia e navegação para pessoas cegas ou com baixa visão, usando os AI Glasses da Meta como ponte *hands-free* entre o usuário e o ambiente ao seu redor[cite: 2]. O projeto resolve o problema da percepção espacial contínua e leitura do dia a dia sem o estigma associado a equipamentos médicos visíveis[cite: 2].

O sistema usa os três canais nativos dos óculos (câmera, microfone, alto-falante) combinados a um aplicativo mobile *companion*[cite: 2]. O celular atua como o cérebro de processamento (Edge AI), GPS acessível e rede de apoio humano, respeitando integralmente as limitações de hardware e bateria do wearable[cite: 2].

## ✨ Principais Funcionalidades

*   **👁️ Descrição de Cenários:** A câmera é ativada por toque ou voz e a IA descreve o ambiente, com a resposta sendo narrada no alto-falante open-ear[cite: 2].
*   **📝 Leitura de Textos (OCR Dinâmico):** Permite a leitura de cardápios, rótulos e horários, sussurrando o texto lido diretamente no ouvido do usuário[cite: 2].
*   **🚶‍♂️ Detecção de Obstáculos (Eficiência Dinâmica):** A câmera captura frames sequenciais apenas quando o usuário está em movimento, processando obstáculos no terço superior da imagem e emitindo alertas espaciais rápidos[cite: 2].
*   **🤝 Rede de Apoio (WebRTC):** Em situações complexas, o usuário inicia uma videochamada por voz. Um voluntário/familiar recebe o feed de vídeo contínuo da câmera e guia o usuário em tempo real pelos alto-falantes[cite: 2].
*   **🗺️ Waze da Acessibilidade:** Serviço em background que capta coordenadas GPS de obstáculos recorrentes detectados, gerando dados urbanos colaborativos (Modelo B2G/B2B)[cite: 2].

## 🏗️ Arquitetura e Eficiência Dinâmica

Para viabilizar o uso prolongado sem superaquecer os óculos ou drenar a bateria[cite: 2], o Luminate adota uma arquitetura de processamento distribuído:
1.  **Gatilho por Sensores:** O acelerômetro/pedômetro do celular controla a câmera do óculos.
2.  **Captura Intermitente:** O envio de vídeo contínuo é substituído por capturas esparsas (1 frame a cada 3 segundos) durante o movimento.
3.  **Processamento Edge:** Modelos leves rodam localmente no smartphone para detecção rápida de obstáculos, sem depender 100% da internet.

## 🛠️ Stack Tecnológica

*   **Frontend Mobile:** React Native / Expo (Interface acessível, alto contraste, suporte nativo ao VoiceOver/TalkBack).
*   **Conexão de Hardware:** Bluetooth Low Energy (BLE) / Meta SDK.
*   **Inteligência Artificial:** 
    *   *Cloud AI:* OpenAI GPT-4o Vision / Google Gemini Pro Vision (Descrição e OCR).
    *   *Edge AI:* TensorFlow Lite / MiDaS (Estimativa de Profundidade Monocular).
*   **Comunicação em Tempo Real:** WebRTC / Expo Speech (TTS).
*   **Backend/Banco de Dados:** SQLite (local) / Firebase ou Supabase (Nuvem).

## 🚀 Como Rodar o Projeto (MVP)

### Pré-requisitos
*   Node.js instalado (v18+)
*   Conta no Expo (`npm install -g eas-cli`)
*   Aplicativo Expo Go no seu smartphone físico (fortemente recomendado para testar câmera e TTS)
*   Chaves de API da OpenAI ou Google Gemini

### Instalação

1. Clone o repositório:
   ```bash
   git clone [https://github.com/seu-usuario/luminate.git](https://github.com/seu-usuario/luminate.git)
   cd luminate
