import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'dark',
      accentColor: 'cyan',
      glassEffect: true,
      animations: true,
      holographic: true,
      
      setTheme: (theme) => set({ theme }),
      setAccentColor: (color) => set({ accentColor: color }),
      toggleGlassEffect: () => set((state) => ({ glassEffect: !state.glassEffect })),
      toggleAnimations: () => set((state) => ({ animations: !state.animations })),
      toggleHolographic: () => set((state) => ({ holographic: !state.holographic })),
    }),
    {
      name: 'theme-storage',
    }
  )
);

export default useThemeStore;
