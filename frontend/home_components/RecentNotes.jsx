import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Chip,
  Divider,
  LinearProgress,
  Button,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useState, useEffect } from "react";
import { get_recents } from "../src/api/home_api";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
export default function RecentNotes() {
  const [recentNotes, setRecentNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  async function handle_recents() {
    try {
      const data = await get_recents();

      console.log(data);

      setRecentNotes(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    handle_recents();
  }, []);
  if (loading) {
    return (
      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: 4,
          p: 3,
          border: "1px solid rgba(16,17,16,0.07)",
          flex: 1,
        }}
      >
        <Skeleton width={140} height={32} />
        <Skeleton width={220} height={24} sx={{ mb: 2 }} />

        {[1, 2, 3].map((item) => (
          <Box
            key={item}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1.25,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Skeleton variant="rounded" width={18} height={22} />

              <Box>
                <Skeleton width={180} height={24} />
                <Skeleton width={90} height={18} />
              </Box>
            </Box>

            <Skeleton width={24} height={24} />
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 4,
        p: 3,
        border: "1px solid rgba(16,17,16,0.07)",
        flex: 1,
      }}
    >
      {/* Header */}
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "1rem",
          color: "#101110",
          mb: 0.5,
        }}
      >
        Recent Notes
      </Typography>

      <Typography
        sx={{
          color: "#888",
          fontSize: "0.9rem",
          mb: 2,
        }}
      >
        Continue where you left off
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {recentNotes.map((note) => (
          <Box
            key={note.id}
            onClick={() => {
              navigate(`/manage/${note.project}/note/${note.id}`);
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 1,
              py: 1.25,
              borderRadius: 2,
              cursor: "pointer",

              "&:hover": {
                bgcolor: "rgba(31,111,235,0.05)",

                "& .arrow-icon": {
                  transform: "translateX(6px)",
                },

                "& .note-title": {
                  color: "#1F6FEB",
                },
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <DescriptionOutlinedIcon
                sx={{
                  fontSize: 18,
                  color: "#666",
                }}
              />

              <Box>
                <Typography
                  className="note-title"
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    transition: "0.25s",
                  }}
                >
                  {note.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "#888",
                  }}
                >
                  {note.created_at.split("T")[0]}
                </Typography>
              </Box>
            </Box>

            <svg
              className="arrow-icon"
              width="22"
              height="22"
              viewBox="0 0 30 30"
              fill="none"
              style={{
                transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
                color: "#1F6FEB",
              }}
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
          </Box>
        ))}
      </Box>
    </Box>
  );
}
