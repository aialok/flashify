import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { useParams } from "react-router-dom";
import axios from "axios";

function FlashcardComponent({
  currentCardIndex,
  isFlipped,
  setIsFlipped,
  cards,
}) {
  //   const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="">
      {/* // <h1 className="text-2xl font-bold mb-8">JavaScript basic</h1> */}
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div
          className="rounded-lg shadow-lg p-6 cursor-pointer flex flex-col items-center justify-center min-h-[50vh] bg-gray-100 mb-10"
          onClick={handleFlip}
        >
          <p className="text-lg text-center">
            {cards[currentCardIndex].question}
          </p>
        </div>
        <div
          className="rounded-lg shadow-lg p-6 cursor-pointer flex flex-col items-center justify-center  min-h-[50vh] bg-gray-100  mb-10"
          onClick={handleFlip}
        >
          <p className="text-lg text-center">
            {cards[currentCardIndex].answer}
          </p>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default FlashcardComponent;
