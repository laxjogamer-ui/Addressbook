// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const Sidebar = () => {
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false); // Mobile Menu State

//   // જ્યારે પેજ બદલાય ત્યારે મોબાઈલમાં સાઈડબાર આપોઆપ બંધ થવું જોઈએ
//   useEffect(() => {
//     setIsOpen(false);
//   }, [location.pathname]);

//   // Active Link Style Helper
//   const getLinkClass = (path) => {
//     // જો ડેશબોર્ડ હોય તો exact match ચેક કરો, નહીંતર startsWith વાપરો
//     const isActive = path === '/'
//       ? location.pathname === '/'
//       : location.pathname.startsWith(path);

//     return isActive
//       ? "flex items-center gap-3 bg-blue-700 text-white p-3 rounded-xl transition-all shadow-md"
//       : "flex items-center gap-3 text-gray-400 hover:bg-gray-800 hover:text-white p-3 rounded-xl transition-all";
//   };

//   return (
//     <>
//       {/* 1. Mobile Menu Button (Hamburger) - Only visible on small screens */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-md md:hidden shadow-lg border border-gray-700"
//       >
//         {isOpen ? (
//           // Close Icon (X)
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
//           </svg>
//         ) : (
//           // Menu Icon (Hamburger)
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//           </svg>
//         )}
//       </button>

//       {/* 2. Overlay (Backdrop) - Only visible on mobile when sidebar is open */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
//           onClick={() => setIsOpen(false)}
//         ></div>
//       )}

//       {/* 3. Sidebar Container */}
//       <div className={`
//         fixed top-0 left-0 h-screen w-64 bg-gray-900 border-r border-gray-800 
//         flex flex-col justify-between p-5 z-50 transition-transform duration-300 ease-in-out
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
//       `}>

//         {/* --- Logo Section --- */}
//         <div>
//           <div className="flex items-center justify-between mb-10 px-2">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
//                 DC
//               </div>
//               <h1 className="text-xl font-bold text-white tracking-wide">
//                 Digital Cards
//               </h1>
//             </div>

//             {/* Close Button inside Sidebar (Optional for Mobile) */}
//             <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-white">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           {/* --- Navigation Links --- */}
//           <nav className="space-y-2">

//             {/* All Cards (Home) */}
//             <Link to="/" className={getLinkClass('/')}>
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
//               </svg>
//               <span className="font-medium">All Cards</span>
//             </Link>

//             {/* Create New */}
//             <Link to="/create" className={getLinkClass('/create')}>
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//               </svg>
//               <span className="font-medium">Create New</span>
//             </Link>

//             {/* List View */}
//             <Link to="/list" className={getLinkClass('/list')}>
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 17.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
//               </svg>
//               <span className="font-medium">List View</span>
//             </Link>
//           </nav>
//         </div>

//         {/* --- Bottom Profile Section --- */}
//         <div className="border-t border-gray-800 pt-6">
//           <div className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-xl cursor-pointer transition">
//             <img
//               src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff"
//               alt="Profile"
//               className="w-10 h-10 rounded-full"
//             />
//             <div>
//               <p className="text-sm font-semibold text-white">Admin User</p>
//               <p className="text-xs text-gray-500">View Profile</p>
//             </div>
//           </div>
//         </div>

//       </div>
//     </>
//   );
// };

// export default Sidebar;





import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ onToggle }) => {
  const location = useLocation();

  // શરૂઆતમાં Desktop પર Open રહેશે, Mobile પર Closed રહેશે
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);

  // જ્યારે Screen Resize થાય ત્યારે Responsive વર્તન માટે
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // મોબાઈલમાં જ્યારે લિંક પર ક્લિક કરો ત્યારે મેનુ બંધ થઈ જવું જોઈએ
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  // આ ફંક્શન Parent Component ને જાણ કરશે કે સાઈડબાર ખુલ્લું છે કે બંધ (Layout સેટ કરવા માટે)
  useEffect(() => {
    if (onToggle) {
      onToggle(isOpen);
    }
  }, [isOpen, onToggle]);

  // Active Link Style Helper
  const getLinkClass = (path) => {
    const isActive = path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path);

    return isActive
      ? "flex items-center gap-3 bg-blue-700 text-white p-3 rounded-xl transition-all shadow-md"
      : "flex items-center gap-3 text-gray-400 hover:bg-gray-800 hover:text-white p-3 rounded-xl transition-all";
  };

  return (
    <>
      {/* 1. Toggle Button - હવે Mobile અને Desktop બંનેમાં દેખાશે */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-md shadow-lg border border-gray-700 hover:bg-gray-800 transition-colors"
        title={isOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        {isOpen ? (
          // Close Icon (X)
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          // Menu Icon (Hamburger)
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

      {/* 2. Overlay (Backdrop) - મોબાઈલ માટે જ (Desktop પર જરૂર નથી) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* 3. Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-screen w-64 bg-gray-900 border-r border-gray-800 
        flex flex-col justify-between p-5 z-40 transition-transform duration-300 ease-in-out pt-20
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* pt-20 આપ્યું છે કારણ કે બટન હવે ઉપર ફિક્સ છે */}

        {/* --- Logo Section --- */}
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              DC
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              Digital Cards
            </h1>
          </div>

          {/* --- Navigation Links --- */}
          <nav className="space-y-2">
            {/* All Cards (Home) */}
            <Link to="/" className={getLinkClass('/')}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
              </svg>
              <span className="font-medium">All Cards</span>
            </Link>

            {/* Create New */}
            <Link to="/create" className={getLinkClass('/create')}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="font-medium">Create New</span>
            </Link>

            {/* List View */}
            <Link to="/list" className={getLinkClass('/list')}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 17.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span className="font-medium">List View</span>
            </Link>
          </nav>
        </div>

        {/* --- Bottom Profile Section --- */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-xl cursor-pointer transition">
            <img
              src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold text-white">Admin User</p>
              <p className="text-xs text-gray-500">View Profile</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Sidebar;