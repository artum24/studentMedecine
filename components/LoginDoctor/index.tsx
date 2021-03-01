import { useForm, Controller } from "react-hook-form";
import useStyles from "./styles";
import { Button, TextField } from "@material-ui/core";
import { useAuth } from "@/lib/auth";

type Props = {
  handleClose: () => void;
};

const LoginDoctor: React.FC<Props> = ({ handleClose }) => {
  const auth = useAuth();
  const classes = useStyles();
  const { handleSubmit, control, errors } = useForm();
  const onSubmit = (data: { email: string; password: string }) => {
    auth.signinDoctor(data.email, data.password);
    handleClose();
  };
  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ onChange, value }) => (
          <TextField
            error={errors.login}
            onChange={onChange}
            value={value}
            type="email"
            placeholder="Email"
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
