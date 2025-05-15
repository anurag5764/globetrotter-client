// components/FeedbackPopup.jsx
import React, { useEffect } from 'react';
import Confetti from 'react-confetti';

const FeedbackPopup = ({ isCorrect, destination, onNext }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      {isCorrect && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full transform transition-all animate-[fadeIn_0.3s_ease-out]">
        <div className="text-center mb-4">
          {isCorrect ? (
            <h2 className="text-2xl font-bold text-green-500">🎉 Correct!</h2>
          ) : (
            <h2 className="text-2xl font-bold text-red-500">😢 Not quite!</h2>
          )}
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold text-center mb-3">{destination.name}</h3>
          <p className="text-gray-700 mb-4">{isCorrect ? destination.correctFact : destination.incorrectFact}</p>
          
          {destination.funFacts && destination.funFacts.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">Fun Fact</h4>
              <p className="text-gray-700">{destination.funFacts[0]}</p>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <button 
            className="btn-primary"
            onClick={onNext}
          >
            Next Destination
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPopup;