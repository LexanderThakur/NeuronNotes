import { useState, useEffect } from "react";
import { Box, Typography, Chip, Divider } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import TaskDialog from "./TaskDialog";

import {
  get_tasks,
  create_task,
  toggle_task,
  delete_task,
} from "../src/api/home_api";
import { useSnackbar } from "../src/SnackbarContext";

export default function TaskPanel() {
  const { showSnackbar } = useSnackbar();

  const [tasks, setTasks] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
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
            sx={{
              fontWeight: 700,
              fontSize: "1rem",
              color: "#101110",
            }}
          >
            Backlog Tasks
          </Typography>

          <Chip
            icon={<AddIcon />}
            label="New"
            size="small"
            onClick={() => setDialogOpen(true)}
            sx={{
              borderRadius: 99,
              border: "1px solid rgba(16,17,16,0.15)",
              bgcolor: "transparent",
              cursor: "pointer",
            }}
          />
        </Box>

        <Divider
          sx={{
            mb: 1,
            borderColor: "rgba(16,17,16,0.06)",
          }}
        />

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
                onClick={() => handleToggleTask(task.id)}
                sx={{
                  fontSize: "0.8rem",
                  flex: 1,
                  cursor: "pointer",
                  userSelect: "none",
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "#888" : "#101110",
                }}
              >
                {task.title}
              </Typography>

              <DeleteIcon
                onClick={() => handleDeleteTask(task.id)}
                sx={{
                  fontSize: 18,
                  cursor: "pointer",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <TaskDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleCreateTask}
      />
    </>
  );
}
