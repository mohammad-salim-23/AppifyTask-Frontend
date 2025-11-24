'use client';

import React, { useState, useEffect } from 'react';

import { toast } from 'sonner';
import { addComment, getComments } from '@/src/services/CommentService';
import CommentCard from './commentReply';

export interface IComment {
    _id: string;
    postId: string;
    parentComment?: string | null;
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

  
    {/* Comments */}
      return(
           <div>
            {isFetching ? (
               <p>Loading...</p>
            ) : (
               comments
                 .filter(c => !c.parentComment)
                 .map(comment => (
                    <CommentCard
                        key={comment._id}
                        comment={comment}
                        postId={postId}
                        currentUserAvatar={currentUserAvatar}
                        isPosting={isPosting}
                        reloadComments={fetchComments}
                       
                    />
                 ))
            )}
         </div>
      )
 
};

export default CommentSection;
