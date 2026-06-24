import { useState } from "react";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GraphBackground from "./GraphBackground";
const api = import.meta.env.VITE_API_URL;

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function authenticate() {
    const endpoint = isLogin ? "/auth/login/" : "/auth/register/";
    try {
      const response = await fetch(api + endpoint, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email: email, user_password: password }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.error);
        return;
      }
      setEmail("");
      setPassword("");
      me();
    } catch (error) {
      alert(error);
    }
  }

  async function loginAsDemo() {
    try {
      const response = await fetch(api + "/auth/login/", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: "demo@email.com",
          user_password: "demo1234",
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.error);
        return;
      }
      me();
    } catch (error) {
      alert(error);
    }
  }

  async function me() {
    try {
      const response = await fetch(api + "/auth/me/", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        console.log("response not ok in me");
        return;
      }
      const data = await response.json();
      console.log(data);
      navigate("/");
    } catch (err) {
      alert(err);
    }
  }

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "grey.50",
      fontSize: "14px",
      "& fieldset": { borderColor: "grey.300" },
      "&:hover fieldset": { borderColor: "grey.400" },
      "&.Mui-focused fieldset": { borderColor: "grey.600", borderWidth: 1 },
      "&.Mui-focused": { bgcolor: "background.paper" },
    },
  };

  const outlinedBtnSx = {
    height: 40,
    borderRadius: 2,
    fontSize: "13.5px",
    fontWeight: 400,
    textTransform: "none",
    boxShadow: "none",
    border: "1px solid",
    borderColor: "grey.300",
    color: "text.secondary",
    bgcolor: "background.paper",
    "&:hover": {
      bgcolor: "grey.50",
      borderColor: "grey.400",
      boxShadow: "none",
    },
    "&:active": { transform: "scale(0.99)", boxShadow: "none" },
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* LEFT */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.50",
          borderRight: "1px solid",
          borderColor: "grey.200",
          overflow: "hidden",
        }}
      >
        <GraphBackground />

        <Typography
          sx={{
            fontSize: "2.8rem",
            fontWeight: 500,
            letterSpacing: "-2px",
            color: "text.primary",
            zIndex: 2,
          }}
        >
          Neuron
        </Typography>

        <Typography
          sx={{
            fontSize: "11px",
            color: "text.disabled",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            mt: 1,
            zIndex: 2,
          }}
        >
          The Developer's Notebook
        </Typography>
      </Box>
      {/* RIGHT */}
      <Box
        sx={{
          width: 420,
          minWidth: 420,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.paper",
          borderLeft: "1px solid",
          borderColor: "grey.200",
          px: 5,
        }}
      >
        <Box sx={{ width: "100%" }}>
          {/* Tabs */}
          <Box
            sx={{
              display: "flex",
              borderBottom: "1px solid",
              borderColor: "grey.200",
              mb: 3,
            }}
          >
            {["Sign in", "Register"].map((label, i) => {
              const active = isLogin ? i === 0 : i === 1;
              return (
                <Box
                  key={label}
                  onClick={() => setIsLogin(i === 0)}
                  sx={{
                    flex: 1,
                    textAlign: "center",
                    py: 1.25,
                    fontSize: "13.5px",
                    fontWeight: active ? 500 : 400,
                    color: active ? "text.primary" : "text.disabled",
                    borderBottom: "1.5px solid",
                    borderColor: active ? "text.primary" : "transparent",
                    mb: "-1px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    userSelect: "none",
                  }}
                >
                  {label}
                </Box>
              );
            })}
          </Box>

          {/* Fields */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <TextField
              fullWidth
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
              sx={fieldSx}
            />
            <TextField
              fullWidth
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="small"
              sx={fieldSx}
            />
          </Box>

          {/* Submit */}
          <Button
            fullWidth
            onClick={authenticate}
            sx={{
              mt: 2,
              height: 40,
              bgcolor: "#190B28",
              color: "#fff",
              borderRadius: 2,
              fontSize: "13.5px",
              fontWeight: 500,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": { bgcolor: "#2d1648", boxShadow: "none" },
              "&:active": { transform: "scale(0.99)", boxShadow: "none" },
            }}
          >
            {isLogin ? "Sign in" : "Create account"}
          </Button>

          {/* Divider */}
          <Divider sx={{ my: 2, fontSize: "11px", color: "text.disabled" }}>
            or
          </Divider>

          {/* Google */}
          <Button
            fullWidth
            onClick={() => (window.location.href = `${api}/auth/google/`)}
            startIcon={
              <svg width="16" height="16" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
            }
            sx={outlinedBtnSx}
          >
            Continue with Google
          </Button>

          {/* Demo */}
          <Button
            fullWidth
            onClick={loginAsDemo}
            sx={{ ...outlinedBtnSx, mt: 1.5 }}
          >
            Try as demo user
          </Button>

          {/* Footer */}
          <Typography
            sx={{
              mt: 2.5,
              textAlign: "center",
              fontSize: "12.5px",
              color: "text.disabled",
            }}
          >
            {isLogin ? "No account? " : "Have an account? "}
            <Typography
              component="span"
              onClick={() => setIsLogin(!isLogin)}
              sx={{
                fontSize: "12.5px",
                color: "text.secondary",
                cursor: "pointer",
                "&:hover": { color: "text.primary" },
              }}
            >
              {isLogin ? "Create one" : "Sign in"}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Auth;
