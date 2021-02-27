import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Typography,
} from "@material-ui/core";

type Props = {
  period: number[];
  day: string;
};

const StudentFreeDayList: React.FC<Props> = ({ period, day }) => {
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
      <Typography variant="subtitle1">{day}</Typography>
      <List component="nav">
        {period.map((item) => (
          <ListItem key={item}>
            <ListItemText primary={getTime(item)} />
            <Button color="primary" variant="outlined">
              Записатися
            </Button>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
};

export default StudentFreeDayList;
