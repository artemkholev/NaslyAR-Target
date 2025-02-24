import "./css/index.css";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { BaseLayout } from "@/widgets/layouts";
import { withProviders } from "./providers";
import("@/shared/lib/i18n");
// Ленивая загрузка компонентов
const AuthPage = React.lazy(() => import("auth/AuthPage"));
// const UserPage = React.lazy(() => import("user/UserPage"));

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<BaseLayout />}>
        {/* <Route index element={<HomePage />} /> */}
        {/* <Route
          path='/'
          element={<Suspense fallback={<div>Загрузка...</div>}>{<UserPage />}</Suspense>}
        /> */}
        <Route
          path='auth'
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <AuthPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

// Оборачиваем App с помощью withProviders
const AppWithProviders = withProviders(App);

// Получаем корневой элемент
const rootElement = document.getElementById("app");

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
