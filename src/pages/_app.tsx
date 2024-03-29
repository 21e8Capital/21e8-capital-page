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
      <meta property="og:url" content="https://21e8.capital/" />
      <meta property="og:title" content="21e8 Capital" />
      <meta property="og:description" content={heroCopy.paragraphs[0]} />
      <meta
        property="og:image"
        content="https://21e8.capital/android-chrome-512x512.png"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@21e8Capital" />
      <meta name="twitter:creator" content="@21e8Capital" />
      <meta
        name="googlebot"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
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
