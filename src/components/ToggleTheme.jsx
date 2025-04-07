export function ToggleTheme({ toggleTheme}) {
  return (
    <div>
      <div className="flex items-center cursor-pointer   rounded-xl p-7  justify-center ">
        <button className="relative" onClick={toggleTheme}>
          <div className="w-44 h-10  rounded-full shadow-inner transition-colors duration-300 bg-gray-300 mb-6 dark:bg-btn-dark text-2xl text-1xl font-bold cursor-pointer">
            Toggle theme
          </div>
        </button>
      </div>
    </div>
  );
}
