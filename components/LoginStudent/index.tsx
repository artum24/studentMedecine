import React from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import useStyles from "./styles";
import { FcGoogle } from "react-icons/fc";

type Props = {
  handleClose: () => void;
};

const LoginStudent: React.FC<Props> = ({ handleClose }) => {
  const classes = useStyles();
  return (
    <>
      <DialogActions className={classes.root}>
        <Button
          startIcon={<FcGoogle />}
          className={classes.button}
          onClick={handleClose}
        >
          Login with Google
        </Button>
      </DialogActions>
    </>
  );
};

export default LoginStudent;
