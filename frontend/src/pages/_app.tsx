import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Header, Footer, Layout } from "@/layout";
import LoginPage from "./login";

export default function App({ Component, pageProps }: AppProps) {
  console.log("Component:", typeof Component);
  console.log("pageProps:", pageProps);

  switch (Component) {
    case LoginPage:
      return <Component {...pageProps} />;
    default:
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
  }
}
