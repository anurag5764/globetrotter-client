// components/AnswerOptions.jsx
import React from 'react';

const AnswerOptions = ({ options, onAnswer }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-center mb-4">Where am I?</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            className="bg-white hover:bg-blue-50 border-2 border-gray-300 hover:border-primary rounded-lg py-3 px-4 text-gray-800 font-medium transition-all transform hover:scale-105"
            onClick={() => onAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnswerOptions;