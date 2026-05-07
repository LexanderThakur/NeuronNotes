import { Box, Typography, Divider } from "@mui/material";
import VaultCard from "./VaultCard";
import CreateVaultDialog from "./CreateVaultDialog";
import AddIcon from "@mui/icons-material/Add";
const api = import.meta.env.VITE_API_URL;

import { fetch_vault, fetch_following } from "./api/your_vault_api";

import { useState, useEffect } from "react";
function YourVault() {
  const [open, setOpen] = useState(false);
  const [myProjects, setMyProject] = useState([]);
  const [myFollowing, setMyFollowing] = useState([]);
  async function refresh() {
    fetch_vault().then(setMyProject).catch(console.error);
  }

  useEffect(() => {
    refresh();
    fetch_following().then(setMyFollowing).catch(console.error);
  }, []);

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
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <Typography
              level="h4"
              sx={{ mb: 3, color: "#101110", fontWeight: 600 }}
            >
              Your Vaults
            </Typography>
            <AddIcon
              onClick={() => setOpen(true)}
              sx={{ cursor: "pointer" }}
            ></AddIcon>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            {myProjects.map((element, idx) => {
              return (
                <VaultCard
                  key={idx}
                  name={element.name}
                  description={element.description}
                  id={element.id}
                  refresh={refresh}
                ></VaultCard>
              );
            })}
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
            {myFollowing.map((element, idx) => {
              return (
                <VaultCard
                  key={"f" + idx}
                  name={element.project.name}
                  id={element.project.id}
                  description={element.project.description}
                  isFollower={true}
                  refresh={refresh}
                ></VaultCard>
              );
            })}
          </Box>
        </Box>
      </Box>
      <CreateVaultDialog
        open={open}
        setOpen={setOpen}
        refresh={refresh}
      ></CreateVaultDialog>
    </Box>
  );
}

export default YourVault;
