import React, { useRef, useEffect, useState } from 'react';
import axios from "axios";

interface AddTodoProps {
  addNewTodo: (todo: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addNewTodo }) => {
  const [showForm, setShowForm] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Condition width
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Check on initial load
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);


  useEffect(() => {
    if (showForm && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showForm]);

  const addTodo = async () => {
    try {
      if (newTodo.trim()) {
        // Send the new task 'ToDo' to the backend
        const response = await axios.post(`${apiUrl}`, {
          text: newTodo,
          status: 'todo', // The default status is going to be 'To Do'
        });

        if (response.status === 201) {
          // On success, the form gets resetted and hidden
          setNewTodo('');
          setShowForm(false);
          addNewTodo(newTodo);
        }
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const closeModal = () => {
    setShowForm(false); // Event to close the form when clicking outside the modal
  };

  return (
    <>
      {/* Open Form */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700"
      >
        Add New Task
      </button>

      {/* Overlayed Form */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
          onClick={closeModal}
        >
          {/* Modal Content */}
          <div
            className={`${isMobile ? 'w-3/4' : 'w-1/3'} grid bg-white p-6 rounded-lg shadow-lg`}
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside the form
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Todo</h2>
            <input
              ref={inputRef}
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter a new task"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <div className={`flex justify-between`}>
              <button
                onClick={addTodo}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700"
              >
                Add Task
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTodo;
