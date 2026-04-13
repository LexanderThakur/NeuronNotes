import React from "react";
import { Box, Typography, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import ExploreIcon from "@mui/icons-material/Explore";
import TimelineIcon from "@mui/icons-material/Timeline";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

import { useState, useContext } from "react";
import { ThemeContext } from "./Dashboard";
export default function ControlBar() {
  const { open, setOpen, page, setPage } = useContext(ThemeContext);
  const items = [
    { label: "Your Vault", icon: <ChromeReaderModeIcon /> },
    { label: "Explore", icon: <ExploreIcon /> },
    { label: "Graph View", icon: <TimelineIcon /> },
    { label: "Quick Note", icon: <NoteAddIcon /> },
  ];
  return (
    <Box
      sx={{
        width: open ? 270 : 0,
        transition: "width 0.3s ease",
        backgroundColor: "#111",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Top */}
      <Box
        sx={{
          px: 2,
          py: 2,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 700,
            letterSpacing: "0.5px",
            fontSize: 18,
          }}
        >
          Neuron
        </Typography>

        <Typography
          sx={{
            color: "#777",
            fontSize: 12,
            mt: 0.5,
          }}
        >
          Knowledge Vault
        </Typography>
      </Box>

      {/* Center */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
        {items.map((item) => (
          <Button
            key={item.label}
            variant="plain"
            disableRipple
            onClick={() => setPage(item.label)}
            sx={{
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 1.5,
              textTransform: "none",
              borderRadius: "8px",
              mx: 1,
              px: 2,
              py: 1,
              color: "#ffff",
              backgroundColor: "transparent",
              transition:
                "background-color 0.18s ease, color 0.18s ease,transform 0.18s ease",

              "& svg": {
                opacity: 0.6,
                transition: "opacity 0.18s ease",
              },

              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.05)",
                color: "#fff",
                transform: "scale(1.1)",
              },

              "&:hover svg": {
                opacity: 1,
              },

              "&:active": {
                backgroundColor: "rgba(234, 230, 230, 0.83)",
              },
            }}
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </Box>

      {/* Bottom */}
      <Box
        sx={{
          px: 2,
          py: 2,
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
            }}
          >
            U
          </Box>

          <Box>
            <Typography sx={{ color: "#ddd", fontSize: 14 }}>User</Typography>
            <Typography sx={{ color: "#777", fontSize: 12 }}>
              user@email.com
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
