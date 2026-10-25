import { Box, Typography, CircularProgress } from "@mui/material";
import GraphBackground from "./GraphBackground";

export default function BackendWakingScreen() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        bgcolor: "#fafafa",
      }}
    >
      <GraphBackground />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backdropFilter: "blur(2px)",
        }}
      >
        <CircularProgress
          size={42}
          sx={{
            color: "#666666",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            mt: 3,
            fontWeight: 600,
          }}
        >
          Opening Neuron...
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "text.secondary",
            textAlign: "center",
            maxWidth: 380,
          }}
        >
          Loading notes, connections and workspace data. The free-tier backend
          may take a few moments to wake up.
        </Typography>
      </Box>
    </Box>
  );
}
