import React, { useState } from 'react';
import CardComponent from './CardComponent';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ClaveModal from '../Keyfob/ClaveModal';

function KeyfobCard() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CardComponent
        color="#10295B"
        backgroundColor="white"
        hoverBackgroundColor="white"
        border_Radius={{ borderTopRightRadius: '100px' }}
        icon={VpnKeyIcon}
        text="ADQUIRIR LLAVE"
        onClick={() => setOpen(true)}
      />
      <ClaveModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default KeyfobCard;
