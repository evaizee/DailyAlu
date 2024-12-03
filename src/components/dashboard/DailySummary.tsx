import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '../../store/useStore';
import { format, startOfDay, endOfDay, isWithinInterval } from 'date-fns';

interface DailySummaryProps {
  selectedDate: Date;
}

export const DailySummary = ({ selectedDate }: DailySummaryProps) => {
  const feedingEntries = useStore((state) => state.feedingEntries);
  
  const dayStart = startOfDay(selectedDate);
  const dayEnd = endOfDay(selectedDate);
  
  const filteredEntries = feedingEntries.filter(entry =>
    isWithinInterval(new Date(entry.timestamp), { start: dayStart, end: dayEnd })
  );

  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    feedings: filteredEntries.filter(entry => 
      new Date(entry.timestamp).getHours() === i
    ).length
  }));

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-navy mb-4">Daily Feeding Pattern</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hourlyData}>
            <XAxis 
              dataKey="hour"
              tickFormatter={(hour) => `${hour}:00`}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(hour) => `${hour}:00`}
              formatter={(value) => [`${value} feedings`]}
            />
            <Bar 
              dataKey="feedings"
              fill="#2DD4BF"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};