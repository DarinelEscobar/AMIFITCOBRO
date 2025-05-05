import React, { useState } from 'react';

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
} from '@mui/material';

const PassDetails = () => {
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
    usuarioEmergencia1: '',
    parentesco1: '',
    telefono1: '',
    usuarioEmergencia2: '',
    parentesco2: '',
    telefono2: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // PERMITE SOLO NUMEROS EN EL CAMPO TELEFONO
  const handlePhoneChange = (event) => {
    const { name, value } = event.target;
    if (/^\d*$/.test(value)) {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const camposRequeridos = Object.keys(formValues).filter(
      (key) => key !== 'noExterior'
    );

    /* VAIDA CADA CAMPO */
    for (const key of camposRequeridos) {
      if (formValues[key] === '') {
        setErrorMessage(`Por favor, completa el campo: ${key}`);
        setOpenSnackbar(true);
        return;
      }
    }

    console.log('Datos del formulario:', formValues);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
          ¡INSCRÍBETE!
        </Typography>

        {/* FORMULARIO */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
              '& .MuiSelect-select': {
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
            }}>
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
              '& .MuiSelect-select': {
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
              '& .MuiSelect-select': {
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
              '& .MuiSelect-select': {
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
              '& .MuiSelect-select': {
                color: '#10295B',
              },
            }}
          />
        </Box>

        {/* DATOS DE CONTACTO DE EMERGENCIA */}
        <Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 2 }}>
            <TextField
              fullWidth
              label="Usuario de Emergencia 1"
              name="usuarioEmergencia1"
              value={formValues.usuarioEmergencia1}
              onChange={handleChange}
              variant="outlined"
              sx={{
                flex: '1 1 200px',
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
            />
            <FormControl fullWidth variant="outlined" sx={{
              flex: '1 1 200px',
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
            }}>
              <InputLabel>Parentesco</InputLabel>
              <Select
                label="Parentesco"
                name="parentesco1"
                value={formValues.parentesco1}
                onChange={handleChange}
              >
                <MenuItem value="Padre">Padre</MenuItem>
                <MenuItem value="Madre">Madre</MenuItem>
                <MenuItem value="Hijo">Hijo</MenuItem>
                <MenuItem value="Hija">Hija</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Teléfono"
              name="telefono1"
              type="tel"
              value={formValues.telefono1}
              onChange={handlePhoneChange}
              variant="outlined"
              sx={{
                flex: '1 1 200px',
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
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 2 }}>
            <TextField
              fullWidth
              label="Usuario de Emergencia 2"
              name="usuarioEmergencia2"
              value={formValues.usuarioEmergencia2}
              onChange={handleChange}
              variant="outlined"
              sx={{
                flex: '1 1 200px',
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
            />
            <FormControl
              fullWidth
              variant="outlined"
              sx={{
                flex: '1 1 200px',
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
              }}>
              <InputLabel>Parentesco</InputLabel>
              <Select
                label="Parentesco"
                name="parentesco2"
                value={formValues.parentesco2}
                onChange={handleChange}
              >
                <MenuItem value="Padre">Padre</MenuItem>
                <MenuItem value="Madre">Madre</MenuItem>
                <MenuItem value="Hijo">Hijo</MenuItem>
                <MenuItem value="Hija">Hija</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Teléfono"
              name="telefono2"
              type="tel"
              value={formValues.telefono2}
              onChange={handlePhoneChange}
              variant="outlined"
              sx={{
                flex: '1 1 200px',
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
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
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
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Grow>
  );
};

export default PassDetails;