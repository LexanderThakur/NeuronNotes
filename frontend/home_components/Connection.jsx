import { useState, useEffect } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import {
  get_connection_projects,
  get_connection_percentage,
} from "../src/api/home_api";
export default function Connection() {
  const [selectedVault, setSelectedVault] = useState("");

  const [connectPercentage, setConnect] = useState(0);
  const [disconnectPercentage, setDisconnect] = useState(0);
  const [projects, setProjects] = useState([]);
  const [totalNotes, setTotalNotes] = useState(0);
  async function handle_get() {
    try {
      const temp = await get_connection_projects();

      setProjects(temp);

      if (temp.length > 0) {
        setSelectedVault(temp[0].id);

        await handle_percentage(temp[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handle_percentage(projectId) {
    try {
      const data = await get_connection_percentage(projectId);

      setConnect(data.message);
      setDisconnect(100 - data.message);
      setTotalNotes(data.total);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handle_get();
  }, []);

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
        <Select
          variant="standard"
          value={selectedVault}
          onChange={async (e) => {
            const projectId = e.target.value;

            setSelectedVault(projectId);

            await handle_percentage(projectId);
          }}
          disableUnderline
          MenuProps={{
            PaperProps: {
              sx: {
                mt: 1,
                p: 0.5,
                borderRadius: 3,
                border: "1px solid rgba(16,17,16,0.07)",
                boxShadow: "0 8px 24px rgba(16,17,16,0.08)",
              },
            },
          }}
          sx={{
            fontSize: "0.85rem",
            fontWeight: 500,
            color: "#666",

            "& .MuiSelect-select": {
              py: 0.25,
              pr: 3,
            },

            "& .MuiSelect-icon": {
              color: "#999",
              fontSize: "1rem",
            },

            "&:before": {
              display: "none",
            },

            "&:after": {
              display: "none",
            },
          }}
        >
          {projects.map((item, index) => {
            return (
              <MenuItem
                value={item.id}
                key={item.id}
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "#444",
                  borderRadius: 2,
                  minHeight: 36,

                  "&:hover": {
                    bgcolor: "rgba(31,111,235,0.05)",
                  },

                  "&.Mui-selected": {
                    bgcolor: "rgba(31,111,235,0.08)",
                    color: "#1F6FEB",
                    fontWeight: 600,
                  },

                  "&.Mui-selected:hover": {
                    bgcolor: "rgba(31,111,235,0.12)",
                  },
                }}
              >
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </Box>

      {/* Stats */}

      {totalNotes === 0 ? (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: "#888",
              fontSize: "0.9rem",
            }}
          >
            This vault has no notes yet.
          </Typography>
        </Box>
      ) : (
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
              flex: 1,
              justifyContent: "center",
            }}
          >
            <svg width="100" height="100" viewBox="0 0 90 90">
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
                  fontSize: "2rem",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "#101110",
                }}
              >
                {connectPercentage}%
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "#666",
                }}
              >
                Connected
              </Typography>
            </Box>
          </Box>

          {/* Disconnected */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <svg width="100" height="100" viewBox="0 0 90 90">
              <g fill="#C7D2DF">
                <circle cx="25" cy="25" r="8" />
                <circle cx="65" cy="30" r="8" />
                <circle cx="40" cy="65" r="8" />
              </g>
            </svg>

            <Box>
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "#101110",
                }}
              >
                {disconnectPercentage}%
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "#666",
                }}
              >
                Disconnected
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
