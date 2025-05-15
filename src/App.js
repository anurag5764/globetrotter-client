// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import PlayPage from "./pages/PlayPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/play" element={<PlayPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
          </Routes>
        </main>
        <footer className="bg-dark text-white text-center p-4 mt-12">
          <p>Globetrotter - The Ultimate Travel Guessing Game</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
