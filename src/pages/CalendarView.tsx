import React, { useMemo, useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { useStore } from '../store/useStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const feedingEntries = useStore((state) => state.feedingEntries);
  const activityEntries = useStore((state) => state.activityEntries);
  const sleepEntries = useStore((state) => state.sleepEntries);
  const bowelEntries = useStore((state) => state.bowelEntries);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const entriesByDate = useMemo(() => {
    const entries: Record<string, { feeding: number; activity: number; sleep: number; bowel: number }> = {};
    
    daysInMonth.forEach(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      entries[dateStr] = {
        feeding: feedingEntries.filter(e => isSameDay(new Date(e.timestamp), day)).length,
        activity: activityEntries.filter(e => isSameDay(new Date(e.timestamp), day)).length,
        sleep: sleepEntries.filter(e => isSameDay(new Date(e.startTime), day)).length,
        bowel: bowelEntries.filter(e => isSameDay(new Date(e.timestamp), day)).length
      };
    });

    return entries;
  }, [daysInMonth, feedingEntries, activityEntries, sleepEntries, bowelEntries]);

  const previousMonth = () => {
    setCurrentDate(date => new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(date => new Date(date.getFullYear(), date.getMonth() + 1));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-navy">Calendar View</h1>
        <div className="flex items-center space-x-4">
          <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="h-5 w-5 text-navy" />
          </button>
          <span className="text-lg font-medium">
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronRight className="h-5 w-5 text-navy" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {daysInMonth.map(day => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const entries = entriesByDate[dateStr];
          const isToday = isSameDay(day, new Date());
          const hasEntries = entries && Object.values(entries).some(count => count > 0);
          
          return (
            <Link
              key={dateStr}
              to={`/logs?date=${dateStr}`}
              className={`card min-h-[120px] transition-all duration-200 ${
                isToday ? 'ring-2 ring-primary' : ''
              } ${
                hasEntries 
                  ? 'hover:shadow-md hover:scale-105 cursor-pointer' 
                  : 'hover:bg-gray-50 cursor-pointer'
              }`}
            >
              <div className="text-right text-sm text-gray-600 mb-2">
                {format(day, 'd')}
              </div>
              {entries && (
                <div className="space-y-1 text-xs">
                  {entries.feeding > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-primary">Feedings</span>
                      <span className="font-medium">{entries.feeding}</span>
                    </div>
                  )}
                  {entries.activity > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">Activities</span>
                      <span className="font-medium">{entries.activity}</span>
                    </div>
                  )}
                  {entries.sleep > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-navy">Sleep</span>
                      <span className="font-medium">{entries.sleep}</span>
                    </div>
                  )}
                  {entries.bowel > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Diapers</span>
                      <span className="font-medium">{entries.bowel}</span>
                    </div>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};