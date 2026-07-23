import { create } from 'zustand'

type HomeMenuState = {
  activeIndex: number
  /** 0 → 1 fill progress for the active menu tab */
  progress: number
  setActiveIndex: (index: number) => void
  setProgress: (progress: number) => void
  /** Update tab + progress together (avoids progress reset mid-menu). */
  syncTab: (activeIndex: number, progress: number) => void
}

export const useHomeMenuStore = create<HomeMenuState>((set) => ({
  activeIndex: 0,
  progress: 0,
  setActiveIndex: (activeIndex) =>
    set((state) =>
      state.activeIndex === activeIndex
        ? state
        : { activeIndex, progress: 0 },
    ),
  setProgress: (progress) => set({ progress }),
  syncTab: (activeIndex, progress) => set({ activeIndex, progress }),
}))
