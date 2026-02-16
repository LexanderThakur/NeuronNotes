import { Box, Typography, Paper, Button, Divider } from "@mui/material";
import { useEffect, useState } from "react";

const api = "http://localhost:8000";

function VaultCard({ name, description, owner, action }) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: 260,
        borderRadius: 3,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        border: "1px solid #e6e6e6",
        backgroundColor: "#fffffa",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {name}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>

      <Button
        variant="outlined"
        sx={{
          borderRadius: 2,
          textTransform: "none",
          width: "50%",
        }}
      >
        {action}
      </Button>

      <Typography variant="caption" color="text.secondary">
        by: {owner}
      </Typography>
    </Paper>
  );
}

function VaultPage() {
  const [myProjects, setMyProjects] = useState([]);
  const [following, setFollowing] = useState([]);

  async function fetchVault() {
    try {
      const token = localStorage.getItem("token");

      const [mine, follow] = await Promise.all([
        fetch(api + "/projects/my/", {
          headers: { Authorization: "Bearer " + token },
        }),
        fetch(api + "/projects/following/", {
          headers: { Authorization: "Bearer " + token },
        }),
      ]);

      const mineData = await mine.json();
      const followData = await follow.json();
      console.log(mineData);
      console.log(followData);

      if (mine.ok) setMyProjects(mineData.message);
      if (follow.ok) setFollowing(followData.message.map((ele) => ele.project));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchVault();
  }, []);

  return (
    <Box>
      {/* YOUR PROJECTS */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Your Projects
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
        {myProjects.map((p) => (
          <VaultCard
            key={p.id}
            name={p.name}
            description={p.description}
            owner={p.owner.email}
            action="Manage"
          />
        ))}
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* FOLLOWING PROJECTS */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Following Projects
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {following.map((p) => (
          <VaultCard
            key={p.id}
            name={p.name}
            description={p.description}
            owner={p.owner.email}
            action="View"
          />
        ))}
      </Box>
    </Box>
  );
}

export default VaultPage;
