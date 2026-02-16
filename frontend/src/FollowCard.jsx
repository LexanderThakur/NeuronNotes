import { Box, Typography, Button } from "@mui/material";
import Paper from "@mui/material/Paper";

function FollowCard({ name, description, owner }) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: 250,
        borderRadius: 3,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        backgroundColor: "#fffffa",
        border: "1px solid #e6e6e6",
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {name}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={
          {
            // display: "-webkit-box",
            // WebkitLineClamp: 2,
            // WebkitBoxOrient: "vertical",
            // overflow: "hidden",
          }
        }
      >
        {description}
      </Typography>

      <Button
        variant="outlined"
        sx={{
          borderRadius: 2,
          textTransform: "none",
          px: 3,
          fontWeight: 500,
          width: "40%",
        }}
      >
        Follow
      </Button>

      <Typography variant="caption" color="text.secondary">
        by: {owner}
      </Typography>
    </Paper>
  );
}

export default FollowCard;
