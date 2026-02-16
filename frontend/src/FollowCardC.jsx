import { Box, Typography, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import FollowCard from "./FollowCard";
function FollowCardC() {
  let projects = [
    {
      name: "Project",
      description: "this is a description",
      owner: "user@gmail.com",
    },
    {
      name: "Project",
      description: "this is a description",
      owner: "user@gmail.com",
    },
    {
      name: "Project",
      description: "this is a description",
      owner: "user@gmail.com",
    },
  ];

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        p: 2,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 1,
      }}
    >
      {projects.map((project) => (
        <FollowCard
          name={project.name}
          description={project.description}
          owner={project.owner}
        />
      ))}
    </Box>
  );
}

export default FollowCardC;
