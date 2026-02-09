import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Google, Facebook } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* ===================== STYLES ===================== */

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
    padding: theme.spacing(4),
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
}));

/* ===================== COMPONENT ===================== */

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode] = React.useState("light");
  const defaultTheme = createTheme({ palette: { mode } });

  const [loginError, setLoginError] = React.useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  const validateInputs = () => {
    const loginField = document.getElementById("loginField");
    const password = document.getElementById("password");

    let isValid = true;

    if (!loginField.value || loginField.value.length < 3) {
      setLoginError(true);
      setLoginErrorMessage("Please enter email or phone number.");
      isValid = false;
    } else {
      setLoginError(false);
      setLoginErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const loginField = document.getElementById("loginField").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginField, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      navigate("/customer/dashboard");
    } catch (error) {
      setLoginError(true);
      setLoginErrorMessage("Invalid email/phone or password");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline enableColorScheme />

      <SignUpContainer>
        <Stack
          sx={{
            justifyContent: "center",
            minHeight: { xs: "auto", sm: "100vh" },
            px: { xs: 1, sm: 2 },
          }}
        >
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{
                width: "100%",
                fontSize: "clamp(1.8rem, 6vw, 2.15rem)",
              }}
            >
              Login
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 1.5, sm: 2 },
              }}
            >
              <FormControl>
                <FormLabel>Email or Phone</FormLabel>
                <TextField
                  id="loginField"
                  fullWidth
                  placeholder="bensample@gmail.com"
                  error={loginError}
                  helperText={loginErrorMessage}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <TextField
                  id="password"
                  type="password"
                  fullWidth
                  placeholder="••••••••"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                />
              </FormControl>

              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ backgroundColor: "#00a152" }}
              >
                Sign in
              </Button>

              <Typography sx={{ textAlign: "center" }}>
                Don’t have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/RegisterCustomer"
                  color="#00a152"
                >
                  Register here
                </Link>
              </Typography>
            </Box>

            <Divider>
              <Typography sx={{ color: "text.secondary" }}>or</Typography>
            </Divider>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                sx={{ color: "#00a152", borderColor: "#00a152" }}
              >
                Sign in with Google
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                sx={{ color: "#00a152", borderColor: "#00a152" }}
              >
                Sign in with Facebook
              </Button>
            </Box>
          </Card>
        </Stack>
      </SignUpContainer>
    </ThemeProvider>
  );
}
