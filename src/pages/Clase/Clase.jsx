import React from 'react';
import CardComponent from '../../components/common/CardComponent'; 
import Filter7Icon from '@mui/icons-material/Filter7';
import { useNavigate } from 'react-router-dom';

function Clase() {
    
    const navigate = useNavigate();

  return (
    <CardComponent
      color="#10295B"
      backgroundColor="white"
      // backgroundColor="rgba(4, 248, 37, 0.25)"
      // hoverBackgroundColor="rgb(4, 248, 37)"
      hoverBackgroundColor="#D0FF08"
      border_Radius={{ borderBottomRightRadius: '100px' }} 
      icon={Filter7Icon}
      text="Selecciona tu CLASE"
      onClick={() => navigate('/Clase')}
      imagen="/img/icono-clase.png"
    />
  );
}

export default Clase;