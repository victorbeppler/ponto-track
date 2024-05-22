import { AppBar, Button, Toolbar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";


const MenuBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={() => navigate("/clientes")}>
          Clientes
        </Button>
        <Button color="inherit" onClick={() => navigate("/veiculos")}>
          Veículos
        </Button>
        <Button color="inherit" onClick={() => navigate("/home")}>
          Rastreamento
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
