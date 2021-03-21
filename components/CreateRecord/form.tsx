import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import useStyles from "./styles";
import { Button, TextField, Typography } from "@material-ui/core";

type Props = {
  onSubmit: (data) => void;
};

const CreateRecordForm: React.FC<Props> = ({ onSubmit }) => {
  const classes = useStyles();
  const { handleSubmit, control, errors } = useForm();

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        className={classes.textField}
        name="doctor"
        rules={{ required: true }}
        control={control}
        options={[
          { value: "surgeon@gmail.com", label: "Хірург" },
          { value: "therapist@gmail.com", label: "Логопед" },
          { value: "traumatologist@gmail.com", label: "Травматолог" },
          { value: "oculist@gmail.com", label: "Окуліст" },
          { value: "dentist@gmail.com", label: "Стоматолог" },
        ]}
        as={Select}
      />
      {errors.doctor && (
        <Typography className={classes.error} variant="subtitle2">
          Виберіть лікаря
        </Typography>
      )}
      <Controller
        name="description"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ onChange, value }) => (
          <TextField
            onChange={onChange}
            multiline
            id="outlined-multiline-static"
            rowsMax={3}
            value={value}
            type="text"
            label="Опис проблеми"
            placeholder="Опис проблеми"
            className={classes.textField}
          />
        )}
      />
      <Button
        className={classes.button}
        type="submit"
        color="primary"
        variant="contained"
      >
        Записатися
      </Button>
    </form>
  );
};

export default CreateRecordForm;
