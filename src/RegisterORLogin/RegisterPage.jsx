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
    const username = (formData.get("username") || "").toString().trim();
    const fullName = (formData.get("fullName") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const msisdn = (formData.get("msisdn") || "").toString().trim();
    const password = formData.get("password") || "";
    const passwordConfirm = formData.get("passwordConfirm") || "";

    let isValid = true;
    const newErrors = {};
    const newMessages = {};

    if (!username) {
      newErrors.username = true;
      newMessages.username = "Username is required";
      isValid = false;
    }
    if (!fullName) {
      newErrors.fullName = true;
      newMessages.fullName = "Full name is required";
      isValid = false;
    }
    if (!password || password.length < 6) {
      newErrors.password = true;
      newMessages.password = "Password must be at least 6 characters";
      isValid = false;
    }
    if (password !== passwordConfirm) {
      newErrors.passwordConfirm = true;
      newMessages.passwordConfirm = "Passwords do not match";
      isValid = false;
    }
    if (email && !email.includes("@")) {
      newErrors.email = true;
      newMessages.email = "Please enter a valid email";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      setMessages(newMessages);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/register/customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, fullName, email: email || null, msisdn: msisdn || null, password, passwordConfirm }),
      });



      const result = await response.json();
      console.log("REGISTER RESPONSE:", result);
      if (response.ok && result.success) {
        alert("Registration successful!");
        navigate("/customer/dashboard");
      } else {
        alert(result.message || "Registration failed");
        if (result.errors) {
          Object.keys(result.errors).forEach((key) => {
            newErrors[key] = true;
            newMessages[key] = result.errors[key];
          });
          setErrors(newErrors);
          setMessages(newMessages);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Cannot reach server!");
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
            {/* Username */}
            <FormControl>
              <FormLabel htmlFor="username">Username *</FormLabel>
              <TextField
                required
                fullWidth
                id="username"
                name="username"
                placeholder="JohnDoe"
                error={errors.username}
                helperText={messages.username}
              />
            </FormControl>

            {/* Full Name */}
            <FormControl>
              <FormLabel htmlFor="fullName">Full Name *</FormLabel>
              <TextField
                required
                fullWidth
                id="fullName"
                name="fullName"
                placeholder="John Babosa"
                error={errors.fullName}
                helperText={messages.fullName}
              />
            </FormControl>

            {/* Email */}
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                fullWidth
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                error={errors.email}
                helperText={messages.email || "Optional"}
              />
            </FormControl>

            {/* Phone */}
            <FormControl>
              <FormLabel htmlFor="msisdn">Phone Number</FormLabel>
              <TextField
                fullWidth
                id="msisdn"
                name="msisdn"
                placeholder="+256771234567"
                helperText="Optional"
              />
            </FormControl>

            {/* Password */}
            <FormControl>
              <FormLabel htmlFor="password">Password *</FormLabel>
              <TextField
                required
                fullWidth
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                error={errors.password}
                helperText={messages.password}
              />
            </FormControl>

            {/* Confirm Password */}
            <FormControl>
              <FormLabel htmlFor="passwordConfirm">Confirm Password *</FormLabel>
              <TextField
                required
                fullWidth
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                placeholder="••••••••"
                error={errors.passwordConfirm}
                helperText={messages.passwordConfirm}
              />
            </FormControl>

            {/* Submit Buttons */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ gridColumn: { xs: "1 / 2", sm: "1 / 3" }, py: 1.5, backgroundColor: "#00a152", "&:hover": { bgcolor: "#008040" } }}
            >
              Register as Tourist
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ gridColumn: { xs: "1 / 2", sm: "1 / 3" }, py: 1.5, backgroundColor: "#00a152", "&:hover": { bgcolor: "#008040" } }}
            >
              Register as Service Provider
            </Button>
          </Box>

          {/* Login Link */}
          <Typography textAlign="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link component={RouterLink} to="/LoginPage" variant="body2" sx={{ color: "#00a152", fontWeight: "bold" }}>
              Log in here
            </Link>
          </Typography>

          <Divider sx={{ my: 4 }}>
            <Typography sx={{ color: "text.secondary" }}>or continue with</Typography>
          </Divider>

          <Stack spacing={2}>
            <Button fullWidth variant="outlined" startIcon={<Google />} sx={{ color: "#00a152", borderColor: "#00a152" }}>
              Continue with Google
            </Button>
            <Button fullWidth variant="outlined" startIcon={<Facebook />} sx={{ color: "#00a152", borderColor: "#00a152" }}>
              Continue with Facebook
            </Button>
          </Stack>
        </Card>
      </RegisterContainer>
    </ThemeProvider>
  );
}
