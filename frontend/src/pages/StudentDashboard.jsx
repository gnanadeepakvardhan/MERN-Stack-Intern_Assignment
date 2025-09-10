import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getProfile, updateProfile } from '../api';
import {
  Container, Box, Typography, Button, TextField, Paper, Alert
} from '@mui/material';

export default function StudentDashboard() {
  const { token, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', course: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  async function fetchProfile() {
    setError('');
    setSuccess('');
    try {
      const res = await getProfile(token);
      if (res.msg) {
        setError(res.msg);
        setProfile(null);
      } else {
        setProfile(res);
        setForm({ name: res.name || '', email: res.email || '', course: res.course || '' });
      }
    } catch (e) {
      setError('Failed to load profile');
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await updateProfile(form, token);
      if (res.msg) {
        setError(res.msg);
      } else {
        setSuccess('Profile updated successfully!');
        fetchProfile();
      }
    } catch (e) {
      setError('Update failed');
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Student Dashboard</Typography>
        <Button variant="outlined" color="secondary" onClick={logout}>Logout</Button>
      </Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {profile && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <form onSubmit={handleUpdate}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
            <TextField
              label="Course"
              fullWidth
              margin="normal"
              value={form.course}
              onChange={e => setForm(f => ({ ...f, course: e.target.value }))}
              required
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Update Profile
            </Button>
          </form>
        </Paper>
      )}
      {profile && (
        <Paper sx={{ p: 2 }}>
          <Typography><b>Enrollment Date:</b> {new Date(profile.enrollmentDate).toLocaleDateString()}</Typography>
        </Paper>
      )}
    </Container>
  );
}