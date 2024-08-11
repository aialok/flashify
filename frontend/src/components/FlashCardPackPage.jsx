import React, { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCw, Pencil } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const FlashcardPackPage = () => {
  const { id } = useParams();
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Mock data - replace with actual data fetching logic
  const flashcardPack = {
    name: "JavaScript Basics",
    cards: [
      { front: "What is a variable?", back: "A container for storing data values." },
      { front: "What is a function?", back: "A block of code designed to perform a particular task." },
      { front: "What is an array?", back: "A special variable, which can hold more than one value at a time." },
    ],
  };

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcardPack.cards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcardPack.cards.length) % flashcardPack.cards.length);
    setIsFlipped(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold mb-8 text-gray-900">{flashcardPack.name}</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div 
            className={`bg-gray-100 h-64 flex items-center justify-center rounded-lg mb-6 cursor-pointer transition-transform duration-500 transform ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="text-center px-4">
              <p className="text-xl font-semibold">
                {isFlipped 
                  ? flashcardPack.cards[currentCard].back
                  : flashcardPack.cards[currentCard].front
                }
              </p>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button onClick={prevCard} className="text-blue-600 hover:text-blue-800">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="text-gray-600">
              {currentCard + 1} / {flashcardPack.cards.length}
            </div>
            <button onClick={nextCard} className="text-blue-600 hover:text-blue-800">
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center">
            <RotateCw className="w-5 h-5 mr-2" />
            Shuffle
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300 flex items-center">
            <Pencil className="w-5 h-5 mr-2" />
            Edit Pack
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardPackPage;