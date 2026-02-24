const api = import.meta.env.VITE_API_URL;
import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Markdown from "react-markdown";
import build_tree from "./treeBuilder";
import FolderNode from "./FolderNode";
import ProjectSidebar from "./ProjectSideBar";
import CreateDialog from "./CreateDialog";
import MilkdownEditor from "./MilkdownEditor";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { fetch_project, create_folder_api } from "./api/project_api";

function ProjectManager({ projectId, goBack, access }) {
  const view_only = access === "View";
  const [data, setData] = useState(null);
  const [treeData, setTreeData] = useState(null);
  const [content, setContent] = useState("Select a note to start writing");
  const [active, setActive] = useState(null);
  const [title, setTitle] = useState(null);
  const [open, setOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [parentFolderId, setParentFolderId] = useState(null);
  function show_create_dialog(folderId) {
    setParentFolderId(folderId);
    setOpen(true);
  }
  async function save_note() {
    try {
      const response = await fetch(`${api}/notes/${active}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: title,
          content: content,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      }
      await fetchProject();
      alert("Note Saved Successfully");
    } catch (error) {
      console.log(error);
    }
  }
  async function delete_note() {
    try {
      const response = await fetch(`${api}/notes/${active}/`, {
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
      setActive(null);
      setContent("");
    } catch (error) {
      console.log(error);
    }
  }

  async function create_folder() {
    if (!newFolderName) {
      alert("Folder name required");
      return;
    }

    try {
      await create_folder_api(projectId, newFolderName, parentFolderId);

      await fetchProject();
    } catch (error) {
      console.log(error);
      alert("Error creating folder");
    }
  }

  async function createNote(folderId) {
    console.log("Create note inside:", folderId);

    try {
      const response = await fetch(api + "/projects/" + projectId + "/notes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: "Untitled ",
          content: "",
          folder: folderId,
          project: projectId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        return;
      }
      await fetchProject();
    } catch (error) {
      console.log(error);
    }
  }

  async function render_note(note_id) {
    try {
      const response = await fetch(api + "/notes/" + note_id + "/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        return;
      }
      setContent(data.message.content);
      setActive(note_id);
      setTitle(data.message.name);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchProject() {
    try {
      const projectData = await fetch_project(projectId);

      setData(projectData);
      setTreeData(build_tree(projectData.folders, projectData.notes));
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchProject();
  }, [projectId]);

  if (!data || !treeData) return <div>Loading...</div>;

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <ProjectSidebar
        projectName={data.project.name}
        treeData={treeData}
        goBack={goBack}
        render_note={render_note}
        show_create_dialog={show_create_dialog}
        createNote={createNote}
        fetchProject={fetchProject}
        view_only={view_only}
      />
      <CreateDialog
        open={open}
        onClose={() => setOpen(false)}
        value={newFolderName}
        setValue={setNewFolderName}
        onSave={async () => {
          console.log("Create folder:", newFolderName, parentFolderId);
          create_folder();
          setOpen(false);
          setNewFolderName("");
        }}
      />

      {/* Editor area */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          bgcolor: "#ffffff",
        }}
      >
        {active ? (
          <>
            {/* Top title bar */}
            <Box
              sx={{
                px: 4,
                pt: 3,
                pb: 1,
              }}
            >
              <TextField
                placeholder="Untitled note"
                variant="standard"
                fullWidth
                value={title ? title : ""}
                onChange={(e) => setTitle(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{
                  "& input": {
                    fontSize: "28px",
                    fontWeight: 600,
                  },
                }}
              />
            </Box>

            {/* Editor */}
            <Box
              sx={{
                flex: 1,
                px: 4,
                pb: 3,
                display: "flex",
                flexDirection: "column",

                "& .milkdown": {
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                },

                "& .milkdown .editor": {
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                },

                "& .ProseMirror": {
                  flex: 1,
                  minHeight: "100vh",
                  overflowY: "auto",
                  bgcolor: "#ffffff",
                },
              }}
            >
              <MilkdownEditor
                key={active}
                value={content}
                onChange={setContent}
              />
            </Box>

            {/* Floating action bar */}
            {!view_only && (
              <Box
                sx={{
                  position: "fixed",
                  bottom: 24,
                  right: 32,
                  display: "flex",
                  gap: 1.5,
                }}
              >
                <Button
                  onClick={() => delete_note()}
                  variant="outlined"
                  color="error"
                >
                  Delete
                </Button>

                {/* <Button onClick={() => render_note(active)} variant="outlined">
                  Refresh
                </Button> */}

                <Button
                  onClick={() => {
                    save_note();
                  }}
                  variant="contained"
                  sx={{ backgroundColor: "#3EC300" }}
                >
                  Save
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#888",
            }}
          >
            <Typography variant="h6">Select Note to start writing</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ProjectManager;
