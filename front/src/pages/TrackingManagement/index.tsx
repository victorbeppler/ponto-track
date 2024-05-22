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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import PencilIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ApiBack from "../../services/base-back";
import { useToast } from "../../context/ToastContext";
import MenuBar from "../../components/MenuBar";
import { Customer } from "../Customers";

const columns = [
  { id: "vehicle", label: "Veículo" },
  { id: "latitude", label: "Latitude" },
  { id: "longitude", label: "Longitude" },
  { id: "actions", label: "Ações" },
];

export interface Car {
  id: number;
  modelo: string;
  placa: string;
  customerVehicles: CustomerVehicle[];
}

export interface CustomerVehicle {
  id: number;
  vehicleId: number;
  customerId: number;
  customer: Customer;
}

interface Tracking {
  id: number;
  vehicleId: number;
  latitude: number;
  longitude: number;
}

function TrackingManagement() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [trackings, setTrackings] = useState<Tracking[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [form, setForm] = useState({
    vehicleId: "",
    latitude: "",
    longitude: "",
  });
  const [editingTracking, setEditingTracking] = useState<Tracking | null>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await ApiBack.get("/vehicles");
        setCars(response.data);
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
        showToast("error", "Falha ao buscar veiculos.");
      }
    };
    const fetchTrackings = async () => {
      try {
        const response = await ApiBack.get("/trackings");
        setTrackings(response.data);
      } catch (error) {
        console.error("Failed to fetch trackings:", error);
        showToast("error", "Falha ao buscar rastreamentos.");
      }
    };

    fetchCars();
    fetchTrackings();
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

  const addTracking = async () => {
    // Assuming 'cars' is an array of 'Car' and each 'Car' includes 'customerVehicles'
    const car = cars.find((car) => car.id === parseInt(form.vehicleId, 10));

    if (!car) {
      showToast("error", "Carro não encontrado.");
      return;
    }

    const customerVehicle = car.customerVehicles[0]; // Assuming there's at least one customerVehicle, or you need a check here

    if (!customerVehicle) {
      showToast("error", "Nenhum cliente vinculado ao veículo.");
      return;
    }

    try {
      await ApiBack.post("/trackings", {
        vehicleId: parseInt(form.vehicleId, 10),
        latitude: form.latitude,
        longitude: form.longitude,
        userId: user.id,
        customerId: customerVehicle.customer.id,
      });
      showToast("success", "Rastreamento cadastrado com sucesso!");
      window.location.reload();
    } catch (error) {
      showToast("error", `Falha ao cadastrar rastreamento`);
    }
    setOpen(false);
    setForm({ vehicleId: "", latitude: "", longitude: "" });
  };

  const deleteTracking = async (id: number) => {
    if (window.confirm("Tem certeza que deseja deletar este rastreamento?")) {
      ApiBack.delete(`/trackings/${id}`)
        .then(() => {
          setTrackings((prev) => prev.filter((t) => t.id !== id));
          showToast("success", "Rastreamento deletado com sucesso!");
        })
        .catch((error) => console.error("Failed to delete tracking:", error));
    }
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  const filteredTrackings = trackings.filter(
    (t) =>
      t.vehicleId.toString().includes(search) ||
      t.latitude.toString().toLowerCase().includes(search.toLowerCase()) ||
      t.longitude.toString().toLowerCase().includes(search.toLowerCase())
  );

  const openEditDialog = (tracking: Tracking) => {
    setForm({
      vehicleId: tracking.vehicleId.toString(),
      latitude: tracking.latitude.toString(),
      longitude: tracking.longitude.toString(),
    });
    setEditingTracking(tracking);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setEditingTracking(null);
    setForm({ vehicleId: "", latitude: "", longitude: "" });
  };

  const saveTracking = async () => {
    if (editingTracking) {
      try {
        await ApiBack.put(`/trackings/${editingTracking.id}`, {
          vehicleId: parseInt(form.vehicleId, 10),
          latitude: form.latitude,
          longitude: form.longitude,
        });
        showToast("success", "Rastreamento atualizado com sucesso!");
      } catch (error) {
        showToast("error", "Failed to update tracking.");
      }
    } else {
      addTracking();
    }
    closeDialog();
    window.location.reload();
  };

  return (
    <>
      <CssBaseline />
      <MenuBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <TextField
            label="Busque Rastreamento"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flexGrow: 1, marginRight: 2 }}
          />
          <Button variant="outlined" color="primary" onClick={toggleModal}>
            Novo Rastreamento
          </Button>
        </Box>
        <Dialog open={open} onClose={toggleModal}>
          <DialogTitle>
            {editingTracking
              ? "Editar Rastreamento"
              : "Adicionar novo Rastreamento"}
          </DialogTitle>
          <DialogContent>
            {!editingTracking && (
              <FormControl fullWidth margin="normal">
                <InputLabel id="vehicle-select-label">Veículo</InputLabel>
                <Select
                  labelId="vehicle-select-label"
                  id="vehicle-select"
                  value={form.vehicleId}
                  label="Veículo"
                  onChange={handleSelectChange}
                  name="vehicleId"
                >
                  {cars.map((car) => (
                    <MenuItem key={car.id} value={car.id}>
                      {car.modelo} - {car.placa}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <TextField
              label="Latitude"
              name="latitude"
              type="number"
              value={form.latitude}
              onChange={handleTextChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Longitude"
              name="longitude"
              type="number"
              value={form.longitude}
              onChange={handleTextChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="error" variant="contained">
              Cancelar
            </Button>
            <Button onClick={saveTracking} color="primary" variant="contained">
              {editingTracking ? "Atualizar" : "Criar"}
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
              {filteredTrackings.map((tracking) => (
                <TableRow key={tracking.id}>
                  <TableCell>
                    {cars.find(
                      (car) => car.id.toString() === String(tracking.vehicleId)
                    )?.modelo ?? ""}
                  </TableCell>
                  <TableCell>{tracking.latitude}</TableCell>
                  <TableCell>{tracking.longitude}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => openEditDialog(tracking)}
                      color="primary"
                    >
                      <PencilIcon sx={{ width: "16px", height: "16px" }} />
                      Editar
                    </Button>
                    <Button
                      onClick={() => deleteTracking(tracking.id)}
                      color="error"
                    >
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

export default TrackingManagement;
