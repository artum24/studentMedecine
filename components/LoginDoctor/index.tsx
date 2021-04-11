import { useForm, Controller } from "react-hook-form";
import { useAuth } from "@/lib/auth";
import useStyles from "./styles";
import { Button, TextField, Typography } from "@material-ui/core";

type Props = {
  handleClose: () => void;
};

const LoginDoctor: React.FC<Props> = ({ handleClose }) => {
  const auth = useAuth();
  const { handleSubmit, control, errors } = useForm();
  const onSubmit = (data: { email: string; password: string }) => {
    auth.signinDoctor(data.email, data.password);
    if (!auth.userError && auth.userError !== null) {
      handleClose();
    }
  };
  const classes = useStyles();

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ onChange, value }) => (
          <TextField
            error={errors.email}
            onChange={onChange}
            value={value}
            type="email"
            placeholder="Email"
            className={classes.textField}
            helperText={errors.email && "Введіть email"}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: true, minLength: 5 }}
        render={({ onChange, value }) => (
          <TextField
            error={errors.password}
            onChange={onChange}
            value={value}
            type="password"
            placeholder="Password"
            className={classes.textField}
            helperText={
              errors.password?.type === "required"
                ? "Поле пусте"
                : errors.password?.type === "minLength"
                ? "Мінімальна довжина 6 символів"
                : null
            }
          />
        )}
      />
      {auth.userError && (
        <Typography variant="subtitle1" color="secondary">
          Не вірний пароль або email
        </Typography>
      )}
      <Button
        className={classes.button}
        disabled={Object.keys(errors).length !== 0}
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
