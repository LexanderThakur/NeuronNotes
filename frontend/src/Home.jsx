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

import BookmarkDialog from "../home_components/BookmarkDialog";

import { useSnackbar } from "./SnackbarContext";
// ── Data ─────────────────────────────────────────────────────

const STAT_CARDS = [
  {
    label: "Your Vaults",
    value: 24,
  },
  {
    label: "Following",
    value: 10,
  },
];

const ANALYTICS_BARS = [
  { day: "S", height: 55, filled: false },
  { day: "M", height: 70, filled: true, color: "#1e3a1e" },
  { day: "T", height: 85, filled: true, color: "#5aad6e", label: "74%" },
  { day: "W", height: 90, filled: true, color: "#101110" },
  { day: "T", height: 50, filled: false },
  { day: "F", height: 45, filled: false },
  { day: "S", height: 40, filled: false },
];

const TEAM_MEMBERS = [];

const PROJECTS = [];

// ── Status chip ───────────────────────────────────────────────
function StatusChip({ status, color }) {
  const bgMap = {
    Completed: "rgba(46,125,50,0.1)",
    "In Progress": "rgba(230,81,0,0.1)",
    Pending: "rgba(93,64,55,0.1)",
  };
  return (
    <Chip
      label={status}
      size="small"
      sx={{
        bgcolor: bgMap[status] || "rgba(0,0,0,0.06)",
        color: color,
        fontWeight: 600,
        fontSize: "0.7rem",
        height: 22,
        borderRadius: 1,
        "& .MuiChip-label": { px: 1 },
      }}
    />
  );
}

// ── Stat Card ─────────────────────────────────────────────────
function StatCard({
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

// ── Project Progress ──────────────────────────────────────────
function ProjectProgress() {
  const progress = 41;
  const radius = 70;
  const stroke = 14;
  const norm = radius - stroke / 2;
  const circ = Math.PI * norm; // half circle
  const dash = (progress / 100) * circ;

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
      }}
    >
      <Typography
        sx={{ fontWeight: 700, fontSize: "1rem", color: "#101110", mb: 2 }}
      >
        Project Progress
      </Typography>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Semi-circle gauge */}
        <Box sx={{ position: "relative", width: 160, height: 90, mb: 1 }}>
          <svg width="160" height="100" viewBox="0 0 160 100">
            {/* Background arc */}
            <path
              d="M 10 90 A 70 70 0 0 1 150 90"
              fill="none"
              stroke="rgba(16,17,16,0.08)"
              strokeWidth={stroke}
              strokeLinecap="round"
            />
            {/* Pending hatched */}
            <path
              d="M 10 90 A 70 70 0 0 1 150 90"
              fill="none"
              stroke="url(#hatch)"
              strokeWidth={stroke}
              strokeLinecap="round"
            />
            {/* Completed dark */}
            <path
              d="M 10 90 A 70 70 0 0 1 80 20"
              fill="none"
              stroke="#1a3a1a"
              strokeWidth={stroke}
              strokeLinecap="round"
            />
            {/* In Progress green */}
            <path
              d="M 80 20 A 70 70 0 0 1 135 55"
              fill="none"
              stroke="#4a8c5c"
              strokeWidth={stroke}
              strokeLinecap="round"
            />
            <defs>
              <pattern
                id="hatch"
                patternUnits="userSpaceOnUse"
                width="6"
                height="6"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="6"
                  stroke="rgba(16,17,16,0.18)"
                  strokeWidth="2"
                />
              </pattern>
            </defs>
          </svg>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "#101110",
                lineHeight: 1,
              }}
            >
              {progress}%
            </Typography>
            <Typography sx={{ fontSize: "0.7rem", color: "#888" }}>
              Project Ended
            </Typography>
          </Box>
        </Box>

        {/* Legend */}
        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
          {[
            { color: "#4a8c5c", label: "Completed" },
            { color: "#1a3a1a", label: "In Progress" },
            { label: "Pending", hatched: true },
          ].map((item, i) => (
            <Box
              key={i}
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              {item.hatched ? (
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: 99,
                    border: "2px dashed rgba(16,17,16,0.3)",
                    backgroundImage:
                      "repeating-linear-gradient(45deg, rgba(16,17,16,0.1) 0px, rgba(16,17,16,0.1) 1px, transparent 1px, transparent 4px)",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: 99,
                    bgcolor: item.color,
                  }}
                />
              )}
              <Typography sx={{ fontSize: "0.7rem", color: "#666" }}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// ── Right Panel: Projects + Time Tracker ─────────────────────
function ProjectRow({ project }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        py: 0.8,
        px: 1,
        borderRadius: 2,
        cursor: "pointer",
        "&:hover": { bgcolor: "rgba(16,17,16,0.04)" },
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: project.color + "22",
          color: project.color,
          fontSize: "0.9rem",
          borderRadius: 2,
          flexShrink: 0,
        }}
      >
        {project.icon}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#101110",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {project.name}
        </Typography>
        <Typography sx={{ fontSize: "0.68rem", color: "#888" }}>
          Due date: {project.due}
        </Typography>
      </Box>
    </Box>
  );
}

function TimeTracker() {
  const [seconds, setSeconds] = useState(5048);
  const [running, setRunning] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    if (running)
      ref.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    else clearInterval(ref.current);
    return () => clearInterval(ref.current);
  }, [running]);

  const fmt = (n) => String(n).padStart(2, "0");
  const h = fmt(Math.floor(seconds / 3600));
  const m = fmt(Math.floor((seconds % 3600) / 60));
  const s = fmt(seconds % 60);

  return (
    <Box
      sx={{
        borderRadius: 4,
        background: "linear-gradient(135deg, #101110 0%, #1b2e1b 100%)",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: -40,
          right: -40,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(50,120,50,0.4) 0%, transparent 70%)",
          pointerEvents: "none",
        },
      }}
    >
      <Typography
        sx={{ color: "#fff", fontWeight: 600, fontSize: "1rem", zIndex: 1 }}
      >
        Time Tracker
      </Typography>
      <Typography
        sx={{
          color: "#fff",
          fontWeight: 700,
          fontSize: "2.4rem",
          letterSpacing: 3,
          fontVariantNumeric: "tabular-nums",
          zIndex: 1,
        }}
      >
        {h}:{m}:{s}
      </Typography>
      <Box sx={{ display: "flex", gap: 1.5, zIndex: 1 }}>
        <IconButton
          onClick={() => setRunning((r) => !r)}
          sx={{
            bgcolor: "rgba(255,255,255,0.15)",
            color: "#fff",
            width: 40,
            height: 40,
            "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
          }}
        >
          {running ? (
            <PauseIcon fontSize="small" />
          ) : (
            <PlayArrowIcon fontSize="small" />
          )}
        </IconButton>
        <IconButton
          onClick={() => {
            setRunning(false);
            setSeconds(0);
          }}
          sx={{
            bgcolor: "#E85D75",
            color: "#fff",
            width: 40,
            height: 40,
            "&:hover": { bgcolor: "#c94d63" },
          }}
        >
          <StopIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

function RightPanel({ tasks, onToggle, onDelete, onOpenDialog }) {
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
      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: 4,
          p: 2.5,
          border: "1px solid rgba(16,17,16,0.07)",
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography
            sx={{ fontWeight: 700, fontSize: "1rem", color: "#101110" }}
          >
            Backlog Tasks
          </Typography>
          <Chip
            icon={<AddIcon />}
            label="New"
            size="small"
            onClick={onOpenDialog}
            sx={{
              borderRadius: 99,
              border: "1px solid rgba(16,17,16,0.15)",
              bgcolor: "transparent",
              cursor: "pointer",
            }}
          />
        </Box>
        <Divider sx={{ mb: 1, borderColor: "rgba(16,17,16,0.06)" }} />
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          {tasks.map((task) => (
            <Box
              key={task.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                py: 1,
              }}
            >
              <Typography
                onClick={() => onToggle(task.id)}
                sx={{
                  fontSize: "0.8rem",
                  flex: 1,
                  cursor: "pointer",
                  userSelect: "none",

                  textDecoration: task.completed ? "line-through" : "none",

                  color: task.completed ? "#888" : "#101110",

                  transition: "0.2s",
                }}
              >
                {task.title}
              </Typography>

              <DeleteIcon
                onClick={() => onDelete(task.id)}
                sx={{
                  fontSize: 18,
                  cursor: "pointer",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <TimeTracker />
    </Box>
  );
}

// ── Dashboard Page ────────────────────────────────────────────
export default function Home() {
  const [total_Projects, setTotalProjects] = useState(0);
  const [following, setFollowing] = useState(0);
  const { showSnackbar } = useSnackbar();
  const [bookmarkDialogOpen, setBookmarkDialogOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  async function fetchTasks() {
    try {
      const data = await get_tasks();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleCreateTask(title) {
    try {
      await create_task(title);

      await fetchTasks();

      showSnackbar({
        title: "Success",
        description: "Task created",
        success: true,
      });
    } catch (error) {
      showSnackbar({
        title: "Error",
        description: error.message,
        success: false,
      });
    }
  }
  async function handleToggleTask(id) {
    try {
      await toggle_task(id);

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? {
                ...task,
                completed: !task.completed,
              }
            : task,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDeleteTask(id) {
    try {
      await delete_task(id);

      setTasks((prev) => prev.filter((task) => task.id !== id));

      showSnackbar({
        title: "Success",
        description: "Task deleted",
        success: true,
      });
    } catch (error) {
      showSnackbar({
        title: "Error",
        description: error.message,
        success: false,
      });
    }
  }
  async function handleBookmarkSave(bookmark) {
    try {
      await save_bookmark(bookmark.name, bookmark.link);

      await fetchBookmarks();

      showSnackbar({
        title: "Success",
        description: "Bookmark added",
        success: true,
      });
    } catch (error) {
      showSnackbar({
        title: "Error",
        description: error.message,
        success: false,
      });
    }
  }
  async function handleDeleteBookmark(id) {
    try {
      await delete_bookmark(id);

      setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));

      showSnackbar({
        title: "Success",
        description: "Bookmark deleted",
        success: true,
      });
    } catch (error) {
      showSnackbar({
        title: "Error",
        description: error.message,
        success: false,
      });
    }
  }
  async function fetchBookmarks() {
    try {
      const data = await get_bookmarks();

      setBookmarks(data);
    } catch (error) {
      console.log(error);
    }
  }
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
    fetchBookmarks();
    fetchTasks();
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
              <BookmarkCard
                bookmarks={bookmarks}
                onAdd={() => setBookmarkDialogOpen(true)}
                onDelete={handleDeleteBookmark}
              />
            </Box>

            {/* Team + Progress Row */}
            <Box sx={{ display: "flex", gap: 2 }}>
              {/* <TeamCollaboration /> */}
              <ProjectProgress />
            </Box>
          </Box>

          {/* Right Panel */}
          <RightPanel
            tasks={tasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onOpenDialog={() => setTaskDialogOpen(true)}
          />
        </Box>
      </Box>
      <BookmarkDialog
        open={bookmarkDialogOpen}
        onClose={() => setBookmarkDialogOpen(false)}
        onSave={handleBookmarkSave}
      />
      <TaskDialog
        open={taskDialogOpen}
        onClose={() => setTaskDialogOpen(false)}
        onSave={handleCreateTask}
      />
    </Box>
  );
}
