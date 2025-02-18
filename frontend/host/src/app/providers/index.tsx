import React from "react";
import StoreProvider from "@/app/providers/StoreProvider";
import I18nProvider from "@/app/providers/I18nProvider";

export const withProviders = <P extends Record<string, unknown>>(
  App: React.ComponentType<P>
) => {
  const ComponentWithProviders = (props: P) => (
    <StoreProvider>
      <I18nProvider>
        <App {...props} />
      </I18nProvider>
    </StoreProvider>
  );

  return ComponentWithProviders;
};