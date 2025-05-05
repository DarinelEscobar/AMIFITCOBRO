// pages/Inicio/Inicio.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../components/common/CardComponent';
import { Box, Typography } from '@mui/material';

function Inicio() {
    const navigate = useNavigate();

    const handleSelect = (id) => {
        console.log(`ID seleccionado: ${id}`);
        sessionStorage.setItem('selectedId', id);
        navigate('/');
    };

    return (
        <>
            <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem'}}>
                <Box
                    onClick={() => handleSelect(2)}
                    sx={{
                        borderRadius: '50px',
                        width: '550px',
                        height: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        boxShadow: 6,
                        cursor: 'pointer',
                        backgroundImage: `url('/img/gimnasios/Tux.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            boxShadow: 8,
                            transform: 'scale(1.1)',
                        },
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '30%',
                            backgroundColor: '#10295ba6',
                            backdropFilter: 'blur(5px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                            TUXTLA
                        </Typography>
                    </Box>
                </Box>
                <Box
                    onClick={() => handleSelect(3)}
                    sx={{
                        borderRadius: '50px',
                        width: '550px',
                        height: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        boxShadow: 6,
                        cursor: 'pointer',
                        backgroundImage: `url('/img/gimnasios/Tapa.jpeg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            boxShadow: 8,
                            transform: 'scale(1.1)',
                        },
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '30%',
                            backgroundColor: '#10295ba6',
                            backdropFilter: 'blur(5px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                            TAPACHULA
                        </Typography>
                    </Box>
                </Box>
            </div>
        </>
        // <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '5rem' }}>
        //     <div
        //         onClick={() => handleSelect(1)}
        //         style={{ padding: '2rem', background: '#ccc', cursor: 'pointer' }}
        //     >
        //         Opción ID 1
        //     </div>
        //     <div
        //         onClick={() => handleSelect(2)}
        //         style={{ padding: '2rem', background: '#ccc', cursor: 'pointer' }}
        //     >
        //         Opción ID 2
        //     </div>
        // </div>
    );
}

export default Inicio;
