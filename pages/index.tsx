import Head from "next/head";

const Home: React.FC = () => {
  return (
    <div className="main">
      <Head>
        <title>Main page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Main</h1>
    </div>
  );
};

export default Home;
