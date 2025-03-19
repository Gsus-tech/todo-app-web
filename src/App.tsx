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

      <Footer />
    </div>
  );
};

export default App;
