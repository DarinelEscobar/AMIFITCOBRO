import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CardComponent({ backgroundColor, hoverBackgroundColor, border_Radius, icon: Icon, text, onClick, color }) {

    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate('/');
        }
    };

    return (
        <Box
            sx={{
                ...border_Radius,
                // width: '500px',
                width: '350px',
                // height: '750px',
                height: '600px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                // alignItems: 'flex-end',
                boxShadow: 3,
                cursor: 'pointer',
                backgroundColor: backgroundColor,
                transition: 'all 0.3s ease-in-out',
                overflow: 'hidden',
                '&:hover': {
                    boxShadow: 6,
                    transform: 'scale(1.05)',
                    transition: 'all 0.3s ease',
                    //   backgroundColor: hoverBackgroundColor,
                },
            }}
            onClick={handleClick}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '35%',
                    backgroundColor: hoverBackgroundColor,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        color: color,
                        fontWeight: '800',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    {text}
                </Typography>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: '30%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    component="button"
                    sx={{
                        border: '1px solid navy',
                        backgroundColor: 'transparent',
                        padding: '10px 30px',
                        letterSpacing: '4px',
                        color: '#10295B',
                        fontWeight: '300',
                        fontSize: '2rem',
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: 'darkgrey',
                        },
                    }}
                >
                    ENTRAR
                </Box>
            </Box>
        </Box>
    );
}

export default CardComponent;