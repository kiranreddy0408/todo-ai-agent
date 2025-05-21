import React, { useState } from 'react';
import { FiEdit, FiTrash2, FiCheckCircle } from 'react-icons/fi';
import PriorityBadge from './PriorityBadge';
import api from '../api/axios';

export default function TodoItem({ todo, onChange, onEdit }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Delete this todo?')) {
      await api.delete(`/todos/${todo.id}`);
      onChange();
    }
  };

  const handleToggle = async () => {
    await api.put(`/todos/${todo.id}`, {
      ...todo,
      completed: !todo.completed,
    });
    onChange();
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-800 rounded-xl p-5 shadow-md border border-gray-700 ${
        todo.completed ? 'opacity-60 line-through' : ''
      } transition duration-300 ease-in-out hover:scale-100 hover:shadow-xl hover:bg-gray-700`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
        <button
          onClick={handleToggle}
          className="text-blue-400 hover:text-blue-300 focus:outline-none"
        >
          <FiCheckCircle
            className={`${
              todo.completed ? 'opacity-100' : 'opacity-40'
            } sm:w-6 sm:h-6 w-5 h-5`}
          />
        </button>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-lg text-white text-left break-words">{todo.title}</div>
          {todo.description && (
            <div className="text-gray-400 text-sm mt-2 text-left">
              {showFullDescription ? (
                <>
                  {todo.description}
                  <span
                    onClick={() => setShowFullDescription(false)}
                    className="text-blue-400 hover:underline ml-2 text-xs cursor-pointer"
                  >
                    Read Less
                  </span>
                </>
              ) : (
                <>
                  {todo.description.length > 100
                    ? `${todo.description.slice(0, 100)}...`
                    : todo.description}
                  {todo.description.length > 100 && (
                    <span
                      onClick={() => setShowFullDescription(true)}
                      className="text-blue-400 hover:underline ml-2 text-xs cursor-pointer"
                    >
                      Read More
                    </span>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        <PriorityBadge priority={todo.priority} />
      </div>
      <div className="flex gap-2 mt-4 sm:mt-0 sm:ml-4 justify-start sm:justify-end">
        <button
          onClick={() => onEdit(todo)}
          className="text-blue-400 hover:text-blue-300 p-2 rounded-full focus:outline-none"
        >
          <FiEdit className="sm:w-5 sm:h-5 w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          className="text-red-400 hover:text-red-300 p-2 rounded-full focus:outline-none"
        >
          <FiTrash2 className="sm:w-5 sm:h-5 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
