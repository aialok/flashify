import HomePage from "./pages/Home";
import CreateFlashCard from "./pages/CreateFlashCard";
import Navbar from "./components/Navbar";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Layout from "./pages/Layout";
import FlashcardPackPage from "./components/FlashCardPackPage";
import AIFlashcardGenerator from "./components/AIFlashCardGenerator";
function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="create-flashcard" element={<CreateFlashCard />} />
            <Route path="/flashcard-pack/:id" element={<FlashcardPackPage/>} />
            <Route path="/ai-generator" element={<AIFlashcardGenerator/>} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
