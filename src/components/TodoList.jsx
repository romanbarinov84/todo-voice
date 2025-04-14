import { TodoItem } from "./TodoItem"

export default function TodoList({todos, handleUpdate, toggleComplete, setDeletingId}) {

    return(
        <>
          <div className="flex flex-col gap-6 ">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={() => setDeletingId(todo.id)}
                onToggleComplete={toggleComplete}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        </>
    )
}