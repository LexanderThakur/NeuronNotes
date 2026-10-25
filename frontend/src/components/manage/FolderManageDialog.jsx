import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
  TextField,
  Divider,
} from "@mui/material";

import { useState, useEffect } from "react";

export default function FolderManageDialog({
  open,
  onClose,
  folder,
  onRename,
  onDelete,
}) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (folder) {
      setName(folder.name);
    }
  }, [folder]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Manage Folder</DialogTitle>

      <DialogContent>
        {/* Rename Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            mb: 3,
            mt: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            Rename Folder
          </Typography>

          <TextField
            fullWidth
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
            <Button onClick={onClose}>Cancel</Button>

            <Button
              variant="contained"
              onClick={async () => {
                await onRename(folder.id, name);
                onClose();
              }}
            >
              Save
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Delete Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 15,
              color: "#d32f2f",
            }}
          >
            Danger Zone
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#777",
            }}
          >
            Deleting a folder will permanently remove all nested notes.
          </Typography>

          <Button
            color="error"
            variant="outlined"
            onClick={async () => {
              await onDelete(folder.id);
              onClose();
            }}
          >
            Delete Folder
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
