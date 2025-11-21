import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Video, Smile, Send, X, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);
  const { isAuthenticated, token, user } = useAuth();

  const maxChars = 500;

  const handleContentChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setContent(text);
      setCharCount(text.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Post content cannot be empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(
        `${API_URL}/api/posts`,
        { content },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      setContent('');
      setCharCount(0);
      if (onPostCreated) {
        onPostCreated(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated()) {
    return null;
  }

  const charPercentage = (charCount / maxChars) * 100;
  const isOverLimit = charCount > maxChars;
  const isNearLimit = charCount > maxChars * 0.9;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 mb-6 relative overflow-hidden"
    >
      {/* Holographic Background */}
      <div className="absolute inset-0 holographic opacity-5"></div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 mb-4">
        <motion.div
          className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold neon-glow"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {user?.username?.[0]?.toUpperCase()}
        </motion.div>
        <div className="flex-1">
          <h3 className="font-semibold">Create Quantum Post</h3>
          <p className="text-xs text-muted-foreground">Share with the multiverse</p>
        </div>
        <Sparkles className="w-5 h-5 text-cyan-400" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="relative z-10">
        <div className="relative">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="What's happening in your dimension?"
            rows="4"
            className="w-full px-4 py-3 glass rounded-xl outline-none focus:ring-2 focus:ring-cyan-400 transition-all resize-none text-foreground placeholder:text-muted-foreground"
          />
          
          {/* Character Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: charCount > 0 ? 1 : 0 }}
            className="absolute bottom-3 right-3 flex items-center gap-2"
          >
            <svg className="w-10 h-10 transform -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="3"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke={isOverLimit ? '#ef4444' : isNearLimit ? '#f59e0b' : '#06b6d4'}
                strokeWidth="3"
                strokeDasharray={`${charPercentage * 1.005} ${100 * 1.005}`}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>
            <span className={`text-xs font-medium ${isOverLimit ? 'text-red-400' : isNearLimit ? 'text-yellow-400' : 'text-cyan-400'}`}>
              {charCount}/{maxChars}
            </span>
          </motion.div>
        </div>
        
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2"
            >
              <X className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            <motion.button
              type="button"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Image className="w-5 h-5 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
            </motion.button>
            <motion.button
              type="button"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Video className="w-5 h-5 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
            </motion.button>
            <motion.button
              type="button"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Smile className="w-5 h-5 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
            </motion.button>
          </div>
          
          <motion.button
            type="submit"
            disabled={loading || !content.trim() || isOverLimit}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed neon-glow"
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            {loading ? (
              <>
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <span>Transmitting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Broadcast</span>
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreatePost;
