import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Header, Footer, Layout } from "@/layout";
import LoginPage from "./login";
import kakao from "./login/kakao";
import JoinContent from "./join";

export default function App({ Component, pageProps }: AppProps) {
  switch (Component) {
    case LoginPage:
      return <Component {...pageProps} />;
    case JoinContent:
      return <Component {...pageProps} />;
    case kakao:
      return <Component {...pageProps} />;
    default:
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
  }
}
