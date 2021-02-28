import { useState } from "react";
import LoginDoctor from "../LoginDoctor";
import LoginStudent from "../LoginStudent";
import { Dialog, DialogTitle, Typography } from "@material-ui/core";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const Login: React.FC<Props> = ({ open, handleClose }) => {
  const [loginStudent, setLoginStudent] = useState(true);
  const changeLogin = () => setLoginStudent(!loginStudent);
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}>
      <DialogTitle style={{ textAlign: "center" }} id="form-dialog-title">
        Login
      </DialogTitle>
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
        style={{ marginRight: 20, marginBottom: 20, cursor: "pointer" }}
      >
        Війти як {loginStudent ? "лікар" : "студент"}
      </Typography>
    </Dialog>
  );
};

export default Login;
