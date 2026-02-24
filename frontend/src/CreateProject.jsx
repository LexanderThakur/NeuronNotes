import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";

const api = import.meta.env.VITE_API_URL;

function CreateProject() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  async function handleCreate() {
    if (!name.trim()) {
      setError("Project name required");
      return;
    }
    if (!desc.trim()) {
      setError("Please enter project description");
      return;
    }

    setError("");

    console.log({
      name,
      desc,
      visibility,
    });

    try {
      const response = await fetch(api + "/projects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: name,
          description: desc,
          is_public: visibility === "public" ? true : false,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Failed to create project");
        setSuccess("");
        return;
      }

      setSuccess("Project created successfully!");
      setError("");

      // ✅ reset form
      setName("");
      setDesc("");
      setVisibility("public");
    } catch (error) {
      setError("Network error. Try again.");
      setSuccess("");
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 6,
        alignItems: "center",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          width: 500,
          borderRadius: 5,
          bgcolor: "#ffffff",
        }}
      >
        <Typography variant="h5" mb={3}>
          Create Project
        </Typography>

        {/* Project Name */}
        <TextField
          label="Project Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 4,
            },
          }}
        />

        {/* Description */}
        <TextField
          label="Description"
          multiline
          rows={3}
          fullWidth
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 4,
            },
          }}
        />

        {/* Public / Private */}
        <TextField
          select
          label="Visibility"
          fullWidth
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 4,
            },
          }}
        >
          <MenuItem value="private">Private</MenuItem>
          <MenuItem value="public">Public</MenuItem>
        </TextField>

        {/* Hidden Error Area */}
        {success && (
          <Typography
            sx={{
              color: "#3EC300",
              mt: 2,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {success}
          </Typography>
        )}
        {error && (
          <Typography
            sx={{
              color: "#FF312E",
              mt: 2,
              fontSize: 14,
            }}
          >
            {error}
          </Typography>
        )}

        {/* Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handleCreate}
            sx={{
              width: "40%",
              color: "#3EC300",
              borderColor: "#3EC300",
              fontWeight: 600,
              transition: "all 0.2s ease",
              height: 45,

              "&:hover": {
                borderColor: "#3EC300",
                transform: "scale(1.05)",
              },
            }}
          >
            Initialize Project
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default CreateProject;
