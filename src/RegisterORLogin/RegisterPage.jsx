import React from "react";
import {
  Button,
  CssBaseline,
  Divider,
  FormLabel,
  FormControl,
  Link,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
  CircularProgress,
  IconButton,
  InputAdornment,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Google, Facebook, Visibility, VisibilityOff } from "@mui/icons-material";
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
  justifyContent: "center",
}));

/* ===================== COMPONENT ===================== */
export default function RegisterCustomer() {
  const theme = createTheme({ palette: { mode: "light" } });
  const navigate = useNavigate();

  const [errors, setErrors] = React.useState({});
  const [messages, setMessages] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [accountType, setAccountType] = React.useState(null);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);

  const clearErrors = () => {
    setErrors({});
    setMessages({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!accountType) return; // Ensure a button was clicked
    if (loading) return;

    clearErrors();

    const formData = new FormData(event.currentTarget);

    const username = (formData.get("username") || "").trim();
    const fullName = (formData.get("fullName") || "").trim();
    const email = (formData.get("email") || "").trim();
    const msisdn = (formData.get("msisdn") || "").trim();
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");

    const payload = {
      username,
      fullName,
      email,
      msisdn,
      password,
      passwordConfirm,
      accountType,
    };

    setLoading(true);

    try {
      let response;
      if (accountType === "tourist") {
        // ✅ Customer API
        response = await fetch(`${API_BASE_URL}/api/v1/auth/register/customer`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else if (accountType === "provider") {
        // ⚠️ Placeholder API for Service Provider
      response = await fetch(`${API_BASE_URL}/api/v1/auth/register/business`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});
      }

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        localStorage.setItem("username", username);
        setSuccessOpen(true);

        setTimeout(() => {
          if (accountType === "tourist") {
            navigate("/customer/dashboard");
          } else if (accountType === "provider") {
            navigate("/business/dashboard");
          }
        }, 1500);
        return;
      }

      if (result.errors) {
        setErrors(result.errors);
        setMessages(result.errors);
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
      setAccountType(null);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Snackbar
        open={successOpen}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setSuccessOpen(false)}
      >
        <Alert severity="success" variant="filled">
          Registration successful 🎉 Redirecting…
        </Alert>
      </Snackbar>

      <RegisterContainer>
        <Card variant="outlined">
          <Typography variant="h4" textAlign="center" mb={3}>
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
            {/* ===================== FORM FIELDS ===================== */}
            <FormControl>
              <FormLabel>Username *</FormLabel>
              <TextField
                name="username"
                required
                disabled={loading}
                error={!!errors.username}
                helperText={messages.username}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Full Name *</FormLabel>
              <TextField
                name="fullName"
                required
                disabled={loading}
                error={!!errors.fullName}
                helperText={messages.fullName}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <TextField name="email" disabled={loading} />
            </FormControl>

            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <TextField name="msisdn" disabled={loading} />
            </FormControl>

            <FormControl>
              <FormLabel>Password *</FormLabel>
              <TextField
                name="password"
                type={showPassword ? "text" : "password"}
                required
                disabled={loading}
                error={!!errors.password}
                helperText={messages.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((p) => !p)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Confirm Password *</FormLabel>
              <TextField
                name="passwordConfirm"
                type={showConfirmPassword ? "text" : "password"}
                required
                disabled={loading}
                error={!!errors.passwordConfirm}
                helperText={messages.passwordConfirm}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword((p) => !p)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            {/* ===================== SIGN UP BUTTONS ===================== */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ gridColumn: { xs: "1", sm: "1 / 3" }, mt: 2 }}
            >
              <Button
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ py: 1.5, backgroundColor: "#099840" }}
                onClick={() => {
                  setAccountType("tourist");
                  document.querySelector("form").dispatchEvent(
                    new Event("submit", { cancelable: true, bubbles: true })
                  );
                }}
              >
                {loading && accountType === "tourist" ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Sign Up as Tourist"
                )}
              </Button>

              <Button
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ py: 1.5, backgroundColor: "#099840" }}
                onClick={() => {
                  setAccountType("provider");
                  document.querySelector("form").dispatchEvent(
                    new Event("submit", { cancelable: true, bubbles: true })
                  );
                }}
              >
                {loading && accountType === "provider" ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Sign Up as Service Provider"
                )}
              </Button>
            </Stack>
          </Box>

          <Typography textAlign="center" mt={2}>
            Already have an account?{" "}
            <Link component={RouterLink} to="/LoginPage" sx={{ color: "#00a152" }}>
              Log in here
            </Link>
          </Typography>

          <Divider sx={{ my: 4 }}>
            <Typography color="text.secondary">or continue with</Typography>
          </Divider>

          <Stack spacing={2}>
            <Button fullWidth variant="outlined" startIcon={<Google />} disabled>
              Google
            </Button>
            <Button fullWidth variant="outlined" startIcon={<Facebook />} disabled>
              Facebook
            </Button>
          </Stack>
        </Card>
      </RegisterContainer>
    </ThemeProvider>
  );
}