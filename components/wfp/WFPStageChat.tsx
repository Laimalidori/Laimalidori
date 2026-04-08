'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { useChat } from '@ai-sdk/react'
import { TextStreamChatTransport } from 'ai'
import type { WFPProject, EtapaDefinicao } from '@/types/wfp'

interface Props {
  projectId: string
  stageNum: number
  projeto: WFPProject | null
  etapaDef: EtapaDefinicao
}

// Suggested prompts per stage
const SUGESTOES: Record<number, string[]> = {
  1: [
    'Faça o diagnóstico completo da minha força de trabalho com base nos dados fornecidos.',
    'Quais são os principais riscos da minha estrutura de headcount atual?',
    'Monte uma análise de custo-pessoa por área crítica.',
  ],
  2: [
    'Projete a demanda de workforce para os próximos 24 meses.',
    'Construa 3 cenários (conservador, base e otimista) de evolução do headcount.',
    'Quais drivers de negócio mais impactam minha necessidade de pessoas?',
  ],
  3: [
    'Faça a análise de gaps entre minha força de trabalho atual e a necessária.',
    'Quais são os gaps mais críticos e urgentes de endereçar?',
    'Monte um heatmap de risco de talento por área.',
  ],
  4: [
    'Defina a estratégia Build-Buy-Borrow-Bot para os principais gaps identificados.',
    'Qual é o business case para as 3 maiores iniciativas de WFP?',
    'Como priorizar as alavancas estratégicas dado meu orçamento limitado?',
  ],
  5: [
    'Monte o plano de ação detalhado com responsáveis, prazos e KPIs.',
    'Construa o budget consolidado para todas as iniciativas do plano.',
    'Defina a matriz RACI para a execução do plano.',
  ],
  6: [
    'Projete o dashboard de métricas de WFP com os 4 KPIs principais.',
    'Defina a cadência de revisão e os responsáveis pela governança.',
    'Quais são os early warning indicators que devo monitorar?',
  ],
}

export function WFPStageChat({ projectId, stageNum, projeto, etapaDef }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState('')

  const systemContext = buildSystemContext(projeto, etapaDef)

  const transport = useMemo(
    () =>
      new TextStreamChatTransport({
        api: '/api/chat/wfp',
        body: { projectId, stageNum, systemContext },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projectId, stageNum]
  )

  const { messages, sendMessage, status } = useChat({ transport })
  const isLoading = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend() {
    const text = input.trim()
    if (!text || isLoading) return
    setInput('')
    sendMessage({ text })
  }

  function handleSugestao(s: string) {
    setInput('')
    sendMessage({ text: s })
  }

  const sugestoes = SUGESTOES[stageNum] ?? []

  return (
    <div className="border border-border-light rounded-lg overflow-hidden bg-bg-surface">
      {/* Messages */}
      <div className="min-h-[300px] max-h-[520px] overflow-y-auto p-5 space-y-4">
        {messages.length === 0 && (
          <div className="space-y-4">
            <p className="body-sm text-text-tertiary">
              Nina está pronta para conduzir a análise de <span className="text-text-primary font-medium">{etapaDef.nome}</span>.
              Use as sugestões abaixo ou faça sua pergunta.
            </p>
            <div className="space-y-2">
              {sugestoes.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSugestao(s)}
                  className="w-full text-left text-xs border border-border-light rounded px-4 py-2.5 text-text-secondary hover:bg-bg-subtle hover:border-border-medium transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded bg-accent text-white flex items-center justify-center shrink-0 text-xs font-medium">
                N
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-accent text-white ml-auto'
                  : 'bg-bg-subtle text-text-primary prose-chat'
              }`}
            >
              {typeof (msg as unknown as { content: unknown }).content === 'string'
                ? (msg as unknown as { content: string }).content
                : ''}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded bg-accent text-white flex items-center justify-center shrink-0 text-xs font-medium">
              N
            </div>
            <div className="bg-bg-subtle rounded-lg px-4 py-3">
              <span className="streaming-cursor" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border-light p-3 flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          placeholder="Faça uma pergunta ou solicite uma análise…"
          rows={2}
          className="flex-1 resize-none text-sm bg-transparent text-text-primary placeholder-text-disabled outline-none py-1"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="self-end w-8 h-8 rounded bg-accent text-white flex items-center justify-center hover:bg-accent-hover transition-colors disabled:opacity-40 shrink-0"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7l6-6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

function buildSystemContext(projeto: WFPProject | null, etapa: EtapaDefinicao): string {
  if (!projeto) return ''
  const p = (projeto.parametrizacao as unknown) as Record<string, Record<string, unknown>>
  const perfil = p?.perfilNegocio ?? {}
  const contexto = p?.contextoEstrategico ?? {}
  const dados = p?.dadosForcaTrabalho ?? {}
  const foco = p?.focoProjeto ?? {}

  return `
Projeto: ${projeto.nome}
Empresa: ${perfil.nomeEmpresa ?? ''} | Setor: ${perfil.setor ?? ''} | Funcionários: ${perfil.numFuncionarios ?? ''}
Horizonte: ${contexto.horizonte ?? ''} | Drivers: ${(contexto.drivers as string[])?.join(', ') ?? ''}
Turnover: ${dados.turnoverAnual ?? ''}% | Áreas críticas: ${(dados.areasCriticas as string[])?.join(', ') ?? ''}
Tipo projeto: ${foco.tipo ?? ''} | Prioridade: ${foco.prioridade ?? ''}
Mandato RH: ${contexto.mandatoRH ?? 'não informado'}

Etapa atual: ${etapa.numero} — ${etapa.nome}
Objetivo: ${etapa.objetivo}
Frameworks aplicáveis: ${etapa.frameworks.join(', ')}
`.trim()
}
