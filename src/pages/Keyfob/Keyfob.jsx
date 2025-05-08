import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { comprarKeyfob, validarClave } from '../../API/keyfobApi';
import KeyfobAuthInput from './KeyfobAuthInput';
import KeyfobPurchaseSummary from './KeyfobPurchaseSummary';
import StatusDialog from '../../components/common/StatusDialog';

function Keyfob() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [cliente, setCliente]   = useState(state?.cliente || null);
  const [producto, setProducto] = useState(state?.producto || null);
  const [clave, setClave]       = useState('');
  const [error, setError]       = useState(null);
  const [success, setSuccess]   = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleClaveSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await validarClave(clave);

      if (data.ok === false) {
        setError({
          status : 'error',
          title  : 'Clave no válida',
          message: data.error || 'La clave ingresada no existe.'
        });
        setLoading(false);
        return;
      }

      if (!data.cliente || !data.producto) {
        setError({
          status : 'error',
          title  : 'Respuesta inválida',
          message: 'Servidor sin datos de socio o producto.'
        });
        setLoading(false);
        return;
      }

      const cantidad = parseInt(data.producto.Cantidad || '0', 10);
      if (cantidad < 1) {
        setError({
          status : 'warning',
          title  : 'Sin existencias',
          message: 'Actualmente no hay llaves KeyFob disponibles en este gimnasio.'
        });
        setLoading(false);
        return;
      }

      setCliente(data.cliente);
      setProducto(data.producto);
      setError(null);
    } catch (e) {
      setError({
        status : 'error',
        title  : 'Error de red',
        message: 'No se pudo conectar con el servidor. Intenta de nuevo.'
      });
    }
    setLoading(false);
  };

  const handleBuy = async () => {
    setLoading(true);
    try {
      const { data } = await comprarKeyfob({
        clienteId   : cliente.Id,
        inventarioId: producto.Id,
        nombre      : cliente.Nombre,
        correo      : cliente.Correo,
        precio      : producto.Precio
      });

      if (data.ok === false) {
        setError({
          status : 'error',
          title  : 'Error en la compra',
          message: data.error || 'No se pudo completar la compra.'
        });
        setLoading(false);
        return;
      }

      setSuccess(true);
      setError(null);
    } catch (e) {
      setError({
        status : 'error',
        title  : 'Error de red',
        message: 'No se pudo conectar con el servidor. Intenta de nuevo.'
      });
    }
    setLoading(false);
  };

  return (
    <>
      {!cliente || !producto ? (
        <>
          <KeyfobAuthInput
            clave={clave}
            setClave={setClave}
            error={error?.message}
            onCancel={() => navigate('/')}
            onSubmit={handleClaveSubmit}
            loading={loading}
          />

          {error && (
            <StatusDialog
              open={true}
              onClose={() => setError(null)}
              status={error.status}
              title={error.title}
              message={error.message}
              confirmButtonText="Entendido"
            />
          )}
        </>
      ) : (
        <KeyfobPurchaseSummary
          cliente={cliente}
          producto={producto}
          error={error}
          success={success}
          onBuy={handleBuy}
          loading={loading}
        />
      )}
    </>
  );
}

export default Keyfob;
