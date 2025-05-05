import React from 'react';
import CardComponent from '../../components/common/CardComponent';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';

function KeyfobC() {

    const navigate = useNavigate();

    return (
        <CardComponent
            color="#10295B"
            backgroundColor="white"
            hoverBackgroundColor="white"
            border_Radius={{ borderTopRightRadius: '100px' }}
            icon={AddCircleIcon}
            text="ADQUIRIR LLAVE"
            onClick={() => navigate('/keyfobs')}
        />
    );
}

export default KeyfobC