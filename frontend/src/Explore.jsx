import { Box, Typography, Button, IconButton, Menu } from "@mui/material";

import FollowCard from "./FollowCard";

import { get_to_follow } from "./api/explore";
import { useState, useEffect } from "react";

export default function Explore() {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    get_to_follow().then(setArr).catch(console.error);
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // prevents outer overflow
      }}
    >
      <Typography
        sx={{
          fontSize: "2rem",
          fontWeight: 800,
          color: "#101110",
          marginTop: "1rem",
        }}
      >
        Explore
      </Typography>
      <Typography
        sx={{
          fontSize: "0.85rem",
          color: "#888",
          mt: 0.25,
          marginBottom: "1rem",
        }}
      >
        View, Follow, Duplicate other's vaults.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {arr.map((element, index) => {
          return (
            <FollowCard
              key={index}
              title={element.name}
              description={element.description}
              id={element.id}
            ></FollowCard>
          );
        })}
      </Box>
    </Box>
  );
}
