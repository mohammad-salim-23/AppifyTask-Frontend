"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { MoreHorizontal, Heart, MessageCircle, Share2, Globe, Lock } from 'lucide-react';
import CommentSection from '../comment/CommentSection';
import { toggleLike } from '@/src/services/LikeService';

interface IPost {
  _id: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
  text?: string;
  image?: string;
  visibility: 'public' | 'private';
  likesCount: number;
  commentsCount: number;
  createdAt: string;
}

interface PostCardProps {
  post: IPost;
  dummyAvatarSrc: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, dummyAvatarSrc }) => {
  const [showComments, setShowComments] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [liked, setLiked] = useState(false);

  const authorName = `${post.author.firstName} ${post.author.lastName}`;
  const authorAvatar = post.author.avatar || dummyAvatarSrc;

  const timePosted = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const VisibilityIcon = post.visibility === 'public' ? Globe : Lock;

  const handleLike = async () => {
    try {
      const result = await toggleLike({ targetId: post._id, targetType: "Post" });
      if (result.success) {
        setLiked(!liked);
        setLikesCount(prev => liked ? prev - 1 : prev + 1);
      }
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 transition duration-300 hover:shadow-lg mb-6">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative h-12 w-12 flex-shrink-0">
            <Image src={authorAvatar} alt={authorName} fill className="rounded-full object-cover" />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900">{authorName}</p>
            <div className="flex items-center space-x-2 text-xs text-gray-500 mt-0.5">
              <span>{timePosted}</span>
              <span>•</span>
              <VisibilityIcon className="h-3 w-3" />
            </div>
          </div>
        </div>

        <button className="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Text */}
      {post.text && (
        <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.text}</p>
      )}

      {/* Image */}
      {post.image && (
        <div className="relative w-full rounded-lg overflow-hidden mb-4 aspect-video">
          <Image src={post.image} alt="Post Image" fill className="object-cover" />
        </div>
      )}

      {/* Counts */}
      <div className="flex justify-between items-center text-sm text-gray-500 border-b pb-3 mb-3">
        <p>
          <span className="font-semibold text-gray-800">{likesCount}</span> Likes
        </p>

        <button
          onClick={() => setShowComments(!showComments)}
          className="hover:text-blue-600 transition"
        >
          <span className="font-semibold text-gray-800">{post.commentsCount}</span> Comments
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-around">
        <ActionButton
          Icon={Heart}
          count={likesCount}
          label="Like"
          onClick={handleLike}
          active={liked}
        />

        <ActionButton
          Icon={MessageCircle}
          count={post.commentsCount}
          label="Comment"
          onClick={() => setShowComments(!showComments)}
        />

        <ActionButton Icon={Share2} label="Share" onClick={() => console.log('Share')} />
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <CommentSection postId={post._id} currentUserAvatar={dummyAvatarSrc} />
        </div>
      )}
    </div>
  );
};

export default PostCard;

/* Action Button */
interface ActionButtonProps {
  Icon: React.ElementType;
  label: string;
  count?: number;
  active?: boolean;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ Icon, label, count, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 p-2 rounded-lg transition duration-150 ${
      active ? 'text-red-500 bg-red-50' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
    }`}>
    <Icon className="h-5 w-5" />
    <span className="text-sm font-medium hidden sm:inline">{label}</span>
    {count !== undefined && count > 0 && <span className="text-xs font-semibold">{count}</span>}
  </button>
);
