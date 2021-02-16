import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useStyles from "./styles";
import { Button, FormControl, InputLabel, TextField } from "@material-ui/core";
import Select from "react-select";

const SearchForm = () => {
  const classes = useStyles();
  const isAuth = useState(false);
  const { handleSubmit, control, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="group"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => (
          <TextField
            onChange={onChange}
            value={value}
            type="text"
            label="Група"
            placeholder="Група"
            className={classes.textField}
          />
        )}
      />
      <Controller
        className={classes.textField}
        name="doctor"
        control={control}
        options={[
          { value: "Хірург", label: "Хірург" },
          { value: "Логопед", label: "Логопед" },
          { value: "Травматолог", label: "Травматолог" },
        ]}
        as={Select}
      />
      {!isAuth ? (
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => (
            <TextField
              onChange={onChange}
              value={value}
              variant="outlined"
              label="Опис проблеми"
              type="text"
              name="description"
              multiline
              rows={3}
              placeholder="Опис проблеми"
              className={classes.textField}
            />
          )}
        />
      ) : null}

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
