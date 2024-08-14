import React, { useEffect, useState } from "react";
import { Brain, Pencil, ArrowRight, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";
const HomePage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Flashify - Home";
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/packs`
      );

      /* Removing this because this causes too much request to backend */

      // const flashcardsWithLength = await Promise.all(
      //   response.data.data.map(async (pack) => {
      //     const packLengthResponse = await axios.get(
      //       `${import.meta.env.VITE_BACKEND_URI}/api/v1/pack-length/${pack.id}`
      //     );
      //     return { ...pack, length: packLengthResponse.data.data };
      //   })
      // );

      // sort flashcards by id in descending order
      const flashcardsPack = response.data.data.sort((a, b) => b.id - a.id);
      setFlashcards(flashcardsPack);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
      toast.error(error.response?.data?.message || "Error fetching flashcards");
    } finally {
      setLoading(false);
    }
  };

  const deletePack = async (id) => {
    try {
      const response = axios
        .delete(`${import.meta.env.VITE_BACKEND_URI}/api/v1/pack/${id}`)
        .then(() => fetchFlashcards());
      toast.promise(response, {
        loading: "Deleting pack...",
        success: "Pack deleted successfully",
        error: "Failed to delete pack",
      });
    } catch (error) {
      toast.error("Failed to delete pack : " + error.message);
    }
  };

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
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900">
              Recent Flashcards
            </h2>
            <Link
              to="/create-flashcard"
              className="bg-blue-600 text-white font-semibold py-2 px-4 sm:px-6 rounded-full hover:bg-blue-700 transition duration-300 flex items-center space-x-2 text-sm sm:text-base"
            >
              <Plus className="w-5 h-5" />
              <span>New Set</span>
            </Link>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashcards.map((deck) => (
                <div
                  key={deck.id}
                  className="flex flex-col justify-between bg-white border rounded-xl p-6 hover:shadow-lg transition duration-300"
                >
                  <h3 className="font-semibold text-xl mb-2">{deck.name}</h3>
                  {/* <p className="text-gray-600 mb-4">{deck.length || 0} cards</p> */}
                  <div className="flex justify-between items-center text-blue-600">
                    <Link to={`/flashcard-pack/${deck.id}`}>
                      <span className="flex items-center">
                        View Pack <ArrowRight className="w-5 h-5 ml-2" />
                      </span>
                    </Link>
                    <button
                      onClick={() => deletePack(deck.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
