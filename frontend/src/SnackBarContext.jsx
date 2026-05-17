// SnackBarContext.jsx

import { createContext, useContext, useState } from "react";

import { Snackbar, Box, Typography } from "@mui/material";

const SnackbarContext = createContext();

export function SnackbarProvider({ children }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    title: "",
    description: "",
    success: true,
  });

  function showSnackbar({ title, description = "", success = true }) {
    setSnackbar({
      open: true,
      title,
      description,
      success,
    });
  }

  function handleClose() {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",

            minWidth: 320,
            backgroundColor: "#ffffff",
            borderRadius: "14px",
            padding: "14px 16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              mb: 0.5,
              color: snackbar.success ? "#22c55e" : "#ef4444",
            }}
          >
            {snackbar.title}
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              color: "#666",
              lineHeight: 1.5,
            }}
          >
            {snackbar.description}
          </Typography>

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "4px",
              overflow: "hidden",

              borderBottomLeftRadius: "14px",
              borderBottomRightRadius: "14px",
            }}
          >
            <Box
              sx={{
                height: "100%",
                backgroundColor: snackbar.success ? "#22c55e" : "#ef4444",

                animation: "shrink 3s linear forwards",

                "@keyframes shrink": {
                  from: {
                    width: "100%",
                  },
                  to: {
                    width: "0%",
                  },
                },
              }}
            />
          </Box>
        </Box>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  return useContext(SnackbarContext);
}
