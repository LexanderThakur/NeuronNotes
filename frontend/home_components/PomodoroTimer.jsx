import { useState, useEffect, useRef } from "react";
import { Box, Typography, Chip, IconButton } from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

export default function PomodoroTimer() {
  const [duration, setDuration] = useState(15);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [running, setRunning] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function handleDurationChange(minutes) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setRunning(false);
    setDuration(minutes);
    setTimeLeft(minutes * 60);
  }

  function handleStart() {
    if (running) return;

    setRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setRunning(false);

          alert("Focus session complete!");

          return duration * 60;
        }

        return prev - 1;
      });
    }, 1000);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setRunning(false);
    setTimeLeft(duration * 60);
  }

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <Box
      sx={{
        borderRadius: 4,
        p: 3,
        minHeight: 250,

        position: "relative",
        overflow: "hidden",

        background:
          "linear-gradient(135deg, #020617 0%, #0F172A 45%, #1E3A8A 100%)",

        boxShadow: "0 12px 32px rgba(15,23,42,0.25)",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        "&::before": {
          content: '""',
          position: "absolute",
          top: -80,
          right: -80,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(96,165,250,0.4) 0%, transparent 70%)",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -120,
          left: -120,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
        },
      }}
    >
      <Typography
        sx={{
          color: "#F8FAFC",
          fontWeight: 700,
          fontSize: "1rem",
        }}
      >
        Focus Session
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
        }}
      >
        {[15, 30, 50].map((mins) => (
          <Chip
            key={mins}
            label={`${mins}m`}
            clickable
            onClick={() => handleDurationChange(mins)}
            sx={{
              height: 30,
              fontSize: "0.75rem",
              fontWeight: 600,
              zIndex: 1,

              color: duration === mins ? "#FFFFFF" : "#CBD5E1",

              bgcolor:
                duration === mins
                  ? "rgba(96,165,250,0.22)"
                  : "rgba(255,255,255,0.08)",

              border:
                duration === mins
                  ? "1px solid rgba(96,165,250,0.35)"
                  : "1px solid rgba(255,255,255,0.08)",

              "&:hover": {
                bgcolor:
                  duration === mins
                    ? "rgba(96,165,250,0.32)"
                    : "rgba(255,255,255,0.12)",
              },
            }}
          />
        ))}
      </Box>

      <Typography
        sx={{
          color: "#F8FAFC",
          fontWeight: 800,
          fontSize: "3.25rem",
          textAlign: "center",
          letterSpacing: 2,
          fontVariantNumeric: "tabular-nums",
          zIndex: 1,
        }}
      >
        {minutes}:{seconds}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <IconButton
          onClick={handleStart}
          disabled={running}
          sx={{
            width: 58,
            height: 58,

            bgcolor: "rgba(255,255,255,0.12)",
            color: "#fff",
            zIndex: 1,

            "&:hover": {
              bgcolor: "rgba(255,255,255,0.2)",
            },

            "&.Mui-disabled": {
              bgcolor: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.25)",
            },
          }}
        >
          <PlayArrowIcon />
        </IconButton>

        <IconButton
          onClick={handleStop}
          sx={{
            width: 58,
            height: 58,

            bgcolor: "#F15B6C",
            color: "#fff",

            "&:hover": {
              bgcolor: "#E5485A",
            },
          }}
        >
          <StopIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
