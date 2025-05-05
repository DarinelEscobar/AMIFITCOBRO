import React from 'react';
import CardComponent from '../../components/common/CardComponent'; // Importa el componente reutilizable
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();

  return (
    <CardComponent
      color="#10295B"
      backgroundColor="white"
      // backgroundColor="rgba(185, 19, 19, 0.25)"
      hoverBackgroundColor="white"
      // hoverBackgroundColor="rgb(185, 19, 19)"
      border_Radius={{ borderTopRightRadius: '100px' }}
      icon={HowToRegIcon}
      text="Regístrate AQUÍ!"
      onClick={() => navigate('/register')}
    />
  );
}

export default Register;