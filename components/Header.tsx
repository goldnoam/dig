
import React from 'react';

const Header = (): React.JSX.Element => {
  return (
    <header className="w-full text-center p-4">
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          Dig It!
        </span>
      </h1>
    </header>
  );
};

export default Header;
