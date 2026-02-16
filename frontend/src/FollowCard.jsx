import { useState } from "react";
import { Typography, Button, Paper } from "@mui/material";

const api = "http://localhost:8000";

function FollowCard({ id, name, description, owner }) {
  const [isFollowing, setIsFollowing] = useState(false);

  async function follow(id) {
    if (isFollowing) {
      return;
    }
    try {
      const response = await fetch(api + "/projects/" + id + "/follow/", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        return;
      }

      setIsFollowing(true); // ✅ update UI
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Paper
      elevation={0}
      sx={{
        width: 250,
        borderRadius: 3,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        backgroundColor: "#fffffa",
        border: "1px solid #e6e6e6",
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {name}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>

      <Button
        variant={isFollowing ? "contained" : "outlined"}
        onClick={() => follow(id)}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          px: 3,
          fontWeight: 500,
          width: "40%",
          backgroundColor: isFollowing ? "#3EC300" : "transparent",
          borderColor: isFollowing ? "#3EC300" : "#1976d2",
          color: isFollowing ? "#fff" : "#1976d2",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: isFollowing ? "#34a800" : "rgba(25,118,210,0.04)",
            borderColor: isFollowing ? "#34a800" : "#1565c0",
            transform: "scale(1.09)",
          },
        }}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>

      <Typography variant="caption" color="text.secondary">
        by: {owner}
      </Typography>
    </Paper>
  );
}

export default FollowCard;
