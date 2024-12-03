import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { format, startOfDay, endOfDay, isWithinInterval, subMonths } from 'date-fns';
import { Activity, Utensils, Moon, Baby } from 'lucide-react';
import { DailySummary } from '../components/dashboard/DailySummary';
import { RecentActivities } from '../components/dashboard/RecentActivities';
import { QuickStats } from '../components/dashboard/QuickStats';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export const Dashboard = () => {
  const [startDate, setStartDate] = useState(subMonths(new Date(), 1));
  const [endDate, setEndDate] = useState(new Date());
  
  const feedingEntries = useStore((state) => state.feedingEntries);
  const activityEntries = useStore((state) => state.activityEntries);
  const sleepEntries = useStore((state) => state.sleepEntries);
  const bowelEntries = useStore((state) => state.bowelEntries);

  const rangeStart = startOfDay(startDate);
  const rangeEnd = endOfDay(endDate);

  const filteredEntries = {
    feedings: feedingEntries.filter(entry => 
      isWithinInterval(new Date(entry.timestamp), { start: rangeStart, end: rangeEnd })
    ),
    activities: activityEntries.filter(entry =>
      isWithinInterval(new Date(entry.timestamp), { start: rangeStart, end: rangeEnd })
    ),
    sleep: sleepEntries.filter(entry =>
      isWithinInterval(new Date(entry.startTime), { start: rangeStart, end: rangeEnd })
    ),
    bowel: bowelEntries.filter(entry =>
      isWithinInterval(new Date(entry.timestamp), { start: rangeStart, end: rangeEnd })
    )
  };

  const stats = {
    totalFeedings: filteredEntries.feedings.length,
    totalActivities: filteredEntries.activities.length,
    totalSleep: filteredEntries.sleep.reduce((acc, curr) => acc + curr.duration, 0),
    totalBowel: filteredEntries.bowel.length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              maxDate={endDate}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={new Date()}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="input-field"
            />
          </div>
        </div>
      </div>

      <QuickStats stats={stats} />
      
      <div className="grid md:grid-cols-2 gap-6">
        <DailySummary selectedDate={endDate} />
        <RecentActivities selectedDate={endDate} />
      </div>
    </div>
  );
};