import Head from "next/head";
import { AppProps } from "next/app";
import { hero } from "@/copy/text";
import { ContextProvider } from "@/utils/context";
import { Footer, Navbar, Wrapper } from "@/components/ui";
import "@/styles/main.scss";

const App = ({ Component, pageProps }: AppProps) => (
  <ContextProvider>
    <Head>
      <title>21e8 Capital</title>
      <meta name="description" content={hero.paragraphs[0]} />
    </Head>
    <Navbar />
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
    <Footer />
  </ContextProvider>
);

export default App;
