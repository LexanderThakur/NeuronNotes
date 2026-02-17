const api = "http://localhost:8000";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import build_tree from "./treeBuilder";
import FolderNode from "./FolderNode";
import ProjectSidebar from "./ProjectSideBar";

function ProjectManager({ projectId, goBack }) {
  const [data, setData] = useState(null);
  const [treeData, setTreeData] = useState(null);

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
    <Box sx={{ display: "flex", height: "100%" }}>
      <ProjectSidebar
        projectName={data.project.name}
        treeData={treeData}
        goBack={goBack}
      />

      {/* Editor area (empty for now) */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5">{data.project.name}</Typography>
      </Box>
    </Box>
  );
}

export default ProjectManager;
