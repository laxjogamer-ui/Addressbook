import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  return (
    <div className="flex min-h-screen ">


      <Sidebar onToggle={setIsSidebarOpen} />

      {/* 2. Main Content */}
      <div
        className={`flex-1 p-8 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'md:ml-64' : 'ml-0'} 
        `}
      >


        {/* 3. Center Content Wrapper */}
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Layout;