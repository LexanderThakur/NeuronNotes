import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

export default function ConfirmDialog({
  open,
  onClose,
  title = "Confirm Action",
  description = "Are you sure?",
  onConfirm,
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button onClick={onClose}>Cancel</Button>

          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              await onConfirm();

              onClose();
            }}
          >
            Confirm
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
