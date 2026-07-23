import { create } from 'zustand'

type MenuState = {
  activeId: string
  setActiveId: (id: string) => void
}

export const useMenuStore = create<MenuState>((set) => ({
  activeId: 'all',
  setActiveId: (activeId) => set({ activeId }),
}))
