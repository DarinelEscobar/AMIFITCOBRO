import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import QRious from 'qrious';
import { createPaymentLink } from '../../API/Stripe';

const CardQR = ({ paymentId, memberId }) => {
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [paymentLink, setPaymentLink] = useState(null);
    const [paymentLinkId, setPaymentLinkId] = useState(null);

    useEffect(() => {
        const generarQR = async () => { 
            try {
                const monto = 750;
                const data = await createPaymentLink(paymentId, monto, 'membresia');

                console.log('Respuesta de la API:', data);

                const { paymentLink, paymentLinkId } = data;

                console.log('Enlace generado:', paymentLink);
                console.log('ID del enlace:', paymentLinkId);

                setPaymentLink(paymentLink);
                setPaymentLinkId(paymentLinkId);

                new QRious({
                    element: canvasRef.current,
                    size: 200,
                    value: paymentLink,
                    background: 'white',
                    foreground: '#3c3c3c',
                    level: 'H'
                });
            } catch (error) {
                console.error('Error al generar el enlace de pago:', error?.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        generarQR();
    }, [paymentId]);

    return (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
            {loading ? (
                <CircularProgress />
            ) : paymentLink ? (
                <>
                    <canvas ref={canvasRef} />
                    <Typography sx={{ mt: 2, fontSize: '1.1rem' }}>
                        Escanea para pagar. Tiempo de espera: 5 minutos
                    </Typography>
                    <Typography variant="caption" sx={{ mt: 1 }}>
                        ID del Enlace: {paymentLinkId}
                    </Typography>
                </>
            ) : (
                <Typography>Error al generar el código QR.</Typography>
            )}
        </Box>
    );
};

export default CardQR;
