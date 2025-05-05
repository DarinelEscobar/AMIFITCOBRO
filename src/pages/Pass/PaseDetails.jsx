import React, { useState, useEffect } from 'react';
import { postRegistro, verificarSesionApi } from "../../API/api";

import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grow,
  Button,
  Snackbar,
  Alert,
  Typography,
  Dialog,
  DialogContent,
  CircularProgress,
} from '@mui/material';
import StatusDialog from '../../components/common/StatusDialog';

const PaseDetails = () => {
  const [formValues, setFormValues] = useState({
    nombre: '',
    apellidos: '',
    fechaNacimiento: '2000-01-01',
    correo: '',
    telefono: '',
    sexo: '',
    codigoPostal: '',
    colonia: '',
    municipio: '',
    estado: '',
    calle: '',
    noExterior: '',
  });


  // ESTADO PARA ABRIR LOS MENSAJES DE ERRORES
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // ESTADO PARA ESCRIBIR EL TEXTO
  const [errorMessage, setErrorMessage] = useState('');

  // ESTADO PARA EL LOADING
  const [loading, setLoading] = useState('loading');

  // ESTADO PARA ABRIR EL DIALOG
  const [openDialog, setOpenDialog] =   useState(false);



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handlePhoneChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      setFormValues({
        ...formValues,
        telefono: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading("loading");
    for (const key in formValues) {
      if (key === "noExterior") continue;

      if (formValues[key] === '') {
        setErrorMessage(`Por favor, completa el campo: ${key}`);
        setOpenSnackbar(true);
        return;
      }
    }
    setOpenDialog(true);
    try {
      const response = await postRegistro(formValues);
      console.log(response);
      setLoading("success");
      setTimeout(() => setOpenDialog(false), 3000);
    } catch (error) {
      console.error(error);
      setLoading("error");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const verificarSession = async () => {
    try {
      const response = await verificarSesionApi();
      console.log(response);
      setLoading("success");
      setTimeout(() => setOpenDialog(false), 3000);
    } catch (error) {
      console.error(error);
      setLoading("error");
    }
  };

  return (
    <Grow in={true} timeout={500}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        onSubmit={handleSubmit}
      >
        {/* BOTON PARA VERIFICAR LA SESIÓN */}
        <Button onClick={verificarSession}>Verificar Sesión</Button>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#10295B',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            margin: '20px 0',
          }}
        >
          PASE DE 7 DÍAS
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <TextField
            label="Nombre"
            name="nombre"
            value={formValues.nombre}
            onChange={handleChange}
            variant="outlined"
            sx={{
              flex: '1 1 48%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#10295B',
                  borderWidth: '3px',
                },
                '&:hover fieldset': {
                  borderColor: '#10295B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#10295B',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#10295B',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#10295B',
              },
              '& .MuiOutlinedInput-input': {
                color: '#10295B',
              },
            }}
          />
          <TextField
            label="Apellidos"
            name="apellidos"
            value={formValues.apellidos}
            onChange={handleChange}
            variant="outlined"
            sx={{
              flex: '1 1 48%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#10295B',
                  borderWidth: '3px',
                },
                '&:hover fieldset': {
                  borderColor: '#10295B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#10295B',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#10295B',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#10295B',
              },
              '& .MuiOutlinedInput-input': {
                color: '#10295B',
              },
            }}
          />
          <TextField
            label="Fecha de Nacimiento"
            name="fechaNacimiento"
            type="date"
            value={formValues.fechaNacimiento}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            sx={{
              flex: '1 1 48%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#10295B',
                  borderWidth: '3px',
                },
                '&:hover fieldset': {
                  borderColor: '#10295B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#10295B',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#10295B',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#10295B',
              },
              '& .MuiOutlinedInput-input': {
                color: '#10295B',
              },
            }}
          />
          <TextField
            label="Correo"
            name="correo"
            type="email"
            value={formValues.correo}
            onChange={handleChange}
            variant="outlined"
            sx={{
              flex: '1 1 48%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#10295B',
                  borderWidth: '3px',
                },
                '&:hover fieldset': {
                  borderColor: '#10295B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#10295B',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#10295B',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#10295B',
              },
              '& .MuiOutlinedInput-input': {
                color: '#10295B',
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Teléfono"
            name="telefono"
            type="tel"
            value={formValues.telefono}
            onChange={handlePhoneChange}
            variant="outlined"
            sx={{
              flex: '1 1 30%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#10295B',
                  borderWidth: '3px',
                },
                '&:hover fieldset': {
                  borderColor: '#10295B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#10295B',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#10295B',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#10295B',
              },
              '& .MuiOutlinedInput-input': {
                color: '#10295B',
              },
            }}
          />
          <FormControl
            variant="outlined"
            sx={{
              flex: '1 1 30%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#10295B',
                  borderWidth: '3px',
                },
                '&:hover fieldset': {
                  borderColor: '#10295B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#10295B',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#10295B',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#10295B',
              },
              '& .MuiSelect-select': {
                color: '#10295B',
              },
            }}
          >
            <InputLabel>Sexo</InputLabel>
            <Select
              label="Sexo"
              name="sexo"
              value={formValues.sexo}
              onChange={handleChange}
            >
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Femenino">Femenino</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Código Postal"
            name="codigoPostal"
            value={formValues.codigoPostal}
            onChange={handleChange}
            variant="outlined"
            sx={{
              flex: '1 1 30%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#10295B',
                  borderWidth: '3px',
                },
                '&:hover fieldset': {
                  borderColor: '#10295B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#10295B',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#10295B',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#10295B',
              },
              '& .MuiOutlinedInput-input': {
                color: '#10295B',
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Colonia"
            name="colonia"
            value={formValues.colonia}
            onChange={handleChange}
            variant="outlined"
            sx={{
              flex: '1 1 48%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#10295B',
                  borderWidth: '3px',
                },
                '&:hover fieldset': {
                  borderColor: '#10295B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#10295B',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#10295B',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#10295B',
              },
              '& .MuiOutlinedInput-input': {
                color: '#10295B',
              },
            }}
          />
          <TextField
            label="Municipio"
            name="municipio"
            value={formValues.municipio}
            onChange={handleChange}
            variant="outlined"
            sx={{
              flex: '1 1 48%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#10295B',
                  borderWidth: '3px',
                },
                '&:hover fieldset': {
                  borderColor: '#10295B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#10295B',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#10295B',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#10295B',
              },
              '& .MuiOutlinedInput-input': {
                color: '#10295B',
              },
            }}
          />
          <TextField
            label="Estado"
            name="estado"
            value={formValues.estado}
            onChange={handleChange}
            variant="outlined"
            sx={{
              flex: '1 1 30%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#10295B',
                  borderWidth: '3px',
                },
                '&:hover fieldset': {
                  borderColor: '#10295B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#10295B',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#10295B',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#10295B',
              },
              '& .MuiOutlinedInput-input': {
                color: '#10295B',
              },
            }}
          />
          <TextField
            label="Calle"
            name="calle"
            value={formValues.calle}
            onChange={handleChange}
            variant="outlined"
            sx={{
              flex: '1 1 30%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#10295B',
                  borderWidth: '3px',
                },
                '&:hover fieldset': {
                  borderColor: '#10295B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#10295B',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#10295B',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#10295B',
              },
              '& .MuiOutlinedInput-input': {
                color: '#10295B',
              },
            }}
          />
          <TextField
            label="No. Exterior"
            name="noExterior"
            value={formValues.noExterior}
            onChange={handleChange}
            variant="outlined"
            sx={{
              flex: '1 1 30%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#10295B',
                  borderWidth: '3px',
                },
                '&:hover fieldset': {
                  borderColor: '#10295B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#10295B',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#10295B',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#10295B',
              },
              '& .MuiOutlinedInput-input': {
                color: '#10295B',
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              // border: '1px solid navy', // Borde de color marino de 1px
              //           backgroundColor: 'transparent', // Fondo gris}
              //           padding: '10px 30px', // Padding en el texto
              //           letterSpacing: '4px',
              //           color: '#10295B', // Color del texto
              //           fontWeight: '300', // Texto en negrita
              //           fontSize: '2rem', // Tamaño de la fuente
              //           cursor: 'pointer', // Cambia el cursor al pasar el mouse

              fontSize: '2rem',
              padding: '10px 25px',
              letterSpacing: '3px',
              backgroundColor: '#D0FF08',
              color: '#000',
              fontWeight: '400',
              '&:hover': {
                backgroundColor: '#b0e000',
              },
            }}
          >
            REGISTRARME
          </Button>
        </Box>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={7000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="warning"
            sx={{
              width: '100%',
              fontSize: '1.5rem',
              padding: '16px',
              '& .MuiAlert-icon': {
                fontSize: '2rem',
              }
            }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>

        <StatusDialog status={loading} open={openDialog} handleClose={handleCloseDialog} />;

      </Box>
    </Grow>
  );
};

export default PaseDetails;
// import React from 'react';
// import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Grow } from '@mui/material';

// const PassDetails = () => {
//   return (
//     <Grow in={true} timeout={500}>
//       <Box
//         component="form"
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 2,
//         }}
//       >
//         {/* Primera fila */}
//         <Box
//           sx={{
//             display: 'flex',
//             gap: 2,
//             flexWrap: 'wrap',
//           }}
//         >
//           <TextField fullWidth label="Nombre" variant="outlined" sx={{ flex: '1 1 200px' }} />
//           <TextField fullWidth label="Apellidos" variant="outlined" sx={{ flex: '1 1 200px' }} />
//           <TextField
//             fullWidth
//             label="Fecha de Nacimiento"
//             type="date"
//             variant="outlined"
//             InputLabelProps={{ shrink: true }}
//             sx={{ flex: '1 1 200px' }}
//           />
//           <TextField fullWidth label="Correo" type="email" variant="outlined" sx={{ flex: '1 1 200px' }} />
//         </Box>

//         {/* Segunda fila */}
//         <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//           <TextField fullWidth label="Teléfono" type="tel" variant="outlined" sx={{ flex: '1 1 200px' }} />
//           <FormControl fullWidth variant="outlined" sx={{ flex: '1 1 200px' }}>
//             <InputLabel>Sexo</InputLabel>
//             <Select label="Sexo">
//               <MenuItem value="Masculino">Masculino</MenuItem>
//               <MenuItem value="Femenino">Femenino</MenuItem>
//               <MenuItem value="Otro">Otro</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField fullWidth label="Código Postal" variant="outlined" sx={{ flex: '1 1 200px' }} />
//           <TextField fullWidth label="Colonia" variant="outlined" sx={{ flex: '1 1 200px' }} />
//         </Box>

//         {/* Tercera fila */}
//         <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//           <TextField fullWidth label="Municipio" variant="outlined" sx={{ flex: '1 1 200px' }} />
//           <TextField fullWidth label="Estado" variant="outlined" sx={{ flex: '1 1 200px' }} />
//           <TextField fullWidth label="Calle" variant="outlined" sx={{ flex: '1 1 200px' }} />
//           <TextField fullWidth label="No. Exterior" variant="outlined" sx={{ flex: '1 1 200px' }} />
//         </Box>

//         {/* Cuarta fila - Usuario de Emergencia 1 */}
//         {/* <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//         <TextField fullWidth label="Usuario de Emergencia 1" variant="outlined" sx={{ flex: '1 1 200px' }} />
//         <FormControl fullWidth variant="outlined" sx={{ flex: '1 1 200px' }}>
//           <InputLabel>Parentesco</InputLabel>
//           <Select label="Parentesco">
//             <MenuItem value="Padre">Padre</MenuItem>
//             <MenuItem value="Madre">Madre</MenuItem>
//             <MenuItem value="Hijo">Hijo</MenuItem>
//             <MenuItem value="Hija">Hija</MenuItem>
//             <MenuItem value="Otro">Otro</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField fullWidth label="Teléfono" type="tel" variant="outlined" sx={{ flex: '1 1 200px' }} />
//       </Box> */}

//         {/* Quinta fila - Usuario de Emergencia 2 */}
//         {/* <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//         <TextField fullWidth label="Usuario de Emergencia 2" variant="outlined" sx={{ flex: '1 1 200px' }} />
//         <FormControl fullWidth variant="outlined" sx={{ flex: '1 1 200px' }}>
//           <InputLabel>Parentesco</InputLabel>
//           <Select label="Parentesco">
//             <MenuItem value="Padre">Padre</MenuItem>
//             <MenuItem value="Madre">Madre</MenuItem>
//             <MenuItem value="Hijo">Hijo</MenuItem>
//             <MenuItem value="Hija">Hija</MenuItem>
//             <MenuItem value="Otro">Otro</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField fullWidth label="Teléfono" type="tel" variant="outlined" sx={{ flex: '1 1 200px' }} />
//       </Box> */}
//       </Box>
//     </Grow>
//   );
// };

// export default PassDetails;