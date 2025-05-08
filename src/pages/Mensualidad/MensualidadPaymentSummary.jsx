import { Box, Typography, Button, Divider } from "@mui/material";
import React, { useState } from "react";
import { FiLock } from "react-icons/fi";
import StatusDialog from "../../components/common/StatusDialog";

function MensualidadPaymentSummary({ cliente, monto, error, success, onPay, loading }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  /* Modal éxito */
  React.useEffect(() => {
    if (success) setDialogOpen(true);
  }, [success]);

  const handleSuccessConfirm = () => {
    setDialogOpen(false);
    window.location.href = "/";
  };

  return (
    <>
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
        {/* Columna Pago */}
        <Box flex={1}>
          <Typography variant="h5" mb={4}
            sx={{ borderBottom: "2px solid #10295B", pb: 1, fontWeight: 700, fontSize: 22 }}>
            Pago
          </Typography>

          <Box display="flex" gap={2}>
            <Box width={100} height={100} border="2px solid #10295B"
                 borderRadius={2} overflow="hidden" sx={{ flexShrink: 0 }}>
              <img src="/images/mensualidad.jpg" alt="Mensualidad"
                   width="100%" height="100%" style={{ objectFit: "cover" }} />
            </Box>

            <Box>
              <Typography fontSize={16} fontWeight="bold">Producto: <b>Mensualidad</b></Typography>
              <Typography fontWeight="bold" fontSize={17} color="#0f295b" mt={0.5}>${monto}</Typography>
              <Typography fontSize={14} mt={1.2}>
                Socio(a): <b>{cliente?.Nombre}</b>
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 4, borderColor: "#10295B", borderBottomWidth: 2 }} />
        </Box>

        {/* Columna Resumen */}
        <Box flex={1}>
          <Typography variant="h5" mb={4}
            sx={{ borderBottom: "2px solid #10295B", pb: 1, fontWeight: 700, fontSize: 22 }}>
            Resumen del pago
          </Typography>

          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography>Subtotal:</Typography>
            <Typography fontWeight={600}>${monto}</Typography>
          </Box>

          <Divider sx={{ my: 3, borderColor: "#10295B", borderBottomWidth: 2 }} />

          <Box display="flex" justifyContent="space-between" mb={5}>
            <Typography>Total:</Typography>
            <Typography fontWeight="bold">${monto}</Typography>
          </Box>

          {!success && (
            <Box>
              <Button
                fullWidth
                variant="contained"
                sx={{ bgcolor: "#e6ff00", color: "#10295B", fontWeight: "bold", boxShadow: 2, py: 2, fontSize: 16 }}
                onClick={onPay}
                disabled={loading}
              >
                {loading ? "Procesando…" : "PAGAR"}
              </Button>
              <Typography fontSize={13} mt={2.2} color="#10295B" textAlign="center">
                <FiLock style={{ verticalAlign: "middle", marginRight: 4 }} /> Pago seguro
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Modal éxito */}
      <StatusDialog
        open={dialogOpen}
        onClose={handleSuccessConfirm}
        status="success"
        title="Pago realizado"
        message="Tu pago se ha registrado correctamente. Revisa tu correo."
        confirmButtonText="Aceptar"
      />

      {/* Modal error */}
      {error && (
        <StatusDialog
          open={true}
          onClose={() => window.location.reload()}
          status={error.status}
          title={error.title}
          message={error.message}
          confirmButtonText="Entendido"
        />
      )}
    </>
  );
}

export default MensualidadPaymentSummary;
