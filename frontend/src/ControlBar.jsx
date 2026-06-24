import React from "react";
import { Box, Typography, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import ExploreIcon from "@mui/icons-material/Explore";
import TimelineIcon from "@mui/icons-material/Timeline";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./Dashboard";
import { get_me, logout } from "./api/home_api";
export default function ControlBar() {
  const { open, setOpen, page, setPage } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const [user, setUser] = useState("user@email.com");

  async function handle_logout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  async function handle_me() {
    try {
      const email = await get_me();
      setUser(email);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handle_me();
  }, []);

  const items = [
    { label: "Home", icon: <TimelineIcon /> },
    { label: "Explore", icon: <ExploreIcon /> },
    { label: "Your Vault", icon: <ChromeReaderModeIcon /> },
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

          <Box
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              cursor: "pointer",
              flex: 1,
              p: 1,
              borderRadius: "10px",
              transition: "background 0.2s ease",

              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            <Typography sx={{ color: "#ddd", fontSize: 14 }}>User</Typography>
            <Typography sx={{ color: "#777", fontSize: 12 }}>{user}</Typography>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            slotProps={{
              paper: {
                sx: {
                  mt: -1,
                  minWidth: 180,
                  bgcolor: "#1a1a1a",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",

                  "& .MuiMenuItem-root": {
                    borderRadius: "8px",
                    mx: 1,
                    my: 0.5,
                    transition: "all 0.2s ease",
                  },

                  "& .MuiMenuItem-root:hover": {
                    bgcolor: "rgba(255,255,255,0.08)",
                  },
                },
              },
            }}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                handle_logout();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
}
