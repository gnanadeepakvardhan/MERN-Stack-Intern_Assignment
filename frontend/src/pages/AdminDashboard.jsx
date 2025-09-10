import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getStudents, addStudent, editStudent, deleteStudent } from '../api';
import {
  Container, Box, Typography, Button, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function AdminDashboard() {
  const { token, logout } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', course: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line
  }, []);

  async function fetchStudents() {
    const res = await getStudents(token);
    setStudents(res);
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (editId) {
      await editStudent(editId, form, token);
    } else {
      await addStudent(form, token);
    }
    setForm({ name: '', email: '', course: '' });
    setEditId(null);
    fetchStudents();
  }

  function handleEdit(student) {
    setForm({ name: student.name, email: student.email, course: student.course });
    setEditId(student._id);
  }

  async function handleDelete(id) {
    await deleteStudent(id, token);
    fetchStudents();
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Button variant="outlined" color="secondary" onClick={logout}>Logout</Button>
      </Box>
      <Box sx={{ mb: 4 }}>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: 16 }}>
          <TextField
            label="Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <TextField
            label="Email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
          <TextField
            label="Course"
            value={form.course}
            onChange={e => setForm(f => ({ ...f, course: e.target.value }))}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            {editId ? 'Update' : 'Add'} Student
          </Button>
        </form>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map(s => (
              <TableRow key={s._id}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{s.course}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(s)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(s._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}