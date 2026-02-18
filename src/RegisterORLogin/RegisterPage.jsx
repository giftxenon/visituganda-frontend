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
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Google, Facebook, Visibility, VisibilityOff } from "@mui/icons-material";
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
  const [loading, setLoading] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const clearErrors = () => {
    setErrors({});
    setMessages({});
  };

  const handleSubmit = async (event) => {
  event.preventDefault();
  if (loading) return;

  console.log("🟢 SUBMIT CLICKED");

  clearErrors();

  // 🔍 Log form element
  console.log("🟡 form element:", event.currentTarget);

  // ⚠️ IMPORTANT: do NOT set loading yet
  const formData = new FormData(event.currentTarget);

  // 🔍 Log raw FormData entries
  console.log("🟣 RAW FORMDATA ENTRIES:");
  for (let [key, value] of formData.entries()) {
    console.log(`   ${key}:`, value);
  }

  // 🔍 Log individual fields
  const username = (formData.get("username") || "").trim();
  const fullName = (formData.get("fullName") || "").trim();

  const email = (formData.get("email") || "").trim();
  const msisdn = (formData.get("msisdn") || "").trim();

  // const email = formData.get("email"); why trim ? above on line 92 and 91
   // const msisdn = formData.get("msisdn");
  const password = formData.get("password");
  const passwordConfirm = formData.get("passwordConfirm");

  console.log("🔵 PARSED VALUES:");
  console.log("username:", username);
  console.log("fullName:", fullName);
  console.log("email:", email);
  console.log("msisdn:", msisdn);
  console.log("password:", password);
  console.log("passwordConfirm:", passwordConfirm);

const payload = {
  username,
  fullName,
  email,
  msisdn,
  password,
  passwordConfirm,
};

  console.log("🟠 FINAL PAYLOAD SENT TO BACKEND:", payload);

  // NOW disable inputs
  setLoading(true);

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/auth/register/customer`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    console.log("🟢 RESPONSE STATUS:", response.status);

    let result = {};
    try {
      result = await response.json();
      console.log("🟢 RESPONSE BODY:", result);
    } catch {
      console.warn("⚠️ Response body is not JSON");
    }

    if (response.ok) {
      console.log("✅ REGISTRATION SUCCESS");
      navigate("/customer/dashboard");
      return;
    }

    console.warn("❌ REGISTRATION FAILED");

    if (result.errors) {
      console.log("🔴 BACKEND VALIDATION ERRORS:", result.errors);
      setErrors(result.errors);
      setMessages(result.errors);
    }
  } catch (error) {
    console.error("🚨 FETCH ERROR:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <RegisterContainer>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ textAlign: "center", mb: 3 }}
          >
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
              <TextField
                name="username"
                required
                fullWidth
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
                fullWidth
                disabled={loading}
                error={!!errors.fullName}
                helperText={messages.fullName}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <TextField name="email" fullWidth disabled={loading} />
            </FormControl>

            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <TextField name="msisdn" fullWidth disabled={loading} />
            </FormControl>

            <FormControl>
              <FormLabel>Password *</FormLabel>
              <TextField
                name="password"
                type={showPassword ? "text" : "password"}
                required
                fullWidth
                disabled={loading}
                error={!!errors.password}
                helperText={messages.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
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
                fullWidth
                disabled={loading}
                error={!!errors.passwordConfirm}
                helperText={messages.passwordConfirm}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword((prev) => !prev)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                gridColumn: { xs: "1", sm: "1 / 3" },
                py: 1.5,
                backgroundColor: "#00a152",
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Sign Up"
              )}
            </Button>
          </Box>

          <Typography textAlign="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link
              component={RouterLink}
              to="/LoginPage"
              sx={{ color: "#00a152" }}
            >
              Log in here
            </Link>
          </Typography>

          <Divider sx={{ my: 4 }}>
            <Typography sx={{ color: "text.secondary" }}>
              or continue with
            </Typography>
          </Divider>

          <Stack spacing={2}>
            <Button fullWidth variant="outlined" startIcon={<Google />} disabled={loading}>
              Google
            </Button>
            <Button fullWidth variant="outlined" startIcon={<Facebook />} disabled={loading}>
              Facebook
            </Button>
          </Stack>
        </Card>
      </RegisterContainer>
    </ThemeProvider>
  );
}
