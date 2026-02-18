import { Box, Typography, Button, Divider } from "@mui/material";
import FolderNode from "./FolderNode";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import AddIcon from "@mui/icons-material/Add";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

function ProjectSidebar({
  projectName,
  treeData,
  goBack,
  render_note,
  show_create_dialog,
  createNote,
  fetchProject,
  view_only,
}) {
  return (
    <Box
      sx={{
        width: 240,
        bgcolor: "#FFFFFA",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        flexShrink: 0,
        boxShadow: "4px 0 20px rgba(0,0,0,0.08)",
        overflowY: "auto",
      }}
    >
      {/* Top Section */}
      <Box>
        {/* Back Button */}
        <Button
          fullWidth
          onClick={goBack}
          sx={{
            justifyContent: "flex-start",
            mb: 2,
            textTransform: "none",
          }}
        >
          ← Back
        </Button>

        {/* Project Name */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {projectName}
          </Typography>
          {!view_only && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <AddIcon
                sx={{ cursor: "pointer" }}
                onClick={() => createNote(null)}
              />

              <CreateNewFolderIcon
                sx={{ cursor: "pointer" }}
                onClick={() => show_create_dialog(null)}
              />
            </Box>
          )}
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box>
          {treeData.items.map(function (item) {
            // Folder case
            if (item.children !== undefined) {
              return (
                <FolderNode
                  key={"folder-" + item.id}
                  folder={item}
                  render_note={render_note}
                  show_create_dialog={show_create_dialog}
                  createNote={createNote}
                  fetchProject={fetchProject}
                  view_only={view_only}
                />
              );
            }

            // Note case
            return (
              <Box
                key={"note-" + item.id}
                onClick={() => render_note(item.id)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f3f3f3",
                  },
                }}
              >
                <Typography sx={{ ml: 1 }}>{item.name}</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default ProjectSidebar;
