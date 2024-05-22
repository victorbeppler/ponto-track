import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  TextField,
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import PencilIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ApiBack from "../../services/base-back";
import { useToast } from "../../context/ToastContext";
import MenuBar from "../../components/MenuBar";
import { Customer } from "../Customers";

const columns = [
  { id: "modelo", label: "Modelo" },
  { id: "placa", label: "Placa" },
  {
    id: "customer",
    label: "Cliente",
    path: "customerVehicles?.[0]?.customer?.nome",
  },
  { id: "actions", label: "Ações" },
];

export interface CustomerVehicle {
  id: number;
  vehicleId: number;
  customerId: number;
  userId: number;
  customer: Customer;
}

export interface Car {
  id: number;
  modelo: string;
  placa: string;
  customerId: number | string;
  customerVehicles: CustomerVehicle[];
}

function Vehicle() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [form, setForm] = useState({ modelo: "", placa: "", customerId: "" });
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await ApiBack.get("/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
        showToast("error", "Falha ao buscar clientes.");
      }
    };

    const fetchCars = async () => {
      try {
        const response = await ApiBack.get("/vehicles");
        setCars(response.data);
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
        showToast("error", "Falha ao buscar veículos.");
      }
    };

    fetchCustomers();
    fetchCars();
  }, []);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addCar = async () => {
    try {
      await ApiBack.post("/vehicles", {
        modelo: form.modelo,
        placa: form.placa,
        customerId: parseInt(form.customerId),
        userId: user.id,
      });
      showToast("success", "Veículo cadastrado com sucesso!");
      window.location.reload();
    } catch (err) {
      showToast("error", "Falha ao cadastrar veículo.");
    }
    setOpen(false);
    setForm({ modelo: "", placa: "", customerId: "" });
  };

  const deleteCar = async (id: number) => {
    if (window.confirm("Tem certeza que deseja deletar este veículo?")) {
      
      ApiBack.delete(`/vehicles/${id}`)
        .then(() => {
          setCars((prev) => prev.filter((car) => car.id !== id));
          showToast("success", "Veículo deletado com sucesso!");
        })
        .catch((error) => console.error("Failed to delete vehicle:", error));
    }
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  const openEditDialog = (car: Car) => {
    setForm({
      modelo: car.modelo,
      placa: car.placa,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      customerId: car?.customerId,
    });
    setEditingCar(car);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setEditingCar(null);
    setForm({ modelo: "", placa: "", customerId: "" });
  };

  const saveCar = async () => {
    if (editingCar) {
      try {
        await ApiBack.put(`/vehicles/${editingCar.id}`, {
          modelo: form.modelo,
          placa: form.placa,
          customerId: parseInt(form.customerId),
        });
        showToast("success", "Veículo atualizado com sucesso!");
      } catch (error) {
        showToast("error", "Failed to update vehicle.");
      }
    } else {
      addCar();
    }
    closeDialog();
    window.location.reload();
  };

  const filteredCars = cars.filter(
    (car) =>
      car.modelo.toLowerCase().includes(search.toLowerCase()) ||
      car.placa.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <CssBaseline />
      <MenuBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <TextField
            label="Busque Veículo"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flexGrow: 1, marginRight: 2 }}
          />
          <Button variant="outlined" color="primary" onClick={toggleModal}>
            Novo Carro
          </Button>
        </Box>
        <Dialog open={open} onClose={closeDialog}>
          <DialogTitle>
            {editingCar ? "Editar Carro" : "Adicionar novo carro"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Modelo"
              name="modelo"
              value={form.modelo}
              onChange={handleTextChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Placa"
              name="placa"
              value={form.placa}
              onChange={handleTextChange}
              fullWidth
              margin="normal"
            />
            {!editingCar && (
              <FormControl fullWidth margin="normal">
                <InputLabel id="customer-select-label">Cliente</InputLabel>
                <Select
                  labelId="customer-select-label"
                  id="customer-select"
                  value={form.customerId}
                  onChange={handleSelectChange}
                  name="customerId"
                >
                  {customers.map((customer) => (
                    <MenuItem key={customer.id} value={customer.id}>
                      {customer.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="error" variant="contained">
              Cancelar
            </Button>
            <Button onClick={saveCar} color="primary" variant="contained">
              {editingCar ? "Atualizar" : "Criar"}
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
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>{car.modelo}</TableCell>
                  <TableCell>{car.placa}</TableCell>
                  <TableCell>
                    {car?.customerVehicles?.[0]?.customer?.nome}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => openEditDialog(car)} color="primary">
                      <PencilIcon sx={{ width: "16px", height: "16px" }} />
                      Editar
                    </Button>
                    <Button onClick={() => deleteCar(car.id)} color="error">
                      <DeleteIcon sx={{ width: "16px", height: "16px" }} />
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

export default Vehicle;
