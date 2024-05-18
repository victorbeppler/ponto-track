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
  { id: "model", label: "Model" },
  { id: "year", label: "Year" },
  { id: "licensePlate", label: "License Plate" },
  { id: "actions", label: "Actions" },
];

interface Car {
  id: number;
  model: string;
  year: number;
  licensePlate: string;
}

function Vehicle() {
  const [cars, setCars] = useState<Car[]>([
    { id: 1, model: "Model 1", year: 2021, licensePlate: "ABC-1234" },
    { id: 2, model: "Model 2", year: 2021, licensePlate: "ABC-1234" },
    { id: 3, model: "Model 3", year: 2021, licensePlate: "ABC-1234" },
    { id: 4, model: "Model 4", year: 2021, licensePlate: "ABC-1234" },
    { id: 5, model: "Model 5", year: 2021, licensePlate: "ABC-1234" },
    { id: 6, model: "Model 6", year: 2021, licensePlate: "ABC-1234" },
    { id: 7, model: "Model 7", year: 2021, licensePlate: "ABC-1234" },
    { id: 8, model: "Model 8", year: 2021, licensePlate: "ABC-1234" },
    { id: 9, model: "Model 9", year: 2021, licensePlate: "ABC-1234" },
    { id: 10, model: "Model 10", year: 2021, licensePlate: "ABC-1234" },
  ]);
  const [form, setForm] = useState({ model: "", year: "", licensePlate: "" });
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addCar = () => {
    const newCar = { ...form, id: cars.length + 1, year: parseInt(form.year) };
    setCars((prev) => [...prev, newCar]);
    setOpen(false);
    setForm({ model: "", year: "", licensePlate: "" });
  };

  const deleteCar = (id: number) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      setCars(cars.filter((car) => car.id !== id));
    }
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  const filteredCars = cars.filter(
    (car) =>
      car.model.toLowerCase().includes(search.toLowerCase()) ||
      car.year.toString().includes(search) ||
      car.licensePlate.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="md">
      <TextField
        label="Search Cars"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="outlined" color="primary" onClick={toggleModal}>
        Add New Car
      </Button>
      <Dialog open={open} onClose={toggleModal}>
        <DialogTitle>Add New Car</DialogTitle>
        <DialogContent>
          <TextField
            label="Model"
            name="model"
            value={form.model}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Year"
            name="year"
            value={form.year}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="License Plate"
            name="licensePlate"
            value={form.licensePlate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleModal} color="primary">
            Cancel
          </Button>
          <Button onClick={addCar} color="primary">
            Add Car
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
            {filteredCars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.licensePlate}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteCar(car.id)} color="secondary">
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

export default Vehicle;
