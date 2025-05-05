import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { validarClave } from '../../API/keyfobApi';
import { useNavigate } from 'react-router-dom';

function ClaveModal({ open, onClose }) {
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { data } = await validarClave(clave);
      const cantidad = parseInt(data?.producto?.Cantidad || 0);

      if (cantidad < 1) {
        setError('No hay stock de llaves KeyFob');
        return;
      }

      navigate('/keyfobs', { state: data });
    } catch (e) {
      const msg = e?.response?.data?.message;

      if (msg?.includes('no es válida')) setError('Clave incorrecta');
      else if (msg?.includes('Stock agotado')) setError('No hay llaves disponibles');
      else if (msg?.includes('llaves disponibles')) setError('Sin inventario en este gimnasio');
      else setError('Error al validar clave');
    }
  };



  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ingresa tu clave</DialogTitle>
      <DialogContent>
        <TextField fullWidth value={clave} onChange={e => setClave(e.target.value)}
                   error={!!error} helperText={error} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>Validar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ClaveModal;
