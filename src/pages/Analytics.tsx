import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { format, subDays, eachDayOfInterval } from 'date-fns';

export const Analytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const feedingEntries = useStore((state) => state.feedingEntries);
  const activityEntries = useStore((state) => state.activityEntries);
  const bowelEntries = useStore((state) => state.bowelEntries);

  const startDate = subDays(new Date(), timeRange === 'week' ? 7 : 30);
  const dateRange = eachDayOfInterval({ start: startDate, end: new Date() });

  const dailyStats = dateRange.map(date => ({
    date,
    feedings: feedingEntries.filter(entry => 
      format(new Date(entry.timestamp), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    ).length,
    activities: activityEntries.filter(entry =>
      format(new Date(entry.timestamp), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    ).length,
    diapers: bowelEntries.filter(entry =>
      format(new Date(entry.timestamp), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    ).length
  }));

  const activityTypes = activityEntries.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(activityTypes).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#2DD4BF', '#FF6B6B', '#1E40AF', '#818CF8'];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-navy">Analytics</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="input-field w-auto"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-navy mb-4">Daily Overview</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyStats}>
                <XAxis 
                  dataKey="date"
                  tickFormatter={(date) => format(date, 'MM/dd')}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(date) => format(date, 'MMM dd, yyyy')}
                />
                <Bar dataKey="feedings" fill="#2DD4BF" name="Feedings" />
                <Bar dataKey="activities" fill="#FF6B6B" name="Activities" />
                <Bar dataKey="diapers" fill="#1E40AF" name="Diapers" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-navy mb-4">Activity Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};