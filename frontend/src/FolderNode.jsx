import { Box, Typography, Collapse } from "@mui/material";
import { useState, useContext } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { ManageContext } from "./Manage";

import { ViewOnlyContext } from "./Manage";

import FolderManageDialog from "./FolderManageDialog";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

import { rename_folder_api, delete_folder_api } from "./api/manage_api";
import CreateFolderDialog from "./CreateFolderDialog";
export default function FolderNode({
  folder,
  createNote,
  setDeleteState,
  setGraph,
}) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { project_id } = useParams();
  const [openManage, setOpenManage] = useState(false);
  const { refresh } = useContext(ManageContext);
  const [openCreateFolder, setOpenCreateFolder] = useState(false);
  const { view_only } = useContext(ViewOnlyContext);
  async function handle_rename(folder_id, new_name) {
    try {
      await rename_folder_api(folder_id, new_name);

      refresh();
    } catch (error) {
      console.log(error);
    }
  }
  async function handle_delete() {
    try {
      await delete_folder_api(folder.id);
      refresh();
    } catch (error) {
      console.log(error);
    }
  }

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
            width: "100%",
          }}
        >
          <Box
            sx={{
              transition: "transform 0.2s ease",
              transform: open ? "rotate(0deg)" : "rotate(-90deg)",
              color: "#888",
            }}
          >
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>

          <Typography
            sx={{
              color: "#ddd",
              fontSize: 16,
              letterSpacing: "0.2px",
              flex: 1,
            }}
          >
            {folder.name}
          </Typography>
          {!view_only && (
            <>
              <AddIcon
                onClick={(e) => {
                  e.stopPropagation();
                  createNote(project_id, folder.id);
                  setOpen(true);
                }}
                sx={{
                  fontSize: 18,
                  color: "#888",
                  transition: "0.2s",

                  "&:hover": {
                    color: "white",
                    transform: "scale(1.1)",
                  },
                }}
              />
              <CreateNewFolderIcon
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenCreateFolder(true);
                }}
                sx={{
                  fontSize: 18,
                  color: "#888",
                  transition: "0.2s",

                  "&:hover": {
                    color: "white",
                    transform: "scale(1.1)",
                  },
                }}
              ></CreateNewFolderIcon>
              <DashboardIcon
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenManage(true);
                }}
                sx={{
                  fontSize: 18,
                  color: "#888",
                  transition: "0.2s",

                  "&:hover": {
                    color: "white",
                    transform: "scale(1.1)",
                  },
                }}
              />
            </>
          )}
        </Box>
      </Box>

      {/* Children (animated) */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ ml: 2, mt: 0.5 }}>
          {folder.children.map((fold) => (
            <FolderNode
              folder={fold}
              key={fold.id}
              createNote={createNote}
              setDeleteState={setDeleteState}
              setGraph={setGraph}
            />
          ))}

          {folder.notes.map((item, i) => (
            <Box
              onClick={() => {
                setGraph(false);
                navigate(`/manage/${project_id}/note/${item.id}`);
              }}
              key={"note-" + item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",

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
              {/* <DescriptionIcon
                sx={{
                  fontSize: 16,
                  color: "#F8F8F8",
                }}
              /> */}

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
              {!view_only && (
                <DeleteIcon
                  onClick={(e) => {
                    e.stopPropagation();

                    setDeleteState({
                      open: true,
                      noteID: item.id,
                    });
                  }}
                  sx={{
                    fontSize: 18,
                    color: "#888",
                    transition: "0.2s",

                    "&:hover": {
                      color: "white",
                      transform: "scale(1.1)",
                    },
                  }}
                ></DeleteIcon>
              )}
            </Box>
          ))}
        </Box>
      </Collapse>

      <FolderManageDialog
        open={openManage}
        folder={folder}
        onClose={() => {
          setOpenManage(false);
        }}
        onRename={async (folder_id, new_name) => {
          await handle_rename(folder_id, new_name);
          setOpenManage(false);
        }}
        onDelete={async () => {
          await handle_delete();
          setOpenManage(false);
        }}
      ></FolderManageDialog>
      <CreateFolderDialog
        open={openCreateFolder}
        setOpen={setOpenCreateFolder}
        refresh={refresh}
        parent_id={folder.id}
      ></CreateFolderDialog>
    </Box>
  );
}
