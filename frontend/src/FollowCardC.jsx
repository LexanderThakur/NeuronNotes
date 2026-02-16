import { Box, Typography, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import FollowCard from "./FollowCard";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

const api = "http://localhost:8000";
function FollowCardC() {
  const [projects, setProjects] = useState([]);

  async function get() {
    try {
      const response = await fetch(api + "/projects/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        console.log(data);
        return;
      }
      setProjects(data.message);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    get();
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        // width: "100%",
        p: 2,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignContent: "flex-start",
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      {projects.map((project) => (
        <FollowCard
          id={project.id}
          name={project.name}
          description={project.description}
          owner={project.owner.email}
          key={project.id}
        />
      ))}
    </Box>
  );
}

export default FollowCardC;
