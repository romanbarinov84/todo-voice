

const TodoFilter = ({filter,setFilter}) => {

    const buttonClasses = (currentFilter) => 
        `px-4 py-2 rounded transition-color cursor-pointer ${
            filter === currentFilter ? "bg-blue-400 text-white" : "bg-blue-200 dark:bg-gray-700 hover:bg-blue-300"
        }`
    return (
        <>
        <div className="flex gap-3 mb-3 shadow-xl justify-between">
            <button onClick={() => setFilter("all")} className={buttonClasses("all")}>Все</button>
            <button onClick={() => setFilter("completed")} className={buttonClasses("completed")}>Выполненные</button>
            <button onClick={() => setFilter("active")} className={buttonClasses("active")}>Не выполненные</button>
        </div>
        </>
    )
}

export default TodoFilter;