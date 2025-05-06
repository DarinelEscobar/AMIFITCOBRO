import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarClaveMensualidad, pagarMensualidad } from "../../API/mensualidadApi";
import MensualidadAuthInput from "./MensualidadAuthInput";
import MensualidadPaymentSummary from "./MensualidadPaymentSummary";

const MONTO_FIJO = 799;

function PagarMensualidad() {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleClaveSubmit = async () => {
    try {
      const { data } = await validarClaveMensualidad(clave);
      setCliente(data.cliente);
      setError("");
    } catch (e) {
      setError("Clave incorrecta");
    }
  };

  const handlePay = async () => {
    try {
      await pagarMensualidad({
        clienteId: cliente.Id,
        nombre: cliente.Nombre,
        correo: cliente.Correo,
        precio: MONTO_FIJO
      });
      setSuccess(true);
      setTimeout(() => navigate("/"), 2500);
    } catch {
      setError("Fallo en el pago");
    }
  };

  return cliente ? (
    <MensualidadPaymentSummary cliente={cliente} monto={MONTO_FIJO} error={error} success={success} onPay={handlePay} />
  ) : (
    <MensualidadAuthInput clave={clave} setClave={setClave} error={error} onCancel={() => navigate("/")} onSubmit={handleClaveSubmit} />
  );
}

export default PagarMensualidad;
