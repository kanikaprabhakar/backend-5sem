const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://backend-5sem-gy9t.vercel.app/",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// In-memory storage
let posts = [];
let users = {};

// Socket.io connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Register user with their name
  socket.on('register', (username) => {
    users[username] = socket.id;
    console.log(`${username} registered with socket ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Remove user from users object
    for (let username in users) {
      if (users[username] === socket.id) {
        delete users[username];
        break;
      }
    }
  });
});

// Get all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Create a new post
app.post('/api/posts', (req, res) => {
  const { content, author } = req.body;
  const newPost = {
    id: Date.now().toString(),
    content,
    author,
    likes: [],
    createdAt: new Date()
  };
  posts.unshift(newPost);
  res.json(posts);
});

// Like a post
app.post('/api/posts/:id/like', (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  
  const post = posts.find(p => p.id === id);
  
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  // Check if user already liked
  if (post.likes.includes(username)) {
    return res.status(400).json({ error: 'Already liked' });
  }

  post.likes.push(username);

  // Send notification to post author via socket
  if (post.author !== username && users[post.author]) {
    io.to(users[post.author]).emit('notification', {
      message: `${username} liked your post: "${post.content.substring(0, 30)}..."`,
      post: post,
      likedBy: username,
      timestamp: new Date()
    });
  }

  res.json(post);
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});