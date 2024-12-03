import React from 'react';
import { format, startOfDay, endOfDay, isWithinInterval } from 'date-fns';
import { useStore } from '../../store/useStore';
import { Activity, Utensils, Moon, Baby } from 'lucide-react';

interface RecentActivitiesProps {
  selectedDate: Date;
}

export const RecentActivities = ({ selectedDate }: RecentActivitiesProps) => {
  const feedingEntries = useStore((state) => state.feedingEntries);
  const activityEntries = useStore((state) => state.activityEntries);
  const sleepEntries = useStore((state) => state.sleepEntries);
  const bowelEntries = useStore((state) => state.bowelEntries);

  const dayStart = startOfDay(selectedDate);
  const dayEnd = endOfDay(selectedDate);

  const allActivities = [
    ...feedingEntries
      .filter(entry => isWithinInterval(new Date(entry.timestamp), { start: dayStart, end: dayEnd }))
      .map(entry => ({
        ...entry,
        type: 'feeding',
        icon: Utensils,
        color: 'text-primary'
      })),
    ...activityEntries
      .filter(entry => isWithinInterval(new Date(entry.timestamp), { start: dayStart, end: dayEnd }))
      .map(entry => ({
        ...entry,
        type: 'activity',
        icon: Activity,
        color: 'text-secondary'
      })),
    ...bowelEntries
      .filter(entry => isWithinInterval(new Date(entry.timestamp), { start: dayStart, end: dayEnd }))
      .map(entry => ({
        ...entry,
        type: 'bowel',
        icon: Baby,
        color: 'text-navy'
      }))
  ].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, 5);

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-navy mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {allActivities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-center space-x-3">
              <div className={`p-2 bg-gray-100 rounded-lg ${activity.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.type === 'feeding' ? activity.foodName :
                   activity.type === 'activity' ? activity.description :
                   'Diaper Change'}
                </p>
                <p className="text-xs text-gray-500">
                  {format(new Date(activity.timestamp), 'h:mm a')}
                </p>
              </div>
            </div>
          );
        })}
        {allActivities.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No activities recorded for this day
          </div>
        )}
      </div>
    </div>
  );
};