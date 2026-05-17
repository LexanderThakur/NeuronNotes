import {
  Box,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { use, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EastIcon from "@mui/icons-material/East";
import DeleteVaultDialog from "./DeleteVaultDialog";
import RenameDialog from "./RenameDialog";
import { useNavigate } from "react-router-dom";
import { delete_project } from "./api/your_vault_api";
import { unfollow } from "./api/your_vault_api";

import ConfirmDialog from "./ConfirmDialog";

export default function VaultCard({
  id,
  name = "Project Alpha",
  description = "This vault contains notes, references and structured knowledge.",
  isFollower = false,
  refresh,
}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openRename, setOpenRename] = useState(false);
  const [openUnfollow, setOpenUnfollow] = useState(false);
  return (
    <Box
      sx={{
        width: 200,
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        border: "1px solid rgba(16,17,16,0.08)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",

        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          transform: "translateY(-3px)",
        },
      }}
    >
      {/* Top Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography
          sx={{
            color: "#101110",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          {name}
        </Typography>

        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {!isFollower && (
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setOpenRename(true);
              }}
            >
              Rename
            </MenuItem>
          )}
          {isFollower && (
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
              }}
            >
              Duplicate
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              if (!isFollower) {
                setOpenDelete(true);
              } else {
                setOpenUnfollow(true);
              }
            }}
            sx={{
              color: "#FF312E",
            }}
          >
            {isFollower ? "Unfollow" : "Delete"}
          </MenuItem>
        </Menu>
      </Box>

      {/* Description */}
      <Typography
        sx={{
          color: "rgba(16,17,16,0.7)",
          fontSize: 14,
          lineHeight: 1.6,
        }}
      >
        {description}
      </Typography>

      {/* Bottom Row */}
      <Box sx={{ mt: "auto" }}>
        <Button
          onClick={() => navigate(`/manage/${id}`)}
          variant="text"
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            color: "#1F6FEB",
            fontWeight: 500,
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 0,
            minHeight: "auto",
            fontSize: "1rem",
            transition: "color 0.25s ease",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#1558C0",
            },
            "& .arrow-icon": {
              transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            },
            "&:hover .arrow-icon": {
              transform: "translateX(12px)",
            },
          }}
        >
          {isFollower ? "View" : "Manage"}
          <svg
            className="arrow-icon"
            width="22"
            height="22"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 15H25"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M18 8L25 15L18 22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Button>
      </Box>
      <DeleteVaultDialog
        open={openDelete}
        setOpen={setOpenDelete}
        refresh={refresh}
        id={id}
      />
      <RenameDialog
        open={openRename}
        setOpen={setOpenRename}
        refresh={refresh}
        id={id}
        current_name={name}
      ></RenameDialog>
      <ConfirmDialog
        open={openUnfollow}
        onClose={() => setOpenUnfollow(false)}
        title="Unfollow Project?"
        description="You will no longer be able to view project from vault."
        onConfirm={async () => {
          try {
            await unfollow(id);
            await refresh();
          } catch (error) {
            console.log(error);
          }
        }}
      ></ConfirmDialog>
    </Box>
  );
}
