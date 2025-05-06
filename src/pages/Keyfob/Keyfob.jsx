import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { comprarKeyfob, validarClave } from '../../API/keyfobApi';
import KeyfobAuthInput from './KeyfobAuthInput';
import KeyfobPurchaseSummary from './KeyfobPurchaseSummary';

function Keyfob() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState(state?.cliente || null);
  const [producto, setProducto] = useState(state?.producto || null);
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleClaveSubmit = async () => {
    try {
      const { data } = await validarClave(clave);
      const cantidad = parseInt(data?.producto?.Cantidad || 0);

      if (cantidad < 1) {
        setError('No hay stock de llaves KeyFob');
        return;
      }

      setCliente(data.cliente);
      setProducto(data.producto);
      setError('');
    } catch (e) {
      const msg = e?.response?.data?.message || '';
      if (msg.includes('no es válida')) setError('Clave incorrecta');
      else if (msg.includes('Stock agotado')) setError('No hay llaves disponibles');
      else setError('Error al validar clave');
    }
  };

  const handleBuy = async () => {
    try {
      await comprarKeyfob({
        clienteId: cliente.Id,
        inventarioId: producto.Id,
        nombre: cliente.Nombre,
        correo: cliente.Correo,
        precio: producto.Precio
      });

      setSuccess(true);
      setTimeout(() => navigate('/'), 2500);
    } catch (e) {
      const msg = e?.response?.data?.message || 'Fallo en la compra fake';
      setError(msg);
    }
  };

  return (
    <>
      {!cliente || !producto ? (
        <KeyfobAuthInput
          clave={clave}
          setClave={setClave}
          error={error}
          onCancel={() => navigate('/')}
          onSubmit={handleClaveSubmit}
        />
      ) : (
        <KeyfobPurchaseSummary
          cliente={cliente}
          producto={producto}
          error={error}
          success={success}
          onBuy={handleBuy}
        />
      )}
    </>
  );
}

export default Keyfob;
