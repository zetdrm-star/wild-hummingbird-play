import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  MessageCircle, 
  Heart, 
  Reply, 
  Search, 
  Plus,
  Clock,
  Users,
  TrendingUp,
  Star,
  Send
} from 'lucide-react';
import { mockCommunityPosts } from '@/data/mockData';
import { CommunityPost } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { showSuccess } from '@/utils/toast';

const CommunityForum = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState(mockCommunityPosts);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('General');
  const [newReplyContent, setNewReplyContent] = useState('');

  const categories = ['All', 'Balance & Coordination', 'Fine Motor Skills', 'Celebrations', 'General Support', 'Tips & Tricks'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
    showSuccess('Post liked! ❤️');
  };

  const handleLikeReply = (postId: string, replyId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? {
            ...post,
            replies: post.replies.map(reply =>
              reply.id === replyId
                ? { ...reply, likes: reply.likes + 1 }
                : reply
            )
          }
        : post
    ));
    
    // Update selected post if it's currently open
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => prev ? {
        ...prev,
        replies: prev.replies.map(reply =>
          reply.id === replyId
            ? { ...reply, likes: reply.likes + 1 }
            : reply
        )
      } : null);
    }
    
    showSuccess('Reply liked! ❤️');
  };

  const handleAddReply = () => {
    if (!newReplyContent.trim() || !selectedPost || !user) return;

    const newReply = {
      id: `reply-${Date.now()}`,
      content: newReplyContent,
      author: user.name,
      createdDate: new Date().toISOString().split('T')[0],
      likes: 0
    };

    // Update posts state
    setPosts(prev => prev.map(post => 
      post.id === selectedPost.id 
        ? { ...post, replies: [...post.replies, newReply] }
        : post
    ));

    // Update selected post
    setSelectedPost(prev => prev ? {
      ...prev,
      replies: [...prev.replies, newReply]
    } : null);

    setNewReplyContent('');
    showSuccess('Reply added! 💬');
  };

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !user) return;

    const newPost: CommunityPost = {
      id: Date.now().toString(),
      title: newPostTitle,
      content: newPostContent,
      author: user.name,
      category: newPostCategory,
      createdDate: new Date().toISOString().split('T')[0],
      likes: 0,
      tags: [],
      replies: []
    };

    setPosts(prev => [newPost, ...prev]);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostCategory('General');
    showSuccess('Post created! 🎉');
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Balance & Coordination': 'bg-blue-100 text-blue-700 border-blue-200',
      'Fine Motor Skills': 'bg-purple-100 text-purple-700 border-purple-200',
      'Celebrations': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'General Support': 'bg-green-100 text-green-700 border-green-200',
      'Tips & Tricks': 'bg-pink-100 text-pink-700 border-pink-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays} days ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-teal-500" />
              <span className="text-gray-900">Community Forum</span>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-teal-500 hover:bg-teal-600 text-white rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                  <DialogDescription>
                    Share your experience or ask for support from the community
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <Input
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      placeholder="What's your post about?"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <select
                      value={newPostCategory}
                      onChange={(e) => setNewPostCategory(e.target.value)}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                    >
                      {categories.slice(1).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Content</label>
                    <Textarea
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      placeholder="Share your thoughts, questions, or experiences..."
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                  <Button 
                    onClick={handleCreatePost}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white"
                    disabled={!newPostTitle.trim() || !newPostContent.trim()}
                  >
                    Create Post
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
          <CardDescription>
            Connect with other families, share experiences, and find support
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Search and Filters */}
      <Card className="bg-white border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search posts..."
                  className="pl-10 rounded-xl"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full ${
                    selectedCategory === category 
                      ? 'bg-teal-500 hover:bg-teal-600 text-white' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      <div className="grid gap-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline" className={getCategoryColor(post.category)}>
                      {post.category}
                    </Badge>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{getTimeAgo(post.createdDate)}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 mb-3">
                    <span>by</span>
                    <span className="font-medium text-gray-700">{post.author}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLikePost(post.id)}
                    className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    {post.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPost(post)}
                    className="text-gray-500 hover:text-blue-500 hover:bg-blue-50"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {post.replies.length} replies
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedPost(post)}
                  className="rounded-xl border-gray-200 hover:bg-gray-50"
                >
                  View Discussion
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Post Detail Dialog */}
      {selectedPost && (
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className={getCategoryColor(selectedPost.category)}>
                  {selectedPost.category}
                </Badge>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{getTimeAgo(selectedPost.createdDate)}</span>
              </div>
              <DialogTitle className="text-left">{selectedPost.title}</DialogTitle>
              <DialogDescription className="text-left">
                by {selectedPost.author}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedPost.content}</p>
              </div>

              <div className="flex items-center space-x-4 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLikePost(selectedPost.id)}
                  className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                >
                  <Heart className="w-4 h-4 mr-1" />
                  {selectedPost.likes}
                </Button>
              </div>

              {/* Replies */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Replies ({selectedPost.replies.length})</h4>
                {selectedPost.replies.map((reply) => (
                  <div key={reply.id} className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{reply.author}</span>
                      <span className="text-sm text-gray-500">{getTimeAgo(reply.createdDate)}</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{reply.content}</p>
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleLikeReply(selectedPost.id, reply.id)}
                        className="text-gray-500 hover:text-red-500 hover:bg-red-50 p-1"
                      >
                        <Heart className="w-3 h-3 mr-1" />
                        {reply.likes}
                      </Button>
                    </div>
                  </div>
                ))}
                
                {/* Add Reply Form */}
                {user && (
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 space-y-3">
                        <Textarea
                          value={newReplyContent}
                          onChange={(e) => setNewReplyContent(e.target.value)}
                          placeholder="Share your thoughts or advice..."
                          rows={3}
                          className="resize-none"
                        />
                        <div className="flex justify-end">
                          <Button
                            onClick={handleAddReply}
                            disabled={!newReplyContent.trim()}
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
                            size="sm"
                          >
                            <Send className="w-4 h-4 mr-1" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!user && (
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <p className="text-sm text-gray-600">
                      Please log in to reply to posts
                    </p>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CommunityForum;