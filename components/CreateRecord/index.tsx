import { useState } from "react";
import CreateRecordForm from "./form";
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
  if (period === 1) {
    return "8:30 - 10:05";
  }
  if (period === 2) {
    return "10:25 - 12:00";
  }
  if (period === 3) {
    return "12:20 - 13:55";
  } else return "14:15 - 16:50";
}

function formatDate(date: Date, time: string) {
  const timeString = time.split(":");
  const DateInHours = new Date(date.setHours(+timeString[0]));
  return new Date(DateInHours.setMinutes(+timeString[1]));
}

const CreateRecord: React.FC<Props> = ({ open, day, handleClose, date }) => {
  const [trueTime, setTrueTime] = useState("");
  const resultTime = day.list.map((item) => getTime(item));

  const onSubmit = (data: SearchType) => {
    const timeDate = trueTime.split("-");
    const startDate = formatDate(date, timeDate[0]);
    const endDate = formatDate(date, timeDate[1]);
  };

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
                color={`${item === trueTime ? "primary" : "initial"}`}
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
