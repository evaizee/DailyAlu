import React from 'react';
import { Search } from 'lucide-react';

interface LogSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchType: string;
  setSearchType: (type: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
}

export const LogSearch = ({
  searchTerm,
  setSearchTerm,
  searchType,
  setSearchType,
  sortOrder,
  setSortOrder
}: LogSearchProps) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search logs..."
              className="input-field pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex space-x-4">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="input-field w-auto"
          >
            <option value="all">All Types</option>
            <option value="feeding">Feeding</option>
            <option value="activity">Activity</option>
            <option value="sleep">Sleep</option>
            <option value="bowel">Diaper</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="input-field w-auto"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};