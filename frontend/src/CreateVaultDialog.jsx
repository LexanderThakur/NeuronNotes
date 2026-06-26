import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { use, useState } from "react";
import { create_vault } from "./api/your_vault_api";
export default function CreateVaultDialog({ open, setOpen, refresh }) {
  const [visibility, setVisibility] = useState("private");

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [is_public, setPublic] = useState(false);

  async function handleCreate() {
    if (!name.trim()) {
      alert("Project name required");
      return;
    }
    if (!desc.trim()) {
      alert("Please enter project description");
      return;
    }

    try {
      await create_vault(name, desc, is_public);
      refresh();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog
      onClose={() => {
        setOpen(false);
      }}
      open={open}
    >
      <DialogTitle>Create Vault</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <TextField
            variant="outlined"
            label="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <TextField
            variant="outlined"
            label="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></TextField>
          <TextField
            select
            label="Visibility"
            fullWidth
            value={visibility}
            onChange={(e) => {
              setVisibility(e.target.value);

              if (e.target.value === "public") {
                setPublic(true);
              } else {
                setPublic(false);
              }
            }}
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
              },
            }}
          >
            <MenuItem value="private">Private</MenuItem>
            <MenuItem value="public">Public</MenuItem>
          </TextField>
          <Button
            variant="outlined"
            onClick={() => {
              handleCreate();
              setOpen(false);
            }}
          >
            Create
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
