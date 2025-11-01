import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AppState {
  darkMode: boolean
  studyMode: boolean
  toggleDarkMode: () => void
  toggleStudyMode: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      darkMode: false,
      studyMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      toggleStudyMode: () => set((state) => ({ studyMode: !state.studyMode })),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

