import { useState } from "react";
import LoginDoctor from "../LoginDoctor";
import LoginStudent from "../LoginStudent";
import { Dialog, DialogTitle, Typography } from "@material-ui/core";
import useStyles from "./styles";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const Login: React.FC<Props> = ({ open, handleClose }) => {
  const classes = useStyles();
  const [loginStudent, setLoginStudent] = useState(true);
  const changeLogin = () => setLoginStudent(!loginStudent);
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}>
      <DialogTitle className={classes.title}>Login</DialogTitle>
      {loginStudent ? (
        <LoginStudent handleClose={handleClose} />
      ) : (
        <LoginDoctor handleClose={handleClose} />
      )}
      <Typography
        color="primary"
        align="right"
        variant="subtitle1"
        onClick={changeLogin}
        className={classes.link}
      >
        Війти як {loginStudent ? "лікар" : "студент"}
      </Typography>
    </Dialog>
  );
};

export default Login;
