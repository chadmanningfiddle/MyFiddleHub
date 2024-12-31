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
import React, { useState } from 'react';
import MondayCard from './MondayCard';

export default function MondaySchedule() {
  const [selectedClasses, setSelectedClasses] = useState([]);
  
  const classes = [
    {
      id: 1,
      title: "Old Time Fiddle Tune Groove",
      time: "9:00 AM - 9:50 AM",
      currentStudents: 15
    },
    {
      id: 2,
      title: "Twin Fiddling",
      time: "10:00 AM - 10:50 AM",
      currentStudents: 20
    },
    {
      id: 3,
      title: "Swing Time",
      time: "11:00 AM - 11:50 AM",
      currentStudents: 12
    },
    {
      id: 4,
      title: "Contemporary Fiddle Tunes",
      time: "12:00 PM - 12:50 PM",
      currentStudents: 18
    },
    {
      id: 5,
      title: "Bluegrass Fiddle Tunes: The Classics",
      time: "1:00 PM - 1:50 PM",
      currentStudents: 22
    },
    {
      id: 6,
      title: "The Bluegrass Jam",
      time: "2:00 PM - 2:50 PM",
      currentStudents: 16
    }
  ];

  const toggleClass = (classId) => {
    setSelectedClasses(prev => {
      if (prev.includes(classId)) {
        return prev.filter(id => id !== classId);
      }
      return [...prev, classId];
    });
  };

  const getClassPrice = (count) => count >= 4 ? 20 : 25;

  const totalPrice = selectedClasses.length * getClassPrice(selectedClasses.length);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Monday Group Classes</h1>
      
      {selectedClasses.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-xl text-blue-600 font-medium">
            Total: ${totalPrice} ({selectedClasses.length} classes at ${getClassPrice(selectedClasses.length)} each)
          </p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {classes.map((classItem) => (
          <MondayCard
            key={classItem.id}
            title={classItem.title}
            time={classItem.time}
            currentStudents={classItem.currentStudents}
            price={getClassPrice(selectedClasses.length)}
            isSelected={selectedClasses.includes(classItem.id)}
            onSelect={() => toggleClass(classItem.id)}
          />
        ))}
      </div>
    </div>
  );
}