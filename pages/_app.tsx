import { AppProps } from "next/dist/next-server/lib/router/router";
import "@/styles/index.scss";
import Layout from "@/components/Layout";
import Head from "next/head";
import { AuthProvider } from "@/lib/auth";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
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
};

export default MyApp;
