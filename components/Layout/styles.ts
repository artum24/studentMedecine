import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    layout: {
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
      minHeight: "100vh",
    },
    alert: {
      position: 'fixed',
      width: '100%',
    },
  })
);

export default useStyles;
