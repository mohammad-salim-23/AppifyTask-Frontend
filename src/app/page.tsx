"use client"

import { useRouter } from "next/navigation";
import Stories from "../components/HomePage/story/story";

import { ClipLoader } from "react-spinners";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/sidebar/leftSide";
import RightSidebar from "../components/sidebar/rightSidebar";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/AuthService";
import CreatePostWrapper from "../components/modules/post/createPostWrapper";
import Feed from "../components/modules/feed/feed";


export default function Home() {
  const router = useRouter();
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    const checkUser = async()=>{
      const user = await getCurrentUser();
      if(!user){
        router.push("/login");
      }else{
        setLoading(false);
      }
    };
    checkUser()
  },[router])
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <ClipLoader color="#2563eb" size={60} />
        <p className="mt-4 text-gray-700 text-lg font-medium">Loading your feed...</p>
      </div>
    );

  return (
    <div>
      <Navbar />

      <div className="flex max-w-7xl mx-auto">
        
        {/* Left Sidebar */}
        <div className="hidden lg:block w-[250px] xl:w-[280px]">
          <Sidebar />
        </div>

       
        <div className="flex-1 px-2 sm:px-4 md:px-6">
          <Stories />
        <CreatePostWrapper/>
        <Feed/>
        </div>
       
        {/* Right Sidebar */}
        <div className="hidden xl:block w-[300px]">
          <RightSidebar />
        </div>

      </div>
    </div>
  );
}
