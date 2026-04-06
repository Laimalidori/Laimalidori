import { create } from 'zustand'
import type { EmpresaContext } from '@/types/empresa'

interface EmpresaStore {
  empresa: EmpresaContext | null
  isLoaded: boolean
  setEmpresa: (empresa: EmpresaContext | null) => void
  setLoaded: (loaded: boolean) => void
  updateEmpresa: (updates: Partial<EmpresaContext>) => void
}

export const useEmpresaStore = create<EmpresaStore>((set) => ({
  empresa: null,
  isLoaded: false,
  setEmpresa: (empresa) => set({ empresa, isLoaded: true }),
  setLoaded: (isLoaded) => set({ isLoaded }),
  updateEmpresa: (updates) =>
    set((state) => ({
      empresa: state.empresa ? { ...state.empresa, ...updates } : (updates as EmpresaContext),
    })),
}))
