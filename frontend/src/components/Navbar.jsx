import React from "react";
import { StickerIcon, User, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <StickerIcon className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Flashify</h1>
            </Link>
          </div>
          <nav className="flex items-center space-x-6">
            <Link
              to="/create-flashcard"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Create
            </Link>
            <Link
              to="/ai-generator"
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center space-x-1 max-sm:hidden"
            >
              <Plus className="w-5 h-5" />
              <span>AI Generator</span>
            </Link>
            <button className="text-gray-600 hover:text-blue-600">
              <Search className="w-6 h-6" />
            </button>
            <button className="text-gray-600 hover:text-blue-600">
              <User className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
