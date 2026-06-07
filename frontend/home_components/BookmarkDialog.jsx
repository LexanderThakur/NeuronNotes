import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function BookmarkDialog({ open, onClose, onSave }) {
  const [bookmarkName, setBookmarkName] = useState("");
  const [bookmarkLink, setBookmarkLink] = useState("");

  function handleSave() {
    if (!bookmarkName.trim() || !bookmarkLink.trim()) return;

    onSave({
      name: bookmarkName,
      link: bookmarkLink,
    });

    setBookmarkName("");
    setBookmarkLink("");
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Bookmark</DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pt: 2,
        }}
      >
        <TextField
          label="Bookmark Name"
          value={bookmarkName}
          onChange={(e) => setBookmarkName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Bookmark Link"
          value={bookmarkLink}
          onChange={(e) => setBookmarkLink(e.target.value)}
          fullWidth
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
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
