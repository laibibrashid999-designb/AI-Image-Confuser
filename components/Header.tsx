
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-4 border-b border-gray-700/50 shadow-md bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
        <h1 className="text-2xl font-bold text-gray-100 tracking-tight">
          Microprint <span className="text-cyan-400">Image Editor</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
