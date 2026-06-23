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
import RecentNotes from "../home_components/RecentNotes";
import BookmarkDialog from "../home_components/BookmarkDialog";
import Connection from "../home_components/Connection";
import StatCard from "../home_components/StatCard";
import PomodoroTimer from "../home_components/PomodoroTimer";
import { useSnackbar } from "./SnackbarContext";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import NoteIcon from "@mui/icons-material/Note";

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
  const [projectsThisMonth, setProjectsThisMonth] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  async function handle_total_projects() {
    try {
      const temp = await total_projects();

      setTotalProjects(temp.total);
      setProjectsThisMonth(temp.this_month);
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
                bgcolor: "#000000",
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
                label="Your Projects"
                value={total_Projects}
                badge={`+${projectsThisMonth} this month`}
                highlight={true}
              />
              <StatCard
                label="Following"
                value={following}
                badge="Knowledge network"
              />
            </Box>

            {/* Analytics + Reminder Row */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <RecentNotes></RecentNotes>
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
