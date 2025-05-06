import { Box, Typography, Button, Alert, Divider } from '@mui/material';
import React from 'react';
import { FiLock } from 'react-icons/fi';

function KeyfobPurchaseSummary({ cliente, producto, error, success, onBuy }) {
  return (
    <Box
      sx={{
        maxWidth: '900px',
        width: '100%',
        mx: 'auto',
        mt: 6,
        mb: 10,
        px: { xs: 2, md: 4 },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 6,
      }}
    >
      {/* Columna izquierda - PAGO */}
      <Box flex={1}>
        <Typography
          variant="h5"
          mb={4}
          sx={{
            borderBottom: '2px solid #10295B',
            pb: 1,
            fontWeight: 700,
            fontSize: 22,
          }}
        >
          Pago
        </Typography>
        <Box display="flex" gap={2}>
          <Box
            width={100}
            height={100}
            border="2px solid #10295B"
            borderRadius={2}
            overflow="hidden"
            sx={{ flexShrink: 0 }}
          >
            <img
              src={producto?.Img || '/images/keyfob.jpg'}
              alt="Keyfob"
              width="100%"
              height="100%"
              style={{ objectFit: 'cover' }}
            />
          </Box>

          <Box display="flex" flexDirection="column" justifyContent="space-between">
            <Box>
              <Typography fontSize={16} fontWeight="bold">
                Producto: <b>KeyFob</b>
              </Typography>
              <Typography fontWeight="bold" fontSize={17} color="#0f295b" mt={0.5}>
                ${producto?.Precio}
              </Typography>
              <Typography fontSize={14} mt={1.2}>
                Disponibles: <b>{producto?.Cantidad}</b>
                <br />
                Socio (a): <b>{cliente?.Nombre}</b>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 4, borderColor: '#10295B', borderBottomWidth: 2 }} />
      </Box>

      {/* Columna derecha - RESUMEN */}
      <Box flex={1}>
        <Typography
          variant="h5"
          mb={4}
          sx={{
            borderBottom: '2px solid #10295B',
            pb: 1,
            fontWeight: 700,
            fontSize: 22,
          }}
        >
          Resumen del pedido
        </Typography>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography fontSize={15}>Subtotal:</Typography>
          <Typography fontSize={15} fontWeight="600">${producto?.Precio}</Typography>
        </Box>

        <Divider sx={{ my: 3, borderColor: '#10295B', borderBottomWidth: 2 }} />

        <Box display="flex" justifyContent="space-between" mb={5}>
          <Typography fontSize={16}>Total:</Typography>
          <Typography fontSize={16} fontWeight="bold">${producto?.Precio}</Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}
        {success && (
          <Alert severity="success" sx={{ mb: 4 }}>
            Compra realizada. Revisa tu correo.
          </Alert>
        )}

        {!success && (
          <Box>
            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: '#e6ff00',
                color: '#10295B',
                fontWeight: 'bold',
                boxShadow: 2,
                py: 2,
                fontSize: 16,
              }}
              onClick={onBuy}
            >
              CONFIRMAR COMPRA
            </Button>
            <Typography fontSize={13} mt={2.2} color="#10295B" textAlign="center">
              <FiLock style={{ verticalAlign: 'middle', marginRight: 4 }} />
              Pago seguro
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default KeyfobPurchaseSummary;
