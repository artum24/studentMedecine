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
  day: string;
  period: string;
};

const CreateRecord: React.FC<Props> = ({ open, handleClose, day, period }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle>Запис до лікаря</DialogTitle>
    <DialogContent>
      <Typography variant="subtitle1">
        {day} {period}
      </Typography>
      <CreateRecordForm />
    </DialogContent>
  </Dialog>
);

export default CreateRecord;
