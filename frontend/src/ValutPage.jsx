import { Box, Typography, Paper, Button, Divider } from "@mui/material";
import { useEffect, useState } from "react";

const api = "http://localhost:8000";

function VaultCard({
  id,
  name,
  description,
  owner,
  action,
  refresh,
  open_project,
}) {
  async function delete_unfollow() {
    let endpoint =
      action === "Manage"
        ? "/projects/" + id + "/"
        : "/projects/" + id + "/follow/";

    try {
      const response = await fetch(api + endpoint, {
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
      console.log(data);
      refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Paper
      elevation={0}
      sx={{
        width: 260,
        borderRadius: 3,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
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

      {/* Buttons container */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            borderRadius: 2,
            textTransform: "none",
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "scale(1.09)",
            },
          }}
          onClick={() => {
            if (action === "Manage") {
              open_project(id);
            } else {
              open_project(id, "View");
            }
          }}
        >
          {action}
        </Button>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            borderRadius: 2,
            textTransform: "none",
            borderColor: "#FF312E",
            color: "#FF312E",
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "#FF312E",
              backgroundColor: "rgba(255,49,46,0.05)",
              transform: "scale(1.09)",
            },
          }}
          onClick={() => delete_unfollow()}
        >
          {action === "Manage" ? "Delete" : "Unfollow"}
        </Button>
      </Box>

      <Typography variant="caption" color="text.secondary">
        by: {owner}
      </Typography>
    </Paper>
  );
}

function VaultPage({ open_project }) {
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
            id={p.id}
            key={p.id}
            name={p.name}
            description={p.description}
            owner={p.owner.email}
            action="Manage"
            refresh={fetchVault}
            open_project={open_project}
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
            id={p.id}
            key={p.id}
            name={p.name}
            description={p.description}
            owner={p.owner.email}
            action="View"
            refresh={fetchVault}
            open_project={open_project}
          />
        ))}
      </Box>
    </Box>
  );
}

export default VaultPage;
