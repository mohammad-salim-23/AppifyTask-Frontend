"use server";

import { cookies } from "next/headers";

export const addComment = async (data: any) => {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": accessToken!,
        },
        body: JSON.stringify(data),
    });

    return res.json();
};

export const getComments = async (postId: string) => {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/comment/${postId}`, {
        method: "GET",
        headers: {
            "authorization": accessToken!,
        },
    });

    return res.json();
};

export const updateComment = async (commentId: string, data: any) => {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/comment/${commentId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "authorization": accessToken!,
        },
        body: JSON.stringify(data),
    });

    return res.json();
};

export const deleteComment = async (commentId: string) => {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/comment/${commentId}`, {
        method: "DELETE",
        headers: {
            "authorization": accessToken!,
        },
    });

    return res.json();
};
