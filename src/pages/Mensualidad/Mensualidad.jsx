import React from 'react';
import CardComponent from '../../components/common/CardComponent';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';

function Mensualidad() {
    
    const navigate = useNavigate();

    return (
        <CardComponent
            color="#10295B"
            backgroundColor="white"
            hoverBackgroundColor="white"
            border_Radius={{ borderTopRightRadius: '100px' }}
            icon={AddCircleIcon}
            text="PAGA TU MENSUALIDAD"
            onClick={() => navigate('/mensualidad')}
            imagen="/img/icono-mensualidad.png"
        />
    );
}

export default Mensualidad