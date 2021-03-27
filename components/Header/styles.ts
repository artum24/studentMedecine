import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginTop: 20,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 50,
    },
    login: {
      display: "flex",
      alignItems: "center",
    },
  })
);

export default useStyles;
