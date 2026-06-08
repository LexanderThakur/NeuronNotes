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
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
export default function StatCard({
  label,
  value,
  badge = "5+ Increased from last month",
  dark = false,
}) {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        bgcolor: dark ? "#1a3a1a" : "#fff",
        borderRadius: 4,
        p: 2.5,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        border: dark ? "none" : "1px solid rgba(16,17,16,0.07)",
        position: "relative",
        overflow: "hidden",
        ...(dark && {
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -20,
            right: -20,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(80,160,80,0.2) 0%, transparent 70%)",
          },
        }),
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography
          sx={{
            fontSize: "0.85rem",
            color: dark ? "rgba(255,255,255,0.7)" : "#666",
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>
        <IconButton
          size="small"
          sx={{
            border: `1px solid ${dark ? "rgba(255,255,255,0.2)" : "rgba(16,17,16,0.15)"}`,
            width: 28,
            height: 28,
          }}
        >
          <NorthEastIcon
            sx={{ fontSize: "0.8rem", color: dark ? "#fff" : "#101110" }}
          />
        </IconButton>
      </Box>
      <Typography
        sx={{
          fontSize: "2.2rem",
          fontWeight: 700,
          color: dark ? "#fff" : "#101110",
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {badge.includes("Increased") && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: dark
                ? "rgba(90,173,110,0.25)"
                : "rgba(152, 183, 227, 0.08)",
              borderRadius: 99,
              px: 1,
              py: 0.25,
            }}
          >
            <TrendingUpIcon
              sx={{
                fontSize: "0.75rem",
                color: dark ? "#5aad6e" : "#1F6FEB",
                mr: 0.5,
              }}
            />
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: dark ? "#5aad6e" : "#1F6FEB",
                fontWeight: 600,
              }}
            >
              {badge}
            </Typography>
          </Box>
        )}
        {!badge.includes("Increased") && (
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: dark ? "rgba(255,255,255,0.5)" : "#888",
            }}
          >
            {badge}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
