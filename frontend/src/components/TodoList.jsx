import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import api from '../api/axios';
import TodoItem from './TodoItem';

const TodoList = forwardRef(({ onEdit }, ref) => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await api.get('/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchTodos,
  }));

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      {/* Active todos section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-400 mb-4">Active Todos</h2>
        <div className="space-y-4">
          {todos.filter((todo) => !todo.completed).map((todo) => (
            <TodoItem key={todo.id} todo={todo} onEdit={onEdit} onChange={fetchTodos} />
          ))}
        </div>
      </div>

      {/* Completed todos section */}
      <div>
        <h2 className="text-xl font-bold text-green-400 mb-4">Completed Todos</h2>
        <div className="space-y-4">
          {todos.filter((todo) => todo.completed).map((todo) => (
            <TodoItem key={todo.id} todo={todo} onEdit={onEdit} onChange={fetchTodos} />
          ))}
        </div>
      </div>
    </div>
  );
});

export default TodoList;