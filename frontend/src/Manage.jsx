import { Box, Typography, Divider, TextareaAutosize } from "@mui/material";
import FolderNode from "./FolderNode2";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ProjectBar from "./ProjectBar";

import { fetch_project } from "./api/project_api";

import { useState, useEffect } from "react";
import build_tree from "./treeBuilder";
export default function Manage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [treeData, setTreeData] = useState({ items: [] });
  const [data, setData] = useState(null);

  async function getProject() {
    try {
      const projectData = await fetch_project(id);
      console.log(projectData);
      setData(projectData);
      setTreeData(build_tree(projectData.folders, projectData.notes));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProject();
  }, [id]);

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
          flex: 1,
          display: "flex",
          flexDirection: "column",
          px: 6,
          py: 4,
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: "#101110",
            letterSpacing: "0.2px",
          }}
        >
          Untitled Note
        </Typography>

        {/* Editor */}
        <TextareaAutosize
          placeholder="Start typing your thoughts..."
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            outline: "none",
            resize: "none",
            backgroundColor: "transparent",

            fontSize: "16px",
            lineHeight: "1.7",
            letterSpacing: "0.25px",
            color: "#2a2a2a",

            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}
        />
      </Box>
    </Box>
  );
}
