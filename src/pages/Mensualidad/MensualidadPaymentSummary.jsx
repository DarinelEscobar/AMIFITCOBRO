import { Box, Typography, Button, Alert, Divider } from "@mui/material";
import React from "react";
import { FiLock } from "react-icons/fi";

function MensualidadPaymentSummary({ cliente, monto, error, success, onPay }) {
  return (
    <Box
      sx={{
        maxWidth: "900px",
        width: "100%",
        mx: "auto",
        mt: 6,
        mb: 10,
        px: { xs: 2, md: 4 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 6
      }}
    >
      <Box flex={1}>
        <Typography variant="h5" mb={4} sx={{ borderBottom: "2px solid #10295B", pb: 1, fontWeight: 700 }}>
          Pago
        </Typography>
        <Box display="flex" gap={2}>
          <Box width={100} height={100} border="2px solid #10295B" borderRadius={2} overflow="hidden">
            <img src="/images/mensualidad.jpg" alt="Mensualidad" width="100%" height="100%" style={{ objectFit: "cover" }} />
          </Box>
          <Box>
            <Typography fontWeight="bold">Producto: Mensualidad</Typography>
            <Typography fontWeight="bold" color="#0f295b">${monto}</Typography>
            <Typography mt={1}>Socio(a): <b>{cliente?.Nombre}</b></Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 4, borderColor: "#10295B" }} />
      </Box>

      <Box flex={1}>
        <Typography variant="h5" mb={4} sx={{ borderBottom: "2px solid #10295B", pb: 1, fontWeight: 700 }}>
          Resumen del pago
        </Typography>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography>Subtotal:</Typography>
          <Typography fontWeight={600}>${monto}</Typography>
        </Box>

        <Divider sx={{ my: 3, borderColor: "#10295B" }} />

        <Box display="flex" justifyContent="space-between" mb={5}>
          <Typography>Total:</Typography>
          <Typography fontWeight="bold">${monto}</Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 4 }}>Pago realizado. Revisa tu correo.</Alert>}

        {!success && (
          <>
            <Button fullWidth variant="contained" sx={{ bgcolor: "#e6ff00", color: "#10295B", fontWeight: "bold" }} onClick={onPay}>
              PAGAR
            </Button>
            <Typography fontSize={13} mt={2} textAlign="center">
              <FiLock style={{ verticalAlign: "middle", marginRight: 4 }} /> Pago seguro
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}

export default MensualidadPaymentSummary;
