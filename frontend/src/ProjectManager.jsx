const api = "http://localhost:8000";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import build_tree from "./treeBuilder";
import FolderNode from "./FolderNode";
function ProjectManager({ projectId }) {
  const [data, setData] = useState(null);

  let treeData = null;

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
        console.log(json.message);
        treeData = build_tree(json.message.folders, json.message.notes);
      } catch (err) {
        console.log(err);
      }
    }

    fetchProject();
  }, [projectId]);

  if (!data) return <div>Loading...</div>;

  return (
    <Box>
      <Typography variant="h5">{data.project.name}</Typography>
      <Typography variant="h6">Folders</Typography>
      {data.folders.map((f) => (
        <div key={f.id}>{f.name}</div>
      ))}

      <Typography variant="h6">Notes</Typography>
      {data.notes.map((n) => (
        <div key={n.id}>{n.name}</div>
      ))}
    </Box>
  );
}

export default ProjectManager;
