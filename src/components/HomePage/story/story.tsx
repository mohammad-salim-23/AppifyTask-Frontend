// components/Stories/Stories.tsx

import React from 'react';
import Image from 'next/image';
import { Plus, ArrowRight } from 'lucide-react';

const DUMMY_AVATAR_SRC = '/dummy-avatar.jpg'; 
const DUMMY_STORY_BG_SRC = '/dummy-story-bg.jpg'; 

const staticStories = [
    { 
        type: 'create', 
        name: 'Your Story', 
        bgSrc: null, 
        avatarSrc: null 
    },
    { 
        type: 'view', 
        name: 'Ryan Roslansky', 
        bgSrc: '/story-bg-1.jpg', 
        avatarSrc: DUMMY_AVATAR_SRC 
    },
    { 
        type: 'view', 
        name: 'Ryan Roslansky', 
        bgSrc: '/story-bg-2.jpg', 
        avatarSrc: DUMMY_AVATAR_SRC 
    },
    { 
        type: 'view', 
        name: 'Ryan Roslansky', 
        bgSrc: '/story-bg-3.jpg', 
        avatarSrc: DUMMY_AVATAR_SRC 
    },
    { 
        type: 'view', 
        name: 'Dylan Field', 
        bgSrc: '/story-bg-4.jpg', 
        avatarSrc: DUMMY_AVATAR_SRC 
    },
    { 
        type: 'view', 
        name: 'Steve Jobs', 
        bgSrc: '/story-bg-5.jpg', 
        avatarSrc: DUMMY_AVATAR_SRC 
    },
];

const Stories: React.FC = () => {
    
  
    const defaultBgSrc = '/dummy-story-bg-1.jpg';

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="flex space-x-4 overflow-x-auto p-2 scrollbar-hide">
        
        {staticStories.map((story, index) => {
          
          if (story.type === 'create') {
            // 'Your Story'
            return (
              <div 
                key={index} 
                className="relative flex-shrink-0 w-32 h-48 rounded-xl overflow-hidden cursor-pointer shadow-lg transition duration-300 hover:shadow-xl"
              >
                {/* Dark Background */}
                <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-end p-3">
                  <div className="w-full text-center">
                    <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-white">
                      <Plus className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-white font-semibold text-sm">{story.name}</p>
                  </div>
                </div>
              </div>
            );
          }

          // View Story Cards
          return (
            <div 
              key={index} 
              className="relative flex-shrink-0 w-32 h-48 rounded-xl overflow-hidden cursor-pointer shadow-lg border-2 border-transparent transition duration-300 hover:shadow-xl hover:border-blue-500"
            >
              {/* Background Image */}
              <Image 
                src={story.bgSrc || defaultBgSrc}
                alt={`Story by ${story.name}`}
                layout="fill"
                objectFit="cover"
              />
              
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black opacity-20"></div>
              
              {/* Avatar and Name */}
              <div className="absolute top-2 left-2">
                <div className="relative h-8 w-8 rounded-full border-2 border-white">
                  <Image 
                    src={story.avatarSrc || DUMMY_AVATAR_SRC}
                    alt={`${story.name}'s avatar`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              </div>
              <p className="absolute bottom-2 left-2 right-2 text-white font-semibold text-sm truncate">
                {story.name}
              </p>
            </div>
          );
        })}
      </div>
      
      {/* Scroll Navigation Arrow (Right side) */}
      <button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center cursor-pointer border border-gray-200 hover:bg-gray-50 transition duration-150"
      
      >
        <ArrowRight className="h-5 w-5 text-gray-700" />
      </button>
    </div>
  );
};

export default Stories;