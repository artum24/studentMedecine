import { useRouter } from "next/router";
import { data } from "../../data/data";
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

const Doctor = () => {
  const { user } = useAuth();
  console.log(user);
  const router = useRouter();
  if (!user || user.status !== "doctor") {
    router.push("/");
  }
  const doctorData = data.filter((item) => item.doctorId === router.query.id);
  return (
    <Paper>
      <Scheduler data={doctorData} height={660}>
        <ViewState defaultCurrentDate="2021-03-01" />
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
