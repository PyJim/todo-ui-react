import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div
      className={`group flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm 
                  transform transition-all duration-300 hover:scale-[1.02] 
                  ${todo.completed ? 'opacity-75' : ''}`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                   transition-colors duration-300
                   ${
                     todo.completed
                       ? 'bg-green-500 border-green-500'
                       : 'border-gray-300 hover:border-purple-400'
                   }`}
      >
        {todo.completed && <Check className="w-4 h-4 text-white" />}
      </button>
      
      <span
        className={`flex-1 text-lg transition-all duration-300
                   ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
      >
        {todo.title}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 
                  transition-all duration-300"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}