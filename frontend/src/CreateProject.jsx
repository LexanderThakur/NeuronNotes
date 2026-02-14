import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";

function CreateProject() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [error, setError] = useState("");

  function handleCreate() {
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

    // later:
    // API call here
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
