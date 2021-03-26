import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textAlign: "center",
    },
    link: {
      marginRight: 20,
      marginBottom: 20,
      cursor: "pointer",
    },
  })
);

export default useStyles;
