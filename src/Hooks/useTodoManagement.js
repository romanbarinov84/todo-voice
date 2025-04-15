import { useState ,useEffect} from "react";

export const useTodoManagement = () =>{
    const [todos, setTodos] = useState([]);
    const [deletingId, setDeletingId] = useState(null);
    const [isDeletingCompleted, setIsDeletingCompleted] = useState(false)

    const LOCAL_STORAGE_KEY = "todos";

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
        };  const updatedTodos = [...todos, newToDo];
        setTodos(updatedTodos);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
      };

      const handleUpdate = (updatedTodo) => {
        const updatedTodos = todos.map(todo =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
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

        const hasCompletedTodos = todos.some((todos) => todos.completed);
      
        
        const handleDeleteCompleted = () => {
          if (!hasCompletedTodos) return;
          setIsDeletingCompleted(true);
        };
        
    
    return {
        todos , setTodos ,onAdd,handleUpdate,toggleComplete,handleDelete,confirmDeleteCompleted,handleDeleteCompleted ,hasCompletedTodos,isDeletingCompleted,setDeletingId, deletingId
    }
   
    
}