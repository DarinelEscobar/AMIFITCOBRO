import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import './App.css';
import InformationDetails from './pages/Information/InformationDetails';
import { Box } from '@mui/material';
import ButtonHome from './components/common/ButtonHome';
import RegisterDetails from './pages/Register/RegisterDetails';
import MensualidadDetails from './pages/Mensualidad/MensualidadDetails';
import PaseDetails from './pages/Pass/PaseDetails';
import Inicio from './pages/Inicio/Inicio';
import ClaseDetails from './pages/Clase/ClaseDetails';
import Keyfob from './pages/Keyfob/Keyfob';

function AppContent() {
  const location = useLocation();


  // SE OBTIENE LA VARIABLE DE SESSION STORAGE
  const showButton = location.pathname !== '/';
  const selectedId = sessionStorage.getItem('selectedId');

  // SE VERIFICA SI ESTA EN HOME PARA NO MOSTRAR BOTOND DE INICIO
  if (!selectedId && location.pathname !== '/inicio') {
    return <Navigate to="/inicio" replace />;
  }


  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', backgroundColor: '#cecece' }}>

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '70%',
          backgroundColor: '#10295B',
          borderBottomLeftRadius: '100%',
          borderBottomRightRadius: '100%',
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          height: '90vh',
          minHeight: '720px',
          maxHeight: '1200px',
          backgroundColor: showButton ? 'white' : 'none',
          // backgroundColor: 'white',
          borderRadius: '50px',
          boxShadow: showButton ? '-1px 5px 10px #00000038' : 'none',
          // boxShadow: '-1px 5px 10px #00000038',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/*
        1.- Pagar mensualidad
        2.- inscripciones ✅
        3.- comprar llaves
        4.- información  ✅
        5-. Reserva de Clases
        */}
        {showButton && <ButtonHome />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/Mensualidad" element={<MensualidadDetails />} />
          <Route path="/Pass" element={<PaseDetails />} />
          <Route path="/Register" element={<RegisterDetails />} />
          <Route path="/Information" element={<InformationDetails />} />
          <Route path="/Clase" element={<ClaseDetails />} />
          <Route path="/keyfobs" element={<Keyfob />} />
        </Routes>
      </Box>
    </div>
  );
}

// USO DE ROUTER
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;