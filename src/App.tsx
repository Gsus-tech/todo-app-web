import React, { useState } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import AddTodo from "./components/addTodo";
import KanbanBoard from "./components/kanbanBoard";

const App: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  const handleTodoAdded = () => {
    setRefresh((prev) => !prev); // Trigger a refresh after adding a todo
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col w-full">
      <Header />

      <main className="flex-grow p-6 w-full">
        <div className="max-w-full mx-auto w-full">
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <AddTodo addNewTodo={handleTodoAdded} />
          </div>
          <KanbanBoard key={refresh ? "refresh" : "no-refresh"} />
        </div>
      </main>
        <div className="hidden md:block lg:block xl:block text-center text-gray-500 text-sm mt-4">
          Developed with <span className="font-semibold">React + Vite</span> and <span className="font-semibold">TailwindCSS</span>, 
          deployed with <span className="font-semibold">Vercel</span> using <span className="font-semibold">MongoDB Atlas</span> + 
          <span className="font-semibold"> Render</span> for the backend.
        </div>

      <Footer />
    </div>
  );
};

export default App;
