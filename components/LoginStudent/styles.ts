import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      margin: theme.spacing(4),
    },
    button: {
      width: 250,
    },
    login: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    }
  })
);

export default useStyles;
