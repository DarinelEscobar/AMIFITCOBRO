import { Box, Typography, Button, Grow, Alert, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { comprarKeyfob, validarClave } from '../../API/keyfobApi';

function Keyfob() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState(state?.cliente || null);
  const [producto, setProducto] = useState(state?.producto || null);
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleClave = async () => {
    try {
      const { data } = await validarClave(clave);
      const cantidad = parseInt(data?.producto?.Cantidad || 0);

      if (cantidad < 1) {
        setError('No hay stock de llaves KeyFob');
        return;
      }

      setCliente(data.cliente);
      setProducto(data.producto);
      setError('');
    } catch (e) {
      const msg = e?.response?.data?.message || '';
      if (msg.includes('no es válida')) setError('Clave incorrecta');
      else if (msg.includes('Stock agotado')) setError('No hay llaves disponibles');
      else setError('Error al validar clave');
    }
  };

  const handleBuy = async () => {
    try {
      const { data } = await comprarKeyfob({
        clienteId: cliente.Id,
        inventarioId: producto.Id,
        nombre: cliente.Nombre,
        correo: cliente.Correo,
        precio: producto.Precio
      });

      setSuccess(true);
      setTimeout(() => navigate('/'), 2500);
    } catch (e) {
      const msg = e?.response?.data?.message || 'Fallo en la compra fake';
      setError(msg);
    }
  };

  return (
    <Grow in timeout={500}>
      <Box textAlign="center" p={4}>
        {!cliente || !producto ? (
          <>
            <Typography variant="h5" mb={2}>Ingresa tu clave</Typography>
            <TextField
              fullWidth
              value={clave}
              onChange={e => setClave(e.target.value)}
              error={!!error}
              helperText={error}
            />
            <Button
              variant="contained"
              sx={{ mt: 2, bgcolor: '#0f295b' }}
              onClick={handleClave}
            >
              Validar Clave
            </Button>
          </>
        ) : (
          <>
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
          </>
        )}
      </Box>
    </Grow>
  );
}

export default Keyfob;
