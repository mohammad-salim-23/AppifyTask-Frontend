"use server";

import { cookies } from "next/headers";

export const createPost = async (postData: any) => {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": accessToken!,   
        },
        body: JSON.stringify(postData),
    });

    return res.json();
};

export const getFeed = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/feed`, {
        method: "GET",
        headers: {
             "Content-Type": "application/json",
            "authorization": `Bearer ${accessToken}`,   
        },
    });

    return res.json();
};
export const getMyPosts = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/my-posts`, {
        method: "GET",
        headers: {
             "Content-Type": "application/json",
            "authorization": `Bearer ${accessToken}`,   
        },
    });

    return res.json();
};

export const updatePost = async (id: string, data: any) => {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "authorization": accessToken!,
        },
        body: JSON.stringify(data),
    });

    return res.json();
};

export const deletePost = async (id: string) => {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${id}`, {
        method: "DELETE",
        headers: {
            "authorization": accessToken!,
        },
    });

    return res.json();
};
