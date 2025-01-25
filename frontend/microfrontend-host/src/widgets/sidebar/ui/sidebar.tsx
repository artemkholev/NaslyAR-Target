import { useState } from "react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Кнопка для открытия/закрытия */}
      <button
        className="p-2 bg-blue-500 text-white fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <nav className="flex flex-col h-full">
          <h2 className="text-xl font-bold p-4">Sidebar</h2>
          <ul className="flex flex-col flex-grow">
            <li className="p-4 hover:bg-gray-700">
              <link href="/">Home</link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <link href="/about">About</link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <link href="/contact">Contact</link>
            </li>
          </ul>
          <div className="p-4 text-sm">© 2025 Your Company</div>
        </nav>
      </div>

      {/* Основной контент */}
      <main className={`flex-grow ${isOpen ? "ml-64" : ""} transition-all`}>
        <div className="p-4">
          <h1 className="text-2xl">Welcome to the Main Content</h1>
          <p>This is where your main content will go.</p>
        </div>
      </main>
    </div>
  );
}
