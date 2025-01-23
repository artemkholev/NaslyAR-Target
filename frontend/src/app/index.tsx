import NextNProgress from "nextjs-progressbar";
import type { AppProps } from "next/app";
import { BaseLayout } from "@/widgets/layouts";
import StoreProvider from "@/app/providers/StoreProvider";
import I18nProvider from "@/app/providers/I18nProvider";
import { withProviders } from "./providers";

import "@/shared/lib/i18n";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <NextNProgress color='var(--color-primary)' height={3} options={{ showSpinner: false }} />
    <StoreProvider>
      <I18nProvider>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </I18nProvider>
    </StoreProvider>
  </>
);

export default withProviders(App);
