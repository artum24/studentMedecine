import SearchForm from "@/components/SearchForm";
import { Container, Typography, Divider } from "@material-ui/core";
import Head from "next/head";

const Home: React.FC = () => {
  return (
    <Container className="home">
      <Head>
        <title>Main page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant="h5" align="center">
        Перегляд графіку та запис до лікаря
      </Typography>
      <Divider light variant="middle" className="home__divider" />
      <SearchForm />
    </Container>
  );
};

export default Home;
