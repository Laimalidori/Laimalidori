import type { EmpresaContext } from '@/types/empresa'

export function formatEmpresaContext(empresa: EmpresaContext): string {
  const parts: string[] = []

  if (empresa.nome) parts.push(`Empresa: ${empresa.nome}`)
  if (empresa.setor) parts.push(`Setor: ${empresa.setor}`)
  if (empresa.mercado) parts.push(`Mercado: ${empresa.mercado}`)
  if (empresa.porte) parts.push(`Porte: ${empresa.porte}`)
  if (empresa.receita_faixa) parts.push(`Receita: ${empresa.receita_faixa}`)
  if (empresa.momento) parts.push(`Momento estratégico: ${empresa.momento}`)
  if (empresa.maturidade_rh) parts.push(`Maturidade RH: ${empresa.maturidade_rh}`)
  if (empresa.maturidade_lider) parts.push(`Maturidade liderança: ${empresa.maturidade_lider}`)
  if (empresa.budget_rh) parts.push(`Budget RH: ${empresa.budget_rh}`)
  if (empresa.cultura_descricao) parts.push(`Cultura atual: ${empresa.cultura_descricao}`)
  if (empresa.cultura_desafios) parts.push(`Tensões culturais: ${empresa.cultura_desafios}`)
  if (empresa.desafios_top) parts.push(`Principais desafios: ${empresa.desafios_top}`)
  if (empresa.meta_ano) parts.push(`Meta do ano: ${empresa.meta_ano}`)
  if (empresa.contexto_extra) parts.push(`Contexto adicional: ${empresa.contexto_extra}`)

  return parts.join('\n')
}
