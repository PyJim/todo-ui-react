import React, { useEffect, useState } from 'react';
import { ListTodo } from 'lucide-react';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { TodoFilter } from './components/TodoFilter';
import { Todo, TodoStatus } from './types/todo';

import { getAllTodos, createTodo, updateTodo, deleteTodo as deleteTodoApi } from '../_utils/api_calls.ts';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<TodoStatus>('all');

  // Fetch all todos on component mount
  useEffect(() => {
    getAllTodos()
      .then((fetchedTodos: Todo[]) => {
        setTodos(fetchedTodos);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error('An unknown error occurred');
        }
      });
  }, []);

  const addTodo = (title: string) => {
    const newTodo: Omit<Todo, 'id'> = { title, completed: false };
    createTodo(newTodo)
      .then((res: Todo) => {
        setTodos((prev) => [...prev, res]);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error('An unknown error occurred');
        }
      });
  };

  const toggleTodo = (id: string) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
    updateTodo(id, updatedTodo)
      .then((res: Todo) => {
        setTodos((prev) =>
          prev.map((todo) => (todo.id === res.id ? res : todo))
        );
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error('An unknown error occurred');
        }
      });
  };

  const deleteTodo = (id: string) => {
    deleteTodoApi(id)
      .then(() => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error('An unknown error occurred');
        }
      });
  };

  const filteredTodos = todos.filter((todo) => {
    if (status === 'active') return !todo.completed;
    if (status === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-block p-4 bg-white rounded-full shadow-sm">
              <ListTodo className="w-12 h-12 text-purple-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Get Things Done</h1>
            <p className="text-gray-600">
              Organize your tasks efficiently and stay productive
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-6 bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
            <TodoInput onAdd={addTodo} />
            
            <div className="flex justify-center">
              <TodoFilter status={status} onStatusChange={setStatus} />
            </div>

            <div className="space-y-4">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))}
              
              {filteredTodos.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No tasks found. Start by adding a new one!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
