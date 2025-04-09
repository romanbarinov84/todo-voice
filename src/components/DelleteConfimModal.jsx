const DeleteConfirmModal = ({onCancel,onConfirm}) => {
  return (
    <>
     <div className="fixed inset-0">
        <div className="absolute inset-0 bg-black/50 z-4 backdrop-blur-xs"></div>
        <div className="relative flex h-full items-center justify-center p-4 z-5">
            <div className="p-6 rounded-lg shadow-xl max-w-md w-full mx-4 bg-white text-gray-800 dark:bg-gray-800 dark:text-white">
                <h3 className="text-xl font-bold mb-4">Подтверждение удаления</h3>
                <p className="mb-6 text-m">Вы уверенны что хотите удалить эту задачу</p>
                <div className="flex justify-end gap-4">
                    <button onClick={onCancel} className="text-gray-500 text-xl hover:text-gray-700 cursor-pointer">Отмена</button>
                    <button onClick={onConfirm} className="text-red-600 text-xl hover:text-red-700 cursor-pointer">Удалить</button>
                </div>
            </div>
        </div>
     </div>
    </>
  );

            
};

export default DeleteConfirmModal;
