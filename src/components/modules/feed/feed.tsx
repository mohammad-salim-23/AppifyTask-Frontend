"use client";

import React, { useEffect, useState } from "react";
import PostCard from "../post/postCard";
import { getFeed } from "@/src/services/PostService";
 import dummyAvatar from "../../../app/assets/images/Avatar.png";
const Feed: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const result = await getFeed();
        // console.log("...get",result)
        if (result?.success) {
          setPosts(result.data || []);
        }
      } catch (err) {
        console.error("Error fetching feed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading feed...</p>;
  if (!posts.length) return <p className="text-center mt-10">No posts yet!</p>;

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} dummyAvatarSrc={dummyAvatar.src} />
      ))}
    </div>
  );
};

export default Feed;
