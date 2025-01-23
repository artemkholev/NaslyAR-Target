import React from "react";
import { useSelector } from "react-redux";
import { selectSidebarState } from "@/features/sidebar/model/selectors";

export const Sidebar: React.FC = () => {
  const isSidebarOpen = useSelector(selectSidebarState);

  return (
    <div
      className={`sidebar ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="flex flex-col h-full">
        <h2 className="text-xl font-bold p-4">Sidebar</h2>
        <ul className="flex flex-col flex-grow">
          <li className="p-4 hover:bg-gray-700">
            <a href="/">Home</a>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <a href="/about">About</a>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
