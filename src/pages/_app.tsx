import dynamic from "next/dynamic";
import Head from "next/head";
import { AppProps } from "next/app";
import { SkeletonTheme } from "react-loading-skeleton";
import { heroCopy } from "@/copy";
import { ContextProvider } from "@/utils/context";
import { Footer, Navbar, Wrapper } from "@/components/ui";

const DynamicTheme = dynamic(() => import("@/utils/themeProvider"), {
  ssr: false,
});

import "@/styles/main.scss";
import "react-loading-skeleton/dist/skeleton.css";

const App = ({ Component, pageProps }: AppProps) => (
  <ContextProvider>
    <Head>
      <title>21e8 Capital</title>
      <meta name="description" content={heroCopy.paragraphs[0]} />
    </Head>
    <DynamicTheme>
      <Navbar />
      <Wrapper>
        <SkeletonTheme baseColor="#ffd755" highlightColor="#ffff">
          <Component {...pageProps} />
        </SkeletonTheme>
      </Wrapper>
      <Footer />
    </DynamicTheme>
  </ContextProvider>
);

export default App;
