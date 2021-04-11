import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { SearchType, RecordsType } from "./types";
import useStyles from "./styles";
import { Button, TextField, Typography } from "@material-ui/core";
import { doctorOption } from "./doctorOption";

type Props = {
  onSubmit: (data: SearchType) => void;
  records: any;
};

const CreateRecordForm: React.FC<Props> = ({ onSubmit, records }) => {
  const classes = useStyles();
  const { handleSubmit, control, errors } = useForm();
  const recordsId = records.records
    ? records.records.map((item) => item.doctorId)
    : [];
  const checkOptions = doctorOption.filter(
    (item) => !recordsId.includes(item.value)
  );
  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        className={classes.textField}
        name="doctor"
        rules={{ required: true }}
        control={control}
        options={checkOptions}
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
