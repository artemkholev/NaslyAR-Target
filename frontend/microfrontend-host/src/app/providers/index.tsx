import React, { ReactNode } from "react";
import StoreProvider from "@/app/providers/StoreProvider";
import I18nProvider from "@/app/providers/I18nProvider";

type WithProvidersProps = {
  children: ReactNode;
};

export const withProviders = (App: React.ComponentType<any>) => {
  return (props: any) => (
    <StoreProvider>
      <I18nProvider>
        <App {...props} />
      </I18nProvider>
    </StoreProvider>
  );
};