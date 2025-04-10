import "./App.css";
import { useEffect, useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { AddToDo } from "./components/AddToDo";
import { ToggleTheme } from "./components/ToggleTheme";
import { getInitialTheme } from "./helpers/GetInitialTheme";
import { toggleTheme } from "./helpers/ToggleTheme";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

const LOCAL_STORAGE_KEY = "todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState(getInitialTheme());
  const [deletingId, setDeletingId] = useState(null);
  const [isDeletingCompleted, setIsDeletingCompleted] = useState(false)



  useEffect(() => {
    const loadInitialData = async () => {
      const savedTodos = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
      );
      setTodos(savedTodos);
    };
    loadInitialData();
  }, []);

  const onAdd = (text, deadline) => {
    const newToDo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      deadline: deadline || null,
      order: todos.length + 1,
    };

    const updatedTodos = [...todos, newToDo];
    setTodos(updatedTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  
    setTodos(updatedTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
  };

  const hasCompletedTodos = todos.some((todos) => todos.completed)
 console.log(todos.completed);

 const handleDeleteCompleted = () => {
  if(!hasCompletedTodos) return;
   setIsDeletingCompleted(true)
 }

 const confirmDeleteCompleted = () => {
  try {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    setIsDeletingCompleted(false); 
  } catch (error) {
    console.error("Ошибка при удалении выполненных задач:", error);
  }
};
 
  return (
    <div
      data-theme={theme}
      className="flex flex-col min-h-screen justify-center items-center bg-page-light dark:bg-page-dark p-6"
    >
      <div className="mb-6 ">
        <ToggleTheme toggleTheme={() => toggleTheme(setTheme)} theme={theme} />
      </div>

      <div className="mx-auto flex flex-col gap-3  rounded-xl p-10 ">
        <h1 className="text-6xl font-bold text-center text-gray-10 dark:text-white mb-11">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            My ToDo-App
          </span>
        </h1>

        <AddToDo onAdd={onAdd} />
        <div className="flex flex-col gap-6">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={() => setDeletingId(todo.id)}
              onToggleComplete={toggleComplete}
            />
          ))}
        </div>
      </div>
      {deletingId && (
  <DeleteConfirmModal
    onCancel={() => setDeletingId(null)}
    onConfirm={() => {
      handleDelete(deletingId);
      setDeletingId(null)
    }}
    message="Вы уверенны что хотите удалить задачу"
  />
)}
      {isDeletingCompleted && (
  <DeleteConfirmModal
    onCancel={() => setIsDeletingCompleted(false)}
    onConfirm={confirmDeleteCompleted}
    message={`Вы уверенны что хотите удалить все выполненые  задачи (${todos.filter((todo) => todo.completed).length})`}
  />
)}
{hasCompletedTodos && (
  <button onClick={handleDeleteCompleted} className= "bg-gray-400 text-xl text-white p-2 rounded xl -mt-6 ">Удалить выполненые задачи</button>
)}
    </div>
    
  );
}

export default App;
