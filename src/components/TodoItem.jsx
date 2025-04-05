export const TodoItem = ({ todo, onDelete }) => {
  return (
    <div>
      <div>
        <div>
          <span>{todo.text}</span>
        </div>
      <button>Task completed!</button>
      </div>
      <button onClick={() => onDelete(todo.id)}>Dellete</button>
    </div>
  );
};
       
