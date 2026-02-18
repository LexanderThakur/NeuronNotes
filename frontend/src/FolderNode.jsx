import { useState } from "react";
import { Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import DescriptionIcon from "@mui/icons-material/Description";
import AddIcon from "@mui/icons-material/Add";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import DeleteDialog from "./DeleteDialog";
const api = "http://localhost:8000";
function FolderNode({
  folder,
  render_note,
  createNote,
  show_create_dialog,
  fetchProject,
  view_only,
}) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  async function delete_folder(folder_id) {
    try {
      const response = await fetch(`${api}/folders/${folder_id}/`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      }
      await fetchProject();
    } catch (error) {
      console.log("error");
    }
  }

  function toggleFolder() {
    setOpen(!open);
  }

  return (
    <Box sx={{ ml: 1 }}>
      <DeleteDialog
        open={openDelete}
        setOpenDelete={setOpenDelete}
        onSave={() => {
          delete_folder(folder.id);
          setOpenDelete(false);
        }}
      ></DeleteDialog>
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

          <Typography variant="body2">{folder.name}</Typography>
        </Box>

        {/* Action icons */}
        {!view_only && (
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
            <DeleteForeverRoundedIcon
              fontSize="small"
              sx={{ cursor: "pointer" }}
              onClick={() => setOpenDelete(true)}
            ></DeleteForeverRoundedIcon>
          </Box>
        )}
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
