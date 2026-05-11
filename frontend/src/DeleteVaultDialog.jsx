import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";
import { delete_project } from "./api/your_vault_api";

export default function DeleteVaultDialog({
  open,
  setOpen,
  refresh,
  id,
  des = "Delete vault and its contents permanently?",
}) {
  async function handle_delete() {
    try {
      await delete_project(id);

      refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography variant="body2">{des}</Typography>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#FF312E" }}
          onClick={async () => {
            await handle_delete();
            setOpen(false);
          }}
        >
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  );
}
