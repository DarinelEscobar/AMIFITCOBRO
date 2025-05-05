import React from 'react';
import { Box, Grow } from '@mui/material';

function InformationDetails() {
  return (
    <Grow in={true} timeout={500}>
      <Box>
        <h1>Información Detallada</h1>
        <p>Esta es la vista de información detallada.</p>
      </Box>
    </Grow>
  );
}

export default InformationDetails;