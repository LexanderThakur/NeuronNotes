import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
export default function CreateVaultDialog({ open, setOpen }) {
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
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Create
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
