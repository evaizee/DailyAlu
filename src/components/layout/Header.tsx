import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Baby, Menu } from 'lucide-react';

const NAVIGATION_ITEMS = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/logs', label: 'Daily Logs' },
  { path: '/calendar', label: 'Calendar' },
  { path: '/analytics', label: 'Analytics' }
];

export const Header = () => {
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Baby className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold text-navy">BabyTracker</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`transition ${
                  isActivePath(path)
                    ? 'text-primary font-semibold'
                    : 'text-navy-dark hover:text-primary'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            <button className="md:hidden">
              <Menu className="h-6 w-6 text-navy" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {NAVIGATION_ITEMS.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition ${
                  isActivePath(path)
                    ? 'text-primary bg-primary/10'
                    : 'text-navy-dark hover:text-primary hover:bg-primary/5'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};