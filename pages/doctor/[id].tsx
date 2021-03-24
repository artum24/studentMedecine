import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import TimeTableCell from "@/components/TimeTableCell";
import DayScaleCell from "@/components/DayScaleCell";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import Paper from "@material-ui/core/Paper";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";

const Doctor = () => {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    if (!user || (user && user.status !== "doctor")) {
      router.push("/");
    }
  }, [user]);

  const result = useSWR([`/api/doctor/${router.query.id}`], fetcher);
  let dataa = [];
  if (result && result.data) {
    dataa = result.data.records.map((item) => {
      const endDate = new Date(1970, 0, 1, 2, 0);
      const startDate = new Date(1970, 0, 1, 2, 0);
      endDate.setSeconds(item.endDate._seconds);
      startDate.setSeconds(item.startDate._seconds);
      return { ...item, endDate, startDate };
    });
  }
  return (
    <Paper>
      <Scheduler data={dataa} height={660}>
        <ViewState defaultCurrentDate={new Date()} />
        <WeekView
          startDayHour={9}
          endDayHour={16}
          timeTableCellComponent={TimeTableCell}
          dayScaleCellComponent={DayScaleCell}
        />
        <Appointments />
      </Scheduler>
    </Paper>
  );
};

export default Doctor;
