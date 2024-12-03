import React, { useState, useMemo, useEffect } from 'react';
import { format, startOfDay, endOfDay, isWithinInterval, subMonths } from 'date-fns';
import { useStore } from '../store/useStore';
import { LogEntry } from '../components/logs/LogEntry';
import { NewLogEntry } from '../components/logs/NewLogEntry';
import { LogSearch } from '../components/logs/LogSearch';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import type { FeedingEntry, ActivityEntry, SleepEntry, BowelEntry } from '../types';

type EntryWithType = 
  | (FeedingEntry & { type: 'feeding' })
  | (ActivityEntry & { type: 'activity' })
  | (SleepEntry & { type: 'sleep' })
  | (BowelEntry & { type: 'bowel' });

export const DailyLogs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dateParam = searchParams.get('date');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [startDate, setStartDate] = useState(dateParam ? new Date(dateParam) : subMonths(new Date(), 1));
  const [endDate, setEndDate] = useState(dateParam ? new Date(dateParam) : new Date());

  useEffect(() => {
    if (dateParam) {
      const selectedDate = new Date(dateParam);
      setStartDate(selectedDate);
      setEndDate(selectedDate);
    }
  }, [dateParam]);

  const feedingEntries = useStore((state) => state.feedingEntries);
  const activityEntries = useStore((state) => state.activityEntries);
  const sleepEntries = useStore((state) => state.sleepEntries);
  const bowelEntries = useStore((state) => state.bowelEntries);

  const allEntries = useMemo(() => {
    const rangeStart = startOfDay(startDate);
    const rangeEnd = endOfDay(endDate);

    let entries: EntryWithType[] = [
      ...feedingEntries
        .filter(entry => isWithinInterval(new Date(entry.timestamp), { start: rangeStart, end: rangeEnd }))
        .map(entry => ({ ...entry, type: 'feeding' as const })),
      ...activityEntries
        .filter(entry => isWithinInterval(new Date(entry.timestamp), { start: rangeStart, end: rangeEnd }))
        .map(entry => ({ ...entry, type: 'activity' as const })),
      ...sleepEntries
        .filter(entry => isWithinInterval(new Date(entry.startTime), { start: rangeStart, end: rangeEnd }))
        .map(entry => ({ ...entry, type: 'sleep' as const })),
      ...bowelEntries
        .filter(entry => isWithinInterval(new Date(entry.timestamp), { start: rangeStart, end: rangeEnd }))
        .map(entry => ({ ...entry, type: 'bowel' as const }))
    ];

    if (searchType !== 'all') {
      entries = entries.filter(entry => entry.type === searchType);
    }

    if (searchTerm) {
      entries = entries.filter(entry => {
        const searchLower = searchTerm.toLowerCase();
        switch (entry.type) {
          case 'feeding':
            return entry.foodName.toLowerCase().includes(searchLower) ||
                   entry.ingredients.some(i => i.name.toLowerCase().includes(searchLower));
          case 'activity':
            return entry.description.toLowerCase().includes(searchLower);
          case 'sleep':
            return entry.quality?.toLowerCase().includes(searchLower);
          case 'bowel':
            return entry.type.toLowerCase().includes(searchLower) ||
                   (entry.notes?.toLowerCase() || '').includes(searchLower);
          default:
            return false;
        }
      });
    }

    return entries.sort((a, b) => {
      const dateA = new Date(a.timestamp || a.startTime).getTime();
      const dateB = new Date(b.timestamp || b.startTime).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [feedingEntries, activityEntries, sleepEntries, bowelEntries, searchTerm, searchType, sortOrder, startDate, endDate]);

  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    // Clear the date parameter when manually changing dates
    if (dateParam) {
      searchParams.delete('date');
      setSearchParams(searchParams);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy mb-4">Daily Logs</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => handleDateChange(date, endDate)}
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
                  onChange={(date: Date) => handleDateChange(startDate, date)}
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
        </div>
        <Link 
          to="/calendar" 
          className="flex items-center space-x-2 btn-secondary h-10"
        >
          <Calendar className="h-5 w-5" />
          <span>Calendar View</span>
        </Link>
      </div>

      <LogSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchType={searchType}
        setSearchType={setSearchType}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <div className="space-y-4 mt-6">
        {allEntries.map((entry) => (
          <LogEntry
            key={entry.id}
            entry={entry}
            type={entry.type}
          />
        ))}
        {allEntries.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No entries found matching your search criteria
          </div>
        )}
      </div>

      <NewLogEntry selectedDate={new Date()} />
    </div>
  );
};