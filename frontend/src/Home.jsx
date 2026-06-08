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
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TaskDialog from "../home_components/TaskDialog";
import { total_projects, total_following } from "./api/project_api";
import DeleteIcon from "@mui/icons-material/Delete";
import { save_bookmark, get_bookmarks, delete_bookmark } from "./api/home_api";
import {
  get_tasks,
  create_task,
  toggle_task,
  delete_task,
} from "./api/home_api";
import BookmarkCard from "../home_components/BookmarkCard";
import TaskPanel from "../home_components/TaskPanel";
import BookmarkDialog from "../home_components/BookmarkDialog";
import Connection from "../home_components/Connection";
import StatCard from "../home_components/StatCard";
import PomodoroTimer from "../home_components/PomodoroTimer";
import { useSnackbar } from "./SnackbarContext";
// ── Data ─────────────────────────────────────────────────────

const ANALYTICS_BARS = [
  { day: "S", height: 55, filled: false },
  { day: "M", height: 70, filled: true, color: "#1e3a1e" },
  { day: "T", height: 85, filled: true, color: "#5aad6e", label: "74%" },
  { day: "W", height: 90, filled: true, color: "#101110" },
  { day: "T", height: 50, filled: false },
  { day: "F", height: 45, filled: false },
  { day: "S", height: 40, filled: false },
];

// ── Analytics Bar Chart ───────────────────────────────────────
function AnalyticsChart() {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 4,
        p: 3,
        border: "1px solid rgba(16,17,16,0.07)",
        flex: 1,
      }}
    >
      <Typography
        sx={{ fontWeight: 700, fontSize: "1rem", color: "#101110", mb: 3 }}
      >
        Project Analytics
      </Typography>
      <Box
        sx={{ display: "flex", alignItems: "flex-end", gap: 1.5, height: 120 }}
      >
        {ANALYTICS_BARS.map((bar, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            {bar.label && (
              <Typography sx={{ fontSize: "0.65rem", color: "#666", mb: 0.5 }}>
                {bar.label}
              </Typography>
            )}
            <Box
              sx={{
                width: "100%",
                height: bar.height,
                borderRadius: 99,
                bgcolor: bar.filled ? bar.color : "transparent",
                border: bar.filled ? "none" : "2px dashed rgba(16,17,16,0.15)",
                backgroundImage: !bar.filled
                  ? "repeating-linear-gradient(45deg, rgba(16,17,16,0.08) 0px, rgba(16,17,16,0.08) 2px, transparent 2px, transparent 8px)"
                  : "none",
                position: "relative",
                ...(bar.label && {
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: -4,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#fff",
                    border: "2px solid #5aad6e",
                  },
                }),
              }}
            />
            <Typography sx={{ fontSize: "0.72rem", color: "#888" }}>
              {bar.day}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function RightPanel() {
  return (
    <Box
      sx={{
        width: 270,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
        overflowY: "auto",
      }}
    >
      <TaskPanel></TaskPanel>
      <PomodoroTimer></PomodoroTimer>
    </Box>
  );
}

// ── Dashboard Page ────────────────────────────────────────────
export default function Home() {
  const [total_Projects, setTotalProjects] = useState(0);
  const [following, setFollowing] = useState(0);
  const { showSnackbar } = useSnackbar();

  const [tasks, setTasks] = useState([]);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  async function handle_total_projects() {
    try {
      const temp = await total_projects();
      setTotalProjects(temp);
    } catch (error) {
      console.log(error);
    }
  }
  async function handle_total_following() {
    try {
      const temp = await total_following();
      setFollowing(temp);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handle_total_projects();
    handle_total_following();
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        bgcolor: "#ffffff",
      }}
    >
      {/* Scrollable content */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          p: 3,
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
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              sx={{ fontSize: "2rem", fontWeight: 800, color: "#101110" }}
            >
              Neuron
            </Typography>
            <Typography sx={{ fontSize: "0.85rem", color: "#888", mt: 0.25 }}>
              The Developer's second Brain.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              sx={{
                bgcolor: "#3EC300",
                color: "#fff",
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                transition: "transform 0.4s ease",

                px: 2.5,
                "&:hover": { transform: "scale(1.1)" },
              }}
            >
              Add Project
            </Button>
          </Box>
        </Box>

        {/* Main layout: left+center | right panel */}
        <Box
          sx={{
            display: "flex",
            gap: 2.5,
            flex: 1,
            minHeight: 0,
            alignItems: "flex-start",
          }}
        >
          {/* Left + Center */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            {/* Stat Cards Row */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <StatCard
                label={"Your Projects"}
                value={total_Projects}
              ></StatCard>
              <StatCard label={"Following"} value={following}></StatCard>
            </Box>

            {/* Analytics + Reminder Row */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <AnalyticsChart />
              <BookmarkCard />
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Connection></Connection>
            </Box>
          </Box>

          {/* Right Panel */}
          <RightPanel />
        </Box>
      </Box>
    </Box>
  );
}
