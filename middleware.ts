import { NextRequest, NextResponse } from "next/server";

export function middleware(request:NextRequest){
    const token = request.cookies.get("accessToken")?.value;
    console.log("token...",token);
    const url = request.nextUrl.clone();
    if(!token && url.pathname==="/"){
        url.pathname="/login";
        return NextResponse.redirect(url);
    }
    //protected homepage
    if(!token && request.nextUrl.pathname==="/"){
        return NextResponse.redirect(new URL("/login",request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher:["/"]
};