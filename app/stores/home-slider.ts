import { create } from 'zustand'

type HomeSliderState = {
  activeIndex: number
  /** 0 → 1 fill progress for the active slide */
  progress: number
  setActiveIndex: (index: number) => void
  setProgress: (progress: number) => void
}

export const useHomeSliderStore = create<HomeSliderState>((set) => ({
  activeIndex: 0,
  progress: 0,
  setActiveIndex: (activeIndex) => set({ activeIndex, progress: 0 }),
  setProgress: (progress) => set({ progress }),
}))
