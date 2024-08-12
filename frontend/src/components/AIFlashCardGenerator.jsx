import React, { useState } from "react";
import { Upload, FileText, Image, Settings, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";

function AIFlashcardGenerator() {
  const [activeTab, setActiveTab] = useState("text");
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: "text", label: "Text", icon: FileText },
    { id: "document", label: "Document", icon: Upload },
    { id: "image", label: "Image", icon: Image },
  ];

  const generateFlashCardHandler = async () => {
    setLoading(true);
    try {
      if (activeTab === "text") {
        const response = axios
          .post(`${import.meta.env.VITE_BACKEND_URI}/api/v1/generate-ai`, {
            prompt,
          })
          .then((response) => {
            navigate(`/flashcard-pack/${response.data.data}`);
            setLoading(false);
          });

        toast.promise(response, {
          loading: "Generating flashcards...",
          success: "Flashcards generated successfully",
          error: "Failed to generate flashcards",
        });
      }
    } catch (error) {
      toast.error("Failed to generate flashcards: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Flashcard Generator
        </h1>
        <p className="text-gray-600 mb-8">
          Upload a document, paste your notes, or select an image/video to
          automatically generate flashcards with AI.
        </p>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <tab.icon className="w-5 h-5 inline-block mr-1" />
                  {tab.label}
                </button>
              ))}
            </div>
            <button className="text-blue-600 hover:text-blue-800">
              <Settings className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6">
            {activeTab === "text" && (
              <textarea
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Paste in your notes or other content"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              ></textarea>
            )}
            {activeTab === "document" && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Coming soon! Upload a document to generate flashcards
                </p>
              </div>
            )}
            {activeTab === "image" && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Coming soon! Upload an image or video to generate flashcards
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">{prompt.length}/10,000</p>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center"
              onClick={generateFlashCardHandler}
            >
              Generate Flashcards
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIFlashcardGenerator;
