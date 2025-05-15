// pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-primary">Globe</span>
          <span className="text-secondary">trotter</span>
        </h1>
        <p className="text-2xl text-gray-700 mb-8">
          The Ultimate Travel Guessing Game
        </p>
        <p className="text-gray-600 mb-10">
          Test your knowledge of world-famous destinations with cryptic clues. 
          Guess correctly to unlock fascinating facts about each location!
        </p>
        
        <Link 
          to="/play" 
          className="btn-primary text-lg py-3 px-8"
        >
          Start Playing
        </Link>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <div className="card p-6 text-center">
          <div className="text-3xl mb-4">🧩</div>
          <h3 className="text-xl font-semibold mb-2">Solve Clues</h3>
          <p className="text-gray-600">Decipher cryptic hints about famous places around the world.</p>
        </div>
        
        <div className="card p-6 text-center">
          <div className="text-3xl mb-4">🌍</div>
          <h3 className="text-xl font-semibold mb-2">Learn Facts</h3>
          <p className="text-gray-600">Discover interesting trivia about each destination.</p>
        </div>
        
        <div className="card p-6 text-center">
          <div className="text-3xl mb-4">👥</div>
          <h3 className="text-xl font-semibold mb-2">Challenge Friends</h3>
          <p className="text-gray-600">Share your score and compete with friends.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;