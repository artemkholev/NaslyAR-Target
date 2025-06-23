import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SnackbarProvider } from "notistack";
import StoreProvider from "@/app/providers/StoreProvider";
import I18nProvider from "@/app/providers/I18nProvider";
import AuthProvider from "@/app/providers/AuthProvider";

export const withProviders = <P extends Record<string, unknown>>(App: React.ComponentType<P>) => {
  const ComponentWithProviders = (props: P) => (
    <StoreProvider>
      <I18nProvider>
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>
            <AuthProvider>
              <App {...props} />
              <ToastContainer
                position='bottom-right'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='colored'
              />
            </AuthProvider>
          </BrowserRouter>
        </SnackbarProvider>
      </I18nProvider>
    </StoreProvider>
  );

  return ComponentWithProviders;
};
