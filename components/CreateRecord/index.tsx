import CreateRecordForm from "./form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";

type Props = {
  open: boolean;
  handleClose: () => void;
  date: Date;
};

type SearchType = { description: string; doctor: string };

const CreateRecord: React.FC<Props> = ({ open, handleClose, date }) => {
  const onSubmit = (data: SearchType) => console.log(data);
  console.log(date);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Запис до лікаря</DialogTitle>
      <DialogContent>
        {/* <Typography variant="subtitle1">{date}</Typography> */}
        <CreateRecordForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecord;
