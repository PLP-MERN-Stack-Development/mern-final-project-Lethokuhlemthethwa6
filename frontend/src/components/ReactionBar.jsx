import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const reactions = [
  { id: 'like', icon: Heart, color: 'text-red-500', label: 'Like' },
  { id: 'inspire', icon: Sparkles, color: 'text-yellow-500', label: 'Inspire' },
  { id: 'energy', icon: Zap, color: 'text-blue-500', label: 'Energy' },
  { id: 'trend', icon: TrendingUp, color: 'text-green-500', label: 'Trending' },
];

const ReactionBar = ({ postId, onReact }) => {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);

  const handleReact = (reactionId) => {
    setSelectedReaction(reactionId);
    if (onReact) onReact(postId, reactionId);
    setShowReactions(false);
  };

  return (
    <div className="relative flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
      {/* Reaction Button */}
      <motion.button
        className="relative group"
        onMouseEnter={() => setShowReactions(true)}
        onMouseLeave={() => setShowReactions(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/10 transition-all">
          {selectedReaction ? (
            <>
              {reactions.find(r => r.id === selectedReaction)?.icon && 
                React.createElement(reactions.find(r => r.id === selectedReaction).icon, {
                  className: `w-5 h-5 ${reactions.find(r => r.id === selectedReaction).color}`
                })
              }
              <span className="text-sm font-medium">
                {reactions.find(r => r.id === selectedReaction)?.label}
              </span>
            </>
          ) : (
            <>
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">React</span>
            </>
          )}
        </div>

        {/* Reaction Popup */}
        {showReactions && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute bottom-full left-0 mb-2 glass rounded-full p-2 flex gap-2 neon-glow z-50"
          >
            {reactions.map((reaction) => (
              <motion.button
                key={reaction.id}
                onClick={() => handleReact(reaction.id)}
                className={`p-3 rounded-full hover:bg-white/10 transition-all ${reaction.color}`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <reaction.icon className="w-6 h-6" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </motion.button>

      {/* Comment Button */}
      <motion.button
        className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/10 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-medium">Comment</span>
      </motion.button>

      {/* Share Button */}
      <motion.button
        className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/10 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Share2 className="w-5 h-5" />
        <span className="text-sm font-medium">Share</span>
      </motion.button>

      {/* Bookmark Button */}
      <motion.button
        className="ml-auto p-2 rounded-full glass hover:bg-white/10 transition-all"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bookmark className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default ReactionBar;
