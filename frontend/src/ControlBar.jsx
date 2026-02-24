import { Box, Typography, Avatar, Button, Divider } from "@mui/material";

function ControlBar({ userEmail, setPage }) {
  return (
    <Box
      sx={{
        width: 270,
        bgcolor: "#F0DCCA",
        color: "#1a1a1a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        flexShrink: 0,

        //   borderTopRightRadius: 24,
        //   borderBottomRightRadius: 24,

        boxShadow: "4px 0 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* Top Section */}
      <Box>
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 5,
          }}
        >
          <Box component="img" src="/logo.svg" alt="Logo" sx={{ height: 40 }} />

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: 1.2,
              fontFamily: "sans-serif",
            }}
          >
            Neuron
          </Typography>
        </Box>

        {/* Menu Buttons */}
        {["Create Project", "Browse", "Your Vault"].map((item) => (
          <Button
            key={item}
            fullWidth
            onClick={() => setPage(item)}
            sx={{
              color: "#2b2b2b",
              justifyContent: "flex-start",
              borderRadius: 3,
              px: 2,
              py: 1.2,
              mb: 1,
              border: "1px solid transparent",
              transition: "all 0.2s ease",

              "&:hover": {
                border: "1px solid #2b2b2b",
                transform: "translateX(4px)",
                bgcolor: "transparent",
              },
            }}
          >
            {item}
          </Button>
        ))}
      </Box>

      {/* Bottom User Section */}
      <Box>
        <Divider sx={{ bgcolor: "rgba(0,0,0,0.08)", mb: 2 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: "black",
              color: "#FFFFFA",
              width: 36,
              height: 36,
              fontWeight: 600,
            }}
          >
            {userEmail[0].toUpperCase()}
          </Avatar>

          <Typography variant="body2" sx={{ color: "#333" }}>
            {userEmail}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ControlBar;
