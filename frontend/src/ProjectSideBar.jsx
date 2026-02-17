import { Box, Typography, Button, Divider } from "@mui/material";
import FolderNode from "./FolderNode";

function ProjectSidebar({ projectName, treeData, goBack }) {
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

        {/* Folders */}
        <Typography variant="subtitle2">Folders</Typography>

        {treeData.folders.map(function (folder) {
          return <FolderNode key={folder.id} folder={folder} />;
        })}

        <Divider sx={{ my: 2 }} />

        {/* Root Notes */}
        <Typography variant="subtitle2">Notes</Typography>

        {treeData.notes.map(function (note) {
          return <Typography key={note.id}>📝 {note.name}</Typography>;
        })}
      </Box>

      {/* Bottom Buttons (future CRUD) */}
      <Box>
        <Divider sx={{ mb: 2 }} />

        <Button fullWidth>+ New Folder</Button>

        <Button fullWidth sx={{ mt: 1 }}>
          + New Note
        </Button>
      </Box>
    </Box>
  );
}

export default ProjectSidebar;
