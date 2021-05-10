import { useEffect, useState } from "react";
import Head from "next/head.d";
import { useRouter } from "next/router";
import axios from "axios";
import { GroupSheduleType } from "types/table";
import SearchForm from "@/components/SearchForm";
import {
  Container,
  Typography,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { useAuth } from "@/lib/auth";
import FreeTimesCalendar from "@/components/FreeTimesCalendar";

let freeTimes = [
  {
    day: "Понеділок",
    id: 1,
    list: [],
  },
  { day: "Вівторок", id: 2, list: [] },
  { day: "Середа", id: 3, list: [] },
  {
    day: "Четвер",
    id: 4,
    list: [],
  },
  {
    day: "П'ятниця",
    id: 5,
    list: [],
  },
];

const Home: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  if (user && user.status === "doctor") {
    router.push(`/doctor/${user.email}`);
  }
  const [groupShedule, setGroupShedule] = useState<GroupSheduleType | null>(
    null
  );
  const [status, setStatus] = useState("idle");

  const [groupName, setGroupName] = useState("");
  useEffect(() => {
    if (groupName !== "" && groupName.length >= 3) {
      setStatus("loading");
      axios
        .get(`/api/student/${groupName.toUpperCase()}`)
        .then((res) => setGroupShedule(res.data.group[0]))
        .then(() => setStatus("idle"));
    }
  }, [groupName]);

  function getFreeTimes(day: string, id: number) {
    groupShedule[day].map((item: boolean, index: number) => {
      if (item === false) {
        const inde = freeTimes.findIndex((item) => item.id === id);
        const FreeTimesLeft = freeTimes.slice(0, inde);
        const FreeTimesRight = freeTimes.slice(inde + 1);
        const newObject = {
          id,
          day,
          list: [...freeTimes[inde].list, index + 1],
        };
        freeTimes = [...FreeTimesLeft, newObject, ...FreeTimesRight];
      }
    });
  }

  if (groupShedule) {
    getFreeTimes("Понеділок", 1);
    getFreeTimes("Вівторок", 2);
    getFreeTimes("Середа", 3);
    getFreeTimes("Четвер", 4);
    getFreeTimes("П'ятниця", 5);
  }

  const updateFreeTimes = freeTimes.map((item) => {
    return {
      ...item,
      list: item.list.filter((i, index) => item.list.indexOf(i) === index),
    };
  });
  return (
    <Container className="home">
      <Head>
        <title>Головна сторінка</title>
        <link
          rel="icon"
          href="https://www.mcicon.com/wp-content/uploads/2020/12/Education_Student_1-copy.jpg"
        />
      </Head>
      <Typography variant="h5" align="center">
        Перегляд графіку та запис до лікаря
      </Typography>
      <Divider light variant="middle" />
      <SearchForm setGroupName={setGroupName} />
      {status === "loading" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: 50,
          }}
        >
          <CircularProgress />
        </div>
      ) : groupShedule ? (
        <>
          <Typography variant="h3" align="center">
            {groupShedule.group}
          </Typography>
          <FreeTimesCalendar freeTimes={updateFreeTimes} />
        </>
      ) : (
        groupShedule !== null && <h1>Група не знайдена</h1>
      )}
    </Container>
  );
};

export default Home;
