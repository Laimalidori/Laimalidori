'use client'

import { useState } from 'react'
import type { EtapaDefinicao } from '@/types/wfp'

interface Props {
  def:       EtapaDefinicao
  stageNum:  number
}

/* ── Stage-specific guide content from spec ───────────── */

const STAGE_GUIDES: Record<number, { sections: Array<{ title: string; items: string[] }> }> = {
  1: {
    sections: [
      {
        title: 'Os 4 números de diagnóstico financeiro',
        items: [
          'Receita por FTE = Receita 12m ÷ Headcount médio. Tendência cadente = problema estrutural.',
          'Custo de pessoas/receita = (Folha + encargos + benefícios) ÷ Receita. Referência serviços: 40–60%.',
          'Margem de contribuição por área — mostra onde o dinheiro nasce e onde vira fumaça.',
          'Runway ou fluxo de caixa operacional — define a velocidade de qualquer decisão de pessoas.',
        ],
      },
      {
        title: 'Playing to Win — 2 perguntas estratégicas',
        items: [
          'Onde a empresa decidiu jogar? (mercados, segmentos, produtos onde aposta o crescimento)',
          'Como a empresa decidiu ganhar? (vantagem competitiva declarada: custo, diferenciação, velocidade, escala)',
          'Quais capacidades humanas a estratégia exige? (3–5 capacidades críticas)',
        ],
      },
      {
        title: 'Cruzamento: tensões implícitas a identificar',
        items: [
          'Modo eficiência + Vantagem por diferenciação → essas duas coisas brigam.',
          'Hypergrowth + Liderança imatura → cultura que se desfaz na escala.',
          'Reestruturação + Pressão por resultado rápido → conversas difíceis que vão travar.',
        ],
      },
      {
        title: '⚠ Ponto crítico desta etapa',
        items: [
          'Peça os números financeiros ao FP&A EXPLICANDO o objetivo antes.',
          'O FP&A vai achar que é auditoria ou corte se você não contextualizar.',
        ],
      },
    ],
  },
  2: {
    sections: [
      {
        title: 'As 5 perguntas para fazer ao executivo',
        items: [
          '"Essa pressão está vindo de margem, de caixa ou de crescimento?" → define o tipo de análise.',
          '"Se eu chegasse com plano que mantém headcount mas move budget entre áreas, você ficaria satisfeito?" → revela se é corte ou realocação.',
          '"Tem alguma área que você já sabe que precisa crescer, independente do que eu encontrar?" → descobre agenda oculta.',
          '"Quando você precisa dessa resposta e em que formato?" → define prazo real e nível de sofisticação.',
          '"O CFO está alinhado que esse projeto está acontecendo?" → se não: não comece antes de alinhar.',
        ],
      },
      {
        title: 'As 4 perguntas reais (identifique qual é a sua)',
        items: [
          'Pergunta A — Cortar mantendo output: análise de eficiência, span of control, camadas, duplicações.',
          'Pergunta B — Realocar capacidade: portfólio organizacional, margem por área, gargalos de crescimento.',
          'Pergunta C — Sustentar com menos: produtividade, processos, mix de senioridade, terceirização.',
          'Pergunta D — Adquirir capacidade nova: criar espaço para apostar em algo novo sem aumentar budget total.',
        ],
      },
      {
        title: '⚠ Ponto crítico desta etapa',
        items: [
          'Responder a pergunta errada é pior que não responder.',
          'Não comece a análise antes de ter certeza sobre qual pergunta está sendo feita.',
        ],
      },
    ],
  },
  3: {
    sections: [
      {
        title: 'Mapa da cadeia de valor (7 estágios máximo)',
        items: [
          'Mapeie: Estágio → Quem faz → Output/mês → Demanda/mês → Fila?',
          'Onde forma fila = onde está o gargalo.',
          'Fila em SDR bloqueando AE = gargalo em qualificação, não em fechamento.',
        ],
      },
      {
        title: 'Teste do gargalo (3 perguntas por função)',
        items: [
          'Fila: "Se essa função parasse 30 dias, o que aconteceria com a receita?" → Nada = não é gargalo.',
          'Capacidade: "Está na capacidade máxima ou tem folga?" → Folga = o gargalo está em outro lugar.',
          'Impacto de dobrar: "Se dobrássemos amanhã, quanto crescimento destravaria?" → Pouco = não é o gargalo principal.',
        ],
      },
      {
        title: 'Classificação de gargalos',
        items: [
          'Crítico (vermelho): travando crescimento hoje. Investimento imediato.',
          'Emergente (amarelo): vai travar em 6–12 meses. Investimento planejado.',
          'Sem gargalo (verde): capacidade adequada. Manter ou otimizar.',
        ],
      },
      {
        title: '⚠ Benchmark orientativo (McKinsey, 2021)',
        items: [
          '60% das empresas de serviços 100–500 pessoas: o gargalo principal está na entrega (CS, implementação, operações).',
          'Não em vendas, como frequentemente se assume.',
        ],
      },
    ],
  },
  4: {
    sections: [
      {
        title: 'Matriz Core / Enabler / Run / Legacy',
        items: [
          'CORE: gera vantagem competitiva direta. Decisão: Proteger, desenvolver, pagar acima do mercado.',
          'ENABLER: crítico para operar, mas não diferencia. Decisão: Eficiência, padronização, eventual terceirização.',
          'RUN-THE-BUSINESS: necessário mas replicável. Decisão: Automatizar, terceirizar ou consolidar.',
          'LEGACY: sobreviveu porque ninguém questionou. Decisão: Eliminar, com gestão cuidadosa do impacto.',
        ],
      },
      {
        title: 'Teste de classificação (3 perguntas por função)',
        items: [
          'Teste do cliente externo: "O cliente pagaria mais pelo serviço se soubesse que essa função existe?" → Não = Run ou Legacy.',
          'Teste da interrupção: "Se parar 30 dias, o que acontece com receita ou cliente?" → Impacto baixo = Run ou Legacy.',
          'Teste da unicidade: "Existe porque é melhor que a alternativa, ou porque sempre existiu?" → Sempre existiu = forte candidata a Legacy.',
        ],
      },
      {
        title: '⚠ Pontos críticos desta etapa',
        items: [
          'Não classifique a área inteira. Uma área pode ter funções Core e Legacy ao mesmo tempo.',
          'Valide com pelo menos 2 líderes antes de finalizar. Classificação unilateral é indefensável politicamente.',
          'Registre a evidência. "Achei que era Legacy" não funciona no board. Dados concretos funcionam.',
          'Benchmark: empresas mid-market tipicamente têm 15–25% das funções em Legacy sem saber (BCG, 2021).',
        ],
      },
    ],
  },
  5: {
    sections: [
      {
        title: 'Filtro 1 — Maturidade de liderança',
        items: [
          '"Dos líderes afetados, quantos conduzem conversa difícil de desligamento sem evitar o conflito?" → Poucos = Vermelho.',
          '"Quando recebem decisão impopular, o padrão deles é defender e executar ou resistir passivamente?" → Resistência passiva = Vermelho.',
          'Implicação Vermelho: qualquer decisão que dependa de conversas difíceis atrasa 30–60 dias além do plano.',
        ],
      },
      {
        title: 'Filtro 2 — Escassez de mercado',
        items: [
          '"As funções identificadas como gargalo têm oferta adequada no mercado?" → Escassa = Vermelho.',
          '"O time-to-fill planejado é realista dado o histórico?" → 50% mais otimista = Vermelho.',
          '"O budget de remuneração é competitivo?" → Abaixo da mediana = Vermelho (aceitarão e sairão rápido).',
        ],
      },
      {
        title: 'Filtro 3 — Dinâmica política',
        items: [
          '"Quem ganha e quem perde poder com esse plano?" → Líder importante perde e pode vetar = Vermelho.',
          '"O CEO vai defender esse plano se houver resistência do C-level?" → Incerto = Vermelho.',
          '"Existe líder que precisa ser envolvido antes para não se sentir excluído?" → Múltiplos ignorados = Vermelho.',
        ],
      },
      {
        title: 'Filtro 4 — Prontidão cultural',
        items: [
          '"Quantas mudanças organizacionais significativas nos últimos 12 meses?" → 3 ou mais = Vermelho (Gallup: engajamento despenca).',
          '"eNPS atual está em que nível?" → Abaixo de 10 = Vermelho.',
          '"O plano de comunicação está definido?" → Não pensou nisso = Vermelho.',
        ],
      },
      {
        title: 'Leitura do semáforo',
        items: [
          '4 verdes = avançar com confiança.',
          '2–3 verdes = avançar com plano de mitigação explícito.',
          '1 verde ou menos = rever timing ou escopo antes de apresentar.',
        ],
      },
    ],
  },
  6: {
    sections: [
      {
        title: 'Estrutura dos 3 cenários',
        items: [
          'Conservador: crescimento menor que o plano base, sem investimento novo. Trade-off: controle de custo vs. capacidade perdida.',
          'Base: plano de negócio atual + investimento focado nos gargalos + desinvestimento parcial Legacy.',
          'Agressivo: crescimento acima do plano + redesenho estrutural significativo + desinvestimento total Legacy/Run.',
          'Cada cenário precisa de 4 elementos: premissa, headcount implicado, custo implicado, trade-off explícito.',
        ],
      },
      {
        title: 'Regras dos cenários',
        items: [
          'Se a diferença entre os cenários é menor que 15%, o trabalho está fraco.',
          'CFO precisa de contraste para decidir. Amplie a faixa antes de apresentar.',
          'Aplique os semáforos da Lente de Realidade a cada cenário.',
        ],
      },
      {
        title: 'As 3 frases-âncora para a reunião executiva',
        items: [
          'Declarar a tensão (não a solução): "O plano assume que vamos manter produtividade numa área que perdeu 30% do time sênior. Isso é uma escolha consciente?"',
          'Apresentar o trade-off: "O Cenário 2 é tecnicamente o mais equilibrado, mas pressupõe liderança pronta para conversas difíceis. Temos um amarelo nessa avaliação."',
          'Devolver a decisão: "Esses são os trade-offs que vejo. A decisão é sua e do board. Eu vou apoiar a execução de qualquer um dos três."',
        ],
      },
      {
        title: 'Estrutura da apresentação de defesa (7 slides)',
        items: [
          'Slide 1: Headline — impacto, não projeto.',
          'Slide 2: O problema em linguagem de negócio (3 dados, 1 visual, zero jargão de RH).',
          'Slide 3: O que encontramos (portfólio + gargalos + tensão implícita).',
          'Slide 4: Os 3 caminhos (tabela cenário/premissa/headcount/custo/trade-off).',
          'Slide 5: Nossa recomendação + o que pedimos aprovar hoje.',
          'Slide 6: Investimento e retorno (custo do plano vs. custo de não agir).',
          'Slide 7: O que pedimos (decisão específica + budget + prazo).',
        ],
      },
    ],
  },
}

export function EtapaFrameworks({ def, stageNum }: Props) {
  const [activeTab, setActiveTab] = useState<'frameworks' | 'guia'>('guia')
  const [open, setOpen] = useState(true)

  const guide = STAGE_GUIDES[stageNum]

  return (
    <div className="border border-border-light rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-bg-surface hover:bg-bg-subtle transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="label-sm text-text-secondary">Guia da etapa · Frameworks · Inputs · Outputs</span>
          <span className="text-xs text-text-tertiary">{def.frameworks.length} frameworks</span>
        </div>
        <svg
          className={`w-4 h-4 text-text-tertiary transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 16 16" fill="none"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="border-t border-border-light bg-bg-surface">
          {/* Tabs */}
          <div className="flex border-b border-border-light px-5">
            {guide && (
              <TabBtn active={activeTab === 'guia'} onClick={() => setActiveTab('guia')}>
                Guia da etapa
              </TabBtn>
            )}
            <TabBtn active={activeTab === 'frameworks'} onClick={() => setActiveTab('frameworks')}>
              Frameworks · Inputs · Outputs
            </TabBtn>
          </div>

          {/* Guia da etapa */}
          {activeTab === 'guia' && guide && (
            <div className="px-5 py-4 space-y-5">
              {guide.sections.map((section, si) => (
                <div key={si} className="space-y-2">
                  <p className="label-sm text-text-secondary">{section.title}</p>
                  <ul className="space-y-1.5">
                    {section.items.map((item, ii) => (
                      <li key={ii} className="flex items-start gap-2 text-xs text-text-secondary">
                        <span className="text-accent mt-0.5 shrink-0">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Frameworks / Inputs / Outputs */}
          {activeTab === 'frameworks' && (
            <div className="px-5 py-4 grid md:grid-cols-3 gap-5">
              <div className="space-y-2">
                <p className="label-sm text-text-tertiary">Frameworks</p>
                <ul className="space-y-1.5">
                  {def.frameworks.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                      <span className="text-accent mt-0.5 shrink-0">→</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <p className="label-sm text-text-tertiary">Inputs necessários</p>
                <ul className="space-y-1.5">
                  {def.inputs.map((inp, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                      <span className="text-text-disabled mt-0.5 shrink-0">·</span>
                      {inp}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <p className="label-sm text-text-tertiary">Outputs desta etapa</p>
                <ul className="space-y-1.5">
                  {def.outputs.map((out, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                      <span className="text-success mt-0.5 shrink-0">✓</span>
                      {out}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function TabBtn({ active, onClick, children }: {
  active: boolean; onClick: () => void; children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
        active
          ? 'border-accent text-accent'
          : 'border-transparent text-text-tertiary hover:text-text-secondary'
      }`}
    >
      {children}
    </button>
  )
}
