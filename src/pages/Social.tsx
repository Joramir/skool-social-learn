
import React, { useState } from 'react';
import { MessageSquare, Heart, Share, Plus, Image, Video, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const Social = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'María González',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      time: '2 horas',
      content: '¡Acabo de completar el curso de React! 🚀 Las lecciones estaban súper bien explicadas. ¿Alguien más está trabajando en proyectos con React?',
      image: null,
      likes: 12,
      comments: [
        { id: 1, user: 'Carlos Ruiz', text: '¡Felicidades! Yo también estoy empezando con React', time: '1 hora' },
        { id: 2, user: 'Ana Torres', text: 'Excelente, ¿tienes algún proyecto en GitHub?', time: '30 min' }
      ],
      liked: false
    },
    {
      id: 2,
      user: 'Diego Martín',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      time: '4 horas',
      content: 'Compartiendo mi primer diseño UX/UI siguiendo los principios que aprendimos en el curso. ¿Qué les parece?',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
      likes: 8,
      comments: [],
      liked: true
    },
    {
      id: 3,
      user: 'Elena Vargas',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      time: '1 día',
      content: 'Pregunta para la comunidad: ¿Cuáles son sus herramientas favoritas para desarrollo frontend? Estoy armando mi setup y necesito recomendaciones 💻',
      image: null,
      likes: 15,
      comments: [
        { id: 3, user: 'Pedro Silva', text: 'VS Code + extensiones como Prettier y GitLens son esenciales', time: '20 horas' },
        { id: 4, user: 'Laura Jiménez', text: 'Figma para diseño, GitHub para control de versiones', time: '18 horas' },
        { id: 5, user: 'Roberto Chen', text: 'No olvides Chrome DevTools para debugging', time: '15 horas' }
      ],
      liked: false
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [showComments, setShowComments] = useState({});
  const [newComment, setNewComment] = useState({});

  const handleNewPost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        user: 'Usuario Actual',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        time: 'ahora',
        content: newPost,
        image: null,
        likes: 0,
        comments: [],
        liked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleComment = (postId) => {
    const commentText = newComment[postId];
    if (commentText && commentText.trim()) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, {
              id: Date.now(),
              user: 'Usuario Actual',
              text: commentText,
              time: 'ahora'
            }]
          };
        }
        return post;
      }));
      setNewComment({ ...newComment, [postId]: '' });
    }
  };

  const toggleComments = (postId) => {
    setShowComments({
      ...showComments,
      [postId]: !showComments[postId]
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Red Social
          </h1>
          <p className="text-lg text-gray-600">
            Conecta con la comunidad, comparte tu progreso y aprende juntos
          </p>
        </div>

        {/* Create Post */}
        <div className="card-skool mb-8 animate-fade-in">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-skool rounded-full flex items-center justify-center">
              <User className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <Textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="¿Qué estás aprendiendo hoy? Comparte con la comunidad..."
                className="min-h-[80px] resize-none border-gray-200 focus:ring-skool-primary focus:border-skool-primary"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-gray-600">
                <Image size={16} className="mr-1" />
                Foto
              </Button>
              <Button variant="outline" size="sm" className="text-gray-600">
                <Video size={16} className="mr-1" />
                Video
              </Button>
            </div>
            <Button 
              onClick={handleNewPost}
              className="btn-skool"
              disabled={!newPost.trim()}
            >
              <Plus size={16} className="mr-1" />
              Publicar
            </Button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              className="card-skool animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={post.avatar}
                  alt={post.user}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{post.user}</h3>
                  <p className="text-sm text-gray-500">hace {post.time}</p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-700 mb-4">{post.content}</p>
              
              {post.image && (
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full rounded-lg mb-4 shadow-sm"
                />
              )}

              {/* Post Actions */}
              <div className="flex items-center gap-6 py-3 border-t border-gray-100">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 transition-colors ${
                    post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <Heart size={18} fill={post.liked ? 'currentColor' : 'none'} />
                  <span>{post.likes}</span>
                </button>

                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center gap-2 text-gray-500 hover:text-skool-primary transition-colors"
                >
                  <MessageSquare size={18} />
                  <span>{post.comments.length}</span>
                </button>

                <button className="flex items-center gap-2 text-gray-500 hover:text-skool-primary transition-colors">
                  <Share size={18} />
                  <span>Compartir</span>
                </button>
              </div>

              {/* Comments Section */}
              {showComments[post.id] && (
                <div className="border-t border-gray-100 pt-4 mt-4">
                  {/* Add Comment */}
                  <div className="flex gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-skool rounded-full flex items-center justify-center">
                      <User className="text-white" size={14} />
                    </div>
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={newComment[post.id] || ''}
                        onChange={(e) => setNewComment({
                          ...newComment,
                          [post.id]: e.target.value
                        })}
                        placeholder="Escribe un comentario..."
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-skool-primary focus:border-transparent"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleComment(post.id);
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleComment(post.id)}
                        disabled={!newComment[post.id]?.trim()}
                        className="btn-skool"
                      >
                        Enviar
                      </Button>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-3">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="text-gray-500" size={14} />
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-lg px-3 py-2">
                            <p className="font-medium text-sm text-skool-primary">{comment.user}</p>
                            <p className="text-gray-700 text-sm">{comment.text}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">hace {comment.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Social;
