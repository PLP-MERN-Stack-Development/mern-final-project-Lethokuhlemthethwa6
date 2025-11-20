import { create } from 'zustand';

const useUIStore = create((set) => ({
  sidebarOpen: true,
  notificationsOpen: false,
  quickActionsOpen: false,
  activeView: 'feed', // feed, explore, trending, ai
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleNotifications: () => set((state) => ({ notificationsOpen: !state.notificationsOpen })),
  toggleQuickActions: () => set((state) => ({ quickActionsOpen: !state.quickActionsOpen })),
  setActiveView: (view) => set({ activeView: view }),
  closeAll: () => set({ notificationsOpen: false, quickActionsOpen: false }),
}));

export default useUIStore;
