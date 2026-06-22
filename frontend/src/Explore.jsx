import { Box, Typography, Button, IconButton, Menu } from "@mui/material";

import FollowCard from "./FollowCard";
import Pagination from "@mui/material/Pagination";
import { get_to_follow } from "./api/explore";
import { useState, useEffect } from "react";

export default function Explore() {
  const [arr, setArr] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    get_to_follow(page).then((data) => {
      setArr(data.results);
      setTotalPages(data.total_pages);
    });
  }, [page]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // prevents outer overflow
      }}
      // sx={{
      //   mt: 4,
      //   display: "flex",
      //   justifyContent: "center",
      // }}
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
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        }}
      >
        <Pagination
          page={page}
          count={totalPages}
          onChange={(event, value) => {
            setPage(value);
          }}
          color="primary"
          size="large"
        />
      </Box>
    </Box>
  );
}
