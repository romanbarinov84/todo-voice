import "./App.css";
import { useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { AddToDo } from "./components/AddToDo";
import { ToggleTheme } from "./components/ToggleTheme";
import { getInitialTheme } from "./helpers/GetInitialTheme";
import { toggleTheme } from "./helpers/ToggleTheme";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import { useTodoManagement } from "./Hooks/useTodoManagement";

function App() {
  const [theme, setTheme] = useState(getInitialTheme());
  const [deletingId, setDeletingId] = useState(null);
  const [isDeletingCompleted, setIsDeletingCompleted] = useState(false);

  const {
    todos,
    onAdd,
    handleUpdate,
    toggleComplete,
    handleDelete,
    confirmDeleteCompleted,
    handleDeleteCompleted,
    hasCompletedTodos,
  } = useTodoManagement();

  return (
    <div
      data-theme={theme}
      className="flex flex-col   min-h-screen justify-center items-center bg-blue-200 dark:bg-page-dark p-6"
    >
      <div className="mb-6  shadow-2xl rounded-2xl bg-gray-200 ">
        <ToggleTheme toggleTheme={() => toggleTheme(setTheme)} theme={theme} />

        <div className="mx-auto flex flex-col gap-3  rounded-xl p-10 ">
          <h1 className="text-6xl font-bold text-center text-gray-10 dark:text-white mb-11">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              My ToDo-App
            </span>
          </h1>

          <AddToDo onAdd={onAdd} />
          <div className="flex flex-col gap-6 ">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={() => setDeletingId(todo.id)}
                onToggleComplete={toggleComplete}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        </div>
        {deletingId && (
          <DeleteConfirmModal
            onCancel={() => setDeletingId(null)}
            onConfirm={() => {
              handleDelete(deletingId);
              setDeletingId(null);
            }}
            message="Вы уверенны что хотите удалить задачу"
          />
        )}
        {isDeletingCompleted && (
          <DeleteConfirmModal
            onCancel={() => setIsDeletingCompleted(false)}
            onConfirm={confirmDeleteCompleted}
            message={`Вы уверенны что хотите удалить все выполненые  задачи (${
              todos.filter((todo) => todo.completed).length
            })`}
          />
        )}
        {hasCompletedTodos && (
          <button
            onClick={handleDeleteCompleted}
            className="bg-gray-400 text-xl   text-white p-2 rounded xl -mt-6 mb-2"
          >
            Удалить выполненые задачи
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
