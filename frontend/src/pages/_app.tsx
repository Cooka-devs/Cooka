import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "./yoon/components/Header";
import Footer from "./yoon/components/Footer";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
