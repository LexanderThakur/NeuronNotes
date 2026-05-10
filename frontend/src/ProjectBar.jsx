import { Box, Typography, Divider, TextareaAutosize } from "@mui/material";
import FolderNode from "./FolderNode";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import DescriptionIcon from "@mui/icons-material/Description";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

import AddIcon from "@mui/icons-material/Add";

import { create_note, create_folder_api } from "./api/manage_api";

import { useState } from "react";
import CreateFolderDialog from "./CreateFolderDialog";
export default function ProjectBar({ name, treeData, refresh }) {
  const navigate = useNavigate();
  const { project_id } = useParams();
  const [openCreateFolder, setOpenCreateFolder] = useState(false);
  async function handle_create_note() {
    try {
      await create_note(project_id);
      refresh();
    } catch (error) {
      console.log(error);
    }
  }

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          gap: 1,

          "& .icon-btn": {
            fontSize: 32,
            cursor: "pointer",
            transition: "transform 0.2s ease, background-color 0.2s ease",
            borderRadius: "50%",
            padding: "6px",

            "&:hover": {
              transform: "scale(1.15) translateY(-2px)",
              backgroundColor: "rgba(255,255,255,0.08)",
            },

            "&:active": {
              transform: "scale(0.95)",
            },
          },
        }}
      >
        <AddIcon className="icon-btn" onClick={() => handle_create_note()} />

        <CreateNewFolderIcon
          className="icon-btn"
          onClick={() => setOpenCreateFolder(true)}
        />
      </Box>

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
      <CreateFolderDialog
        open={openCreateFolder}
        setOpen={setOpenCreateFolder}
        refresh={refresh}
      ></CreateFolderDialog>
    </Box>
  );
}
