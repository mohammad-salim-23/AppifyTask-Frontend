

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
    
    const authorName = `${post.author.firstName} ${post.author.lastName}`;
    const authorAvatar = post.author.avatar || dummyAvatarSrc;
    const timePosted = new Date(post.createdAt).toLocaleDateString('en-US', {
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
    });
    
    const VisibilityIcon = post.visibility === 'public' ? Globe : Lock;

   
    const [likesCount,setLikesCount] = useState(post.likesCount);
    const[liked,setLiked] = useState(false);

    const handleLike=async()=>{
        try{
        const result = await toggleLike({postId:post._id,type:"Post"});
        if(result.success){
            setLiked(!liked);
            setLikesCount(liked? likesCount-1:likesCount+1);
        }
        }catch(err){
            console.error("Error liking post:",err);
        }
    }


    return (
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 transition duration-300 hover:shadow-lg">
            
            {/*Post Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                    <div className="relative h-12 w-12 flex-shrink-0">
                        <Image src={authorAvatar} alt={authorName} layout="fill" objectFit="cover" className="rounded-full"/>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-gray-900">{authorName}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-0.5">
                            <span>{timePosted}</span>
                            <span>•</span>
                           <span className="sr-only">{post.visibility}</span>
                        </div>
                    </div>
                </div>
                <button className="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition">
                    <MoreHorizontal className="h-5 w-5" />
                </button>
            </div>

            {/*Post Content */}
            {post.text && (
                <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.text}</p>
            )}
            {post.image && (
                <div className="relative w-full rounded-lg overflow-hidden mb-4 aspect-video">
                    <Image
                        src={post.image}
                        alt="Post Image"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            )}
            
            {/*Likes and Comments Count */}
            <div className="flex justify-between items-center text-sm text-gray-500 border-b pb-3 mb-3">
                <p>
                    <span className="font-semibold text-gray-800">{post.likesCount}</span> Likes
                </p>
                <button 
                    onClick={() => setShowComments(!showComments)}
                    className="hover:text-blue-600 transition"
                >
                    <span className="font-semibold text-gray-800">{post.commentsCount}</span> Comments
                </button>
            </div>

            {/*Action Buttons */}
            <div className="flex justify-around">
                
                <ActionButton Icon={Heart} count={post.likesCount} label="Like" onClick={handleLike} active={false} />
                
                <ActionButton 
                    Icon={MessageCircle} 
                    count={post.commentsCount} 
                    label="Comment" 
                    onClick={() => setShowComments(!showComments)}
                />

                <ActionButton Icon={Share2} label="Share" onClick={() => console.log('Share')} />
            </div>
            
            {/*Comment Section */}
            {showComments && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <CommentSection  postId={post._id} currentUserAvatar={dummyAvatarSrc} />
                </div>
            )}
            
        </div>
    );
};

export default PostCard;

// Helper component for action buttons
interface ActionButtonProps {
    Icon: React.ElementType;
    label: string;
    count?: number;
    active?: boolean;
    onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ Icon, label, count, active = false, onClick }) => {
    return (
        <button 
            onClick={onClick}
            className={`flex items-center space-x-2 p-2 rounded-lg transition duration-150 ${active ? 'text-red-500 bg-red-50' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
            <Icon className="h-5 w-5" />
            <span className="text-sm font-medium hidden sm:inline">{label}</span>
            {count !== undefined && count > 0 && (
                <span className="text-xs font-semibold">{count}</span>
            )}
        </button>
    );
};