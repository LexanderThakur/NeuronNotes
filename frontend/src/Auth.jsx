import { useState } from "react";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GraphBackground from "./GraphBackground";
const api = import.meta.env.VITE_API_URL;
import { CircularProgress } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const isLoading = loading || googleLoading || demoLoading;
  async function authenticate() {
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login/" : "/auth/register/";

      const response = await fetch(api + endpoint, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: email,
          user_password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
        return;
      }

      setEmail("");
      setPassword("");
      await me();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  async function loginAsDemo() {
    setDemoLoading(true);

    try {
      const response = await fetch(api + "/auth/login/", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: "demo@email.com",
          user_password: "emo1234",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
        return;
      }

      await me();
    } catch (error) {
      alert(error);
    } finally {
      setDemoLoading(false);
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
          position: "relative",
        }}
      >
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(3px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              zIndex: 1000,
            }}
          >
            <CircularProgress />

            <Typography
              sx={{
                fontSize: "13px",
                color: "text.secondary",
              }}
            >
              {googleLoading
                ? "Signing in with Google..."
                : demoLoading
                  ? "Loading demo account..."
                  : isLogin
                    ? "Signing in..."
                    : "Creating account..."}
            </Typography>
          </Box>
        )}
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
            disabled={loading || googleLoading || demoLoading}
            sx={{
              mt: 2,
              height: 40,
              bgcolor: "#190B28",
              color: "#fff",
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
                Signing In...
              </>
            ) : isLogin ? (
              "Sign in"
            ) : (
              "Create account"
            )}
          </Button>

          {/* Divider */}
          <Divider sx={{ my: 2, fontSize: "11px", color: "text.disabled" }}>
            or
          </Divider>

          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                setGoogleLoading(true);

                const response = await fetch(`${api}/auth/google-login/`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                  body: JSON.stringify({
                    token: credentialResponse.credential,
                  }),
                });

                await response.json();

                await me();
              } finally {
                setGoogleLoading(false);
              }
            }}
            onError={() => {
              console.log("failed");
            }}
          />
          {/* Google */}

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
