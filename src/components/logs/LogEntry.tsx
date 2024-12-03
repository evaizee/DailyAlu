import React, { useState } from 'react';
import { Pencil, Trash2, X, Check } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { LogContent } from './LogContent';
import { FeedingEditForm, ActivityEditForm, SleepEditForm, BowelEditForm } from './EditForms';
import type { FeedingEntry, ActivityEntry, SleepEntry, BowelEntry } from '../../types';

interface LogEntryProps {
  entry: FeedingEntry | ActivityEntry | SleepEntry | BowelEntry;
  type: 'feeding' | 'activity' | 'sleep' | 'bowel';
}

export const LogEntry = ({ entry, type }: LogEntryProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEntry, setEditedEntry] = useState(entry);
  
  const {
    updateFeedingEntry,
    updateActivityEntry,
    updateSleepEntry,
    updateBowelEntry,
    deleteFeedingEntry,
    deleteActivityEntry,
    deleteSleepEntry,
    deleteBowelEntry
  } = useStore();

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setEditedEntry(entry);
  };

  const handleSave = () => {
    switch (type) {
      case 'feeding':
        updateFeedingEntry(entry.id, editedEntry);
        break;
      case 'activity':
        updateActivityEntry(entry.id, editedEntry);
        break;
      case 'sleep':
        updateSleepEntry(entry.id, editedEntry);
        break;
      case 'bowel':
        updateBowelEntry(entry.id, editedEntry);
        break;
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      switch (type) {
        case 'feeding':
          deleteFeedingEntry(entry.id);
          break;
        case 'activity':
          deleteActivityEntry(entry.id);
          break;
        case 'sleep':
          deleteSleepEntry(entry.id);
          break;
        case 'bowel':
          deleteBowelEntry(entry.id);
          break;
      }
    }
  };

  const renderEditForm = () => {
    switch (type) {
      case 'feeding':
        return <FeedingEditForm entry={editedEntry} setEditedEntry={setEditedEntry} />;
      case 'activity':
        return <ActivityEditForm entry={editedEntry} setEditedEntry={setEditedEntry} />;
      case 'sleep':
        return <SleepEditForm entry={editedEntry} setEditedEntry={setEditedEntry} />;
      case 'bowel':
        return <BowelEditForm entry={editedEntry} setEditedEntry={setEditedEntry} />;
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-4">
              {renderEditForm()}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:text-gray-800"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-1 px-3 py-1 text-primary hover:text-primary-dark"
                >
                  <Check className="h-4 w-4" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          ) : (
            <LogContent entry={entry} type={type} />
          )}
        </div>
        {!isEditing && (
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="p-1 text-gray-400 hover:text-primary transition-colors"
              title="Edit"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-secondary transition-colors"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};