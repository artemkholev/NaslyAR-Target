import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BaseLayout } from "@/widgets/layouts";
import("@/shared/lib/i18n");
import "./css/index.css";
// Ленивая загрузка компонентов
// const AuthPage = React.lazy(() => import("auth/AuthPage"));
const UserPage = React.lazy(() => import("user/UserPage"));

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<BaseLayout />}>
        {/* <Route index element={<HomePage />} /> */}
        <Route
          path='/'
          element={<Suspense fallback={<div>Загрузка...</div>}>{<UserPage />}</Suspense>}
        />
        {/* <Route
          path="/auth"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <AuthPage />
            </Suspense>
          }
        /> */}
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
