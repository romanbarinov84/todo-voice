import { useState } from "react";

export function AddToDo({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center bg-gray-50 rounded-lg shadow-lg overflow-hidden border-b-gray-300 focus-within:ring-5 focus-within:ring-blue-300 p-2">
        <input className=" flex-1 p-3 font-bold text-3xl text-gray-500 dark:bg-white-200 outline-none "
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="add to text" 
        
      />
      <button className="text-6xl cursor-pointer hover:shadow-lg items-center justify-center text-center text-gray-300 p-2 " type="submit">+</button>
      </div>
      
    </form>
  );
}
