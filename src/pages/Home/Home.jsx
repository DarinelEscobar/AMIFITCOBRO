import React from 'react';
import { Box, Fade } from '@mui/material';
import Information from '../Information/Information';

import Register from '../Register/Register';
import Mensualidad from '../Mensualidad/Mensualidad';
import Pass from '../Pass/Pase';
import Clase from '../Clase/Clase';
import KeyfobC from '../Keyfob/KeyfobC';



function Home() {
    /*
    1.- Pagar mensualidad
    2.- inscripciones ✅
    3.- comprar llaves
    4.- información  ✅
    5-. Reserva de Clases
    */
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
                alignItems: 'flex-start',
            }}
        >

            <Fade in timeout={800}>
                <div style={{ height: '600px' }}>
                    <Register />
                </div>
            </Fade>

            <Fade in timeout={1000}>
                <div style={{ height: '600px' }}>
                    <Clase />
                </div>
            </Fade>

            <Fade in timeout={1200}>
                <div style={{ height: '600px' }}>
                    <Mensualidad />
                </div>
            </Fade>

            <Fade in timeout={1400}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignContent: 'center',
                    height: '600px',
                    justifyContent: 'space-between',
                }}>
                    <div style={{ height: '550px' }}>
                        <Information />

                    </div>
                    <div style={{ height: '550px' }}>
                        <KeyfobC />
                    </div>
                </Box>
            </Fade>

        </Box>
    )
}

export default Home;