import React from "react";
import StoreProvider from "@/app/providers/StoreProvider";
import I18nProvider from "@/app/providers/I18nProvider";
import AuthProvider from "@/app/providers/AuthProvider";

export const withProviders = <P extends Record<string, unknown>>(App: React.ComponentType<P>) => {
  const ComponentWithProviders = (props: P) => (
    <StoreProvider>
      <AuthProvider>
        <I18nProvider>
          <App {...props} />
        </I18nProvider>
      </AuthProvider>
    </StoreProvider>
  );

  return ComponentWithProviders;
};
