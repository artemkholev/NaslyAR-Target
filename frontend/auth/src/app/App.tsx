import "./css/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthPage } from "@/pages/auth-page";

const App: React.FC = () => {
  return (
    <div className="">
      <AuthPage />
    </div>
  );
};

// Получаем корневой элемент
const rootElement = document.getElementById("app");

if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

// Создаем корень и рендерим приложение
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
