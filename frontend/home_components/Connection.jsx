import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Chip,
  Divider,
  LinearProgress,
  Button,
} from "@mui/material";
import { FormControl, Select, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import VideocamIcon from "@mui/icons-material/Videocam";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

export default function Connection() {
  const [selectedVault, setSelectedVault] = useState("vault1");

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 4,
        p: 3,
        border: "1px solid rgba(16,17,16,0.07)",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1rem",
            color: "#101110",
          }}
        >
          Vault Connectivity
        </Typography>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <Select
            value={selectedVault}
            onChange={(e) => setSelectedVault(e.target.value)}
            sx={{
              borderRadius: 3,
              bgcolor: "#fafafa",
              fontSize: "0.9rem",
            }}
          >
            <MenuItem value="vault1">Frontend Vault</MenuItem>
            <MenuItem value="vault2">Backend Vault</MenuItem>
            <MenuItem value="vault3">ML Vault</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Horizontal Stats */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: 4,
        }}
      >
        {/* Connected */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <svg width="90" height="90" viewBox="0 0 90 90">
            <g stroke="#B8C3D1" strokeWidth="2">
              <line x1="25" y1="25" x2="45" y2="45" />
              <line x1="45" y1="45" x2="65" y2="25" />
              <line x1="45" y1="45" x2="25" y2="65" />
              <line x1="45" y1="45" x2="65" y2="65" />
            </g>

            <g fill="#C7D2DF">
              <circle cx="25" cy="25" r="8" />
              <circle cx="65" cy="25" r="8" />
              <circle cx="25" cy="65" r="8" />
              <circle cx="65" cy="65" r="8" />
              <circle cx="45" cy="45" r="10" />
            </g>
          </svg>

          <Box>
            <Typography
              sx={{
                fontSize: "1.8rem",
                fontWeight: 700,
                lineHeight: 1,
                color: "#101110",
              }}
            >
              78%
            </Typography>

            <Typography
              sx={{
                fontSize: "0.85rem",
                color: "#666",
              }}
            >
              Connected Nodes
            </Typography>
          </Box>
        </Box>

        {/* Disconnected */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* SVG Placeholder */}
          <svg width="90" height="90" viewBox="0 0 90 90">
            <g fill="#C7D2DF">
              <circle cx="25" cy="25" r="8" />
              <circle cx="65" cy="30" r="8" />
              <circle cx="40" cy="65" r="8" />
            </g>
          </svg>

          <Box>
            <Typography
              sx={{
                fontSize: "1.8rem",
                fontWeight: 700,
                lineHeight: 1,
                color: "#101110",
              }}
            >
              22%
            </Typography>

            <Typography
              sx={{
                fontSize: "0.85rem",
                color: "#666",
              }}
            >
              Disconnected Nodes
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
