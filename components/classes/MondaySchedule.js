import React, { useState } from 'react';
import CalendarView from './CalendarView';

export default function MondaySchedule() {
  const [view, setView] = useState('calendar');
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Monday Group Classes</h1>
      <CalendarView 
        onDateSelect={(date) => console.log('Selected:', date)}
        currentMonth={new Date(2024, 11)} // Set to December 2024
      />
    </div>
  );
}