import { useAuth } from "@/lib/auth";
import useStyles from "./styles";
import { FcGoogle } from "react-icons/fc";
import { Button, DialogActions } from "@material-ui/core";

type Props = {
  handleClose: () => void;
};

const LoginStudent: React.FC<Props> = ({ handleClose }) => {
  const classes = useStyles();
  const auth = useAuth();
  const login = () => {
    auth.signinWithGoogle();
    handleClose();
  };
  return (
    <DialogActions className={classes.root}>
      <div className="login__student">
        <Button
          startIcon={<FcGoogle />}
          className={classes.button}
          onClick={login}
        >
          Login with Google
        </Button>
      </div>
    </DialogActions>
  );
};

export default LoginStudent;
