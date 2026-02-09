import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Google, Facebook } from "@mui/icons-material";
import Box from "@mui/material/Box";
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
    width: "600px",
    padding: theme.spacing(4),
  },
}));

const RegisterContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  justifyContent: "center",
}));

/* ===================== COMPONENT ===================== */

export default function RegisterCustomer() {
  const defaultTheme = createTheme({ palette: { mode: "light" } });
  const navigate = useNavigate();

  const [errors, setErrors] = React.useState({});
  const [messages, setMessages] = React.useState({});

  const clearErrors = () => {
    setErrors({});
    setMessages({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearErrors();

    const formData = new FormData(event.currentTarget);

    const payload = {
      username: (formData.get("username") || "").trim(),
      fullName: (formData.get("fullName") || "").trim(),
      email: formData.get("email") || null,
      msisdn: formData.get("msisdn") || null,
      password: formData.get("password"),
      passwordConfirm: formData.get("passwordConfirm"),
    };

    console.log("📤 REGISTER PAYLOAD:", payload);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/auth/register/customer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      console.log("📡 HTTP STATUS:", response.status);

      const result = await response.json();
      console.log("📥 BACKEND RESPONSE:", result);

      // ✅ SUCCESS CONDITION
      if (response.ok && result.success) {
        alert(result.message || "Registration successful!");

        // ✅ STORE USERNAME FOR DASHBOARD
        localStorage.setItem("username", payload.username);

        // ✅ STORE JWT IF BACKEND RETURNS TOKEN
        if (result.token) {
          console.log("🛡 JWT RECEIVED:", result.token);
          localStorage.setItem("jwtToken", result.token);
        }

        // Navigate to dashboard
        navigate("/customer/dashboard");
        return;
      }

      // ❌ FAILURE PATH
      alert(result.message || "Registration failed");
      if (result.errors) {
        console.log("⚠️ FIELD ERRORS:", result.errors);
        setErrors(result.errors);
        setMessages(result.errors);
      }
    } catch (error) {
      console.error("🚨 NETWORK / SERVER ERROR:", error);
      alert("Cannot reach server. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <RegisterContainer>
        <Card variant="outlined">
          <Typography component="h1" variant="h4" sx={{ textAlign: "center", mb: 3 }}>
            Create Account
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel>Username *</FormLabel>
              <TextField name="username" required fullWidth error={!!errors.username} helperText={messages.username} />
            </FormControl>

            <FormControl>
              <FormLabel>Full Name *</FormLabel>
              <TextField name="fullName" required fullWidth error={!!errors.fullName} helperText={messages.fullName} />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <TextField name="email" fullWidth />
            </FormControl>

            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <TextField name="msisdn" fullWidth />
            </FormControl>

            <FormControl>
              <FormLabel>Password *</FormLabel>
              <TextField name="password" type="password" required fullWidth error={!!errors.password} helperText={messages.password} />
            </FormControl>

            <FormControl>
              <FormLabel>Confirm Password *</FormLabel>
              <TextField name="passwordConfirm" type="password" required fullWidth error={!!errors.passwordConfirm} helperText={messages.passwordConfirm} />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ gridColumn: { xs: "1", sm: "1 / 3" }, py: 1.5, backgroundColor: "#00a152" }}
            >
              Sign Up
            </Button>
          </Box>

          <Typography textAlign="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link component={RouterLink} to="/LoginPage" sx={{ color: "#00a152" }}>
              Log in here
            </Link>
          </Typography>

          <Divider sx={{ my: 4 }}>
            <Typography sx={{ color: "text.secondary" }}>or continue with</Typography>
          </Divider>

          <Stack spacing={2}>
            <Button fullWidth variant="outlined" startIcon={<Google />}>Google</Button>
            <Button fullWidth variant="outlined" startIcon={<Facebook />}>Facebook</Button>
          </Stack>
        </Card>
      </RegisterContainer>
    </ThemeProvider>
  );
}
