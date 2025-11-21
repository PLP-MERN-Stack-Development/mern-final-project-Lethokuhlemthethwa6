import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, MoreVertical, Shield, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import ReactionBar from './ReactionBar';

const PostItem = ({ post, onCommentAdded, socket }) => {
  const [commentContent, setCommentContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showComments, setShowComments] = useState(false);
  const { isAuthenticated, token } = useAuth();

  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!commentContent.trim()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${(import.meta.env.VITE_API_URL || 'http://localhost:5000')}/api/posts/${post._id}/comments`,
        { content: commentContent },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (socket) {
        socket.emit('newComment', {
          postId: post._id,
          comment: response.data
        });
      }
      
      setCommentContent('');
      if (onCommentAdded) {
        onCommentAdded(post._id, response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 mb-4 relative overflow-hidden group hover:scale-[1.01] transition-transform"
    >
      {/* Holographic Background */}
      <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
      
      {/* Energy Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] energy-border opacity-0 group-hover:opacity-100"></div>

      {/* Header */}
      <div className="flex items-start relative z-10">
        <motion.div
          className="flex-shrink-0 relative"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold neon-glow">
            {post.user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background pulse-glow"></div>
        </motion.div>

        <div className="ml-4 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-foreground">
              {post.user?.username || 'Unknown User'}
            </h3>
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-cyan-400">Verified</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">
              {formatDate(post.createdAt)}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span className="text-xs text-yellow-400">Level 42</span>
            </div>
          </div>
        </div>

        <motion.button
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <MoreVertical className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="mt-4 relative z-10">
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* Reaction Bar */}
      <ReactionBar postId={post._id} />

      {/* Comments Section */}
      <div className="mt-4 relative z-10">
        <motion.button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-400 transition-colors"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-4 h-4" />
          <span className="font-medium">
            {post.comments?.length || 0} {post.comments?.length === 1 ? 'Comment' : 'Comments'}
          </span>
        </motion.button>

        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-3"
            >
              {/* Comments List */}
              {post.comments && post.comments.length > 0 && (
                <div className="space-y-3">
                  {post.comments.map((comment, index) => (
                    <motion.div
                      key={comment._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass rounded-xl p-4 relative overflow-hidden"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                          {comment.user?.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">
                              {comment.user?.username || 'Unknown User'}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-foreground">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Add Comment */}
              {isAuthenticated() && (
                <motion.form
                  onSubmit={handleAddComment}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      placeholder="Add a quantum thought..."
                      className="flex-1 px-4 py-3 glass rounded-xl outline-none focus:ring-2 focus:ring-cyan-400 transition-all text-sm placeholder:text-muted-foreground"
                    />
                    <motion.button
                      type="submit"
                      disabled={loading || !commentContent.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed neon-glow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {loading ? '...' : 'Send'}
                    </motion.button>
                  </div>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-xs text-red-400"
                    >
                      {error}
                    </motion.p>
                  )}
                </motion.form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PostItem;
