import React, { useEffect, useState } from "react";
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
  CssBaseline,
  Box,
} from "@mui/material";
import PencilIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ApiBack from "../../services/base-back";
import { useToast } from "../../context/ToastContext";
import MenuBar from "../../components/MenuBar";

const columns = [
  { id: "name", label: "Nome" },
  { id: "email", label: "E-mail" },
  { id: "actions", label: "Ações" },
];

export interface Customer {
  id: number;
  nome: string;
  email: string;
}

function CustomerManagement() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { showToast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await ApiBack.get("/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addCustomer = async () => {
    try {
      const response = await ApiBack.post("/customers", {
        nome: form.name,
        email: form.email,
        userId: user.id,
      });
      if (response) {
        showToast("success", "Cliente cadastrado com sucesso!", "/customer");
        window.location.reload();
      }
    } catch (err) {
      showToast("error", "Falha ao cadastrar um novo Cliente!");
    }
  };

  const deleteCustomer = async (id: number) => {
    if (window.confirm("Deseja realmente deletar este cliente?")) {
      await ApiBack.delete("/customers/" + id);
      showToast("success", "Cliente deletado com sucesso!");
      window.location.reload();
    }
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.nome.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase())
  );

  const openEditDialog = (customer: Customer) => {
    setForm({ name: customer.nome, email: customer.email });
    setEditingCustomer(customer);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setEditingCustomer(null);
    setForm({ name: "", email: "" });
  };

  const saveCustomer = async () => {
    if (editingCustomer) {
      try {
        await ApiBack.put(`/customers/${editingCustomer.id}`, {
          nome: form.name,
          email: form.email,
        });
        showToast("success", "Cliente atualizado com sucesso!");
      } catch (error) {
        showToast("error", "Falha ao atualizar o cliente.");
      }
    } else {
      addCustomer();
    }
    closeDialog();
    window.location.reload();
  };

  return (
    <>
      <CssBaseline />
      <MenuBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          <TextField
            label="Pesquisar cliente"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flexGrow: 1, marginRight: 2 }} // Ajusta automaticamente o tamanho, adiciona margem à direita
          />
          <Button variant="outlined" color="primary" onClick={toggleModal}>
            <PencilIcon
              sx={{
                width: "16px",
                height: "16px",
              }}
            />
            Novo Cliente
          </Button>
        </Box>
        <Dialog open={open} onClose={closeDialog}>
          <DialogTitle>
            {editingCustomer ? "Editar Cliente" : "Adicionar Novo Cliente"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Nome"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="E-mail"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Button onClick={closeDialog} color="error" variant="contained">
              Cancelar
            </Button>
            <Button onClick={saveCustomer} color="primary" variant="contained">
              {editingCustomer ? "Atualizar" : "Criar"}
            </Button>
          </DialogActions>
        </Dialog>

        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 0 10px #ccc",
            borderRadius: "10px",
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.nome}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => openEditDialog(customer)}
                      color="primary"
                    >
                      <PencilIcon
                        sx={{
                          width: "16px",
                          height: "16px",
                        }}
                      />
                      Editar
                    </Button>
                    <Button
                      onClick={() => deleteCustomer(customer.id)}
                      color="error"
                    >
                      <DeleteIcon
                        sx={{
                          width: "16px",
                          height: "16px",
                        }}
                      />
                      Deletar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </>
  );
}

export default CustomerManagement;
