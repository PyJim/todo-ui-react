import { Todo, TodoStatus } from '../src/types/todo';

const BASE_URL = 'http://localhost:8000/api';


export const getAllTodos = async (): Promise<any> => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching all todos:", error);
    throw error;
  }
};

export const getTodo = async (id: string): Promise<any> => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${id}/`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching todo with id ${id}:`, error);
    throw error;
  }
};

export const createTodo = async (todo: { title: string; description?: string }): Promise<Todo> => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo), // Don't include 'id' here
    });

    const data = await res.json();
    return data; // The 'id' will be included in the response from the backend
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

export const updateTodo = async (id: string, todo: { title: string; completed: boolean }): Promise<any> => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error updating todo with id ${id}:`, error);
    throw error;
  }
};

export const deleteTodo = async (id: string): Promise<any> => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${id}/`, {
      method: 'DELETE',
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error deleting todo with id ${id}:`, error);
    throw error;
  }
};
