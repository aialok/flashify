import React, { useState } from "react";
import { Upload, FileText, Image, Video, Settings, ArrowRight } from "lucide-react";

function AIFlashcardGenerator() {
  const [activeTab, setActiveTab] = useState("text");

  const tabs = [
    { id: "text", label: "Text", icon: FileText },
    { id: "document", label: "Document", icon: Upload },
    { id: "image", label: "Image", icon: Image },
    { id: "video", label: "Video", icon: Video },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Flashcard Generator</h1>
        <p className="text-gray-600 mb-8">
          Upload a document, paste your notes, or select an image/video to automatically generate flashcards with AI.
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
              ></textarea>
            )}
            {activeTab === "document" && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Drag and drop a document or click to upload</p>
              </div>
            )}
            {activeTab === "image" && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Drag and drop an image or click to upload</p>
              </div>
            )}
            {activeTab === "video" && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Drag and drop a video or click to upload</p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">0/20,000 characters</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center">
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