import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import PostList from '../components/PostList';

const ProfilePage = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserPosts();
  }, [user]);

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${API_URL}/api/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Filter posts by current user
      const filteredPosts = response.data.filter(
        (post) => post.user?._id === user?._id || post.user?.username === user?.username
      );
      
      setUserPosts(filteredPosts);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCommentAdded = (postId, comment) => {
    setUserPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...(post.comments || []), comment] }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SocialApp</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Home
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-800">{user?.username}</h2>
              <p className="text-gray-600 mt-1">
                {userPosts.length} {userPosts.length === 1 ? 'post' : 'posts'}
              </p>
            </div>
          </div>
        </div>

        {/* User's Posts */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Posts</h3>
          <PostList
            posts={userPosts}
            loading={loading}
            error={error}
            onCommentAdded={handleCommentAdded}
          />
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
