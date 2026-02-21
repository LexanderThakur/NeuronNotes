import { Box, Typography, Button, Divider } from "@mui/material";
import FolderNode from "./FolderNode";
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
        width: 270,
        // bgcolor: "#EDCBB1",
        bgcolor: "#F0DCCA",
        borderRight: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        p: 2,
        flexShrink: 0,
        overflowY: "auto",
        height: "500vh",
      }}
    >
      <Box>
        {/* Back Button */}
        <Button
          fullWidth
          onClick={goBack}
          sx={{
            justifyContent: "flex-start",
            mb: 2,
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 2,
            color: "#475569",
            transition: "all .18s ease",
            "&:hover": {
              backgroundColor: "#eef2ff",
              color: "#4f46e5",
              transform: "translateX(-2px)",
            },
          }}
        >
          ← Back
        </Button>

        {/* Project Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: ".3px",
              color: "#0f172a",
            }}
          >
            {projectName}
          </Typography>

          {!view_only && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <AddIcon
                sx={{
                  cursor: "pointer",
                  color: "#64748b",
                  transition: "all .2s ease",
                  "&:hover": {
                    color: "#4f46e5",
                    transform: "scale(1.15)",
                  },
                }}
                onClick={() => createNote(null)}
              />

              <CreateNewFolderIcon
                sx={{
                  cursor: "pointer",
                  color: "#64748b",
                  transition: "all .2s ease",
                  "&:hover": {
                    color: "#4f46e5",
                    transform: "scale(1.15)",
                  },
                }}
                onClick={() => show_create_dialog(null)}
              />
            </Box>
          )}
        </Box>

        <Divider sx={{ mb: 2, borderColor: "#e2e8f0" }} />

        {/* Tree Items */}
        <Box>
          {treeData.items.map(function (item) {
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

            return (
              <Box
                key={"note-" + item.id}
                onClick={() => render_note(item.id)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 1.5,
                  py: 0.9,
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "all .18s ease",
                  "&:hover": {
                    backgroundColor: "#eef2ff",
                    transform: "translateX(4px)",
                  },
                  "&:active": {
                    transform: "scale(.97)",
                  },
                }}
              >
                <Typography
                  sx={{
                    ml: 1,
                    fontSize: ".95rem",
                    fontWeight: 500,
                    color: "#334155",
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default ProjectSidebar;
