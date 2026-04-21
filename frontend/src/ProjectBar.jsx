import { Box, Typography, Divider, TextareaAutosize } from "@mui/material";
import FolderNode from "./FolderNode";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import DescriptionIcon from "@mui/icons-material/Description";
export default function ProjectBar({ name, treeData, getProject }) {
  const navigate = useNavigate();
  const { project_id } = useParams();
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
          {name}
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
        {treeData.items.map(function (item) {
          if (item.children !== undefined) {
            return <FolderNode key={"folder-" + item.id} folder={item} />;
          }

          return (
            <Box
              onClick={() => {
                navigate(`/manage/${project_id}/note/${item.id}`);
              }}
              key={"note-" + item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                pl: 0.5,
                py: 1,
                borderRadius: 1,

                transition: "all 0.2s ease",

                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: "#1a1a1a",
                  color: "white",
                  transform: "translateX(2px) ",
                },
              }}
            >
              <DescriptionIcon
                sx={{
                  fontSize: 16,
                  color: "#F8F8F8",
                }}
              />

              <Typography
                variant="body2"
                sx={{
                  color: "#aaa",
                  fontSize: 16,
                  letterSpacing: "0.2px",
                }}
              >
                {item.name}
              </Typography>
            </Box>
          );
        })}
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
