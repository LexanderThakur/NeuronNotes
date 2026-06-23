import { Box, Typography, IconButton } from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";

export default function StatCard({
  label,
  value,
  badge = "",
  highlight = false,
  dark = false,
}) {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        bgcolor: dark ? "#1a3a1a" : "#fff",
        borderRadius: 4,
        p: 2.5,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        border: dark ? "none" : "1px solid rgba(16,17,16,0.07)",
        position: "relative",
        overflow: "hidden",

        ...(dark && {
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -20,
            right: -20,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(80,160,80,0.2) 0%, transparent 70%)",
          },
        }),
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
        <Typography
          sx={{
            fontSize: "0.85rem",
            color: dark ? "rgba(255,255,255,0.7)" : "#666",
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>

        <IconButton
          size="small"
          sx={{
            border: `1px solid ${
              dark ? "rgba(255,255,255,0.2)" : "rgba(16,17,16,0.15)"
            }`,
            width: 28,
            height: 28,
          }}
        >
          <NorthEastIcon
            sx={{
              fontSize: "0.8rem",
              color: dark ? "#fff" : "#101110",
            }}
          />
        </IconButton>
      </Box>

      {/* Main Value */}
      <Typography
        sx={{
          fontSize: "2.2rem",
          fontWeight: 700,
          color: dark ? "#fff" : "#101110",
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>

      {/* Badge */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {highlight ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: dark ? "rgba(90,173,110,0.25)" : "rgba(31,111,235,0.08)",
              borderRadius: 99,
              px: 1,
              py: 0.25,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: dark ? "#5aad6e" : "#1F6FEB",
                fontWeight: 600,
              }}
            >
              {badge}
            </Typography>
          </Box>
        ) : (
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: dark ? "rgba(255,255,255,0.5)" : "#888",
            }}
          >
            {badge}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
