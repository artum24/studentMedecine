import TableStyles from "@/styles/material-ui/TableStyles";
import { WeekView } from "@devexpress/dx-react-scheduler-material-ui";

const DayScaleCell = (props) => {
  const classes = TableStyles();
  const { startDate, today } = props;
  if (today) {
    return <WeekView.DayScaleCell {...props} className={classes.today} />;
  }
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <WeekView.DayScaleCell {...props} className={classes.weekend} />;
  }
  return <WeekView.DayScaleCell {...props} />;
};

export default DayScaleCell;
