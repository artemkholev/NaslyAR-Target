import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import { ReactNode } from "react";

interface I18nProviderProps extends AppProps {
  children: ReactNode;
}

const I18nProvider = ({ children }: I18nProviderProps) => {
  return <>{children}</>;
};

export default appWithTranslation(I18nProvider);
