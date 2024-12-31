import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isMonday, isTuesday, isWednesday, isThursday, isFriday } from 'date-fns';

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getLessonType = (date) => {
    if (isMonday(date)) return { type: 'Group Classes', color: 'bg-green-100 text-green-800' };
    if (isWednesday(date)) return { type: 'Private Lessons (30min)', color: 'bg-purple-100 text-purple-800' };
    if (isTuesday(date) || isThursday(date) || isFriday(date)) {
      return { type: 'Private Lessons', color: 'bg-blue-100 text-blue-800' };
    }
    return null;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-2 rounded hover:bg-gray-100"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="p-2 rounded hover:bg-gray-100"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p-2 rounded hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-gray-50 p-4 text-center font-semibold">
            {day}
          </div>
        ))}
        
        {monthDays.map((day, index) => {
          const lessonInfo = getLessonType(day);
          return (
            <div
              key={day.toString()}
              className={`
                min-h-[120px] bg-white p-4 relative
                ${!isSameMonth(day, currentMonth) ? 'text-gray-400' : ''}
              `}
            >
              <span className="text-sm font-medium">
                {format(day, 'd')}
              </span>
              {lessonInfo && (
                <div className={`mt-2 p-1 rounded text-xs ${lessonInfo.color}`}>
                  {lessonInfo.type}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}