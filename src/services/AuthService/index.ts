/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
        console.log("............")
        const result = await res.json()
        
        if (result?.success) {
            (await cookies()).set("accessToken", result?.data?.accessToken)
        }

        return result;
    } catch (error: any) {
        return Error(error)
    }
}

export const loginUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })

        const result = await res.json()
       console.log("res....",result.data.accessToken);
        if (result?.success) {
            (await cookies()).set("accessToken", result?.data?.accessToken)
        }

        return result;
    } catch (error: any) {
        return Error(error)
    }
}

export const getCurrentUser = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value;
    let decodedData = null;
     if (!accessToken) return null;

    try {
        const decoded = jwtDecode<any>(accessToken);
        return {
            email: decoded.userEmail,
            role: decoded.role,
            firstName: decoded.firstName
        };
    } catch (err) {
        console.error("Invalid token:", err);
        return null;
    }
}


export const logout = async () => {
    (await cookies()).delete("accessToken");
}


