import {
  Box,
  Typography,
  Divider,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import FolderNode from "./FolderNode";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ProjectBar from "./ProjectBar";
import MilkdownEditor from "./MilkdownEditor";
import { fetch_project } from "./api/project_api";

import { get_note } from "./api/manage_api";

import { useState, useEffect } from "react";
import build_tree from "./treeBuilder";
export default function Manage() {
  const navigate = useNavigate();
  const { project_id, note_id } = useParams();

  const [treeData, setTreeData] = useState({ items: [] });
  const [data, setData] = useState(null);

  const [content, setContent] = useState("# Hello");

  async function getProject() {
    try {
      const projectData = await fetch_project(project_id);
      console.log(projectData);
      setData(projectData);
      setTreeData(build_tree(projectData.folders, projectData.notes));
    } catch (error) {
      console.log(error);
    }
  }
  async function render_note() {
    try {
      const fetched_content = await get_note(note_id);
      setContent(fetched_content.content);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProject();
    if (note_id) {
      render_note();
    }
  }, [project_id, note_id]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#F8F8F8",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* SIDEBAR */}
      <ProjectBar
        name={data?.project?.name}
        treeData={treeData}
        getProject={getProject}
      ></ProjectBar>

      {/* MAIN EDITOR */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          bgcolor: "#ffffff",
        }}
      >
        {!note_id && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>Select a note to start</Typography>
          </Box>
        )}

        {note_id && (
          <>
            <Box
              sx={{
                px: 2,
                pt: 3,
                pb: 1,
              }}
            >
              <TextField
                placeholder="Untitled note"
                variant="standard"
                fullWidth
                value={"Project 1"}
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
            <Box
              sx={{
                flex: 1,
                px: 2,
                // pb: 3,
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
                key={note_id}
                value={content}
                onChange={setContent}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
