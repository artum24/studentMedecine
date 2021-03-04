import React, { useState } from "react";
import { useAuth } from "@/lib/auth";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Typography,
} from "@material-ui/core";
import CreateRecord from "../CreateRecord";

type Props = {
  period: number[];
  day: string;
};

const StudentFreeDayList: React.FC<Props> = ({ period, day }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const openRecord = (time: string) => {
    setTime(time);
    handleClickOpen();
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
  return (
    <div>
      <CreateRecord
        day={day}
        period={time}
        open={open}
        handleClose={handleClose}
      />
      <Typography variant="subtitle1">{day}</Typography>
      <List component="nav">
        {period.map((item) => (
          <ListItem key={item}>
            <ListItemText primary={getTime(item)} />
            {user ? (
              <Button
                onClick={() => openRecord(getTime(item))}
                color="primary"
                variant="outlined"
              >
                Записатися
              </Button>
            ) : null}
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
};

export default StudentFreeDayList;
