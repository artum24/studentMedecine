import React from "react";
import { useForm, Controller } from "react-hook-form";
import useStyles from "./styles";
import {
  Button,
  TextField,
} from "@material-ui/core";

type Props = {
  handleClose: () => void;
};

const LoginDoctor: React.FC<Props> = ({ handleClose }) => {
  const classes = useStyles();
  const { handleSubmit, control, errors } = useForm();
  const onSubmit = (data: any) => handleClose();
  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="login"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ onChange, value }) => (
          <TextField
            error={errors.login}
            onChange={onChange}
            value={value}
            type="text"
            placeholder="Login"
            className={classes.textField}
            helperText={errors.login ? "Введіть логін" : null}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ onChange, value }) => (
          <TextField
            error={errors.password}
            onChange={onChange}
            value={value}
            type="password"
            placeholder="Password"
            className={classes.textField}
            helperText={errors.password ? "Введіть пароль" : null}
          />
        )}
      />
      <Button
        className={classes.button}
        type="submit"
        color="primary"
        variant="contained"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginDoctor;
