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
import { useState } from "react";
export default function CreateVaultDialog({ open, setOpen }) {
  const [visibility, setVisibility] = useState("public");
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
          <TextField variant="outlined" label="Project Name"></TextField>
          <TextField variant="outlined" label="Description"></TextField>
          <TextField
            select
            label="Visibility"
            fullWidth
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
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
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Create
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
