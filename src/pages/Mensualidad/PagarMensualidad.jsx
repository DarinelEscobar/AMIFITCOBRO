import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarClaveMensualidad, pagarMensualidad } from "../../API/mensualidadApi";
import MensualidadAuthInput from "./MensualidadAuthInput";
import MensualidadPaymentSummary from "./MensualidadPaymentSummary";
import StatusDialog from "../../components/common/StatusDialog";

const MONTO_FIJO = 799;

function PagarMensualidad() {
  const navigate = useNavigate();

  const [cliente, setCliente] = useState(null);
  const [clave, setClave]     = useState("");
  const [error, setError]     = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClaveSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await validarClaveMensualidad(clave);

      if (data.ok === false) {
        setError({
          status : "error",
          title  : "Clave no válida",
          message: data.error || "La clave ingresada no existe."
        });
        setLoading(false);
        return;
      }

      if (!data.cliente) {
        setError({
          status : "error",
          title  : "Respuesta inválida",
          message: "Servidor sin datos de socio."
        });
        setLoading(false);
        return;
      }

      setCliente(data.cliente);
      setError(null);
    } catch {
      setError({
        status : "error",
        title  : "Error de red",
        message: "No se pudo conectar con el servidor."
      });
    }
    setLoading(false);
  };

  const handlePay = async () => {
    setLoading(true);
    try {
      const { data } = await pagarMensualidad({
        clienteId: cliente.Id,
        nombre   : cliente.Nombre,
        correo   : cliente.Correo,
        precio   : MONTO_FIJO
      });

      if (data.ok === false) {
        setError({
          status : "error",
          title  : "Error en el pago",
          message: data.error || "No se pudo completar el pago."
        });
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError({
        status : "error",
        title  : "Error de red",
        message: "No se pudo conectar con el servidor."
      });
    }
    setLoading(false);
  };

  return (
    <>
      {cliente ? (
        <MensualidadPaymentSummary
          cliente={cliente}
          monto={MONTO_FIJO}
          error={error}
          success={success}
          onPay={handlePay}
          loading={loading}
        />
      ) : (
        <>
          <MensualidadAuthInput
            clave={clave}
            setClave={setClave}
            error={error?.message}
            onCancel={() => navigate("/")}
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
      )}
    </>
  );
}

export default PagarMensualidad;
