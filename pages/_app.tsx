import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AppContextProvider } from "../context/AppContext";

import Layout from "../components/Layout/Layout";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <AppContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContextProvider>
    </SessionProvider>
  );
};

export default App;
