import React from 'react';
import { TodoStatus } from '../types/todo';

interface TodoFilterProps {
  status: TodoStatus;
  onStatusChange: (status: TodoStatus) => void;
}

export function TodoFilter({ status, onStatusChange }: TodoFilterProps) {
  const filters: TodoStatus[] = ['all', 'active', 'completed'];

  return (
    <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onStatusChange(filter)}
          className={`px-4 py-2 rounded-md capitalize transition-all duration-300
                     ${
                       status === filter
                         ? 'bg-purple-500 text-white shadow-sm'
                         : 'text-gray-600 hover:bg-gray-100'
                     }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}