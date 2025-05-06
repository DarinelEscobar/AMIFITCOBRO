import { Box, Typography, TextField, Button } from '@mui/material';
import React from 'react';

function KeyfobAuthInput({ clave, setClave, error, onCancel, onSubmit }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={2}>
      <Box width="100%" maxWidth="400px" textAlign="center">
        <Typography variant="h6" mb={2} color="#10295B">
          Ingresa tu clave
        </Typography>
        <TextField
          fullWidth
          inputProps={{ style: { height: 50, fontSize: 20, textAlign: 'center' } }}
          value={clave}
          onChange={e => setClave(e.target.value)}
          error={!!error}
          helperText={error}
          sx={{ mb: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ bgcolor: '#10295B', color: 'white', mb: 1 }}
          onClick={onCancel}
        >
          CANCELAR
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{ bgcolor: '#e6ff00', color: '#10295B', fontWeight: 'bold' }}
          onClick={onSubmit}
        >
          VALIDAR
        </Button>
      </Box>
    </Box>
  );
}

export default KeyfobAuthInput;
