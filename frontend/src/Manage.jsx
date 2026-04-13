import { Box, Typography, Divider, TextareaAutosize } from "@mui/material";
import FolderNode from "./FolderNode2";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ProjectBar from "./ProjectBar";
export default function Manage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#F8F8F8",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* SIDEBAR */}
      <ProjectBar></ProjectBar>

      {/* MAIN EDITOR */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          px: 6,
          py: 4,
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: "#101110",
            letterSpacing: "0.2px",
          }}
        >
          Untitled Note
        </Typography>

        {/* Editor */}
        <TextareaAutosize
          placeholder="Start typing your thoughts..."
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            outline: "none",
            resize: "none",
            backgroundColor: "transparent",

            fontSize: "16px",
            lineHeight: "1.7",
            letterSpacing: "0.25px",
            color: "#2a2a2a",

            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}
        />
      </Box>
    </Box>
  );
}
