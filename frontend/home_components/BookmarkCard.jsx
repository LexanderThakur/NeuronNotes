import { Box, Typography, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function BookmarkCard({ bookmarks, onAdd, onDelete }) {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 4,
        p: 3,
        border: "1px solid rgba(16,17,16,0.07)",
        minWidth: 280,
        minHeight: 260,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1rem",
          }}
        >
          Bookmarks
        </Typography>

        <IconButton
          size="small"
          onClick={onAdd}
          sx={{
            color: "#3EC300",
          }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>

      <Typography
        sx={{
          fontSize: "0.75rem",
          color: "#888",
          mb: 1.5,
        }}
      >
        Quick access to resources
      </Typography>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 0.5,

          "&::-webkit-scrollbar": {
            width: 4,
          },

          "&::-webkit-scrollbar-thumb": {
            background: "#ddd",
            borderRadius: 10,
          },
        }}
      >
        {bookmarks.map((bookmark) => (
          <Box
            key={bookmark.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography
              component="a"
              href={bookmark.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: "0.82rem",
                color: "#1F6FEB",
                textDecoration: "none",
                flex: 1,

                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",

                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {bookmark.name}
            </Typography>

            <IconButton
              size="small"
              onClick={() => onDelete(bookmark.id)}
              sx={{
                opacity: 0.5,

                "&:hover": {
                  opacity: 1,
                },
              }}
            >
              <DeleteOutlineIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
