import React from "react";
import { BaseLayout } from "@/widgets/layouts";
import { withProviders } from "./providers";

type AppProps = {
  Component: React.ComponentType<any>;
  pageProps?: Record<string, any>;
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  );
};

export default withProviders(App);