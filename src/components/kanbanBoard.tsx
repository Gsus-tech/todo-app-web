import React, { useEffect, useState, useRef } from 'react';  // <-- Added `useRef`
import axios from "axios";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";

interface Todo {
  _id: string;
  text: string;
  status: "todo" | "in-progress" | "completed";
}

const KanbanBoard: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // To hold the list of todo items
  const [showActions, setShowActions] = useState<string | null>(null); // To show actions menu
  const [movingTodo, setMovingTodo] = useState<string | null>(null); // To add effect when moving
  const [loading, setLoading] = useState<boolean>(true);  // Adds a loading... message when fetching
  const menuRef = useRef<HTMLDivElement | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Todo[]>(`${apiUrl}`);
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const refreshTodos = () => {
    setLoading(true);
    axios.get<Todo[]>(`${apiUrl}`)
      .then((res) => setTodos(res.data))
      .catch((error) => console.error("Error refreshing todos:", error))
      .finally(() => setLoading(false)); 
  };

  const updateStatus = async (id: string, newStatus: "todo" | "in-progress" | "completed") => {
    try {
      setMovingTodo(id);

      await axios.put(`${apiUrl}${id}`, { status: newStatus });
      refreshTodos();
      toggleActions(id);
      
      setTimeout(() => {
        setMovingTodo(null);
      }, 1500);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}${id}`);
      refreshTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleActions = (id: string) => {
    setShowActions((prev) => (prev === id ? null : id));
  };

  const renderActionButtons = (todo: Todo) => (
    <div ref={menuRef} className="absolute right-2 top-10 bg-white shadow-lg rounded-md p-4 z-10 border border-gray-200">
      {todo.status === "todo" && (
        <button
          onClick={() => updateStatus(todo._id, "in-progress")}
          className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-600"
        >
          Mark as In Progress
        </button>
      )}
      {todo.status === "in-progress" && (
        <>
          <button
            onClick={() => updateStatus(todo._id, "todo")}
            className="block w-full text-left px-4 py-2 hover:bg-yellow-50 text-yellow-600 mb-1"
          >
            Mark as To Do
          </button>
          <button
            onClick={() => updateStatus(todo._id, "completed")}
            className="block w-full text-left px-4 py-2 hover:bg-green-50 text-green-600"
          >
            Mark as Completed
          </button>
        </>
      )}
      {todo.status === "completed" && (
        <button
          onClick={() => updateStatus(todo._id, "in-progress")}
          className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-600"
        >
          Mark as In Progress
        </button>
      )}
      <hr className="my-2" />
      <button
        onClick={() => deleteTodo(todo._id)}
        className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
      >
        Delete
      </button>
    </div>
  );

  const renderColumn = (title: string, status: "todo" | "in-progress" | "completed") => (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{title}</h2>
      {loading ? (  // <-- Display loading spinner
        <div className="text-center text-gray-500">
          <FaSpinner className="animate-spin m-auto text-2xl" />
        </div>
      ) : (
      <div className="space-y-4">
        {todos
          .filter((todo) => todo.status === status)
          .map((todo) => (
            <div
              key={todo._id}
              className={`relative bg-gray-50 p-4 rounded-lg shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-lg ${movingTodo === todo._id ? 'bg-red-100 transition-all duration-500' : ''}`}
            >
              <p className="text-gray-700">{todo.text}</p>
              
              {/* "..." Button */}
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => toggleActions(todo._id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiMoreHorizontal size={20} />
                </button>
              </div>

              {/* Action Menu */}
              {showActions === todo._id && renderActionButtons(todo)}
            </div>
          ))}
      </div>
      )}
    </div>
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowActions(null);  // Close the menu
      }
    };
  
    if (showActions) {
      document.addEventListener('mousedown', handleClickOutside);  // Add event listener
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);  // Remove event listener
    };
  }, [showActions]);  // Re-run effect when 'openMenu' changes
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {renderColumn("To Do", "todo")}
      {renderColumn("In Progress", "in-progress")}
      {renderColumn("Completed", "completed")}
    </div>
  );
};

export default KanbanBoard;
