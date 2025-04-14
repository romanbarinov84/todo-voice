const DeleteCompletedButton = ({ hasCompletedTodos, onClick }) => {
  if (!hasCompletedTodos) return null;

  return (
    <button
      onClick={onClick}
      className="bg-gray-400 text-xl text-white p-2 rounded-xl -mt-6 mb-2"
    >
      Удалить выполненные задачи
    </button>
  );
};

export default DeleteCompletedButton;
