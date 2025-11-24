"use client"

import { useRouter } from "next/navigation";
import Stories from "../components/HomePage/story/story";
import CreatePostWrapper from "../components/modules/post/createPostWrapper";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/sidebar/leftSide";
import RightSidebar from "../components/sidebar/rightSidebar";

export default function Home() {
  const router = useRouter();
  
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
        </div>
       
        {/* Right Sidebar */}
        <div className="hidden xl:block w-[300px]">
          <RightSidebar />
        </div>

      </div>
    </div>
  );
}
