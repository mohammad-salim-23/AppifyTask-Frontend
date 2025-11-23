"use server";

import { cookies } from "next/headers";

export const toggleLike = async (data: any) => {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/likes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": accessToken!,
        },
        body: JSON.stringify(data),
    });

    return res.json();
};
