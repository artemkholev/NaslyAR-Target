import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/app/providers";
import { AppRoutes } from "@/app/routes";
import { createRoot } from 'react-dom/client';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

// Получаем корневой элемент
const rootElement = document.getElementById("app");

if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

// Создаем корень и рендерим приложение
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
