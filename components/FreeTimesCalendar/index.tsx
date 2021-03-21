import React, { useState } from "react";
import { useAuth } from "@/lib/auth";
import DateFnsUtils from "@date-io/date-fns";
import CreateRecord from "../CreateRecord";
import {
  DatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { Button, Typography } from "@material-ui/core";

type Props = {
  freeTimes: {
    Понеділок: {
      id: number;
      list: number[] | [];
    };
    Вівторок: {
      id: number;
      list: number[] | [];
    };
    Середа: {
      id: number;
      list: number[] | [];
    };
    Четвер: {
      id: number;
      list: number[] | [];
    };
    "П'ятниця": {
      id: number;
      list: number[] | [];
    };
  };
};

const FreeTimesCalendar: React.FC<Props> = ({ freeTimes }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [date, setDate] = useState(new Date());
  const freeTimesArr = [];
  const allDays = [0, 1, 2, 3, 4, 5, 6];
  for (let key in freeTimes) {
    if (freeTimes[key].list.length > 0) freeTimesArr.push(freeTimes[key].id);
  }
  const result = allDays.filter((item) => !freeTimesArr.includes(item));
  const disableData = (date: Date) => {
    let res;
    for (let i = 0; i < result.length; i++) {
      res = res || date.getDay() === result[i];
    }
    return res;
  };
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
  const disableTime = (date: Date) => {};
  return (
    <div className="freeTimes">
      <CreateRecord date={date} open={open} handleClose={handleClose} />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="freeTimes__date">
          <DatePicker
            autoOk
            orientation="landscape"
            variant="static"
            openTo="date"
            value={date}
            onChange={setDate}
            shouldDisableDate={disableData}
          />
          <KeyboardTimePicker
            autoOk
            orientation="landscape"
            variant="static"
            openTo="hours"
            value={date}
            onChange={setDate}
            // shouldDisableDate={disableData}
          />
        </div>

        <div className="freeTimes__isAuth">
          {user ? (
            <Button
              onClick={handleClickOpen}
              color="primary"
              variant="contained"
            >
              Записатися
            </Button>
          ) : (
            <Typography variant="subtitle1">
              Авторизуйтеся для запису до лікаря
            </Typography>
          )}
        </div>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default FreeTimesCalendar;
