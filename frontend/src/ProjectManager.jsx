const api = "http://localhost:8000";
import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

import build_tree from "./treeBuilder";
import FolderNode from "./FolderNode";
import ProjectSidebar from "./ProjectSideBar";

function ProjectManager({ projectId, goBack }) {
  const [data, setData] = useState(null);
  const [treeData, setTreeData] = useState(null);
  const [content, setContent] = useState("");
  const [active, setActive] = useState(null);
  const [title, setTitle] = useState(null);

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

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(api + `/projects/manage/${projectId}/`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        const json = await response.json();

        setData(json.message);
        setTreeData(build_tree(json.message.folders, json.message.notes));
      } catch (err) {
        console.log(err);
      }
    }

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
      />

      {/* Editor area (empty for now) */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          bgcolor: "#fafafa",
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
            <Box sx={{ flexGrow: 1, px: 4, pb: 3 }}>
              <TextField
                multiline
                fullWidth
                minRows={30}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                variant="standard"
                placeholder="Start writing..."
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{
                  "& textarea": {
                    fontSize: 16,
                    lineHeight: 1.6,
                  },
                }}
              />
            </Box>

            {/* Floating action bar */}
            <Box
              sx={{
                position: "fixed",
                bottom: 24,
                right: 32,
                display: "flex",
                gap: 1.5,
              }}
            >
              <Button variant="outlined" color="error">
                Delete
              </Button>

              <Button variant="outlined">Refresh</Button>

              <Button variant="contained">Save</Button>
            </Box>
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
            <Typography variant="h6">Select a note to start writing</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ProjectManager;
