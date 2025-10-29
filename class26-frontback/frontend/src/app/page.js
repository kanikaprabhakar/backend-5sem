'use client';

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [refresh,setRefresh] = useState(0);

  // Initialize socket connection
  useEffect(()=>{
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
  },[])

  // Listen for notifications
  useEffect(()=>{
    
    socket?.on("notification",(data)=>{
      setNotifications((prev)=>{
        return [...prev,data]
      })
      setRefresh(prev=>prev+1);
      setTimeout(()=>{
        setNotifications([]);
      },5000)
    })
  },[socket])

  // Fetch posts
  const getAllPost = async()=>{
    const res = await fetch("http://localhost:5000/api/posts");
    const data = await res.json();
    setPosts(data)
  }

  useEffect(()=>{
    getAllPost();
  },[refresh])

  // Handle login
  const handleLogin = async (e)=>{
    e.preventDefault();
    socket.emit("register",username);
    setIsLoggedIn(true);
    setRefresh(prev=>prev+1);
  }

  // Create post
  const handleCreatePost = async (e)=>{
    e.preventDefault();
    const payload = {
      content:newPost,
      author:username
    }
    const res = await fetch("http://localhost:5000/api/posts",{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(payload)
    })
    const data = await res.json();
    setRefresh(prev=>prev+1);
  }

  // Like post
  const handleLike = async (id)=>{
    const res = await fetch(`http://localhost:5000/api/posts/${id}/like`,{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({username})
    });
    const data = await res.json();
    setRefresh(prev=>prev+1);
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-black">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-4">Enter Your Name</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your name..."
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Continue
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notif, idx) => (
          <div key={idx} className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
            🔔 {notif.message}
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">Social Posts</h1>
          <p className="text-gray-600">Logged in as: <span className="font-semibold">{username}</span></p>
        </div>

        {/* Create Post */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleCreatePost}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full px-4 py-2 border rounded-lg mb-4 resize-none"
              rows="3"
            />
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
              Post
            </button>
          </form>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {posts?.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{post?.author}</h3>
                  <p className="text-gray-500 text-sm">
                    {new Date(post?.createdAt)?.toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-800 mb-4">{post?.content}</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(post?.id)}
                  disabled={post?.likes?.includes(username)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    post?.likes?.includes(username)
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  ❤️ {post?.likes?.length} {post?.likes?.length === 1 ? 'Like' : 'Likes'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}