"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { addComment, getComments } from "@/src/services/CommentService";
import CommentCard from "./commentReply";

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

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  currentUserAvatar,
}) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  // Pagination states
  const [lastSeen, setLastSeen] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

 
  const loadComments = async () => {
    try {
      if (loadingMore) return;

      if (comments.length === 0) setLoading(true);
      else setLoadingMore(true);

      const res = await getComments(postId, lastSeen || undefined);

      if (res.success && Array.isArray(res.data)) {
        const newComments: IComment[] = res.data;

        // Add new comments to list
        setComments((prev) => [...prev, ...newComments]);

        // Update lastSeen
        if (newComments.length > 0) {
          const last = newComments[newComments.length - 1];
          setLastSeen(last.createdAt);
        }

        // If fewer than 10 → no more available
        if (newComments.length < 10) setHasMore(false);
      } else {
        toast.error(res.message || "Failed to fetch comments.");
      }
    } catch (err) {
      toast.error("Error fetching comments.");
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setComments([]);
    setLastSeen(null);
    setHasMore(true);
    loadComments();
  }, [postId]);

  // Add Comment
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setPosting(true);
    try {
      const res = await addComment({ postId, text: newComment });
      if (res.success) {
        setNewComment("");

        // Reload from start
        setComments([]);
        setLastSeen(null);
        setHasMore(true);
        loadComments();
      } else toast.error(res.message);
    } catch (err) {
      toast.error("Failed to post comment.");
      console.error(err);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Loading */}
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <>
          {comments
            .filter((c) => !c.parentComment)
            .map((comment) => (
              <CommentCard
                key={comment._id}
                comment={comment}
                postId={postId}
                isPosting={posting}
                currentUserAvatar={currentUserAvatar}
                reloadComments={() => {
                  setComments([]);
                  setLastSeen(null);
                  setHasMore(true);
                  loadComments();
                }}
              />
            ))}
        </>
      )}

      {/* Load More */}
      {hasMore && !loading && (
        <div className="text-center">
          <button
            onClick={loadComments}
            disabled={loadingMore}
            className="px-4 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg"
          >
            {loadingMore ? "Loading..." : "Load More Comments"}
          </button>
        </div>
      )}

      {/* Add new comment */}
      <form
        onSubmit={handleCommentSubmit}
        className="flex items-center space-x-2 mt-2"
      >
        <img
          src={currentUserAvatar}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />

        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-1 border rounded-lg px-3 py-1"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <button
          type="submit"
          disabled={posting}
          className="text-blue-500 font-medium px-3 py-1"
        >
          {posting ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
