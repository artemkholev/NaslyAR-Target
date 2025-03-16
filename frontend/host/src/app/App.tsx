import "./css/index.css";
import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { BaseLayout } from "@/widgets/layouts";
import { withProviders } from "./providers";
import { ProtectedRoute } from "./router";
import { ErrorBoundary } from "react-error-boundary";
import("@/shared/lib/i18n");

// Ленивая загрузка компонентов
const AuthPage = React.lazy(() => import("auth/AuthPage"));
const UserPage = React.lazy(() => import("@/pages/home-page"));

const ErrorFallback: React.FC = () => {
  return <div>Произошла ошибка при загрузке страницы.</div>;
};

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<BaseLayout />}>
        {/* Публичные маршруты */}
        <Route
          path='/'
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <UserPage />
            </Suspense>
          }
        />
          <Route
            path='auth'
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<div>Загрузка...</div>}>
                  <AuthPage />
                </Suspense>
              </ErrorBoundary>
            }
          />
        
        {/* Защищённые маршруты */}
        <Route element={<ProtectedRoute />}>
      
        </Route>

        {/* Перенаправление на главную страницу, если маршрут не найден */}
        <Route path='*' element={<Navigate to='/' replace />} />
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
  // <React.StrictMode>
  <AppWithProviders />
  // </React.StrictMode>
);