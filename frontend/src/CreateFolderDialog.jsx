import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";

import { useParams } from "react-router-dom";

import { create_folder_api } from "./api/manage_api";

export default function CreateFolderDialog({
  open,
  setOpen,
  refresh,
  parent_id,
}) {
  const [folderName, setFolderName] = useState("");

  const { project_id, note_id } = useParams();

  async function handleCreate() {
    if (!folderName.trim()) {
      alert("Folder name required");
      return;
    }
    try {
      await create_folder_api(project_id, folderName, parent_id);
    } catch (error) {
      console.log(error);
    }

    refresh();
    setFolderName("");
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      PaperProps={{
        sx: {
          borderRadius: 4,
          width: 400,
        },
      }}
    >
      <DialogTitle>Create Folder</DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 1,
          }}
        >
          <TextField
            label="Folder Name"
            variant="outlined"
            fullWidth
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{
              borderRadius: 3,
              textTransform: "none",
            }}
          >
            Create
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
