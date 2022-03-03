import type { AppProps } from "next/app";

import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import { AppContextProvider } from "../context/AppContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}

export default MyApp;
