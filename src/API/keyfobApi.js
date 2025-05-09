import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL?.endsWith('/')
  ? process.env.REACT_APP_API_URL
  : process.env.REACT_APP_API_URL + '/';



  /**
 * Validar clave del usuario.
 * Este endpoint verifica que la clave ingresada corresponda a un cliente válido.
 * Retorna información del cliente y el producto asociado (Keyfob).
 */
export const validarClave = clave => {
  return axios.post(API_URL + 'KeyfobController/validar', { clave }, {
    headers: { "Content-Type": "application/json" }
  });
};

/**
 * Confirmar la compra del Keyfob.
 * Este endpoint descuenta el inventario, envía un correo y registra la compra.
 * Se ejecuta después de un pago exitoso.
 */
export const comprarKeyfob = payload =>
  axios.post(API_URL + 'KeyfobController/comprar', payload, {
    headers: { "Content-Type": "application/json" }
  });

/**
 * Iniciar un pago con Stripe.
 * Crea un PaymentLink y registra el intento de pago en la base de datos.
 * Retorna el enlace y IDs necesarios para generar el QR y seguimiento.
 */
export const startPayment = payload =>
  axios.post(API_URL + 'KeyfobController/startPayment', payload, {
    headers: { "Content-Type": "application/json" }
  });

/**
 * Verificar si el pago ya se completó.
 * Consulta en la tabla de pagos si ya existe Importe y Total asignado.
 * Se usa para validar desde el frontend si el usuario ya pagó.
 */
export const verifyPayment = pagoId =>
  axios.get(API_URL + `KeyfobController/verifyPayment/${pagoId}`);

/**
 * Cancelar un intento de pago.
 * Elimina el registro en base de datos y desactiva el enlace en Stripe.
 * Se usa si el usuario decide no pagar y cierra el flujo.
 */
export const cancelPayment = pagoId =>
  axios.delete(API_URL + `KeyfobController/cancelPayment/${pagoId}`);