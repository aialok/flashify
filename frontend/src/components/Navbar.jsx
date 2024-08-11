import React from "react";
import { StickerIcon, User } from "lucide-react";
function Navbar() {
  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <StickerIcon className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-semibold tracking-wider">Flashify</h1>
        </div>
        <nav className="flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            My Cards
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Create
          </a>
          <User className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
