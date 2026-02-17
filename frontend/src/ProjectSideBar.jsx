import { Box, Typography, Button, Divider } from "@mui/material";
import FolderNode from "./FolderNode";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
function ProjectSidebar({ projectName, treeData, goBack, render_note }) {
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
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          {projectName}
        </Typography>

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
                <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />
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
