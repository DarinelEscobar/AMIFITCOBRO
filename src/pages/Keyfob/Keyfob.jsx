import { Box, Typography, Button, Grow, Alert } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { comprarKeyfob } from '../../API/keyfobApi';

function Keyfob() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cliente, producto } = state || {};

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!cliente || !producto) {
      navigate('/');
    }
  }, [cliente, producto, navigate]);

  const handleBuy = async () => {
    try {
      const { data } = await comprarKeyfob({
        clienteId: cliente.Id,
        inventarioId: producto.Id,
        nombre: cliente.Nombre,
        correo: cliente.Correo,
        precio: producto.Precio
      });

      console.log('[LOG] Compra fake enviada:', data);
      setSuccess(true);

      setTimeout(() => navigate('/'), 2500); // Regresa al home tras confirmación
    } catch (e) {
      const msg = e?.response?.data?.message || 'Fallo en la compra fake';
      setError(msg);
      console.error('[ERROR] Fallo en fake compra:', e);
    }
  };


  return (
    <Grow in timeout={500}>
      <Box textAlign="center" p={4}>
        <Typography variant="h4" mb={2}>Resumen de compra</Typography>
        <Typography fontSize={18}>Producto: <b>KeyFob</b></Typography>
        <Typography fontSize={18}>Precio actual: <b>${producto?.Precio}</b></Typography>
        <Typography fontSize={18}>Disponibles: <b>{producto?.Cantidad}</b></Typography>
        <Typography fontSize={18}>Socio: <b>{cliente?.Nombre}</b></Typography>

        {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 3 }}>Compra realizada. Revisa tu correo.</Alert>}

        {!success && (
          <Button
            variant="contained"
            sx={{ mt: 4, bgcolor: '#0f295b' }}
            onClick={handleBuy}
          >
            Confirmar compra
          </Button>
        )}
      </Box>
    </Grow>
  );
}

export default Keyfob;
