import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

function CreateDialog({ open, onClose, value, setValue, onSave }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Folder</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          placeholder="Folder name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateDialog;
