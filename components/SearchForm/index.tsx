import { Dispatch, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import useStyles from "./styles";
import { Button, TextField, Typography } from "@material-ui/core";
import Select from "react-select";

type Props = {
  setGroupName: Dispatch<any>;
};

type SearchType = { group: string; doctor: string };

const SearchForm: React.FC<Props> = ({ setGroupName }) => {
  const classes = useStyles();
  const { handleSubmit, control, errors } = useForm();
  const isAuth = useState(false);
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
        ]}
        as={Select}
      />
      {errors.doctor && (
        <Typography className={classes.error} variant="subtitle2">
          Виберіть лікаря
        </Typography>
      )}
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
