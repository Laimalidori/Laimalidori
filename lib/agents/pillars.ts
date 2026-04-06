import type { Pillar, Tool } from '@/types/agent'

export const PILLARS: Pillar[] = [
  {
    id: 'estrategia',
    number: '01',
    name: 'Estratégia & Organização',
    shortName: 'Estratégia',
    description: 'Modelo de RH, design organizacional e planejamento estratégico de força de trabalho',
    agents: [
      { id: 'hr-estrategico', name: 'HR Estratégico' },
      { id: 'org-design', name: 'Org Design' },
      { id: 'workforce-planning', name: 'Workforce Planning' },
      { id: 'sucessao', name: 'Sucessão' },
    ],
    quickActions: [
      'Como definir o modelo de RH adequado para nossa empresa?',
      'Preciso redesenhar a estrutura organizacional',
      'Como construir um plano de sucessão para posições críticas?',
    ],
  },
  {
    id: 'atracao',
    number: '02',
    name: 'Atração & Marca Empregadora',
    shortName: 'Atração',
    description: 'Talent acquisition, employer branding, EVP e estratégia de pipeline de talentos',
    agents: [
      { id: 'talent-acquisition', name: 'Talent Acquisition' },
      { id: 'employer-branding', name: 'Employer Branding' },
    ],
    quickActions: [
      'Como reduzir o time-to-fill sem comprometer quality of hire?',
      'Preciso construir nosso EVP — por onde começo?',
      'Qual é a melhor estratégia de sourcing para tech?',
    ],
  },
  {
    id: 'performance',
    number: '03',
    name: 'Performance & Recompensa',
    shortName: 'Performance',
    description: 'Gestão de performance, OKRs, remuneração, benefícios e job architecture',
    agents: [
      { id: 'performance-mgmt', name: 'Performance Management' },
      { id: 'compensation', name: 'Compensation & Benefits' },
    ],
    quickActions: [
      'Como redesenhar nosso ciclo de avaliação de performance?',
      'Nossa estrutura salarial está defasada — como corrigir?',
      'Qual é o melhor modelo de variável para nosso perfil?',
    ],
  },
  {
    id: 'lideranca',
    number: '04',
    name: 'Liderança & Desenvolvimento',
    shortName: 'Liderança',
    description: 'Desenvolvimento de liderança, L&D, programas de formação e pipeline de líderes',
    agents: [
      { id: 'leadership-dev', name: 'Leadership Development' },
      { id: 'ld', name: 'L&D' },
    ],
    quickActions: [
      'Como identificar e desenvolver high potentials?',
      'Nossa liderança média está despreparada — qual é o plano?',
      'Como medir o ROI dos programas de desenvolvimento?',
    ],
  },
  {
    id: 'cultura',
    number: '05',
    name: 'Cultura & Experiência',
    shortName: 'Cultura',
    description: 'Cultura organizacional, employee experience, engajamento e mudança',
    agents: [
      { id: 'cultura', name: 'Cultura Organizacional' },
      { id: 'ex', name: 'Employee Experience' },
      { id: 'engagement', name: 'Engajamento' },
    ],
    quickActions: [
      'Como diagnosticar o gap entre cultura declarada e praticada?',
      'Nosso eNPS caiu 15 pontos — o que fazer?',
      'Precisamos gerir uma mudança cultural importante',
    ],
  },
  {
    id: 'dei',
    number: '06',
    name: 'Diversidade & Inclusão',
    shortName: 'DEI',
    description: 'Estratégia de DEI, equidade salarial, representatividade e liderança inclusiva',
    agents: [
      { id: 'dei', name: 'DEI' },
    ],
    quickActions: [
      'Como construir uma estratégia de DEI com impacto real?',
      'Preciso fazer análise de equidade salarial — como estruturo?',
      'Como medir inclusão além de diversidade?',
    ],
  },
  {
    id: 'dados',
    number: '07',
    name: 'Dados & Tecnologia',
    shortName: 'Dados',
    description: 'People analytics, HR tech stack, data governance e HR operations',
    agents: [
      { id: 'people-analytics', name: 'People Analytics' },
      { id: 'hr-tech', name: 'HR Tech' },
      { id: 'hr-ops', name: 'HR Operations' },
    ],
    quickActions: [
      'Como construir um modelo preditivo de turnover?',
      'Que métricas de pessoas devo levar ao board?',
      'Como avaliar e selecionar um novo HRIS?',
    ],
  },
  {
    id: 'risco',
    number: '08',
    name: 'Risco & Compliance',
    shortName: 'Risco',
    description: 'Riscos trabalhistas, compliance, saúde & bem-estar e segurança jurídica',
    agents: [
      { id: 'trabalhista', name: 'Relações Trabalhistas' },
      { id: 'saude', name: 'Saúde & Bem-estar' },
      { id: 'risco', name: 'Gestão de Riscos' },
    ],
    quickActions: [
      'Quais são os principais riscos trabalhistas da nossa operação?',
      'Como implementar o PGR conforme NR-1 atualizada?',
      'Nosso absenteísmo está alto — como diagnosticar a causa raiz?',
    ],
  },
]

export const TOOLS: Tool[] = [
  {
    id: 'business-case',
    name: 'Business Case',
    description: 'Construa um business case completo com ROI e cenários',
    prompt: 'Preciso montar um business case completo para uma iniciativa de RH. Me guie pelo processo.',
  },
  {
    id: 'projeto',
    name: 'Plano de Projeto',
    description: 'Milestones, recursos, riscos e checklist de execução',
    prompt: 'Preciso estruturar um plano de projeto robusto para uma iniciativa de RH, com milestones, recursos e gestão de riscos.',
  },
  {
    id: 'pesquisa',
    name: 'Pesquisa de Mercado',
    description: 'Benchmarks e como o mercado está resolvendo',
    prompt: 'Preciso de uma pesquisa de mercado com benchmarks confiáveis sobre como empresas estão resolvendo um desafio de RH.',
  },
  {
    id: 'apresentacao',
    name: 'Apresentações',
    description: 'Defesa, acompanhamento ou encerramento de projeto',
    prompt: 'Preciso estruturar uma apresentação executiva para o board ou C-level sobre uma iniciativa de RH.',
  },
]

export function getPillarById(id: string): Pillar | undefined {
  return PILLARS.find((p) => p.id === id)
}
