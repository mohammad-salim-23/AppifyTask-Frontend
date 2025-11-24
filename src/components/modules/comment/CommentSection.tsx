
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Send, ThumbsUp, MessageCircle } from 'lucide-react';

import { toast } from 'sonner';
import { addComment, getComments } from '@/src/services/CommentService';


interface IComment {
    _id: string;
    author: {
        firstName: string;
        lastName: string;
        email: string;
        avatar?: string;
    };
    text: string;
    likesCount: number;
    replyCount: number;
    createdAt: string;
}

interface CommentSectionProps {
    postId: string;
    currentUserAvatar: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, currentUserAvatar }) => {
    const [comments, setComments] = useState<IComment[]>([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [isFetching, setIsFetching] = useState(true);
    const [isPosting, setIsPosting] = useState(false);

    
    const fetchComments = async () => {
        setIsFetching(true);
        try {
            const result = await getComments(postId);
            if (result.success && Array.isArray(result.data)) {
                setComments(result.data);
            } else {
                toast.error(result.message || "Failed to load comments.");
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
            toast.error("An error occurred while fetching comments.");
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);


   
    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCommentText.trim() || isPosting) return;

        setIsPosting(true);
        try {
            const data = { postId, text: newCommentText.trim() };
            const result = await addComment(data);

            if (result.success) {
                toast.success("Comment posted successfully!");
                setNewCommentText('');
                
                fetchComments(); 
            } else {
                toast.error(result.message || "Failed to post comment.");
            }
        } catch (error) {
            console.error("Error posting comment:", error);
            toast.error("An error occurred while posting comment.");
        } finally {
            setIsPosting(false);
        }
    };



    const CommentCard: React.FC<{ comment: IComment }> = ({ comment }) => {
        const authorName = `${comment.author.firstName} ${comment.author.lastName}`;
        const timePosted = new Date(comment.createdAt).toLocaleDateString('en-US', {
            month: 'short', 
            day: 'numeric'
        });

        return (
            <div className="flex space-x-3 mb-3">
                <div className="relative h-8 w-8 flex-shrink-0 mt-1">
                    <Image 
                        src={comment.author.avatar || currentUserAvatar} 
                        alt={authorName} 
                        layout="fill" 
                        objectFit="cover" 
                        className="rounded-full"
                    />
                </div>
                <div className="flex-1">
                    <div className="bg-gray-100 p-3 rounded-xl">
                        <p className="text-sm font-semibold text-gray-900">{authorName}</p>
                        <p className="text-sm text-gray-800 mt-0.5 whitespace-pre-wrap">{comment.text}</p>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1 ml-2">
                        <span>{timePosted}</span>
                        <button className="font-semibold hover:underline">Like ({comment.likesCount})</button>
                        <button className="font-semibold hover:underline">Reply ({comment.replyCount})</button>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <div className="space-y-4">
            {/* New Comment Input */}
            <form onSubmit={handleCommentSubmit} className="flex space-x-3 items-center">
                <div className="relative h-10 w-10 flex-shrink-0">
                    <Image 
                        src={currentUserAvatar} 
                        alt="Your Avatar" 
                        layout="fill" 
                        objectFit="cover" 
                        className="rounded-full"
                    />
                </div>
                <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 p-2 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500 transition"
                    disabled={isPosting}
                />
                <button
                    type="submit"
                    disabled={!newCommentText.trim() || isPosting}
                    className="p-2 bg-blue-600 text-white rounded-full disabled:bg-blue-400 transition"
                >
                    <Send className="h-5 w-5" />
                </button>
            </form>

            {/* Comments List */}
            <div className="max-h-96 overflow-y-auto pr-2">
                {isFetching ? (
                    <p className="text-gray-500 text-center">Loading comments...</p>
                ) : comments.length > 0 ? (
                    comments.map(comment => (
                        <CommentCard key={comment._id} comment={comment} />
                    ))
                ) : (
                    <p className="text-gray-500 text-center">Be the first to comment!</p>
                )}
            </div>
        </div>
    );
};

export default CommentSection;