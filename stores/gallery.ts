import { create } from 'zustand'

type GalleryState = {
  activeId: string
  setActiveId: (id: string) => void
}

export const useGalleryStore = create<GalleryState>((set) => ({
  activeId: 'all',
  setActiveId: (activeId) => set({ activeId }),
}))
