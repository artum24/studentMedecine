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

const Doctor = () => {
  const router = useRouter();
  const doctorData = data.filter((item) => item.doctorId === +router.query.id);
  return (
    <Paper>
      <Scheduler data={doctorData} height={660}>
        <ViewState defaultCurrentDate="2021-03-01" />
        <WeekView
          startDayHour={9}
          endDayHour={19}
          timeTableCellComponent={TimeTableCell}
          dayScaleCellComponent={DayScaleCell}
        />
        <Appointments />
      </Scheduler>
    </Paper>
  );
};

export default Doctor;
