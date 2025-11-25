"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, LogIn, Bell, User, ChevronDown, Menu, Search, FileText } from "lucide-react";
import { getCurrentUser, logout } from "@/src/services/AuthService";
import logo from "../../app/assets/images/logo.svg"
import avatar from "../../app/assets/images/Avatar.png"
import { IoHomeOutline } from "react-icons/io5";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  const handleRedirect = (path: string) => router.push(path);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push("/login");
  };

  const handleLoadUser = async () => {
    const currentUser = await getCurrentUser();
    console.log(currentUser)
    setUser(currentUser);
  };

  useEffect(() => {
    handleLoadUser();
  }, []);
 console.log("user....",user)
  const displayName = user?.firstName || user?.email?.split("@")[0] || "Guest";
  // displayInitials is calculated but not used in the final JSX structure
  const displayInitials =
    user?.fir?.split(" ").map((n: string) => n[0]).join("").substring(0, 2) || (user ? "U" : "G");

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleRedirect("/")}>
            <Image src={logo} alt="Logo" width={140} height={32} className="object-contain" />
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-4 hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
             {/* HOME */}
<button className="group p-2 rounded-full text-gray-500 hover:text-blue-600 relative cursor-pointer">
  <IoHomeOutline className="h-6 w-6" />


  <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-blue-500 transition-all"></span>


  <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-blue-500 group-hover:w-5 transform -translate-x-1/2 transition-all"></span>
</button>

{/* USER */}
<button className="group p-2 rounded-full text-gray-500 hover:text-blue-600 relative cursor-pointer">
  <User className="h-6 w-6" />

  <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-blue-500 transition-all"></span>

  <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-blue-500 group-hover:w-5 transform -translate-x-1/2 transition-all"></span>
</button>

{/* BELL + Notification Dot */}
<button className="group p-2 rounded-full text-gray-500 hover:text-blue-600 relative cursor-pointer">

  <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full border-2 border-white"></span>

  <Bell className="h-6 w-6" />

  <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-blue-500 transition-all"></span>

  <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-blue-500 group-hover:w-5 transform -translate-x-1/2 transition-all"></span>
</button>

{/* CHAT */}
<button className="group p-2 rounded-full text-gray-500 hover:text-blue-600 relative cursor-pointer">

  <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full border-2 border-white"></span>

  <IoChatbubbleEllipsesOutline className="h-6 w-6" />

  <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-blue-500 transition-all"></span>

  <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-blue-500 group-hover:w-5 transform -translate-x-1/2 transition-all"></span>
</button>

                {/* Dropdown */}
              <div className="ml-4 pl-4 border-l border-gray-200 relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                  >
                    <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                      <Image
   src={avatar} 
   alt="User Avatar"
  width={32}
  height={32}
  className="h-8 w-8 rounded-full border-2 border-gray-200 object-cover"
/>
                    </div>
                    <div className="text-sm font-medium text-gray-700 hidden lg:block">{displayName}</div>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-500 transition-transform ${
                        isDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        Role: <strong>{user.role}</strong>
                      </div>
                      
                      <a 
                        href="/my-posts" 
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FileText className="mr-2 h-4 w-4 text-blue-500" /> My Posts
                      </a>
                    

                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="mr-2 h-4 w-4 text-red-500" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleRedirect("/login")}
                  className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  <LogIn className="h-4 w-4 mr-1" /> Login
                </button>
                <button
                  onClick={() => handleRedirect("/register")}
                  className="px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>
            {user ? (
              <>
                {/* Profile Link */}
                <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50">
                  <User className="mr-2 h-5 w-5 text-gray-500 inline-block" /> Profile: {displayName}
                </a>

             
                <a 
                    href="/my-posts" 
                    className="flex items-center w-full px-3 py-2 text-base font-medium text-blue-600 rounded-md hover:bg-blue-50"
                >
                    <FileText className="mr-2 h-5 w-5 text-blue-500" /> My Posts
                </a>
           

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 text-base font-medium text-red-600 rounded-md hover:bg-red-50"
                >
                  <LogOut className="mr-2 h-5 w-5 text-red-500" /> Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleRedirect("/login")}
                  className="px-3 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Login
                </button>
                <button
                  onClick={() => handleRedirect("/register")}
                  className="px-3 py-2 text-base font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;