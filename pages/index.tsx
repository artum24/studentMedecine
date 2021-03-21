import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import { GroupSheduleType } from "types/table";
import fetcher from "@/utils/fetcher";
import SearchForm from "@/components/SearchForm";
import { Container, Typography, Divider } from "@material-ui/core";
import { useAuth } from "@/lib/auth";
import FreeTimesCalendar from "@/components/FreeTimesCalendar";

const Home: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  if (user && user.status === "doctor") {
    router.push(`/doctor/${user.email}`);
  }

  const [groupShedule, setGroupShedule] = useState<GroupSheduleType | null>(
    null
  );

  const [groupName, setGroupName] = useState("");

  const freeTimes = {
    Понеділок: {
      id: 1,
      list: [],
    },
    Вівторок: {
      id: 2,
      list: [],
    },
    Середа: {
      id: 3,
      list: [],
    },
    Четвер: {
      id: 4,
      list: [],
    },
    "П'ятниця": {
      id: 5,
      list: [],
    },
  };

  function getFreeTimes(day: string) {
    groupShedule[day].map(
      (item: boolean, index: number) =>
        item === false &&
        (freeTimes[day].list = [...freeTimes[day].list, index + 1])
    );
  }

  if (groupShedule) {
    getFreeTimes("Понеділок");
    getFreeTimes("Вівторок");
    getFreeTimes("Середа");
    getFreeTimes("Четвер");
    getFreeTimes("П'ятниця");
  }

  const result = useSWR([`/api/student/${groupName.toUpperCase()}`], fetcher);
  result.data &&
    result.data.group[0] !== groupShedule &&
    setGroupShedule(result.data.group[0]);
  
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
      {groupShedule ? (
        <>
          <Typography variant="h3" align="center">
            {groupShedule.group}
          </Typography>
          <FreeTimesCalendar freeTimes={freeTimes} />
        </>
      ) : (
        groupShedule !== null && <h1>Група не знайдена</h1>
      )}
    </Container>
  );
};

export default Home;
