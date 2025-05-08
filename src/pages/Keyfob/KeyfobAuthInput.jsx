import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import React from 'react';

function KeyfobAuthInput({ clave, setClave, error, onCancel, onSubmit, loading }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={2}>
      <Box width="100%" maxWidth="420px" textAlign="center">
        <Typography variant="h5" mb={3} color="#10295B" fontWeight="bold">
          Ingresa tu clave
        </Typography>
        <TextField
          fullWidth
          inputProps={{ style: { height: 55, fontSize: 22, textAlign: 'center' } }}
          value={clave}
          onChange={e => setClave(e.target.value)}
          error={!!error}
          helperText={error}
          sx={{ mb: 3 }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ bgcolor: '#10295B', color: 'white', mb: 2, py: 1.5 }}
          onClick={onCancel}
          disabled={loading}
        >
          CANCELAR
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{ bgcolor: '#e6ff00', color: '#10295B', fontWeight: 'bold', py: 1.5 }}
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'VALIDAR'}
        </Button>
      </Box>
    </Box>
  );
}

export default KeyfobAuthInput;
