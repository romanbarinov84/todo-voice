import "./App.css";
import { useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { AddToDo } from "./components/AddToDo";

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
    const preferDark = window.matchMedia("(prefer-color-scheme : dark)").matches;

    if(savedTheme) {
      return savedTheme
    } else if(preferDark){
      return "dark"
    }else {
      const hours = new Date().getHours();
      return hours < 6 || hours > 20 ? "dark" : "light";
    }
  }

const toggleTheme = () => {
  setTheme((prevTheme) => {
    const newTheme = prevTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme" , newTheme);
    return newTheme;
  })
}


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
    <div data-theme = {theme} className="flex flex-col min-h-screen justify-center items-center bg-page-light dark:bg-page-dark p-6">
      <div className="mb-6 " >
        <div className="flex items-center cursor-pointer ">
          
            <button className="relative" onClick={toggleTheme}>
              <div className="w-44 h-7  rounded-full shadow-inner transition-colors duration-300 bg-gray-300 mb-6 dark:bg-btn-dark">Toggle theme</div>
            </button>
          
        </div>
        <h1>My ToDo-App</h1>
        <AddToDo onAdd={onAdd} />
        <ul>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
