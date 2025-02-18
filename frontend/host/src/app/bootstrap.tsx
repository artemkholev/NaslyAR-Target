import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { withProviders } from "./providers";

// Оборачиваем App с помощью withProviders
const AppWithProviders = withProviders(App);

// Получаем корневой элемент
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

// Создаем корень и рендерим приложение
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AppWithProviders />
  </React.StrictMode>
);
