import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Zap, Plus } from 'lucide-react';
import axios from 'axios';
import { io } from 'socket.io-client';
import CreatePost from '../components/CreatePost';
import PostList from '../components/PostList';
import Sidebar from '../components/Sidebar';
import useUIStore from '../store/uiStore';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [socket, setSocket] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { activeView } = useUIStore();

  useEffect(() => {
    const socketConnection = io('http://localhost:5000');
    setSocket(socketConnection);

    socketConnection.on('commentAdded', ({ postId, comment }) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...(post.comments || []), comment] }
            : post
        )
      );
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
    setShowCreatePost(false);
  };

  const handleCommentAdded = (postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...(post.comments || []), comment] }
          : post
      )
    );
  };

  const getViewTitle = () => {
    switch (activeView) {
      case 'explore': return 'Explore the Metaverse';
      case 'trending': return 'Trending Across Dimensions';
      case 'ai': return 'AI-Curated Feed';
      default: return 'Quantum Feed';
    }
  };

  const getViewIcon = () => {
    switch (activeView) {
      case 'explore': return Sparkles;
      case 'trending': return TrendingUp;
      case 'ai': return Zap;
      default: return null;
    }
  };

  const ViewIcon = getViewIcon();

  return (
    <div className="min-h-screen dark relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 matrix-bg opacity-30"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="glass rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 holographic opacity-10"></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    {ViewIcon && <ViewIcon className="w-8 h-8 text-cyan-400" />}
                    <h1 className="text-3xl font-bold neon-text">{getViewTitle()}</h1>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {activeView === 'ai' 
                      ? 'Personalized by Neural Networks'
                      : 'Real-time updates across the network'
                    }
                  </p>
                </div>
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center pulse-glow"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Create Post Button */}
          <motion.button
            onClick={() => setShowCreatePost(!showCreatePost)}
            className="w-full mb-6 glass rounded-2xl p-6 hover:bg-white/5 transition-all group relative overflow-hidden"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="absolute inset-0 energy-border opacity-0 group-hover:opacity-100"></div>
            <div className="flex items-center gap-4">
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center neon-glow"
                whileHover={{ rotate: 90 }}
              >
                <Plus className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-lg font-medium text-muted-foreground group-hover:text-cyan-400 transition-colors">
                Share your quantum thoughts...
              </span>
            </div>
          </motion.button>

          {/* Create Post Modal */}
          {showCreatePost && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6"
            >
              <CreatePost onPostCreated={handlePostCreated} />
            </motion.div>
          )}

          {/* Posts Feed */}
          <PostList
            posts={posts}
            loading={loading}
            error={error}
            onCommentAdded={handleCommentAdded}
            socket={socket}
          />
        </div>
      </main>

      {/* Floating Action Button (Mobile) */}
      <motion.button
        onClick={() => setShowCreatePost(!showCreatePost)}
        className="lg:hidden fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center neon-glow z-50 shadow-2xl"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <Plus className="w-8 h-8 text-white" />
      </motion.button>
    </div>
  );
};

export default HomePage;
