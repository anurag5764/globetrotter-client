// components/ScoreBoard.jsx
import React from 'react';

const ScoreBoard = ({ score }) => {
  const { correct, incorrect, total } = score;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold text-center mb-3">Your Score</h3>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-green-100 p-2 rounded">
          <p className="text-sm text-gray-600">Correct</p>
          <p className="text-2xl font-bold text-green-600">{correct}</p>
        </div>
        <div className="bg-red-100 p-2 rounded">
          <p className="text-sm text-gray-600">Incorrect</p>
          <p className="text-2xl font-bold text-red-600">{incorrect}</p>
        </div>
        <div className="bg-blue-100 p-2 rounded">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold text-blue-600">{total}</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;