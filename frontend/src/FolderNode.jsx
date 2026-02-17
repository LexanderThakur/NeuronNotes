import { useState } from "react";
import { Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import AddIcon from "@mui/icons-material/Add";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

function FolderNode({ folder, render_note, createNote, show_create_dialog }) {
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
          justifyContent: "space-between",
          px: 1,
          py: 0.5,
          borderRadius: 1,
          cursor: "pointer",
          "&:hover": { backgroundColor: "#f3f3f3" },
        }}
      >
        {/* Left side */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {open ? (
            <ExpandMoreIcon fontSize="small" />
          ) : (
            <ChevronRightIcon fontSize="small" />
          )}

          <FolderIcon fontSize="small" sx={{ mx: 0.5 }} />

          <Typography variant="body2">{folder.name}</Typography>
        </Box>

        {/* Action icons */}
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <AddIcon
            fontSize="small"
            sx={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              createNote(folder.id);
            }}
          />

          <CreateNewFolderIcon
            fontSize="small"
            sx={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              show_create_dialog(folder.id);
            }}
          />
        </Box>
      </Box>

      {/* Folder contents */}
      {open && (
        <Box sx={{ ml: 3 }}>
          {folder.notes.map((note) => (
            <Box
              key={"note-" + note.id}
              onClick={() => render_note(note.id)}
              sx={{
                display: "flex",
                alignItems: "center",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />

              <Typography variant="body2">{note.name}</Typography>
            </Box>
          ))}

          {folder.children.map((child) => (
            <FolderNode
              key={"folder-" + child.id}
              folder={child}
              render_note={render_note}
              createNote={createNote}
              show_create_dialog={show_create_dialog}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default FolderNode;
