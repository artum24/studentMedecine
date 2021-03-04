import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    textField: {
      marginTop: theme.spacing(4),
      width: 250,
    },
    button: {
      width: 250,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(5),
    },
    error: {
      color: "#f44336",
      fontSize: "0.75rem",
      textAlign: "left",
      fontWeight: 400,
    },
  })
);

export default useStyles;
