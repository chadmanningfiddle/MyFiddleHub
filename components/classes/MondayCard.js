import React from 'react';

export default function MondayCard({ 
  title, 
  time, 
  currentStudents = 0, 
  maxStudents = 25, 
  price = 25,
  isSelected = false,
  onSelect 
}) {
  return (
    <div 
      onClick={onSelect}
      className={`
        p-6 rounded-xl cursor-pointer transition-all
        ${isSelected ? 'bg-blue-50 shadow-lg ring-2 ring-blue-400' : 'bg-white shadow hover:shadow-md'}
        border-2 border-blue-100
      `}
    >
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-lg text-gray-600 mt-2">{time}</p>
      <p className="text-lg font-medium text-blue-600 mt-2">${price}</p>
      
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          {currentStudents} / {maxStudents} students enrolled
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div 
            className="bg-green-500 rounded-full h-2 transition-all"
            style={{
              width: `${(currentStudents / maxStudents) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
}