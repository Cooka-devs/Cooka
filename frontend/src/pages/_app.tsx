import { Layout } from "@/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import JoinContent from "./join";
import LoginPage from "./login";
import kakao from "./login/kakao";

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
