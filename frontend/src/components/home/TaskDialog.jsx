import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import { useState } from "react";

export default function TaskDialog({ open, onClose, onSave }) {
  const [title, setTitle] = useState("");

  function handleSave() {
    if (!title.trim()) return;

    onSave(title);

    setTitle("");
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Add Task</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mt: 1 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            bgcolor: "#3EC300",
            textTransform: "none",

            "&:hover": {
              bgcolor: "#35ad00",
            },
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
