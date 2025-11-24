
import React from 'react';
import Image from 'next/image';
import { Plus, ArrowRight } from 'lucide-react';
import img1 from "../../../app/assets/images/mobile_story_img.png";
import img2 from "../../../app/assets/images/mobile_story_img1.png";
import img3 from "../../../app/assets/images/mobile_story_img2.png";
import storyImg1 from "../../../app/assets/images/card_ppl1.png";
import storyImg2 from "../../../app/assets/images/card_ppl2.png";
import storyImg3 from "../../../app/assets/images/card_ppl3.png";
import storyImg4 from "../../../app/assets/images/card_ppl4.png";

const staticStories = [
  { type: 'create', name: 'Your Story', bgSrc: storyImg1, avatarSrc: img1 },
  { type: 'view', name: 'Ryan Roslansky', bgSrc: storyImg1, avatarSrc: img2 },
  { type: 'view', name: 'Ryan Roslansky', bgSrc: storyImg3, avatarSrc: img3 },
  { type: 'view', name: 'Ryan Roslansky', bgSrc: storyImg4, avatarSrc: img1 },
  { type: 'view', name: 'Dylan Field', bgSrc: storyImg1, avatarSrc: img2 },
  { type: 'view', name: 'Steve Jobs', bgSrc: storyImg2, avatarSrc: img3 },
];

const Stories: React.FC = () => {
  const defaultBgSrc = '/dummy-story-bg-1.jpg';

  return (
    <div className="relative w-full overflow-x-hidden py-4 ml-4">
      {/* Scrollable container */}
      <div className="flex space-x-4 overflow-x-auto p-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scroll-smooth">
        
        {staticStories.map((story, index) => {
          if (story.type === 'create') {
            return (
              <div 
                key={index} 
                className="relative flex-shrink-0 w-32 h-48 rounded-xl overflow-hidden cursor-pointer shadow-lg transition duration-300 hover:shadow-xl"
              >
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

          return (
            <div 
              key={index} 
              className="relative flex-shrink-0 w-32 h-48 rounded-xl overflow-hidden cursor-pointer shadow-lg border-2 border-transparent transition duration-300 hover:shadow-xl hover:border-blue-500"
            >
              <Image 
                src={story.bgSrc || defaultBgSrc}
                alt={`Story by ${story.name}`}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-black opacity-20"></div>
              <div className="absolute top-2 left-2">
                <div className="relative h-8 w-8 rounded-full border-2 border-white">
                  <Image 
                    src={story.avatarSrc}
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

        {/* Optional Scroll Button */}
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center cursor-pointer border border-gray-200 hover:bg-gray-50 transition duration-150"
        >
          <ArrowRight className="h-5 w-5 text-blue-600" />
        </button>

      </div>
    </div>
  );
};

export default Stories;
