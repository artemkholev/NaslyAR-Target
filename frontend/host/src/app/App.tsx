import "./css/index.css";
import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { BaseLayout } from "@/widgets/layouts";
import { withProviders } from "./providers";
import { ProtectedRoute, AppRoutes } from "./router";
import { ErrorBoundary } from "react-error-boundary";
import("@/shared/lib/i18n");

const AuthPage = React.lazy(() => import("auth/AuthPage"));
const UserPage = React.lazy(() => import("@/pages/home-page"));
const PrivacyPolicyPage = React.lazy(() => import("@/pages/privacy-policy"));
const AboutTargetPage = React.lazy(() => import("@/pages/about-target"));

const ErrorFallback: React.FC = () => {
  return <div>Произошла ошибка при загрузке страницы.</div>;
};

const App: React.FC = () => (
  <Routes>
    <Route path={AppRoutes.HOME} element={<BaseLayout />}>
      {/* Публичные маршруты */}
      <Route path={AppRoutes.PRIVACY_POLICY} element={<PrivacyPolicyPage />} />
      <Route path={AppRoutes.ABOUT_TARGET} element={<AboutTargetPage />} />
      {/* Публичные маршруты - микрофронты */}
      <Route
        path={AppRoutes.HOME}
        element={
          <Suspense fallback={<div>Загрузка...</div>}>
            <UserPage />
          </Suspense>
        }
      />
      <Route path={AppRoutes.AUTH}>
        <Route index element={<Navigate to={AppRoutes.AUTH_LOGIN} replace />} />
        <Route
          path='*'
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<div>Загрузка...</div>}>
                <AuthPage />
              </Suspense>
            </ErrorBoundary>
          }
        />
      </Route>

      {/* Защищённые маршруты */}
      <Route element={<ProtectedRoute />}>
        <Route path={AppRoutes.REQUEST} element={<PrivacyPolicyPage />} />
      </Route>

      {/* Перенаправление на главную страницу, если маршрут не найден */}
      <Route path={AppRoutes.NOT_FOUND} element={<Navigate to={AppRoutes.HOME} replace />} />
    </Route>
  </Routes>
);

const AppWithProviders = withProviders(App);
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
