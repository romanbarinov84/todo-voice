import "./App.css";
import { useState } from "react";
import { AddToDo } from "./components/AddToDo";
import { ToggleTheme } from "./components/ToggleTheme";
import { getInitialTheme } from "./helpers/GetInitialTheme";
import { toggleTheme } from "./helpers/ToggleTheme";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import { useTodoManagement } from "./Hooks/useTodoManagement";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import DeleteCompletedButton from "./components/DeleteCompletedButton";
import TodoFilter from "./components/TodoFilter";

function App() {
  const [theme, setTheme] = useState(getInitialTheme());
  const [filter,setFilter] = useState("all");



  const {
  todos,
  onAdd,
  handleUpdate,
  toggleComplete,
  handleDelete,
  confirmDeleteCompleted,
  handleDeleteCompleted,
  hasCompletedTodos,
  deletingId,
  setDeletingId,
  isDeletingCompleted,
  setIsDeletingCompleted,
} = useTodoManagement();

const filteredTodos = todos.filter((todo) => {
  if(filter === "completed") return todo.completed;
  if(filter === "active") return !todo.completed;
  return true;
});

  return (
    <div
      data-theme={theme}
      className="flex flex-col   min-h-screen justify-center items-center bg-blue-200 dark:bg-page-dark p-6"
    >
      <div className="mb-6  shadow-2xl rounded-2xl bg-gray-200 ">
        <ToggleTheme toggleTheme={() => toggleTheme(setTheme)} theme={theme} />

        <div className="mx-auto flex flex-col gap-3  rounded-xl p-10 ">
          <Header />
          
          <AddToDo onAdd={onAdd} />
          <TodoFilter filter={filter} setFilter={setFilter}/>
          <TodoList
            todos={filteredTodos}
            handleUpdate={handleUpdate}
            toggleComplete={toggleComplete}
            setDeletingId={setDeletingId}
          />
        </div>
      
        <DeleteConfirmModal
          deletingId={deletingId}
          onCancel={() => setDeletingId(null)}
          onConfirm={() => {
            handleDelete(deletingId);
            setDeletingId(null);
          }}
          message="Вы уверенны что хотите удалить задачу"
        />

        <DeleteConfirmModal
          isDeletingCompleted={isDeletingCompleted}
          onCancel={() => setIsDeletingCompleted(false)}
          onConfirm={confirmDeleteCompleted}
          message={`Вы уверенны что хотите удалить все выполненые  задачи (${
            todos.filter((todo) => todo.completed).length
          })`}
        />

        <DeleteCompletedButton
          onClick={handleDeleteCompleted}
          hasCompletedTodos={hasCompletedTodos}
        />
      </div>
    </div>
  );
}

export default App;
