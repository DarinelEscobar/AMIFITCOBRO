import React from 'react';
import { Box, Fade } from '@mui/material';
import Information from '../Information/Information';
import Pass from  '../Pass/Pass';
import Register from '../Register/Register';


function Home() {
    return (
        <Box
            width={'100%'} display={'flex'} justifyContent={'space-evenly'} alignItems={'center'} /* borderRadius={'50px'}  boxShadow={'-1px 5px 10px #00000038'} */
            sx={{
                // width: '100%',
                // height: 'auto',
                // minHeight: '720px',
                // margin: 'auto'

                // background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.86), rgba(0, 0, 0, 0.73))',
                // backgroundImage: 'url("/img/fondo2.jpg")', // Imagen de fondo
                // backgroundSize: 'cover',
                // backgroundRepeat: 'no-repeat',
                // backgroundPosition: 'center',
                // backgroundBlendMode: 'multiply',
                // filter: 'grayscale(100%)',
            }}
        >
            <Fade in timeout={500}>
                <div>
                    <Information />
                </div>
            </Fade>

            <Fade in timeout={800}>
                <div>
                    <Pass />
                </div>
            </Fade>

            <Fade in timeout={1100}>
                <div>
                    <Register />
                </div>
            </Fade>
        </Box >
    )
}

export default Home;