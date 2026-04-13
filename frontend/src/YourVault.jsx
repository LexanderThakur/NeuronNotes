import { Box, Typography, Divider } from "@mui/material";
import VaultCard from "./VaultCard";

function YourVault() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // prevents outer overflow
      }}
    >
      <Box
        sx={{
          flex: 1,
          minHeight: 0, // 🔥 CRITICAL (fixes flex overflow bug)
          overflowY: "auto", // scroll happens HERE
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        {/* Your Vaults */}
        <Box>
          <Typography
            level="h4"
            sx={{ mb: 3, color: "#101110", fontWeight: 600 }}
          >
            Your Vaults
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            <VaultCard />
            <VaultCard />
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(16,17,16,0.08)" }} />

        {/* Following */}
        <Box>
          <Typography
            level="h4"
            sx={{ mb: 3, color: "#101110", fontWeight: 600 }}
          >
            Following
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            <VaultCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default YourVault;
