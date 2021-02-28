import { Dispatch } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import useStyles from "./styles";
import { Button, TextField, Typography } from "@material-ui/core";

type Props = {
  setGroupName: Dispatch<any>;
};

type SearchType = { group: string; doctor: string };

const SearchForm: React.FC<Props> = ({ setGroupName }) => {
  const classes = useStyles();
  const { handleSubmit, control, errors } = useForm();
  const onSubmit = (data: SearchType) => setGroupName(data.group);

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="group"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ onChange, value }) => (
          <TextField
            error={errors.group}
            onChange={onChange}
            value={value}
            type="text"
            label="Група"
            placeholder="Група"
            className={classes.textField}
            helperText={errors.group ? "Введіть групу" : null}
          />
        )}
      />
      <Controller
        className={classes.textField}
        name="doctor"
        rules={{ required: true }}
        control={control}
        options={[
          { value: "Хірург", label: "Хірург" },
          { value: "Логопед", label: "Логопед" },
          { value: "Травматолог", label: "Травматолог" },
          { value: "Окуліст", label: "Окуліст" },
          { value: "Стоматолог", label: "Стоматолог" },
        ]}
        as={Select}
      />
      {errors.doctor && (
        <Typography className={classes.error} variant="subtitle2">
          Виберіть лікаря
        </Typography>
      )}
      <Button
        className={classes.button}
        type="submit"
        color="primary"
        variant="contained"
      >
        Пошук
      </Button>
    </form>
  );
};

export default SearchForm;
