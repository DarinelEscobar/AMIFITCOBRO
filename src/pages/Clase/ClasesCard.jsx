import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
    Chip,
    Divider
} from '@mui/material';
import { AccessTime, CalendarToday, Person } from '@mui/icons-material';
import SocioInfo from '../../components/common/SocioInfo';

const ClaseCard = ({ clase }) => {
    const [openSocioInfo, setOpenSocioInfo] = useState(false);

    return (
        <>
            <Card sx={{
                width: '100%',
                maxWidth: 350,
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.15)'
                }
            }}>
                <CardContent sx={{
                    backgroundColor: '#10295B',
                    color: 'white',
                    padding: '16px 16px 8px 16px',
                    position: 'relative'
                }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                        {clase.Clase}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                        {clase.Nombre} {clase.Apellidos}
                    </Typography>

                    <Chip
                        label={clase.Status || 'Programada'}
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            backgroundColor: clase.Status === 'Completada' ? '#4caf50' : '#D0FF08',
                            color: clase.Status === 'Completada' ? 'white' : '#10295B',
                            fontWeight: 'bold',
                            fontSize: '0.7rem'
                        }}
                    />
                </CardContent>

                <CardContent sx={{ padding: '16px' }}>
                    <Stack spacing={1.5}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <CalendarToday sx={{ color: '#10295B', fontSize: '1rem' }} />
                            <Typography variant="body2">
                                {new Date(`${clase.Dia}T12:00:00-06:00`).toLocaleDateString('es-MX', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    timeZone: 'America/Mexico_City'
                                }).replace(/^\w/, c => c.toUpperCase())}
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <AccessTime sx={{ color: '#10295B', fontSize: '1rem' }} />
                            <Typography variant="body2">
                                {clase.HoraInicio} - {clase.HoraTermino}
                            </Typography>
                        </Stack>

                        <Divider sx={{ my: 1 }} />

                        <Stack direction="row" spacing={2}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Person sx={{ color: '#10295B', fontSize: '1rem' }} />
                                <Typography variant="body2">
                                    {clase.Inscritos?.length || 0} Inscritos
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            backgroundColor: '#D0FF08',
                            color: '#10295B',
                            fontWeight: 'bold',
                            py: 1,
                            borderRadius: '8px',
                            '&:hover': {
                                backgroundColor: '#b8e600',
                            }
                        }}
                        onClick={() =>{console.log(clase); setOpenSocioInfo(true)}}
                    >
                        Inscribirse
                    </Button>
                </CardContent>
            </Card>

            <SocioInfo
                open={openSocioInfo}
                onClose={() => setOpenSocioInfo(false)}
                claseSeleccionada={clase}
            />
        </>
    );
};

const ClasesCard = ({ clases }) => {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 3,
            p: 2
        }}>
            {clases.map((clase) => (
                <ClaseCard
                    key={clase.Id}
                    clase={clase}
                />
            ))}
        </Box>
    );
};

export default ClasesCard;