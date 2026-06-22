import React from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";

import { follow } from "./api/explore";
import { useNavigate } from "react-router-dom";
export default function FollowCard({
  title = "Project Alpha",
  description = "This vault contains notes, references and structured knowledge.",
  id,
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  const handleFollow = async () => {
    if (isFollowing) {
      return;
    }
    const success = await follow(id);
    if (success) {
      setIsFollowing(true);
    } else {
      alert("Network Error");
    }
  };

  return (
    <Box
      sx={{
        width: 220,
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        border: "1px solid rgba(16,17,16,0.08)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",

        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          transform: "translateY(-3px)",
        },
      }}
    >
      {/* Top Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography
          sx={{
            color: "#101110",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Description */}
      <Typography
        sx={{
          color: "rgba(16,17,16,0.7)",
          fontSize: 14,
          lineHeight: 1.6,
        }}
      >
        {description}
      </Typography>

      {/* Bottom Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
        }}
      >
        {/* View Project */}
        <Button
          onClick={() => navigate(`/view/${id}`)}
          variant="text"
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            color: "#1F6FEB",
            fontWeight: 500,
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 0,
            minHeight: "auto",
            fontSize: "1rem",

            "&:hover": {
              backgroundColor: "transparent",
              color: "#1558C0",
            },

            "& .arrow-icon": {
              transition: "transform 0.4s ease",
            },

            "&:hover .arrow-icon": {
              transform: "translateX(8px)",
            },
          }}
        >
          View
          <svg
            className="arrow-icon"
            width="20"
            height="20"
            viewBox="0 0 30 30"
            fill="none"
          >
            <path
              d="M3 15H25"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M18 8L25 15L18 22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Button>

        {/* Follow */}
        <Button
          variant={isFollowing ? "contained" : "outlined"}
          onClick={handleFollow}
          sx={{
            borderRadius: 9,
            textTransform: "none",
            px: 3,
            fontWeight: 500,
            width: "40%",
            backgroundColor: isFollowing ? "#3EC300" : "transparent",
            borderColor: isFollowing ? "#3EC300" : "#3EC300",
            color: isFollowing ? "#fff" : "#3EC300",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: isFollowing
                ? "#34a800"
                : "rgba(25,118,210,0.04)",
              borderColor: isFollowing ? "#34a800" : "#34a800",
              transform: "scale(1.09)",
            },
          }}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </Box>
    </Box>
  );
}
