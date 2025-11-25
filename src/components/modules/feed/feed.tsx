"use client";

import { useEffect, useState } from "react";
import PostCard from "../post/postCard";
import { getFeed } from "@/src/services/PostService";
import dummyAvatar from "../../../app/assets/images/Avatar.png";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastSeen, setLastSeen] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadPosts();

    // Handle new real-time post (local dispatch event)
    const handleNewPost = (e: any) => {
      setPosts((prev) => [e.detail, ...prev]);
    };

    window.addEventListener("new-post", handleNewPost);
    return () => window.removeEventListener("new-post", handleNewPost);
  }, []);

  // Load Posts
  const loadPosts = async () => {
    try {
      if (loadingMore) return;

      if (!posts.length) setLoading(true);
      else setLoadingMore(true);

      const result = await getFeed(lastSeen || undefined);

      if (result?.success) {
        const newPosts = result.data || [];

        // Add new posts to existing list
        setPosts((prev) => [...prev, ...newPosts]);

    
        if (newPosts.length > 0) {
          const last = newPosts[newPosts.length - 1];
          setLastSeen(last.createdAt);
        }

       
        if (newPosts.length < 10) {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.error("Error fetching feed:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  if (loading && posts.length === 0)
    return <p className="text-center mt-10">Loading feed...</p>;

  if (!loading && !posts.length)
    return <p className="text-center mt-10">No posts yet!</p>;

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} dummyAvatarSrc={dummyAvatar.src} />
      ))}

    
      {hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={loadPosts}
            disabled={loadingMore}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition"
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Feed;
