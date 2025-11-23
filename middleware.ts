import { NextRequest, NextResponse } from "next/server";

export function middleware(request:NextRequest){
    const token = request.cookies.get("accessToken")?.value;

    //protected homepage
    if(!token && request.nextUrl.pathname==="/"){
        return NextResponse.redirect(new URL("/login",request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher:["/"]
};