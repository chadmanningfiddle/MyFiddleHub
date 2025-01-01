import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isMonday, isTuesday, isWednesday, isThursday, isFriday } from 'date-fns';

export default function CalendarView({ onDateSelect, currentMonth: initialMonth = new Date() }) {
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [selectedDate, setSelectedDate] = useState(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getLessonType = (date) => {
    if (isMonday(date)) {
      return { 
        type: 'Group Classes', 
        color: 'bg-green-100 text-green-800', 
        slots: getMondaySlots(date) 
      };
    }
    if (isWednesday(date)) {
      return { 
        type: 'Private Lessons (30min)', 
        color: 'bg-purple-100 text-purple-800', 
        slots: getWednesdaySlots(date) 
      };
    }
    if (isTuesday(date) || isThursday(date) || isFriday(date)) {
      return { 
        type: 'Private Lessons', 
        color: 'bg-blue-100 text-blue-800', 
        slots: getRegularSlots(date) 
      };
    }
    return null;
  };

  const getMondaySlots = (date) => [
    { time: '9:00 AM', title: 'Old Time Fiddle Tune Groove' },
    { time: '10:00 AM', title: 'Twin Fiddling' },
    { time: '11:00 AM', title: 'Swing Time' },
    { time: '12:00 PM', title: 'Contemporary Fiddle Tunes' },
    { time: '1:00 PM', title: 'Bluegrass Fiddle Tunes: The Classics' },
    { time: '2:00 PM', title: 'The Bluegrass Jam' }
  ];

  const getRegularSlots = (date) => {
    const slots = [];
    for (let hour = 8; hour <= 15; hour++) {
      slots.push({
        time: `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`,
        title: 'Private Lesson'
      });
    }
    return slots;
  };

  const getWednesdaySlots = (date) => {
    const slots = [];
    for (let hour = 7; hour <= 14; hour++) {
      slots.push({
        time: `${hour > 12 ? hour - 12 : hour}:30 ${hour >= 12 ? 'PM' : 'AM'}`,
        title: 'Private Lesson (30min)'
      });
    }
    return slots;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="h-12 flex items-center justify-center font-semibold bg-gray-50">
            {day}
          </div>
        ))}
        
        {monthDays.map((day) => {
          const lessonInfo = getLessonType(day);
          const isSelected = selectedDate && format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
          
          return (
            <div
              key={day.toString()}
              onClick={() => {
                setSelectedDate(day);
                if (lessonInfo) {
                  onDateSelect({ date: day, ...lessonInfo });
                }
              }}
              className={`
                min-h-[100px] p-2 relative border border-gray-200
                ${!isSameMonth(day, currentMonth) ? 'bg-gray-50 text-gray-400' : 'bg-white'}
                ${isSelected ? 'ring-2 ring-blue-500' : ''}
                hover:bg-gray-50 cursor-pointer
              `}
            >
              <span className="text-sm font-medium">
                {format(day, 'd')}
              </span>
              {lessonInfo && (
                <div className={`mt-1 p-1 rounded text-xs ${lessonInfo.color}`}>
                  {lessonInfo.type}
                </div>
              )}
              {isSelected && lessonInfo && (
                <div className="absolute top-full left-0 right-0 z-10 bg-white shadow-lg rounded-lg p-4 mt-2 border">
                  <h3 className="font-semibold mb-2">Available Times</h3>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {lessonInfo.slots.map((slot, index) => (
                      <div 
                        key={index}
                        className="p-2 hover:bg-gray-100 rounded cursor-pointer text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDateSelect({ date: day, time: slot.time, title: slot.title });
                        }}
                      >
                        {slot.time} - {slot.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}