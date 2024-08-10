import React from "react";
import { Plus, Search, Book, Brain, Pencil, User } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Book className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-semibold">Flashify</h1>
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

      <main className="max-w-5xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Create Flashcards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button className="flex items-center justify-center space-x-3 bg-blue-50 hover:bg-blue-100 text-blue-700 p-6 rounded-lg transition">
              <Brain className="w-6 h-6" />
              <span>Create with AI</span>
            </button>
            <button className="flex items-center justify-center space-x-3 bg-green-50 hover:bg-green-100 text-green-700 p-6 rounded-lg transition">
              <Pencil className="w-6 h-6" />
              <span>Create Manually</span>
            </button>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recent Flashcards</h2>
            <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
              <Plus className="w-5 h-5" />
              <span>New Set</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {["JavaScript Basics", "World Capitals", "Biology Terms"].map(
              (deck) => (
                <div
                  key={deck}
                  className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                >
                  <h3 className="font-medium mb-1">{deck}</h3>
                  <p className="text-sm text-gray-500">20 cards</p>
                </div>
              )
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
