

export const TodoItem = ({ todo, onDelete, onToggleComplete }) => {
  const isCompleted = todo.completed;


  
  console.log(isCompleted);

  return (
    <>
      <div className="flex justify-center text-center -mb-7 bg-amber-300 text-lg rounded-t-xl">
        <span>{todo.createdAt}</span>
      </div>
      <div className="flex items-center justify-between bg-gray-200 dark:bg-amber-200 p-2 rounded-xl hover:shadow-lg dark:hover:shadow-amber-50 text-2xl h-22 ">
        <span className={`text-3xl mr-10 ${isCompleted ? "line-through" : ""}`}>
          {todo.text}
        </span>

        <div className="flex items-center">
          <button
            onClick={() => onToggleComplete(todo.id)}
            
            className={`text-3xl cursor-pointer ${
              isCompleted
                ? "text-green-300 font-bold text-2xl"
                : "text-gray-400"
            } mr-10`}
          >
            Task completed!
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
          <span className="text-gray-500">
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
