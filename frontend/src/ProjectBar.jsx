import { Box, Typography, Divider, TextareaAutosize } from "@mui/material";
import FolderNode from "./FolderNode";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function ProjectBar() {
  const folder = {
    id: 1,
    name: "My Folder",
    children: [
      {
        id: 1,
        name: "sub folder",
        children: [],
        notes: [],
      },
    ],
    notes: ["note1", "note2"],
  };

  const folder2 = {
    id: 1,
    name: "My Folder 2 ",
    children: [
      {
        id: 1,
        name: "dom folder",
        children: [],
        notes: ["another one"],
      },
    ],
    notes: ["note1", "note2", "note3"],
  };
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: 270,
        backgroundColor: "#101110",
        color: "white",
        display: "flex",
        flexDirection: "column",
        px: 1.5,
        py: 2,
        borderRight: "1px solid #1c1c1c",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1,
          mb: 2,
        }}
      >
        <KeyboardBackspaceIcon
          onClick={() => navigate("/")}
          sx={{
            color: "#888",
            fontSize: 24,
            transition: "all 0.2s ease",
            "&:hover": {
              cursor: "pointer",
              color: "#2EC0F9",
              transform: "translateX(-3px)",
            },
          }}
        />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            letterSpacing: "0.3px",
          }}
        >
          Project I
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: "#222", mb: 2 }} />

      {/* Section label */}
      <Typography
        sx={{
          fontSize: 11,
          color: "#777",
          textTransform: "uppercase",
          letterSpacing: 1,
          px: 1,
          mb: 1,
        }}
      >
        Folders
      </Typography>

      {/* Folder tree */}
      <Box sx={{ flex: 1 }}>
        <FolderNode folder={folder} />
        <FolderNode folder={folder2} />
      </Box>

      {/* Footer */}
      <Box
        sx={{
          fontSize: 11,
          color: "#666",
          px: 1,
          mt: "auto",
        }}
      >
        Knowledge Vault
      </Box>
    </Box>
  );
}
