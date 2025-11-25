"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Edit, Trash2, Globe, Lock } from "lucide-react";
import { getMyPosts, updatePost, deletePost } from "@/src/services/PostService";
import avatImg from "../../../app/assets/images/Avatar.png"; 

interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

interface IPost {
  _id: string;
  text?: string;
  image?: string;
  visibility: "public" | "private";
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  author: IUser;
}


const MyPosts: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editVisibility, setEditVisibility] = useState<"public" | "private">("public");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await getMyPosts();
      const postsWithImages = res.data.filter((post: IPost) => post.image); 
      if (res.success) setPosts(postsWithImages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post: IPost) => {
    setEditingPostId(post._id);
    setEditText(post.text || "");
    setEditVisibility(post.visibility);
  };

  const handleUpdate = async (postId: string) => {
    try {
      const res = await updatePost(postId, { text: editText, visibility: editVisibility });
      if (res.success) {
        toast.success("Post updated successfully!");
        setEditingPostId(null);
        fetchPosts();
      } else {
        toast.error(res.message || "Failed to update post");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await deletePost(postId);
      if (res.success) {
        toast.success("Post deleted!");
        fetchPosts();
      } else {
        toast.error(res.message || "Failed to delete post");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <p className="text-gray-500 text-center mt-5">Loading posts...</p>;
  if (!posts.length) return <p className="text-gray-500 text-center mt-5">No posts yet, or no posts with images found.</p>;
  
  // Custom date formatting for the card
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(/,/g, ' •');
  };

  // --- Post Card Component 
  const PostCard = ({ post }: { post: IPost }) => {
    const authorName = `${post.author.firstName} ${post.author.lastName}`;
    const authorAvatar = post.author.avatar || avatImg;
    const timePosted = formatDate(post.createdAt);

    // Editing mode content 
    if (editingPostId === post._id) {
        return (
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 col-span-1">
                <h3 className="text-lg font-semibold mb-2">Editing Post</h3>
                <div className="space-y-2">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full p-2 border rounded-md text-sm"
                      rows={4}
                    />
                    <select
                      value={editVisibility}
                      onChange={(e) => setEditVisibility(e.target.value as any)}
                      className="border rounded-md p-1 text-sm"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                    <div className="flex space-x-2 pt-2">
                      <button
                        onClick={() => handleUpdate(post._id)}
                        className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingPostId(null)}
                        className="bg-gray-300 text-gray-700 text-sm px-3 py-1 rounded-md hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </div>
                </div>
            </div>
        );
    }


    // Normal display mode
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300 overflow-hidden relative">
        
        <div className="relative w-full h-40"> 
          <Image
            src={post.image || "/path/to/default/image.jpg"} 
            alt="Post Image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Action Overlay/Button Group */}
          <div className="absolute top-2 right-2 flex space-x-2 p-1 bg-black bg-opacity-30 rounded-lg ">
            <button 
                onClick={() => handleEdit(post)} 
                className="text-white hover:text-blue-300 transition mr-2"
                title="Edit Post"
            >
              <Edit className="h-4 w-4 cursor-pointer" />
            </button>
            <button 
                onClick={() => handleDelete(post._id)} 
                className="text-white hover:text-red-300 transition"
                title="Delete Post"
            >
              <Trash2 className="h-4 w-4 cursor-pointer" />
            </button>
          </div>
        </div>

        {/* Text Content  */}
        <div className="p-4 flex flex-col justify-between h-auto">
          <div>
          
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
              {post.text || "Untitled Post"}
            </h3>
            
            <p className="text-sm text-gray-600 line-clamp-3">
              {post.text ? post.text.slice(0, 100) + '...' : 'A brief description of the post content.'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative h-6 w-6 flex-shrink-0">
                <Image
                  src={authorAvatar}
                  alt={authorName}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <p className="text-xs font-medium text-gray-700">{authorName}</p>
            </div>
            
            <div className="flex items-center space-x-1 text-xs text-gray-500">
                <span>{timePosted}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="px-4 py-8 lg:px-12 xl:px-20">
      {/* Header & Intro */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Your Created Posts</h2>
        <p className="text-gray-600 mt-2">
          Manage and view all the content you've published. Click the edit icon to make changes.
        </p>
      </div>

      ---

      {/* Posts Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default MyPosts;