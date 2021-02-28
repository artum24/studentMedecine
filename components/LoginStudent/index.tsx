import React from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import useStyles from "./styles";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/lib/auth";

type Props = {
  handleClose: () => void;
};

const LoginStudent: React.FC<Props> = ({ handleClose }) => {
  const classes = useStyles();
  const auth = useAuth();
  const login = () => {
    auth.signinWithGoogle();
    handleClose();
  }
  return (
    <DialogActions className={classes.root}>
      <Button
        startIcon={<FcGoogle />}
        className={classes.button}
        onClick={login}
      >
        Login with Google
      </Button>
    </DialogActions>
  );
};

export default LoginStudent;
