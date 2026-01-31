import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Google, Facebook } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  maxWidth: '600px',
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px',
  [theme.breakpoints.up('sm')]: { width: '600px' },
}));

const RegisterContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(4),
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  justifyContent: 'center',
}));

export default function RegisterCustomer() {
  const defaultTheme = createTheme({ palette: { mode: 'light' } });
  const navigate = useNavigate();

  const [errors, setErrors] = React.useState({
    username: false,
    password: false,
    passwordConfirm: false,
    fullName: false,
    email: false,
  });

  const [messages, setMessages] = React.useState({
    username: '',
    password: '',
    passwordConfirm: '',
    fullName: '',
    email: '',
  });

  const clearErrors = () => {
    setErrors({
      username: false,
      password: false,
      passwordConfirm: false,
      fullName: false,
      email: false,
    });
    setMessages({
      username: '',
      password: '',
      passwordConfirm: '',
      fullName: '',
      email: '',
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearErrors();

    const formData = new FormData(event.currentTarget);

    const username = (formData.get('username') || '').toString().trim();
    const fullName = (formData.get('fullName') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const msisdn = (formData.get('msisdn') || '').toString().trim();
    const password = formData.get('password') || '';
    const passwordConfirm = formData.get('passwordConfirm') || '';

    let isValid = true;

    if (!username) {
      setErrors((prev) => ({ ...prev, username: true }));
      setMessages((prev) => ({ ...prev, username: 'Username is required' }));
      isValid = false;
    }
    if (!fullName) {
      setErrors((prev) => ({ ...prev, fullName: true }));
      setMessages((prev) => ({ ...prev, fullName: 'Full name is required' }));
      isValid = false;
    }
    if (!password || password.length < 6) {
      setErrors((prev) => ({ ...prev, password: true }));
      setMessages((prev) => ({ ...prev, password: 'Password must be at least 6 characters' }));
      isValid = false;
    }
    if (password !== passwordConfirm) {
      setErrors((prev) => ({ ...prev, passwordConfirm: true }));
      setMessages((prev) => ({ ...prev, passwordConfirm: 'Passwords do not match' }));
      isValid = false;
    }
    if (email && !email.includes('@')) {
      setErrors((prev) => ({ ...prev, email: true }));
      setMessages((prev) => ({ ...prev, email: 'Please enter a valid email' }));
      isValid = false;
    }

    if (!isValid) return;

    try {
      const response = await  fetch(`${API_BASE_URL}/api/v1/auth/register/customer`, {
    
                                    //'http://localhost:8080/api/v1/auth/register/customer'
                                    //'http://localhost:8080/api/v1/auth/register/customer'
                                
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          passwordConfirm,
          fullName,
          email: email || null,
          msisdn: msisdn || null,
        }),
      });

      const result = await response.json();
      console.log('Backend response:', result);

      if (response.ok && result.success) {
        alert('Registration successful!');
        navigate('/customer/dashboard'); // Redirect to dashboard
      } else {
        alert(result.message || 'Registration failed');
        if (result.errors) {
          Object.keys(result.errors).forEach((key) => {
            if (errors.hasOwnProperty(key)) {
              setErrors((prev) => ({ ...prev, [key]: true }));
              setMessages((prev) => ({ ...prev, [key]: result.errors[key] }));
            }
          });
        }
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Cannot reach server! Make sure Spring Boot is running on port 8080.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <RegisterContainer>
        <Card variant="outlined">
          <Typography component="h1" variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
            Create Account
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2.5,
            }}
          >
            {/* Row 1 */}
            <FormControl sx={{ gridColumn: '1 / 2' }}>
              <FormLabel htmlFor="username">Username *</FormLabel>
              <TextField
                required
                fullWidth
                id="username"
                name="username"
                placeholder="JohnDoe"
                autoFocus
                error={errors.username}
                helperText={messages.username}
              />
            </FormControl>

            <FormControl sx={{ gridColumn: '2 / 3' }}>
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

            {/* Row 2 */}
            <FormControl sx={{ gridColumn: '1 / 2' }}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                fullWidth
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                error={errors.email}
                helperText={messages.email || 'Optional'}
              />
            </FormControl>

            <FormControl sx={{ gridColumn: '2 / 3' }}>
              <FormLabel htmlFor="msisdn">Phone Number</FormLabel>
              <TextField
                fullWidth
                id="msisdn"
                name="msisdn"
                placeholder="+256771234567"
                helperText="Optional"
              />
            </FormControl>

            {/* Row 3 */}
            <FormControl sx={{ gridColumn: '1 / 2' }}>
              <FormLabel htmlFor="password">Password *</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                placeholder="••••••••"
                error={errors.password}
                helperText={messages.password}
              />
            </FormControl>

            <FormControl sx={{ gridColumn: '2 / 3' }}>
              <FormLabel htmlFor="passwordConfirm">Confirm Password *</FormLabel>
              <TextField
                required
                fullWidth
                name="passwordConfirm"
                type="password"
                id="passwordConfirm"
                placeholder="••••••••"
                error={errors.passwordConfirm}
                helperText={messages.passwordConfirm}
              />
            </FormControl>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                gridColumn: '1 / 3',
                mt: 0,
                py: 1.5,
                backgroundColor: '#00a152',
                '&:hover': { bgcolor: '#008040' },
              }}
            >
              Register as Tourist
            </Button>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                gridColumn: '1 / 3',
                mt: 0,
                py: 1.5,
                backgroundColor: '#00a152',
                '&:hover': { bgcolor: '#008040' },
              }}
            >
              Register as Service provider
            </Button>
          </Box>

          <Typography textAlign="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link href="/LoginPage" variant="body2" sx={{ color: '#00a152', fontWeight: 'bold' }}>
              Log in here
            </Link>
          </Typography>

          <Divider sx={{ my: 4 }}>
            <Typography sx={{ color: 'text.secondary' }}>or continue with</Typography>
          </Divider>

          <Stack spacing={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              sx={{ color: '#00a152', borderColor: '#00a152' }}
            >
              Continue with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Facebook />}
              sx={{ color: '#00a152', borderColor: '#00a152' }}
            >
              Continue with Facebook
            </Button>
          </Stack>
        </Card>
      </RegisterContainer>
    </ThemeProvider>
  );
}
