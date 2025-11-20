import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu, Home, Compass, TrendingUp, Sparkles, Settings, LogOut, User, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useUIStore from '../store/uiStore';
import useThemeStore from '../store/themeStore';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { sidebarOpen, toggleSidebar, activeView, setActiveView } = useUIStore();
  const { theme } = useThemeStore();

  const menuItems = [
    { icon: Home, label: 'Feed', view: 'feed', path: '/' },
    { icon: Compass, label: 'Explore', view: 'explore', path: '/' },
    { icon: TrendingUp, label: 'Trending', view: 'trending', path: '/' },
    { icon: Sparkles, label: 'AI Feed', view: 'ai', path: '/' },
    { icon: User, label: 'Profile', view: 'profile', path: '/profile' },
    { icon: Bell, label: 'Notifications', view: 'notifications', path: '/' },
  ];

  const handleNavigation = (item) => {
    setActiveView(item.view);
    navigate(item.path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        className="fixed top-4 left-4 z-50 lg:hidden p-3 rounded-full glass neon-glow"
        onClick={toggleSidebar}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Menu className="w-6 h-6" />
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <>
            {/* Overlay for mobile */}
            {window.innerWidth < 1024 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                onClick={toggleSidebar}
              />
            )}

            {/* Sidebar Content */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-screen w-72 glass border-r border-white/10 z-40 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 holographic opacity-20"></div>
                <div className="relative flex items-center justify-between">
                  <h1 className="text-2xl font-bold neon-text">SocialVerse</h1>
                  <motion.button
                    className="lg:hidden p-2 rounded-full hover:bg-white/10"
                    onClick={toggleSidebar}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
                <p className="text-xs text-cyan-400 mt-1">Year 2060 Edition</p>
              </div>

              {/* User Profile */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold neon-glow"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {user?.username?.[0]?.toUpperCase()}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{user?.username}</h3>
                    <p className="text-xs text-gray-400">Quantum Level 42</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.view}
                    onClick={() => handleNavigation(item)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeView === item.view
                        ? 'glass neon-glow text-cyan-400'
                        : 'hover:bg-white/5'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {activeView === item.view && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-2 h-2 rounded-full bg-cyan-400 pulse-glow"
                      />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* Footer Actions */}
              <div className="p-4 border-t border-white/10 space-y-2">
                <motion.button
                  onClick={() => navigate('/settings')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </motion.button>
                <motion.button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-all"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </motion.button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
