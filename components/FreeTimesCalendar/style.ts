import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    freeTimes: {
      marginTop: 40,
    },
    date: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    isAuth: {
      marginTop: 30,
      display: "flex",
      justifyContent: "center",
    },
  })
);

export default useStyles;
