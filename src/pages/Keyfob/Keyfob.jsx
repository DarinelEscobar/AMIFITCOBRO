import { Box, Typography, Button, Grow } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { comprarKeyfob } from '../../API/keyfobApi';

function Keyfob() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cliente, producto } = state || {};

  const handleBuy = async () => {
    await comprarKeyfob({
      clienteId: cliente.Id,
      inventarioId: producto.Id,
      nombre: cliente.Nombre,
      correo: cliente.Correo,
      precio: producto.Precio
    });
    navigate('/');
  };

  return (
    <Grow in timeout={500}>
      <Box textAlign="center">
        <Typography variant="h4" mb={2}>Resumen de compra</Typography>
        <Typography>Producto: KeyFob</Typography>
        <Typography>Precio: ${producto.Precio}</Typography>
        <Typography>Socio: {cliente.Nombre}</Typography>
        <Button variant="contained" sx={{ mt: 4, bgcolor: '#10295B' }} onClick={handleBuy}>
          Comprar
        </Button>
      </Box>
    </Grow>
  );
}

export default Keyfob;
