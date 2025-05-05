// SocioInfo.jsx
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    TextField,
    Button,
    Box,
    Typography,
    CircularProgress,
    IconButton,
    Chip
} from '@mui/material';
import { Close, CalendarToday, Schedule, Person } from '@mui/icons-material';

function SocioInfo({ open, onClose, claseSeleccionada }) {

    const [clave, setClave] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [socioData, setSocioData] = useState(null);

    const handleSubmit = () => {
        if (!clave.trim()) {
            setError('Por favor ingresa tu KEYFOB');
            return;
        }

        setLoading(true);

        // Simulación de API call con timeout
        setTimeout(() => {
            setLoading(false);

            // Validación simulada
            if (clave.toUpperCase() === "ABC123") {
                setSocioData({
                    nombre: "Juan",
                    apellidos: "Pérez López",
                    membresia: "Premium",
                });
            } else {
                setError('No se encontró información, intenta nuevamente.');
            }
        }, 1500);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: '12px',
                        width: '70%',
                        // minWidth: '450px',
                        maxWidth: '700px',
                        p: 2,
                        boxShadow: '0px 5px 20px rgba(0,0,0,0.2)'
                    }
                }
            }}
        >
            <DialogContent>
                {claseSeleccionada && (
                    <Box>
                        <Box
                            sx={{
                                backgroundColor: '#10295B',
                                color: 'white',
                                py: 2,
                                px: 1,
                                textAlign: 'center',
                                borderRadius: '15px 15px 0 0',
                                mb: 2
                            }}
                        >
                            <Typography variant="h4" fontWeight="bold">
                                {claseSeleccionada.Clase}
                            </Typography>
                        </Box>

                        {/* Fecha */}
                        <Box display="flex" alignItems="center" mt={1} mb={2}>
                            <CalendarToday fontSize="medium" color="action" sx={{ mr: 1 }} />
                            <Typography variant="body1" fontSize="1.1rem">
                                {new Date(`${claseSeleccionada.Dia}T12:00:00-06:00`).toLocaleDateString('es-MX', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    timeZone: 'America/Mexico_City'
                                }).replace(/^\w/, c => c.toUpperCase())}
                            </Typography>
                        </Box>

                        {/* Horario */}
                        <Box display="flex" alignItems="center" mb={2}>
                            <Schedule fontSize="medium" color="action" sx={{ mr: 1 }} />
                            <Typography variant="body1" fontSize="1.1rem">
                                {claseSeleccionada.HoraInicio} - {claseSeleccionada.HoraTermino}
                            </Typography>
                        </Box>

                        {/* Instructor */}
                        <Chip
                            label={`Instructor: ${claseSeleccionada.Nombre} ${claseSeleccionada.Apellidos}`}
                            size="medium"
                            icon={<Person fontSize="small" />}
                            sx={{ backgroundColor: '#e3f2fd', fontSize: '1rem', px: 1.5 }}
                        />
                    </Box>

                )}

                {!socioData ? (
                    <>
                        <Typography variant="body1" fontSize={"1.5rem"} mt={2} mb={3}>
                            Para inscribirte, ingresa tu KeyFob de socio:
                        </Typography>

                        <TextField
                            fullWidth
                            label="KEYFOB"
                            variant="outlined"
                            value={clave}
                            onChange={(e) => {
                                setClave(e.target.value.replace(/\s/g, ''));
                                setError('');
                            }}
                            error={!!error}
                            helperText={error || ' '}
                            sx={{ mb: 3 }}
                        />

                        <Box display="flex" justifyContent="space-between">
                            <Button
                                variant="outlined"
                                onClick={onClose}
                                sx={{
                                    color: '#10295B',
                                    borderColor: '#10295B'
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={loading}
                                sx={{
                                    backgroundColor: '#D0FF08',
                                    color: '#10295B',
                                    fontWeight: 'bold',
                                    minWidth: '120px'
                                }}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Verificar'}
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography variant="h6" fontWeight="bold" color="#4caf50" mb={2}>
                            ¡Inscripción exitosa!
                        </Typography>
                        <Typography variant="body1" mb={3}>
                            {socioData.nombre} {socioData.apellidos} ha sido inscrito(a) en:
                        </Typography>

                        <Box sx={{
                            backgroundColor: '#f5f5f5',
                            borderRadius: '8px',
                            p: 2,
                            mb: 3
                        }}>
                            <Typography fontWeight="bold">{claseSeleccionada.Clase}</Typography>
                            <Typography variant="body2">
                                {new Date(claseSeleccionada.Dia).toLocaleDateString('es-MX')} •
                                {claseSeleccionada.HoraInicio}-{claseSeleccionada.HoraTermino}
                            </Typography>
                        </Box>

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={onClose}
                            sx={{
                                backgroundColor: '#10295B',
                                color: 'white'
                            }}
                        >
                            Finalizar
                        </Button>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default SocioInfo;