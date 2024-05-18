import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const columns = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "actions", label: "Actions" },
];

interface User {
  id: number;
  name: string;
  email: string;
}

function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "johndoe@example.com" },
    { id: 2, name: "Jane Doe", email: "janedoe@example.com" },
  ]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addUser = () => {
    const newUser = { ...form, id: users.length + 1 };
    setUsers((prev) => [...prev, newUser]);
    setOpen(false);
    setForm({ name: "", email: "" });
  };

  const deleteUser = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="md">
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="outlined" color="primary" onClick={toggleModal}>
        Add New User
      </Button>
      <Dialog open={open} onClose={toggleModal}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleModal} color="primary">
            Cancel
          </Button>
          <Button onClick={addUser} color="primary">
            Add User
          </Button>
        </DialogActions>
      </Dialog>

      <Paper style={{ margin: "20px 0" }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteUser(user.id)} color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default UserManagement;
