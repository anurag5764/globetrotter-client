// components/Clue.jsx
import React from 'react';

const Clue = ({ clue, index }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
      <h3 className="text-lg font-semibold text-primary mb-2">Clue #{index + 1}</h3>
      <p className="text-gray-700 italic">{clue}</p>
    </div>
  );
};

export default Clue;