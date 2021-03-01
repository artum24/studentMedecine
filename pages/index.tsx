import Head from "next/head";
import React, { useState } from "react";
import useSWR from "swr";
import { GroupSheduleType } from "types/table";
import fetcher from "@/utils/fetcher";
import SearchForm from "@/components/SearchForm";
import StudentFreeDayList from "@/components/StudentFreeDayList";
import { Container, Typography, Divider } from "@material-ui/core";

const Home: React.FC = () => {
  const [groupShedule, setGroupShedule] = useState<GroupSheduleType | null>(
    null
  );
  const [groupName, setGroupName] = useState("");

  const freeTimes = {
    Понеділок: [],
    Вівторок: [],
    Середа: [],
    Четвер: [],
    "П'ятниця": [],
  };
  function getFreeTimes(day: string) {
    groupShedule[day].map((item, index) =>
      item === false ? (freeTimes[day] = [...freeTimes[day], index + 1]) : null
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
  result.data && result.data.group[0] !== groupShedule
    ? setGroupShedule(result.data.group[0])
    : null;
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
          {freeTimes["Понеділок"].length > 0 ? (
            <StudentFreeDayList
              period={freeTimes["Понеділок"]}
              day="Понеділок"
            />
          ) : null}
          {freeTimes["Вівторок"].length > 0 ? (
            <StudentFreeDayList period={freeTimes["Вівторок"]} day="Вівторок" />
          ) : null}
          {freeTimes["Середа"].length > 0 ? (
            <StudentFreeDayList period={freeTimes["Середа"]} day="Середа" />
          ) : null}
          {freeTimes["Четвер"].length > 0 ? (
            <StudentFreeDayList period={freeTimes["Четвер"]} day="Четвер" />
          ) : null}
          {freeTimes["П'ятниця"].length > 0 ? (
            <StudentFreeDayList period={freeTimes["П'ятниця"]} day="П'ятниця" />
          ) : null}
        </>
      ) : groupShedule !== null ? (
        <h1>Група не знайдена</h1>
      ) : null}
    </Container>
  );
};

export default Home;
