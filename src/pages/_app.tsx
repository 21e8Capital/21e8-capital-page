import localFont from "next/font/local";
import { Footer, Navbar, Wrapper } from "@/components/ui";
import "@/styles/main.scss";
import Head from "next/head";
import { ContextProvider } from "@/utils/context";

const menlo = localFont({
  src: "../../public/fonts/menlo.ttf",
  variable: "--menlo",
});

const App = ({ Component, pageProps }: any) => {
  return (
    <ContextProvider>
      <Head>
        <title>21e8 Capital</title>
      </Head>
      <Navbar />
      <Wrapper className={menlo.variable}>
        <Component {...pageProps} />
      </Wrapper>
      <Footer />
    </ContextProvider>
  );
};

export default App;
