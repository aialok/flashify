import React, { useEffect, useState } from "react";
import { Plus, Brain, Pencil, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    document.title = "Flashify - Home";
    fetch("http://localhost:3000/api/v1/packs")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFlashcards(data.data);
      });
  }, []);

  return (
    <div className="min-h-screen text-gray-800 bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Create Flashcards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              to="/ai-generator"
              className="flex items-center justify-between bg-blue-600 hover:bg-blue-700 text-white p-8 rounded-xl transition duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center space-x-4">
                <Brain className="w-10 h-10" />
                <div>
                  <h3 className="text-xl font-semibold">Create with AI</h3>
                  <p className="text-blue-100">
                    Generate flashcards automatically
                  </p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              to="/create-flashcard"
              className="flex items-center justify-between bg-green-600 hover:bg-green-700 text-white p-8 rounded-xl transition duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center space-x-4">
                <Pencil className="w-10 h-10" />
                <div>
                  <h3 className="text-xl font-semibold">Create Manually</h3>
                  <p className="text-green-100">Design your own flashcards</p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Recent Flashcards
            </h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>New Set</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcards.map((deck, index) => (
              <Link
                to={`/flashcard-pack/${index + 1}`}
                key={index}
                className="bg-white border rounded-xl p-6 hover:shadow-lg transition duration-300 cursor-pointer"
              >
                <h3 className="font-semibold text-xl mb-2">{deck.name}</h3>
                <p className="text-gray-600 mb-4">20 cards</p>
                <div className="flex justify-between items-center text-blue-600">
                  <span>View Pack</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
