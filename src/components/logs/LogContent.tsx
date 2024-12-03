import React from 'react';
import { format } from 'date-fns';
import type { FeedingEntry, ActivityEntry, SleepEntry, BowelEntry } from '../../types';

interface LogContentProps {
  entry: FeedingEntry | ActivityEntry | SleepEntry | BowelEntry;
  type: 'feeding' | 'activity' | 'sleep' | 'bowel';
}

export const LogContent = ({ entry, type }: LogContentProps) => {
  switch (type) {
    case 'feeding':
      const feedingEntry = entry as FeedingEntry;
      return (
        <div>
          <h3 className="font-medium">{feedingEntry.foodName}</h3>
          <p className="text-sm text-gray-600">Response: {feedingEntry.response}</p>
          <p className="text-sm text-gray-600">Ingredients: {feedingEntry.ingredients.map((item) => {
            return(item.name + ", ")
          })}</p>
          <p className="text-sm text-gray-500">
            {format(new Date(feedingEntry.timestamp), 'MMM d, yyyy h:mm a')}
          </p>
        </div>
      );

    case 'activity':
      const activityEntry = entry as ActivityEntry;
      return (
        <div>
          <h3 className="font-medium capitalize">{activityEntry.type}</h3>
          <p className="text-sm text-gray-600">{activityEntry.description}</p>
          <p className="text-sm text-gray-500">
            Duration: {activityEntry.duration} minutes
          </p>
          <p className="text-sm text-gray-500">
            {format(new Date(activityEntry.timestamp), 'MMM d, yyyy h:mm a')}
          </p>
        </div>
      );

    case 'sleep':
      const sleepEntry = entry as SleepEntry;
      return (
        <div>
          <h3 className="font-medium">Sleep Session</h3>
          <p className="text-sm text-gray-600">
            From: {format(new Date(sleepEntry.startTime), 'h:mm a')}
          </p>
          <p className="text-sm text-gray-600">
            To: {format(new Date(sleepEntry.endTime), 'h:mm a')}
          </p>
          <p className="text-sm text-gray-600">
            Duration: {Math.round(sleepEntry.duration)} minutes
          </p>
          {sleepEntry.quality && (
            <p className="text-sm text-gray-600 capitalize">
              Quality: {sleepEntry.quality}
            </p>
          )}
        </div>
      );

    case 'bowel':
      const bowelEntry = entry as BowelEntry;
      return (
        <div>
          <h3 className="font-medium">Diaper Change</h3>
          <p className="text-sm text-gray-600 capitalize">Type: {bowelEntry.type}</p>
          {bowelEntry.notes && (
            <p className="text-sm text-gray-600">Notes: {bowelEntry.notes}</p>
          )}
          <p className="text-sm text-gray-500">
            {format(new Date(bowelEntry.timestamp), 'MMM d, yyyy h:mm a')}
          </p>
        </div>
      );
  }
};