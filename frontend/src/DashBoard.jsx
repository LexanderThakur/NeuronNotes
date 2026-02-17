import { Box, Typography, Avatar, Button, Divider } from "@mui/material";
import CreateProject from "./CreateProject";
import { useState } from "react";
import FollowCardC from "./FollowCardC";
import VaultPage from "./ValutPage";
import ControlBar from "./ControlBar";
import ProjectManager from "./ProjectManager";
function Dashboard({ userEmail = "user@email.com", children, open_project }) {
  const [page, setPage] = useState("Create Project");

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f6f7fb" }}>
      {/* Sidebar */}

      <ControlBar userEmail={userEmail} setPage={setPage} />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          bgcolor: "#ebecee",
          borderRadius: 6,
          overflowY: "auto",
          minHeight: 0,
        }}
      >
        {page === "Create Project" && <CreateProject />}
        {page === "Browse" && <FollowCardC />}
        {page === "Your Vault" && <VaultPage open_project={open_project} />}
      </Box>
    </Box>
  );
}

export default Dashboard;
