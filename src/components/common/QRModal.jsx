import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box
} from '@mui/material';
import QRCode from 'react-qr-code';

function QRModal({ open, paymentUrl, secondsLeft, onCancel }) {
  const mm = Math.floor(secondsLeft / 60);
  const ss = (secondsLeft % 60).toString().padStart(2, '0');

  return (
    <Dialog open={open} maxWidth="xs" fullWidth keepMounted>
      <DialogTitle>Escanee para pagar</DialogTitle>
      <DialogContent>
        <Box textAlign="center" mb={2}>
          {paymentUrl && <QRCode value={paymentUrl} size={220} />}
        </Box>
        <Typography align="center">Tiempo restante: {mm}:{ss}</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onCancel}>Cancelar pago</Button>
      </DialogActions>
    </Dialog>
  );
}

export default QRModal;
