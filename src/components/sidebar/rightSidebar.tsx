
import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react'; 
import img1 from "../../app/assets/images/people1.png"
import img2 from "../../app/assets/images/people2.png"
import img3 from "../../app/assets/images/people3.png"

const RightSidebar: React.FC = () => {

  const mightLikeProfile = {
    name: "Radovan SkillArena",
    title: "Founder & CEO at Trophy",
    imgSrc: img1,
  };
  const yourFriends = [
    { name: "Steve Jobs", title: "CEO of Apple", timeAgo: "5 minute ago", imgSrc: img2, online: false },
    { name: "Ryan Roslansky", title: "CEO of LinkedIn", imgSrc: img3, online: true },
    { name: "Dylan Field", title: "CEO of Figma", imgSrc: img1, online: true },
    { name: "Steve Jobs", title: "CEO of Apple", timeAgo: "5 minute ago", imgSrc:img2 , online: false },
    { name: "Ryan Roslansky", title: "CEO of LinkedIn", imgSrc: img3, online: true },
    { name: "Dylan Field", title: "CEO of Figma", imgSrc: img1, online: true },
    { name: "Dylan Field", title: "CEO of Figma", imgSrc: img2, online: true },
    { name: "Steve Jobs", title: "CEO of Apple", timeAgo: "5 minute ago", imgSrc: img3, online: false },
  ];

  return (

    <div className="w-80 flex-shrink-0 bg-white border-l border-gray-100 p-4 space-y-6">
      
      <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">You Might Like</h3>
          <button className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">See All</button>
        </div>

        <div className="flex flex-col items-center text-center space-y-3">
          {/* Profile Image */}
          <div className="relative h-16 w-16">
            <Image 
              src={mightLikeProfile.imgSrc} 
              alt={mightLikeProfile.name} 
              layout="fill" 
              objectFit="cover" 
              className="rounded-full"
            />
          </div>
          <p className="text-lg font-semibold text-gray-800">{mightLikeProfile.name}</p>
          <p className="text-sm text-gray-500">{mightLikeProfile.title}</p>
          
          {/* Action Buttons */}
          <div className="flex space-x-2 mt-3 w-full">
            <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150 cursor-pointer">
              Ignore
            </button>
            <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-lg hover:bg-blue-500 transition duration-150 cursor-pointer">
              Follow
            </button>
          </div>
        </div>
      </section>

      {/*YOUR FRIENDS Section */}
      <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Your Friends</h3>
          <button className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">See All</button>
        </div>

        {/* Search Bar for Friends */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="input search text"
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 transition duration-150"
          />
        </div>

        {/* Friends List */}
        <div className="space-y-3">
          {yourFriends.map((friend, index) => (
            <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition duration-150 cursor-pointer">
              {/* Avatar Image */}
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image 
                  src={friend.imgSrc} 
                  alt={friend.name} 
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded-full"
                />
              </div>
              
           
              <div className="ml-3 flex-1">
                <p className="text-sm font-semibold text-gray-800 flex items-center space-x-1">
                  <span>{friend.name}</span>
                  {/* Green Dot) */}
                  {friend.online && (
                    <span 
                      className="h-2 w-2 bg-green-500 rounded-full inline-block ml-2" 
                      title="Online"
                    ></span>
                  )}
                </p>
                <p className="text-xs text-gray-500">{friend.title}</p>
              </div>
             
              {friend.timeAgo && (
                <span className="text-xs text-gray-400">{friend.timeAgo}</span>
              )}
               
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default RightSidebar;