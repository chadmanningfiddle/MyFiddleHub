import React, { useState } from 'react';
import MondayCard from './MondayCard';
import CalendarView from './CalendarView';

export default function MondaySchedule() {
  const [view, setView] = useState('list'); // 'list' or 'calendar'
  // ... rest of your existing code ...

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Monday Group Classes</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            List View
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`px-4 py-2 rounded ${view === 'calendar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Calendar View
          </button>
        </div>
      </div>

      {view === 'list' ? (
        // Your existing list view code
        <div className="grid gap-6 md:grid-cols-2">
          {/* ... existing cards ... */}
        </div>
      ) : (
        <CalendarView />
      )}
    </div>
  );
}