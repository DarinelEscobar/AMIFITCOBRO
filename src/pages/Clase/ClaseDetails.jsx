import React, { useState, useEffect } from 'react';
import { Box, Grow, Typography } from '@mui/material';
import { obtenerClases } from '../../API/api';
import StatusDialog from '../../components/common/StatusDialog';
import ClasesGrid from './ClasesCard';

function ClaseDetails() {
    const [clases, setClases] = useState([]);
    const [dialogState, setDialogState] = useState({
        open: false,
        status: 'loading',
        title: '',
        message: ''
    });

    const handleCloseDialog = () => {
        setDialogState(prev => ({ ...prev, open: false }));
    };

    useEffect(() => {
        const fetchClases = async () => {
            const id = sessionStorage.getItem('selectedId');

            if (!id) {
                setDialogState({
                    open: true,
                    status: 'error',
                    title: 'Error requerido',
                    message: 'No se ha seleccionado un ID válido'
                });
                return;
            }

            setDialogState({
                open: true,
                status: 'loading',
                title: 'Cargando...',
                message: ''
            });

            try {
                const response = await obtenerClases(id);

                if (response.status === 'success') {
                    setClases(response.data || []);
                    setDialogState(prev => ({ ...prev, open: false }));
                } else {
                    setClases([]);
                    setDialogState({
                        open: true,
                        status: 'error',
                        title: 'Error',
                        message: response.message || 'Error al cargar las clases'
                    });
                }
            } catch (error) {
                console.error('Error:', error);
                setClases([]);
                setDialogState({
                    open: true,
                    status: 'error',
                    title: 'Error de conexión',
                    message: 'No se pudo conectar con el servidor'
                });
            }
        };

        fetchClases();
    }, []);

    return (
        <>
            <StatusDialog
                open={dialogState.open}
                status={dialogState.status}
                title={dialogState.title}
                message={dialogState.message}
                handleClose={handleCloseDialog}
            />

            <Box sx={{
                width: '100%',
                height: '70%',
                display: 'flex',
                flexDirection: 'column',
                p: 3
            }}>
                <Typography
                    variant="h5" // Más pequeño que h4
                    sx={{
                        color: '#10295B',
                        mb: 3,
                        fontWeight: 700,
                        textAlign: 'center',
                        fontFamily: '"Roboto Condensed", sans-serif',
                        letterSpacing: '0.5px',
                        lineHeight: 1.2,
                        textTransform: 'uppercase'
                    }}
                >
                    Próximas clases · Cupo limitado (7 personas)
                </Typography>
                <Box sx={{
                    flex: 1,
                    boxShadow: '0px 15px 10px rgba(0, 0, 0, 0.2)',
                    borderRadius: '0 0 10px 10px',
                    overflowY: 'auto',
                    pr: 2,
                    scrollbarWidth: 'thin',
                    '&::-webkit-scrollbar': {
                        width: '12px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#10295B',
                        borderRadius: '3px',
                    }
                }}>
                    {clases.length > 0 ? (
                        <ClasesGrid
                            clases={clases}
                            onSelectClase={(clase) => {
                                console.log('Clase seleccionada:', clase);
                            }}
                        />
                    ) : (
                        <Box sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Typography variant="body1">
                                No hay clases programadas
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
}

export default ClaseDetails;