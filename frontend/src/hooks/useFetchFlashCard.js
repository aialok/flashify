import { useState, useEffect } from "react";
import axios from "axios";

const useFetchFlashCard = (id) => {
  const [flashCards, setFlashCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [packName, setPackName] = useState("");

  useEffect(() => {
    const fetchFlashCards = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/flashcards/pack/${id}`);
        const cardsData = response.data.data.map((card) => {
          return {
            question: card.question,
            answer: card.answer,
            id: card.id
          };
        });

        setPackName(response.data.data[0].Pack.name);
        setFlashCards(cardsData);
      } catch (error) {
        console.error("Error fetching flashcard pack:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashCards();
  }, [id]);

  return { flashCards, loading, packName };
};

export default useFetchFlashCard;
