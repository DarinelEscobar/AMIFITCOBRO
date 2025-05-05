import React from 'react';
import { Button, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

function ButtonHome() {
  const navigate = useNavigate();
  const selectedId = sessionStorage.getItem('selectedId');
  return (
    <Button
      onClick={() => navigate('/')}
      variant="contained"
      sx={{
        position: 'absolute',
        top: '-50px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#10295B',
        color: '#fff',
        borderRadius: '25px',
        padding: '10px 20px',
        fontSize: '2rem',
        fontWeight: 'bold',
        boxShadow: 0,
      }}
    >

      <Stack direction="column" alignItems="center" spacing={0.5}>
        <HomeIcon
          sx={{
            fontSize: '4rem',
          }}
        />
        <Typography variant="body2">
          Inicio
        </Typography>
        <p style={{ color: 'white' }}>{selectedId}</p>

      </Stack>
    </Button>
  );
}

export default ButtonHome;