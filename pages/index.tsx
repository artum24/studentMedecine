import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import SearchForm from "@/components/SearchForm";
import { Container, Typography, Divider } from "@material-ui/core";

const Home: React.FC = () => {
  const [groupShedule, setGroupShedule] = useState(null);
  const [groupName, setGroupName] = useState("");
  const result = useSWR([`/api/student/${groupName}`], fetcher);
  result.data && result.data.group[0] !== groupShedule
    ? setGroupShedule(result.data.group[0])
    : null;
  console.log(groupShedule);
  return (
    <Container className="home">
      <Head>
        <title>Головна сторінка</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant="h5" align="center">
        Перегляд графіку та запис до лікаря
      </Typography>
      <Divider light variant="middle" className="home__divider" />
      <SearchForm setGroupName={setGroupName} />
    </Container>
  );
};

export default Home;
