import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";

import { useState } from "react";
import { rename_project } from "./api/your_vault_api";

export default function RenameDialog({
  open,
  setOpen,
  refresh,
  id,
  current_name,
}) {
  const [newName, setNewName] = useState(current_name);

  async function handle_rename() {
    try {
      await rename_project(id, newName);

      refresh();

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Rename Vault</DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 350,
          pt: 1,
        }}
      >
        <Typography variant="body2">Enter a new vault name.</Typography>

        <TextField
          fullWidth
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Vault name"
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            mt: 1,
          }}
        >
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button variant="contained" onClick={handle_rename}>
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
