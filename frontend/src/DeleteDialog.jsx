import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

function DeleteDialog({ open, setOpenDelete, onSave }) {
  return (
    <Dialog open={open} onClose={() => setOpenDelete(false)}>
      <DialogTitle>Delete Folder?</DialogTitle>

      <DialogActions>
        <Button onClick={() => setOpenDelete(false)}>Cancel</Button>

        <Button
          sx={{ backgroundColor: "#FF312E" }}
          variant="contained"
          onClick={onSave}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
