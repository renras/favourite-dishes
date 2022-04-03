import type { AppProps } from "next/app";

import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import { AppContextProvider } from "../context/AppContext";
import { AuthContextProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
