import { useState } from "react";

export function AddToDo({ onAdd }) {
  const [text, setText] = useState("");
  const [deadline , setDeadline] = useState("");
  const [showDeadlineInput , setShowDeadlineInput] = useState(false)

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
      {showDeadlineInput && (
          <div className="flex items-center justify-between text-2xl">
        <input className="p-2 outline-none rounded-lg shadow-lg flex-1 mt-2" type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        <button className="p-3 shadow-lg rounded-xl text-gray-500 hover:shadow-xl" type="button" onClick={() => {setDeadline(""); setShowDeadlineInput(false)}} >Отмена</button>
      </div>
      )}
      {!showDeadlineInput && (
          
       
        <button className="self-start text-2xl p-3 shadow-lg rounded-xl text-gray-500 hover:shadow-xl" type="button" onClick={() => { setShowDeadlineInput(true)}} >+ deadline</button>
      
      )}
    
    </form>
  )
}
