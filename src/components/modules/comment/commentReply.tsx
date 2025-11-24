"use client"


import { useState } from "react";
import Image from "next/image";
import { Send } from "lucide-react";
import { IComment } from "./CommentSection";
import { addComment, getReplies } from "@/src/services/CommentService";

interface CommentCardProps {
  comment: IComment;
  postId: string;
  currentUserAvatar: string;
  isPosting: boolean;
  reloadComments: () => void;
}

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  postId,
  currentUserAvatar,
  isPosting,
  reloadComments,
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState<IComment[]>([]);
  const [showReplies, setShowReplies] = useState(false);

  const authorName = `${comment.author.firstName} ${comment.author.lastName}`;
  const timePosted = new Date(comment.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

 
  const loadReplies = async () => {
    try {
      const result = await getReplies(comment._id);

      if (result.success) {
        setReplies(result.data);
      }
    } catch (err) {
      console.error("Error loading replies:", err);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    await addComment({
      postId,
      text: replyText,
      parentComment: comment._id,
    });

    setReplyText("");
    setShowReplyBox(false);
    reloadComments();
  };

  return (
    <div className="flex flex-col space-y-2 mb-3 pl-2 border-l border-gray-200">
      <div className="flex space-x-3">
        <div className="relative h-8 w-8 flex-shrink-0 mt-1">
          <Image
            src={comment.author.avatar || currentUserAvatar}
            alt={authorName}
            fill
            className="object-cover rounded-full"
          />
        </div>

        <div className="flex-1">
          <div className="bg-gray-100 p-3 rounded-xl">
            <p className="text-sm font-semibold text-gray-900">{authorName}</p>
            <p className="text-sm text-gray-800 mt-0.5 whitespace-pre-wrap">
              {comment.text}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1 ml-2">
            <span>{timePosted}</span>

            <button
              onClick={() => setShowReplyBox(!showReplyBox)}
              className="font-semibold hover:underline"
            >
              Reply ({comment.replyCount})
            </button>

            {comment.replyCount > 0 && (
              <button
                onClick={() => {
                  const next = !showReplies;
                  setShowReplies(next);
                  if (next) loadReplies(); // only load when opening
                }}
                className="font-semibold hover:underline"
              >
                {showReplies ? "Hide Replies" : "View Replies"}
              </button>
            )}
          </div>

          {showReplyBox && (
            <form
              onSubmit={handleReplySubmit}
              className="flex gap-2 mt-2 ml-2 items-center"
            >
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 border px-2 py-1 rounded"
              />

              <button
                type="submit"
                disabled={!replyText.trim() || isPosting}
                className="bg-blue-600 text-white px-3 py-1 rounded disabled:bg-blue-400"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}

          {showReplies && replies.length > 0 && (
            <div className="ml-6 mt-2 space-y-2">
              {replies.map((r) => (
                <div key={r._id} className="flex space-x-3">
                  <div className="relative h-7 w-7 flex-shrink-0 mt-1">
                    <Image
                      src={r.author.avatar || currentUserAvatar}
                      alt={`${r.author.firstName} ${r.author.lastName}`}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-sm font-semibold text-gray-900">
                        {r.author.firstName} {r.author.lastName}
                      </p>
                      <p className="text-sm mt-0.5">{r.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;