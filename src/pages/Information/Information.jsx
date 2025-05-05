import React from 'react';
import CardComponent from '../../components/common/CardComponent';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';

function Information() {

  const navigate = useNavigate();

  return (
    <CardComponent
      color="#10295B"
      backgroundColor="white"
      // backgroundColor="rgba(0, 123, 255, 0.25)"
      // hoverBackgroundColor="rgb(0, 123, 255)"
      hoverBackgroundColor="#D0FF08"
      border_Radius={{ borderBottomRightRadius: '100px' }}
      icon={AddCircleIcon}
      text="PROMOCIONES"
      onClick={() => navigate('/information')}
    />
  );
}

export default Information;