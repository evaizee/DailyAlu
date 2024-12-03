import React from 'react';
import { Activity, Utensils, Moon, Baby } from 'lucide-react';

interface QuickStatsProps {
  stats: {
    totalFeedings: number;
    totalActivities: number;
    totalSleep: number;
    totalBowel: number;
  };
}

export const QuickStats = ({ stats }: QuickStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="card bg-primary/10">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary/20 rounded-lg">
            <Utensils className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Feedings Today</p>
            <p className="text-2xl font-semibold text-navy">{stats.totalFeedings}</p>
          </div>
        </div>
      </div>

      <div className="card bg-secondary/10">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-secondary/20 rounded-lg">
            <Activity className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Activities</p>
            <p className="text-2xl font-semibold text-navy">{stats.totalActivities}</p>
          </div>
        </div>
      </div>

      <div className="card bg-navy/10">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-navy/20 rounded-lg">
            <Moon className="h-6 w-6 text-navy" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Sleep (hours)</p>
            <p className="text-2xl font-semibold text-navy">
              {Math.round(stats.totalSleep / 60 * 10) / 10}
            </p>
          </div>
        </div>
      </div>

      <div className="card bg-primary/10">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary/20 rounded-lg">
            <Baby className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Diaper Changes</p>
            <p className="text-2xl font-semibold text-navy">{stats.totalBowel}</p>
          </div>
        </div>
      </div>
    </div>
  );
};