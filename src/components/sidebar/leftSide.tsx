

import React from 'react';
import Image from 'next/image';
import { Book, Bookmark, Compass, Settings, Users, Gamepad2, Zap, LayoutList, Calendar, LucideIcon } from 'lucide-react';


const DUMMY_IMAGE_SRC = '/dummy-avatar.jpg'; 
const DUMMY_EVENT_IMAGE = '/dummy-event-image.jpg'; 



interface SingleSidebarItemProps {
  Icon: LucideIcon;
  label: string;
  isNew?: boolean; 
}


const SingleSidebarItem: React.FC<SingleSidebarItemProps> = ({ Icon, label, isNew = false }) => {
  return (
  
    <div 
      className="flex items-center space-x-3 p-3 text-gray-700 rounded-lg cursor-pointer transition duration-150 ease-in-out 
               hover:bg-blue-50 hover:text-blue-600 hover:border-l-4 hover:border-blue-500"
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="text-base font-medium flex-1">
        {label}
      </span>
      {isNew && (
        <span className="text-xs font-semibold px-2 py-0.5 bg-green-100 text-green-600 rounded-full">
          New
        </span>
      )}
    </div>
  );
};


// ---------------------------------------------
// 2. Main Sidebar Component (Static Data Included)
// ---------------------------------------------

const Sidebar: React.FC = () => {
  
  // --- EXPLORE Section Data (Static) ---
  const exploreItems = [
    { Icon: Compass, label: "Learning", isNew: true },
    { Icon: LayoutList, label: "Insights" },
    { Icon: Users, label: "Find friends" },
    { Icon: Bookmark, label: "Bookmarks" },
    { Icon: Book, label: "Group" },
    { Icon: Gamepad2, label: "Gaming", isNew: true },
    { Icon: Settings, label: "Settings" },
    { Icon: Zap, label: "Save post" },
  ];

  // --- SUGGESTED PEOPLE  ---
  const suggestedPeople = [
    { name: "Steve Jobs", title: "CEO of Apple", imgSrc: DUMMY_IMAGE_SRC },
    { name: "Ryan Roslansky", title: "CEO of LinkedIn", imgSrc: DUMMY_IMAGE_SRC },
    { name: "Dylan Field", title: "CEO of Figma", imgSrc: DUMMY_IMAGE_SRC },
  ];

  // --- EVENTS Section---
  const events = [
    { date: "10 Jul", title: "No more terrorism no more cry", attendees: 17, imgSrc: DUMMY_EVENT_IMAGE },
    { date: "10 Jul", title: "No more terrorism no more cry", attendees: 17, imgSrc: DUMMY_EVENT_IMAGE },
  ];

  return (
    // w-72 
    <div className="w-72 flex-shrink-0 bg-white border-r border-gray-100 p-4 space-y-6">
      
      {/* EXPLORE Section */}
      <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Explore</h3>
        <div className="space-y-1">
          {exploreItems.map((item) => (
            // Inline SingleSidebarItem 
            <SingleSidebarItem 
              key={item.label} 
              Icon={item.Icon} 
              label={item.label} 
              isNew={item.isNew} 
            />
          ))}
        </div>
      </section>

      {/* SUGGESTED PEOPLE */}
      <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Suggested People</h3>
          <button className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">See All</button>
        </div>
        
        <div className="space-y-3">
          {suggestedPeople.map((person, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition duration-150 cursor-pointer">
              <div className="flex items-center space-x-3">
                {/* Demo Image/Avatar */}
                <div className="relative h-10 w-10">
                    <Image 
                        src={person.imgSrc} 
                        alt={person.name} 
                        layout="fill" 
                        objectFit="cover" 
                        className="rounded-full"
                    />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{person.name}</p>
                  <p className="text-xs text-gray-500">{person.title}</p>
                </div>
              </div>
              <button className="text-black-600 hover:text-white hover:bg-blue-400 text-sm font-medium border border-blue-200 px-3 py-1 -full hover:bg-blue-50 transition duration-150 cursor-pointer">
                Connect
              </button>
            </div>
          ))}
        </div>
      </section>

      {/*EVENTS Section */}
      <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Events</h3>
          <button className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">See All</button>
        </div>

        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="space-y-2 pb-2 border-b last:border-b-0">
              <div className="relative w-full h-28 rounded-lg overflow-hidden">
                {/* Demo Event*/}
                <Image 
                    src={event.imgSrc} 
                    alt={event.title} 
                    layout="fill" 
                    objectFit="cover" 
                />
              </div>
              
              {/* Event Details */}
              <div className="flex items-start space-x-3">
                {/* Date Tag */}
                <div className="flex flex-col items-center p-2 bg-[#20c997] rounded-lg text-white font-bold w-12 flex-shrink-0">
                  <Calendar className="h-4 w-4 mb-1 " />
                  <span className="text-xs leading-none font-bold">{event.date.split(' ')[0]}</span>
                  <span className="text-xs leading-none font-bold">{event.date.split(' ')[1]}</span>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                
                </div>
                
              </div>
               <div className='flex justify-between'>
                     <p className="text-xs text-gray-500 mt-4">{event.attendees} People Going</p>
                  <button className="mt-2 text-blue-600 text-sm font-medium border border-blue-200 px-3 py-1  hover:bg-blue-50 transition duration-150 cursor-pointer">
                    Going
                  </button>
                    </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Sidebar;