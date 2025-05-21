import React, { useRef, useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import SummaryButton from './components/SummaryButton';
import bg from './assets/bg.png'; // Make sure bg.png is in src/assets/

export default function App() {
  const todoListRef = useRef();
  const [selectedTodo, setSelectedTodo] = useState(null);

  const refreshTodos = () => {
    if (todoListRef.current) {
      todoListRef.current.fetchTodos();
    }
  };

  const handleEditTodo = (todo) => {
    setSelectedTodo(todo); 
  };

  const handleCloseForm = () => {
    setSelectedTodo(null); 
  };

  return (
    <div
      className="min-h-screen w-full opacity- bg-gradient-to-br from-gray-900 via-gray-950 to-slate-800 text-gray-100 flex flex-col items-center py-8 px-10"
      // style={{
      //   backgroundImage: `url(${bg})`,
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      //   backgroundRepeat: 'no-repeat'
      // }}
    >
      <h2 className="text-4xl font-bold mb-6 flex items-center gap-2">
        <span role="img" aria-label="checklist">📝</span> Todo Summary Agent
      </h2>
      <div className="w-full max-w-10xl grid grid-cols-2 md:grid-cols-3 gap-10">
        {/* LeftSide */}
        <div className="md:col-span-2 bg-gray-800 rounded-xl shadow-lg p-6">
          <TodoList ref={todoListRef} onEdit={handleEditTodo} />
        </div>
        {/* RightSide */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col gap-6">
          <TodoForm
            todo={selectedTodo}
            onSave={refreshTodos}
            onClose={handleCloseForm}
          />
          <SummaryButton />
        </div>
      </div>
    </div>
  );
}
