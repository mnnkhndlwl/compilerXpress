import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../redux/darkModeSlice";

function Navbar() {
  const isDarkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode(isDarkMode));
  };

  return (
    <header
      className={`body-font ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center mb-4 md:mb-0">
          <img
            src="https://i.pinimg.com/736x/35/c5/52/35c55202d43bc1fe185d94c1fbfa4d48.jpg"
            className="w-16 h-16 object-cover text-white p-2 rounded-full"
            alt="Logo"
          />
          <span className="ml-3 text-xl">CompilerXpress</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {/* Add your navigation links here */}
        </nav>
        {/* <button
          className="inline-flex items-center border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0"
          onClick={handleToggleDarkMode}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button> */}

        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            class="sr-only peer"
            onChange={handleToggleDarkMode}
          />
          <div class="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer bg-yellow-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span class={`ml-3 text-sm font-medium ${isDarkMode ? "text-white" : "text-black" }`}>
            {
              isDarkMode ? "dark" : "light"
            }
          </span>
        </label>
      </div>
    </header>
  );
}

export default Navbar;
