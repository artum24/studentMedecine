import { AppProps } from "next/dist/next-server/lib/router/router";
import { AuthProvider } from "@/lib/auth";
import Layout from "@/components/Layout";
import Head from "next/head";
import "@/styles/index.scss";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <AuthProvider>
    <Layout>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  </AuthProvider>
);

export default MyApp;
