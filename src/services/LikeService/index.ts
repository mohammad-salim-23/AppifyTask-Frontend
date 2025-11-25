"use server";

import { cookies } from "next/headers";

interface ILikeUser {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  
}
interface IPostLikesResponse{
    likedUsers: ILikeUser[];
    userLiked: boolean;
}
interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Toggle Like
export const toggleLike = async (data: { targetId: string; targetType: "Post" | "Comment" }): Promise<IApiResponse<{ liked: boolean }>> => {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/likes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": accessToken!,
        },
        body: JSON.stringify(data),
    });

    const json = await res.json();
    return json;
};

// Get Likes for a Post
export const getPostLikes = async (postId: string): Promise<IApiResponse<IPostLikesResponse>> => {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/likes/post/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": accessToken!,
        },
    });

    const json = await res.json();
    return json;
};
