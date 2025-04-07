import "./App.css";
import { useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { AddToDo } from "./components/AddToDo";
import { ToggleTheme } from "./components/ToggleTheme";

function App() {
  const initialTodos = [
    { id: 1, text: "Изучить React" },
    { id: 2, text: "Сделать ToDo-APP" },
    { id: 3, text: "Добавить стили Tailwind" },
  ];
  const [todos, setTodos] = useState(initialTodos);
  const [theme, setTheme] = useState(getInitialTheme());

  function getInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    const preferDark = window.matchMedia(
      "(prefer-color-scheme : dark)"
    ).matches;

    if (savedTheme) {
      return savedTheme;
    } else if (preferDark) {
      return "dark";
    } else {
      const hours = new Date().getHours();
      return hours < 6 || hours > 20 ? "dark" : "light";
    }
  }

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const onAdd = (text) => {
    const newToDo = {
      id: Date.now(),
      text,
    };
    setTodos([...todos, newToDo]);
  };

  const onDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div
      data-theme={theme}
      className="flex flex-col min-h-screen justify-center items-center bg-page-light dark:bg-page-dark p-6"
    >
      <div className="mb-6 ">
        <ToggleTheme toggleTheme={toggleTheme} theme={theme} />
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
            <TodoItem key={todo.id} todo={todo} onDelete={onDelete}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
