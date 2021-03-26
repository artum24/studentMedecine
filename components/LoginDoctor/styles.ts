import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    textField: {
      marginTop: 30,
      width: 250,
    },
    button: {
      width: 250,
      marginTop: 30,
      marginBottom: 40,
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
