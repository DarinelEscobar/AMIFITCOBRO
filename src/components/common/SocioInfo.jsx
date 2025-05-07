import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    TextField,
    Button,
    Box,
    Typography,
    CircularProgress,
    Chip
} from '@mui/material';
import { CalendarToday, Schedule, Person } from '@mui/icons-material';
import { infoCliente, inscripcionClase } from '../../API/api';
import StatusDialog from '../../components/common/StatusDialog';

function SocioInfo({ open, onClose, claseSeleccionada, onSuccess, onRefresh }) {
    const [clave, setClave] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [socioData, setSocioData] = useState(null);
    const [recargando, setRecargando] = useState(false);

    /* CANCELA TODO PROCESO */
    const handleFinalizar = () => {
        setRecargando(true);

        setTimeout(() => {

            setClave('');
            setError('');
            setSocioData(null);
            setLoading(false);
            setRecargando(false);
            onClose();
            if (onRefresh) onRefresh();
        }, 1000);
    };


    /* CONSULTA LA INFORMACION DEL CLIENTE */
    const handleSubmit = async () => {
        if (!clave.trim()) {
            setError('Por favor ingresa tu KEYFOB');
            return;
        }

        setLoading(true);
        setError('');

        try {
            /* SE OBTIENE EL ID DEL GYM Y EL ID DE LA CLASE */
            const gymId = sessionStorage.getItem('selectedId');
            const idClase = claseSeleccionada.Id;

            const socioResponse = await infoCliente(gymId, clave);

            /* SE LANZA ADVERTENCIA EN CASO DE QUE NO COINCIDA LA CLAVE */
            if (socioResponse == null || socioResponse == undefined) {
                setError('No se encontró información.');
                return;
            }

            try {
                const inscripcionResponse = await inscripcionClase(
                    socioResponse.Id,
                    idClase,
                    socioResponse.Correo,
                    `${socioResponse.Nombre} ${socioResponse.Apellidos}`,
                    claseSeleccionada.Clase,
                    `${claseSeleccionada.Nombre} ${claseSeleccionada.Apellidos}`,
                    claseSeleccionada.Dia,
                    claseSeleccionada.HoraInicio,
                    claseSeleccionada.HoraTermino
                );

                console.log('Inscripción exitosa:', inscripcionResponse);

                /* SE GUARDA LA INFORMACION */
                const data = {
                    id: socioResponse.Id,
                    nombre: socioResponse.Nombre,
                    apellidos: socioResponse.Apellidos,
                    correo: socioResponse.Correo,
                    telefono: socioResponse.Telefono,
                    clave: socioResponse.Clave,
                    inscripcionId: inscripcionResponse.id
                };

                /* SE ACTUALIZA EL ESTADO DEL SOCIO */
                setSocioData(data);
                onSuccess(data);

            } catch (inscripcionError) {
                console.error('Error en inscripción:', inscripcionError);
                throw new Error(
                    inscripcionError.response?.data?.message ||
                    'Error al guardar la inscripción'
                );
            }
        } catch (error) {
            console.error('Error general:', error);
            setError(
                error.response?.data?.message ||
                error.message ||
                'Error en el proceso'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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
                            <Box sx={{
                                backgroundColor: '#10295B',
                                color: 'white',
                                py: 2,
                                px: 1,
                                textAlign: 'center',
                                borderRadius: '15px 15px 0 0',
                                mb: 2
                            }}>
                                <Typography variant="h4" fontWeight="bold">
                                    {claseSeleccionada.Clase}
                                </Typography>
                            </Box>

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

                            <Box display="flex" alignItems="center" mb={2}>
                                <Schedule fontSize="medium" color="action" sx={{ mr: 1 }} />
                                <Typography variant="body1" fontSize="1.1rem">
                                    {claseSeleccionada.HoraInicio} - {claseSeleccionada.HoraTermino}
                                </Typography>
                            </Box>

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
                                    {loading ? <CircularProgress size={24} /> : 'Inscribirme'}
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Typography variant="h6" fontWeight="bold" color="#4caf50" mb={2} mt={2}>
                                ¡Inscripción exitosa!
                            </Typography>
                            <Typography variant="h6" mb={3}>
                                {socioData.nombre} {socioData.apellidos} has sido inscrito(a) a la clase:
                            </Typography>

                            <Box sx={{
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                                p: 2,
                                mb: 3
                            }}>
                                <Typography textAlign={'center'} fontWeight="bold">{claseSeleccionada.Clase}</Typography>
                                {/* <Typography variant="body2">
                                    {new Date(`${claseSeleccionada.Dia}T${claseSeleccionada.HoraInicio}:00-06:00`).toLocaleString('es-MX', {
                                        timeZone: 'America/Mexico_City',
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }).replace(/^\w/, c => c.toUpperCase())} •
                                    {claseSeleccionada.HoraInicio} - {claseSeleccionada.HoraTermino}
                                </Typography> */}
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleFinalizar}
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

            <StatusDialog
                open={recargando}
                status="loading"
                title="Preparando todo"
                message="Estamos actualizando la información..."
                showCloseButton={false}
                disableEscapeKeyDown={true}
            />
        </>
    );
}

export default SocioInfo;