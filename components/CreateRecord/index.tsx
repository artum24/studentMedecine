import { useEffect, useState } from "react";
import axios from "axios";
import CreateRecordForm from "./form";
import useStyles from "./styles";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { FreeTimeType } from "../FreeTimesCalendar";

type Props = {
  open: boolean;
  handleClose: () => void;
  date: Date;
  day: FreeTimeType;
};

type SearchType = { description: string; doctor: string };

function getTime(period: number) {
  switch (period) {
    case 1:
      return "8:30 - 10:05";
    case 2:
      return "10:25 - 12:00";
    case 3:
      return "12:20 - 13:55";
    case 4:
      return "14:15 - 16:50";
  }
}

function formatDate(date: Date, time: string) {
  const timeString = time.split(":");
  const DateInHours = new Date(date.setHours(+timeString[0]));
  const DateInMinutes = new Date(DateInHours.setMinutes(+timeString[1]));
  return new Date(DateInMinutes.setSeconds(0));
}

const CreateRecord: React.FC<Props> = ({ open, day, handleClose, date }) => {
  const classes = useStyles();
  const resultTime = day.list.map((item) => getTime(item));
  const [trueTime, setTrueTime] = useState(null);
  const [records, setRecords] = useState([]);
  console.log(resultTime);
  console.log(records);
  useEffect(() => {
    if (trueTime) {
      const timeDate = trueTime.split("-");
      const startDate = formatDate(date, timeDate[0]);
      axios
        .get("/api/records", { params: { startDate } })
        .then((res) => setRecords(res.data));
    }
  }, [trueTime, day, date]);

  const onSubmit = (data: SearchType) => console.log(data);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Запис до лікаря</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">{day.day}</Typography>
        {resultTime.length === 1 ? (
          resultTime[0]
        ) : (
          <>
            <Typography variant="subtitle2">Оберіть час</Typography>
            {resultTime.map((item) => (
              <Typography
                variant="subtitle1"
                className={`${classes.item} ${
                  item === trueTime && classes.active
                }`}
                onClick={() => setTrueTime(item)}
              >
                {item}
              </Typography>
            ))}
          </>
        )}
        <CreateRecordForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecord;
