import React from "react";
import { useState, createContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import ExploreIcon from "@mui/icons-material/Explore";
import TimelineIcon from "@mui/icons-material/Timeline";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import YourVault from "./YourVault";
import ControlBar from "./ControlBar";
import Explore from "./Explore";
export const ThemeContext = createContext();
export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState("Your Vault");

  return (
    <ThemeContext.Provider value={{ open, setOpen, page, setPage }}>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        <ControlBar />

        {/* Main Content */}
        <Box sx={{ flex: 1, paddingLeft: 2 }}>
          <IconButton onClick={() => setOpen(!open)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M2 11C2 7.22876 2 5.34315 3.17157 4.17157C4.34315 3 6.22876 3 10 3H14C17.7712 3 19.6569 3 20.8284 4.17157C22 5.34315 22 7.22876 22 11V13C22 16.7712 22 18.6569 20.8284 19.8284C19.6569 21 17.7712 21 14 21H10C6.22876 21 4.34315 21 3.17157 19.8284C2 18.6569 2 16.7712 2 13V11Z"
                stroke="#1C274C"
                strokeWidth="1.5"
              />
              <path
                d="M15 21L15 3"
                stroke="#1C274C"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </IconButton>
          {page === "Your Vault" && <YourVault></YourVault>}
          {page === "Explore" && <Explore />}
        </Box>
      </Box>
    </ThemeContext.Provider>
  );
}
