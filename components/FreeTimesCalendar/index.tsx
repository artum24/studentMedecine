import React, { useState } from "react";
import { useAuth } from "@/lib/auth";
import DateFnsUtils from "@date-io/date-fns";
import CreateRecord from "../CreateRecord";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Button, Typography } from "@material-ui/core";
import useStyles from "./style";

export type FreeTimeType = {
  day: string;
  id: number;
  list: number[];
};

type Props = {
  freeTimes: FreeTimeType[];
};

const FreeTimesCalendar: React.FC<Props> = ({ freeTimes }) => {
  const classes = useStyles();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [date, setDate] = useState(new Date());
  const freeTimesArr = [];
  const allDays = [0, 1, 2, 3, 4, 5, 6];
  freeTimes.map((item) => item.list.length > 0 && freeTimesArr.push(item.id));
  const result = allDays.filter((item) => !freeTimesArr.includes(item));
  const disableData = (date: Date) => {
    let res;
    for (let i = 0; i < result.length; i++) {
      res = res || date.getDay() === result[i];
    }
    return res;
  };
  return (
    <div className={classes.freeTimes}>
      <CreateRecord
        date={date}
        day={freeTimes.filter((item) => item.id === date.getDay())[0]}
        open={open}
        handleClose={handleClose}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className={classes.date}>
          <DatePicker
            autoOk={false}
            orientation="landscape"
            disablePast
            variant="static"
            openTo="date"
            value={date}
            onChange={setDate}
            shouldDisableDate={disableData}
          />
        </div>
        <div className={classes.isAuth}>
          {user ? (
            <Button
              color="primary"
              variant="contained"
              disabled={!date}
              onClick={handleOpen}
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
