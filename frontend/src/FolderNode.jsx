import { useState } from "react";
import { Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";

function FolderNode({ folder, render_note }) {
  const [open, setOpen] = useState(false);

  function toggleFolder() {
    setOpen(!open);
  }

  return (
    <Box sx={{ ml: 1 }}>
      {/* Folder header */}
      <Box
        onClick={toggleFolder}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          borderRadius: 1,
          px: 1,
          py: 0.5,
          "&:hover": {
            backgroundColor: "#f3f3f3",
          },
        }}
      >
        {open ? (
          <ExpandMoreIcon fontSize="small" />
        ) : (
          <ChevronRightIcon fontSize="small" />
        )}

        <FolderIcon sx={{ mx: 0.5 }} fontSize="small" />

        <Typography variant="body2">{folder.name}</Typography>
      </Box>

      {/* Folder contents */}
      {open && (
        <Box sx={{ ml: 3 }}>
          {folder.notes.map((note) => (
            <Box
              key={"note-" + note.id}
              onClick={() => {
                render_note(note.id);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />

              <Typography variant="body2">{note.name}</Typography>
            </Box>
          ))}

          {folder.children.map((child) => (
            <FolderNode key={"folder-" + child.id} folder={child} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default FolderNode;
