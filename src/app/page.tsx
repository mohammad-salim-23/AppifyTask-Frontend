
"use client"

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/sidebar/leftSide";
import RightSidebar from "../components/sidebar/rightSidebar";


const logoPath= "/logo.svg"
export default function Home() {
  return (
    <div className="">
     
       <Navbar/>
     <div className="flex justify-between">
      <Sidebar/>
     <RightSidebar/>
     </div>
    </div>
  );
}
