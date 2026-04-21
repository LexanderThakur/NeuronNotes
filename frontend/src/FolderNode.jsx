import { Box, Typography, Collapse } from "@mui/material";
import { useState } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate, useParams } from "react-router-dom";
export default function FolderNode({ folder }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { project_id } = useParams();

  return (
    <Box sx={{ ml: 1 }}>
      {/* Folder Row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1,
          py: 0.6,
          borderRadius: 1,

          transition: "all 0.2s ease",

          "&:hover": {
            cursor: "pointer",
            backgroundColor: "#1a1a1a",
          },
        }}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {/* Left side */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FolderIcon
            sx={{
              fontSize: 18,
              color: "#F8F8F8",
            }}
          />

          <Typography
            sx={{
              color: "#ddd",
              fontSize: 16,
              letterSpacing: "0.2px",
            }}
          >
            {folder.name}
          </Typography>
        </Box>

        {/* Arrow with rotation */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            transition: "transform 0.2s ease",
            transform: open ? "rotate(0deg)" : "rotate(-90deg)",
            color: "#888",
          }}
        >
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
      </Box>

      {/* Children (animated) */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ ml: 2, mt: 0.5 }}>
          {folder.children.map((fold) => (
            <FolderNode folder={fold} key={fold.id} />
          ))}

          {folder.notes.map((note, i) => (
            <Box
              onClick={() => {
                navigate(`/manage/${project_id}/note/${note.id}`);
              }}
              key={note.id}
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
                {note.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}
