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
            width={'100%'} display={'flex'} justifyContent={'space-evenly'} alignItems={'center'} >
            <Fade in timeout={800}>
                <div>
                    <Information />
                </div>
            </Fade>

            <Fade in timeout={1000}>
                <div>
                    <Mensualidad />
                </div>
            </Fade>

            <Fade in timeout={1200}>
                <div>
                    <Clase />
                    {/* <Pass /> */}
                </div>
            </Fade>

            <Fade in timeout={1400}>
                <div>
                    <Register />
                </div>
            </Fade>
            <Fade in timeout={1400}>
                <div>
                    <KeyfobC/>
                </div>
            </Fade>
        </Box >
    )
}

export default Home;