import { useState } from "react";

export const TodoItem = ({ todo, onDelete }) => {
  const [isCompleted , setIsCompleted] = useState(false);
  return (
    <div className="flex items-center justify-between bg-gray-200 dark:bg-amber-200 p-2 rounded-xl hover:shadow-lg dark:hover:shadow-amber-50 text-2xl h-22">
      
        
      <span className={`text-3xl mr-10 ${!isCompleted ? "line-through" : ""}`}>{todo.text}</span>
        
      <div className="flex items-center">
      <button onClick={() => setIsCompleted(!isCompleted)} className={`text-3xl cursor-pointer ${!isCompleted ? "text-green-300 font-bold text-2xl" :"text-gray-400"} mr-10`} >Task completed!</button>
      </div>
      <button className="text-red-600 border-2 cursor-pointer border-red-800 rounded-lg p-2 " onClick={() => onDelete(todo.id)}>Dellete</button>
    </div>
  );
};
       
