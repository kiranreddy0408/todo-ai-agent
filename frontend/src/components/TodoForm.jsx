import React, { useState, useEffect } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { FaMagic } from 'react-icons/fa';
import api from '../api/axios';

const priorities = [
  { label: 'High', value: 'high' },
  { label: 'Normal', value: 'normal' },
  { label: 'Low', value: 'low' },
];

export default function TodoForm({ todo, onSave, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('normal');
  const [loading, setLoading] = useState(false);
  const [improving, setImproving] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setPriority(todo.priority);
    } else {
      setTitle('');
      setDescription('');
      setPriority('normal');
    }
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (todo) {
        await api.put(`/todos/${todo.id}`, { title, description, priority, completed: todo.completed });
      } else {
        await api.post('/todos', { title, description, priority });
      }
      onSave();
      setTitle(''); 
      setDescription(''); 
      setPriority('normal'); 
    } catch (error) {
      console.error('Error saving todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setPriority('normal');
    onClose();
  };

  const handleImproveWriting = async () => {
    setImproving(true);
    try {
      const response = await api.post('/todos/improve-writing', { title, description });
      setTitle(response.data.title || title);
      setDescription(response.data.description || description);
    } catch (error) {
      console.error('Error improving writing:', error);
    } finally {
      setImproving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          {todo ? <FiEdit3 /> : <FaMagic />} {todo ? 'Edit Task' : 'Add New Task'}
        </h3>
        <div className="mb-3">
          <label className="block mb-1 text-gray-400">Task Name *</label>
          <div className="flex items-center gap-2">
            <input
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task name"
              required
            />
            <button
              type="button"
              onClick={handleImproveWriting}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 flex items-center gap-1"
              disabled={improving}
            >
              <FaMagic />
              {improving ? 'Improving...' : 'Improve'}
            </button>
          </div>
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-gray-400">Description *</label>
          <textarea
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-400">Priority</label>
          <select
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {priorities.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-gray-600 rounded text-white hover:bg-gray-500"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-500"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
