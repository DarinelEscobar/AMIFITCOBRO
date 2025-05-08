import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import React from 'react';

function KeyfobAuthInput({ clave, setClave, error, onCancel, onSubmit, loading }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={2}>
      <Box width="100%" maxWidth="600px" textAlign="center">
        <Typography
          variant="h4"
          mb={4}
          color="#10295B"
          fontWeight="bold"
          fontSize={{ xs: 28, md: 34 }}
        >
          Ingresa tu clave
        </Typography>
        <TextField
          fullWidth
          inputProps={{ style: { height: 70, fontSize: 26, textAlign: 'center' } }}
          value={clave}
          onChange={e => setClave(e.target.value)}
          error={!!error}
          helperText={error}
          sx={{ mb: 4 }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: '#10295B',
            color: 'white',
            mb: 3,
            py: 2,
            fontSize: 20,
            fontWeight: 'bold'
          }}
          onClick={onCancel}
          disabled={loading}
        >
          CANCELAR
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: '#e6ff00',
            color: '#10295B',
            py: 2,
            fontSize: 20,
            fontWeight: 'bold'
          }}
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={28} color="inherit" /> : 'VALIDAR'}
        </Button>
      </Box>
    </Box>
  );
}

export default KeyfobAuthInput;
