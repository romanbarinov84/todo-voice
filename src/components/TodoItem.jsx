import { useState } from "react";

export const TodoItem = ({ todo, onDelete, onToggleComplete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const isCompleted = todo.completed;
  const [editText, setEditText] = useState(todo.text);

  console.log(isCompleted);

  const handleSave = () => {
    if (editText.trim()) {
      const updatedTodo = { ...todo, text: editText };
      onUpdate(updatedTodo);
    }
    setIsEditing(false);
  };

  return (
    <>
      <div
        onDoubleClick={() => setIsEditing(true)}
        className="flex justify-center text-center -mb-7 bg-white text-lg rounded-t-xl cursor-pointer "
      >
        {isEditing ? (
          <div className="flex flex-col w-full gap-2 items-stretch">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
          </div>
        ) : (
          <span>
            {" "}
            Созданно:{" "}
            {new Date(todo.createdAt).toDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between shadow-2xl bg-gray-100 dark:bg-white p-2 rounded-xl hover:shadow-lg dark:hover:shadow-amber-50 text-2xl h-22 ">
        <div className="flex flex-col ">
          <span
            className={`text-3xl mr-10 ${isCompleted ? "line-through" : ""}`}
          >
            {todo.text}
          </span>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => onToggleComplete(todo.id)}
            className={`text-3xl cursor-pointer ${
              isCompleted
                ? "text-green-300 font-bold text-2xl"
                : "text-gray-400"
            } mr-10`}
          >
            Completed!
          </button>
        </div>

        <button
          className="text-red-600 border-2 cursor-pointer border-red-800 rounded-lg p-2"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </div>
      <div
        className={`flex flex-1 border-black bg-amber-300 -mt-7 px-4 py-2 rounded-b-xl ${
          isCompleted ? "bg-green-300 font-bold text-2xl" : "text-gray-400"
        }`}
      >
        {todo.deadline && (
          <span className="text-gray-500 cursor-pointer">
            Сделать до:
            {isCompleted
              ? " completed "
              : new Date(todo.deadline).toLocaleString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
          </span>
        )}
      </div>
    </>
  );
};
