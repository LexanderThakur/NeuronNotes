import { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
const api = "http://localhost:8000";
function Auth({ setLogin, setUserEmail }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function authenticate() {
    let endpoint = isLogin ? "/auth/login/" : "/auth/register/";

    try {
      const response = await fetch(api + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: email,
          user_password: password,
        }),
      });
      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log(data);

      if (!response.ok) {
        alert(data.error);
        return;
      }

      setUserEmail(email);
      setEmail("");
      setPassword("");
      me();
    } catch (error) {
      alert(error);
    }
  }

  async function me() {
    try {
      const response = await fetch(api + "/auth/me/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        console.log("response not ok in me");
      }

      const data = await response.json();
      console.log(data);
      setLogin(true);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper elevation={4} sx={{ p: 4, width: 450, borderRadius: 6 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Typography variant="h5" mb={2}>
            {isLogin ? "Login" : "Register"}
          </Typography>
        </Box>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 4,
            },
          }}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 4,
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              authenticate();
            }}
            sx={{
              width: "40%",
              bgcolor: "#190B28",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#190B28",
                transform: "scale(1.05)",
              },
            }}
          >
            {isLogin ? "Login" : "Register"}
          </Button>
        </Box>

        <Typography mt={2}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}

          <Typography
            component="span"
            sx={{
              cursor: "pointer",
              color: "#3083DC",
              fontWeight: 400,
            }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Auth;
