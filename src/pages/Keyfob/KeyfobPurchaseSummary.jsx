/* Integra flujo Stripe usando usePaymentFlow + QRModal */
import { Box, Typography, Button, Divider } from '@mui/material';
import React, { useState } from 'react';
import { FiLock } from 'react-icons/fi';

import QRModal from '../../components/common/QRModal';
import StatusDialog from '../../components/common/StatusDialog';
import usePaymentFlow from '../../hooks/usePaymentFlow';

function KeyfobPurchaseSummary({ cliente, producto }) {
  const {
    status, seconds, payment, error,
    beginPayment, cancelPayment
  } = usePaymentFlow(); // Hook centralizado

  const [askCancel, setAskCancel] = useState(false); // Confirmación de cancelación

  /* Dispara el flujo Stripe */
  const handleBuy = () => beginPayment({
    clienteId: cliente.Id,
    importe: producto.Precio,
    tipoPago: 'card',
    gymId: cliente.GymId
  });

  /* Aceptar cancelación */
  const confirmCancel = async () => {
    setAskCancel(false);
    await cancelPayment();
  };

  /* Éxito → redirección */
  const handleSuccessClose = () => { window.location.href = '/'; };

  return (
    <>
      {/* Vista resumen original */}
      <Box sx={{
        maxWidth: '900px', width: '100%', mx: 'auto', mt: 6, mb: 10,
        px: { xs: 2, md: 4 }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6
      }}>
        {/* Col. Pago */}
        <Box flex={1}>
          <Typography variant="h5" mb={4}
            sx={{ borderBottom: '2px solid #10295B', pb: 1, fontWeight: 700, fontSize: 22 }}>
            Pago
          </Typography>
          <Box display="flex" gap={2}>
            <Box width={100} height={100} border="2px solid #10295B"
              borderRadius={2} overflow="hidden" sx={{ flexShrink: 0 }}>
              <img src={producto?.Img || '/images/keyfob.jpg'} alt="Keyfob"
                width="100%" height="100%" style={{ objectFit: 'cover' }} />
            </Box>
            <Box>
              <Typography fontSize={16} fontWeight="bold">Producto: <b>KeyFob</b></Typography>
              <Typography fontWeight="bold" fontSize={17} color="#0f295b" mt={0.5}>
                ${producto?.Precio}
              </Typography>
              <Typography fontSize={14} mt={1.2}>
                Disponibles: <b>{producto?.Cantidad}</b><br />
                Socio(a): <b>{cliente?.Nombre}</b>
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 4, borderColor: '#10295B', borderBottomWidth: 2 }} />
        </Box>

        {/* Col. Resumen */}
        <Box flex={1}>
          <Typography variant="h5" mb={4}
            sx={{ borderBottom: '2px solid #10295B', pb: 1, fontWeight: 700, fontSize: 22 }}>
            Resumen del pedido
          </Typography>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography fontSize={15}>Subtotal:</Typography>
            <Typography fontSize={15} fontWeight={600}>${producto?.Precio}</Typography>
          </Box>
          <Divider sx={{ my: 3, borderColor: '#10295B', borderBottomWidth: 2 }} />
          <Box display="flex" justifyContent="space-between" mb={5}>
            <Typography fontSize={16}>Total:</Typography>
            <Typography fontSize={16} fontWeight="bold">${producto?.Precio}</Typography>
          </Box>

          {status === 'idle' && (
            <Box>
              <Button fullWidth variant="contained"
                sx={{
                  bgcolor: '#e6ff00', color: '#10295B', fontWeight: 'bold',
                  boxShadow: 2, py: 2, fontSize: 16
                }}
                onClick={handleBuy}>
                CONFIRMAR COMPRA
              </Button>
              <Typography fontSize={13} mt={2.2} color="#10295B" textAlign="center">
                <FiLock style={{ verticalAlign: 'middle', marginRight: 4 }} /> Pago seguro
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Modal QR activo cuando status === pending */}
      {status === 'pending' && payment && (
        <QRModal
          open={true}
          paymentUrl={payment.paymentLink}
          secondsLeft={seconds}
          onCancel={() => setAskCancel(true)}
        />
      )}

      {/* Confirmar cancelación */}
      {askCancel && (
        <StatusDialog
          open={true}
          onClose={() => setAskCancel(false)}
          status="warning"
          title="¿Cancelar pago?"
          message="El enlace se desactivará y deberás iniciar de nuevo."
          confirmButtonText="Cancelar pago"
          onConfirm={confirmCancel}
        />
      )}

      {/* Éxito */}
      {status === 'success' && (
        <StatusDialog
          open={true}
          onClose={handleSuccessClose}
          status="success"
          title="Pago realizado con éxito"
          message="Revisa tu correo."
          confirmButtonText="Aceptar"
        />
      )}

      {/* Timeout */}
      {status === 'timeout' && (
        <StatusDialog
          open={true}
          onClose={() => window.location.reload()}
          status="error"
          title="Pago cancelado"
          message="Tiempo agotado."
          confirmButtonText="Entendido"
        />
      )}

      {/* Cancelación manual */}
      {status === 'cancelled' && (
        <StatusDialog
          open={true}
          onClose={() => window.location.reload()}
          status="info"
          title="Pago cancelado"
          message="Has cancelado el pago."
          confirmButtonText="Entendido"
        />
      )}

      {/* Error interno */}
      {status === 'error' && (
        <StatusDialog
          open={true}
          onClose={() => window.location.reload()}
          status="error"
          title="Error"
          message="No se pudo iniciar el pago."
          confirmButtonText="Entendido"
        />
      )}

      {/* Error del hook */}
      {error && (
        <StatusDialog
          open={true}
          onClose={() => window.location.reload()}
          status="error"
          title="Error"
          message={error.message || 'Error inesperado.'}
          confirmButtonText="Entendido"
        />
      )}
    </>
  );
}

export default KeyfobPurchaseSummary;
