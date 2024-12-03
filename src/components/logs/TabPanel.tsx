import React from 'react';
import { Tab } from '@headlessui/react';

interface TabPanelProps {
  children: React.ReactNode;
}

export const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return (
    <Tab.Panel className="focus:outline-none">
      <div className="space-y-4">
        {children}
      </div>
    </Tab.Panel>
  );
};