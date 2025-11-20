
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middleware/auth');

// Create a new post (protected)
router.post('/', authMiddleware, async (req, res) => {
  const { content } = req.body;
  
  try {
    const post = new Post({
      user: req.userId,
      content
    });
    
    await post.save();
    await post.populate('user', 'username');
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username')
      .populate('comments.user', 'username')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add a comment to a post (protected)
router.post('/:postId/comments', authMiddleware, async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;
  
  try {
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const comment = {
      user: req.userId,
      content
    };
    
    post.comments.push(comment);
    await post.save();
    
    // Populate the newly added comment
    await post.populate('comments.user', 'username');
    
    const newComment = post.comments[post.comments.length - 1];
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
