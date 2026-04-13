import { Box, Typography, Button, IconButton, Menu } from "@mui/material";

import FollowCard from "./FollowCard";
export default function Explore() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // prevents outer overflow
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
      </Box>
    </Box>
  );
}
