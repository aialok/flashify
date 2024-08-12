import HomePage from "./pages/Home";
import CreateFlashCard from "./components/CreateFlashCard";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import FlipCardComponent from "./components/FlipCardComponent";
import FlashcardPackPage from "./components/FlashCardPackPage";
import AIFlashcardGenerator from "./components/AIFlashCardGenerator";
import EditFlashcardPack from "./components/EditFlashCard";
function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="create-flashcard" element={<CreateFlashCard />} />
            <Route path="/flashcard-pack/:id" element={<FlashcardPackPage />} />
            <Route path="/ai-generator" element={<AIFlashcardGenerator />} />
            <Route path="/test" element={<FlipCardComponent />} />
            <Route path="/flashcard-pack/:id" element={<FlashcardPackPage />} />
            <Route path="/edit-pack/:id" element={<EditFlashcardPack />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
