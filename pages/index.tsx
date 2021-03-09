import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { GroupSheduleType } from "types/table";
import fetcher from "@/utils/fetcher";
import SearchForm from "@/components/SearchForm";
import StudentFreeDayList from "@/components/StudentFreeDayList";
import { Container, Typography, Divider } from "@material-ui/core";
import { useAuth } from "@/lib/auth";

const Home: React.FC = () => {
  const [groupShedule, setGroupShedule] = useState<GroupSheduleType | null>(
    null
  );
  const [groupName, setGroupName] = useState("");
  const router = useRouter();
  const { user } = useAuth();
  if (user && user.status === "doctor") {
    router.push(`/doctor/${user.email}`);
  }
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
          {freeTimes["Понеділок"].length > 0 && (
            <StudentFreeDayList
              period={freeTimes["Понеділок"]}
              day="Понеділок"
            />
          )}
          {freeTimes["Вівторок"].length > 0 && (
            <StudentFreeDayList period={freeTimes["Вівторок"]} day="Вівторок" />
          )}
          {freeTimes["Середа"].length > 0 && (
            <StudentFreeDayList period={freeTimes["Середа"]} day="Середа" />
          )}
          {freeTimes["Четвер"].length > 0 && (
            <StudentFreeDayList period={freeTimes["Четвер"]} day="Четвер" />
          )}
          {freeTimes["П'ятниця"].length > 0 && (
            <StudentFreeDayList period={freeTimes["П'ятниця"]} day="П'ятниця" />
          )}
        </>
      ) : groupShedule !== null ? (
        <h1>Група не знайдена</h1>
      ) : null}
    </Container>
  );
};

export default Home;
