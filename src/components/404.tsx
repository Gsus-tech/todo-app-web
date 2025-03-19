import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const NotFound = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle navigation
  const goHome = () => {
    navigate('/'); // Navigate back to the homepage
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <button
        onClick={goHome}
        className="mt-10 bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-800 hover:text-gray-300 transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
