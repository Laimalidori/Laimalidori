'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { useChat } from '@ai-sdk/react'
import { TextStreamChatTransport } from 'ai'
import ReactMarkdown from 'react-markdown'
import { createClient } from '@/lib/supabase/client'
import type { WFPProject, EtapaDefinicao } from '@/types/wfp'

interface StoredMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface Props {
  projectId: string
  stageNum:  number
  projeto:   WFPProject | null
  etapaDef:  EtapaDefinicao
}

const SUGESTOES: Record<number, string[]> = {
  1: [
    'Calcule os 4 números de diagnóstico financeiro com base nos dados que vou fornecer.',
    'Leia a postura estratégica da empresa e identifique a tensão implícita.',
    'Monte o diagnóstico de 1 página: modo financeiro + postura estratégica + tensão.',
  ],
  2: [
    'Aplique as 5 perguntas de diagnóstico e me ajude a identificar qual das 4 perguntas o executivo está fazendo.',
    'Com base no contexto, qual é a pergunta real: A (cortar), B (realocar), C (sustentar) ou D (adquirir)?',
    'Redija a frase que define a pergunta real do executivo para eu levar à reunião.',
  ],
  3: [
    'Monte o mapa da cadeia de valor da empresa e identifique onde estão os gargalos.',
    'Aplique o teste do gargalo (fila, capacidade, impacto de dobrar) nas áreas que vou descrever.',
    'Classifique os gargalos em Crítico, Emergente ou Sem gargalo e priorize o investimento.',
  ],
  4: [
    'Classifique as funções que vou descrever na matriz Core / Enabler / Run / Legacy.',
    'Aplique o teste de classificação (cliente externo, interrupção, unicidade) nas funções listadas.',
    'Mostre o cruzamento gargalo × portfólio e indique os top 3 candidatos a desinvestimento.',
  ],
  5: [
    'Aplique os 4 filtros de realidade ao plano e gere a matriz de semáforos.',
    'Qual é o filtro de maior risco para esse projeto dado o contexto parametrizado?',
    'Monte o plano de mitigação para os filtros amarelos e vermelhos identificados.',
  ],
  6: [
    'Construa os 3 cenários (conservador, base, agressivo) com premissas, headcount e trade-offs.',
    'Verifique se os cenários têm contraste suficiente (diferença mínima de 15%). Ajuste se necessário.',
    'Prepare as 3 frases-âncora que vou usar na reunião com o board para defender o plano.',
  ],
}

/** Extract text from an AI SDK v6 UIMessage (parts[] is primary; content string is fallback) */
function extractText(msg: unknown): string {
  const m = msg as Record<string, unknown>
  if (Array.isArray(m.parts) && m.parts.length > 0) {
    const txt = (m.parts as Array<{ type: string; text?: string }>)
      .filter((p) => p.type === 'text')
      .map((p) => p.text ?? '')
      .join('')
    if (txt) return txt
  }
  if (typeof m.content === 'string') return m.content
  return ''
}

/** Split content into text and [ENTREGÁVEL] blocks */
interface Segment { type: 'text' | 'deliverable'; content: string }

function parseContent(content: string): Segment[] {
  const segs: Segment[] = []
  const re = /\[ENTREGÁVEL\]([\s\S]*?)\[\/ENTREGÁVEL\]/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(content)) !== null) {
    if (m.index > last) segs.push({ type: 'text', content: content.slice(last, m.index) })
    segs.push({ type: 'deliverable', content: m[1].trim() })
    last = m.index + m[0].length
  }
  if (last < content.length) segs.push({ type: 'text', content: content.slice(last) })
  return segs.length ? segs : [{ type: 'text', content }]
}

function AssistantBubble({ content }: { content: string }) {
  const segs = parseContent(content)
  return (
    <>
      {segs.map((seg, i) =>
        seg.type === 'deliverable' ? (
          <div
            key={i}
            className="mt-4 border border-success rounded-lg p-4 bg-success-subtle space-y-2"
          >
            <p className="text-xs font-semibold text-success tracking-wide uppercase">
              ✓ Entregável da etapa
            </p>
            <div className="prose-chat text-sm">
              <ReactMarkdown>{seg.content}</ReactMarkdown>
            </div>
          </div>
        ) : (
          <ReactMarkdown key={i}>{seg.content}</ReactMarkdown>
        )
      )}
    </>
  )
}

export function WFPStageChat({ projectId, stageNum, projeto, etapaDef }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [input, setInput]               = useState('')
  const [storedMsgs, setStoredMsgs]     = useState<StoredMessage[]>([])
  const [historyLoaded, setHistoryLoaded] = useState(false)
  const initSentRef = useRef(false)

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

  /* ── Load conversation history from Supabase ── */
  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('wfp_stage_outputs')
      .select('mensagens')
      .eq('projeto_id', projectId)
      .eq('etapa_id', stageNum)
      .single()
      .then(({ data }) => {
        if (data?.mensagens) {
          // Filter hidden system messages from display
          const visible = (data.mensagens as StoredMessage[]).filter(
            (m) => m.content !== '[abertura da etapa]'
          )
          setStoredMsgs(visible)
        }
        setHistoryLoaded(true)
      })
  }, [projectId, stageNum])

  /* ── Auto-init: open the stage with Amplif's analysis when no history ── */
  useEffect(() => {
    if (!historyLoaded)           return
    if (initSentRef.current)      return
    if (storedMsgs.length > 0)   return
    if (messages.length > 0)     return
    initSentRef.current = true
    sendMessage({ text: '__INIT__' })
  }, [historyLoaded, storedMsgs.length, messages.length, sendMessage])

  /* ── Scroll to bottom on new messages ── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, storedMsgs])

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

  // Filter the invisible __INIT__ sentinel from the live messages list
  const liveMsgs = messages.filter((m) => extractText(m) !== '__INIT__')
  const hasAny   = storedMsgs.length > 0 || liveMsgs.length > 0

  return (
    <div className="flex flex-col border border-border-light rounded-lg overflow-hidden bg-bg-surface">
      {/* ── Message area ── */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 min-h-[420px] max-h-[620px]">

        {/* Skeleton while loading history */}
        {!historyLoaded && (
          <div className="animate-pulse space-y-3">
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded bg-bg-muted shrink-0" />
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-3 w-3/4 bg-bg-muted rounded" />
                <div className="h-3 w-1/2 bg-bg-muted rounded" />
                <div className="h-3 w-2/3 bg-bg-muted rounded" />
              </div>
            </div>
          </div>
        )}

        {/* Suggestion chips — only when truly empty */}
        {historyLoaded && !hasAny && !isLoading && (
          <div className="space-y-3">
            <p className="body-sm text-text-tertiary">
              Ou escolha um ponto de partida para{' '}
              <span className="font-medium text-text-primary">{etapaDef.nome}</span>:
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

        {/* ── Stored (historical) messages ── */}
        {storedMsgs.map((msg, idx) => (
          <div key={`h-${idx}`} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.role === 'assistant' && <AmplifAvatar />}
            <div
              className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-accent text-white ml-auto'
                  : 'bg-bg-subtle text-text-primary prose-chat'
              }`}
            >
              {msg.role === 'assistant'
                ? <AssistantBubble content={msg.content} />
                : msg.content}
            </div>
          </div>
        ))}

        {/* ── Live messages (current session) ── */}
        {liveMsgs.map((msg) => {
          const text = extractText(msg)
          return (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.role === 'assistant' && <AmplifAvatar />}
              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-accent text-white ml-auto'
                    : 'bg-bg-subtle text-text-primary prose-chat'
                }`}
              >
                {msg.role === 'assistant'
                  ? <AssistantBubble content={text} />
                  : text}
              </div>
            </div>
          )
        })}

        {/* Streaming indicator */}
        {isLoading && (
          <div className="flex gap-3">
            <AmplifAvatar />
            <div className="bg-bg-subtle rounded-lg px-4 py-3">
              <span className="streaming-cursor" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input bar ── */}
      <div className="border-t border-border-light p-3 flex gap-2 bg-bg-surface">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
          }}
          placeholder="Responda, adicione dados ou faça uma pergunta…"
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

function AmplifAvatar() {
  return (
    <div className="w-7 h-7 rounded bg-accent text-white flex items-center justify-center shrink-0 text-xs font-semibold">
      N
    </div>
  )
}

function buildSystemContext(projeto: WFPProject | null, etapa: EtapaDefinicao): string {
  if (!projeto) return ''
  const p = (projeto.parametrizacao as unknown) as Record<string, Record<string, unknown>>
  const id  = p?.identidadeEmpresa       ?? {}
  const mom = p?.momentoEstrategico      ?? {}
  const fin = p?.contextoFinanceiro      ?? {}
  const mat = p?.maturidadeOrganizacional ?? {}
  const pol = p?.contextoPolitico        ?? {}

  return `
Projeto: ${projeto.nome}
Empresa: ${id.nomeEmpresa ?? ''} | Setor: ${id.setor ?? ''} | Mercado: ${id.mercado ?? ''} | Colaboradores: ${id.numColaboradores ?? ''}
Momento: ${mom.momento ?? ''} | Meta próximo ano: ${mom.metaProximoAno ?? ''}
Gatilho WFP: ${mom.gatilhoWFP ?? ''}
Custo pessoas/receita: ${fin.custoPessoasReceita ?? ''} | Pressão budget: ${fin.pressaoBudget ?? ''} | Lidera budget: ${fin.liderBudget ?? ''}
Maturidade dados: ${mat.maturidadeDados ?? ''} | Maturidade liderança: ${mat.maturidadeLideranca ?? ''} | Histórico WFP: ${mat.historicoWFP ?? ''}
Reação CEO: ${pol.reacaoCEO ?? ''} | Risco político: ${pol.maiorRiscoPolitico ?? ''}
Líder pode travar: ${pol.liderPoderTravar ?? ''}${pol.liderPoderTravarQuem ? ` (${pol.liderPoderTravarQuem})` : ''}

Etapa atual: ${etapa.numero} — ${etapa.nome}
Objetivo: ${etapa.objetivo}
Frameworks: ${etapa.frameworks.join('; ')}
`.trim()
}
