import TableStyles from "@/styles/material-ui/TableStyles";
import { WeekView } from "@devexpress/dx-react-scheduler-material-ui";

const TimeTableCell = (props) => {
  const classes = TableStyles();
  const { startDate } = props;
  const date = new Date(startDate);

  if (date.getDate() === new Date().getDate()) {
    return <WeekView.TimeTableCell {...props} className={classes.todayCell} />;
  }
  if (date.getDay() === 0 || date.getDay() === 6) {
    return (
      <WeekView.TimeTableCell {...props} className={classes.weekendCell} />
    );
  }
  return <WeekView.TimeTableCell {...props} />;
};

export default TimeTableCell;
