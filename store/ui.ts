import { create } from 'zustand'

interface UIStore {
  sidebarOpen: boolean
  mobileNavActive: string
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setMobileNavActive: (tab: string) => void
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  mobileNavActive: 'home',
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setMobileNavActive: (mobileNavActive) => set({ mobileNavActive }),
}))
