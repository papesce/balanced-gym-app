import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Card, CardContent, TextField, Button, Typography, Alert, Divider } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await signup(email, password);
      navigate('/routines');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    }
  };

  const handleGoogle = async () => {
    setError('');
    try {
      await loginWithGoogle();
      navigate('/routines');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }}>
      <Card sx={{ width: '100%', maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
            Create Account
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
              error={error === 'Passwords do not match'}
            />
            <Button type="submit" variant="contained" size="large" fullWidth>
              Sign Up
            </Button>
          </Box>
          <Divider sx={{ my: 2 }}>or</Divider>
          <Button onClick={handleGoogle} variant="outlined" size="large" fullWidth>
            Sign up with Google
          </Button>
          <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
            Already have an account? <Link to="/login">Sign in</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
