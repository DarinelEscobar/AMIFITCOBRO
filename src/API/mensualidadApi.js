import axios from "axios";

// const API_URL = "http://localhost/amifit/";
const API_URL = "http://localhost/AmiFitCompleto/";

export const validarClaveMensualidad = clave =>
  axios.post(`${API_URL}MensualidadController/validar`, { clave }, {
    headers: { "Content-Type": "application/json" }
  });

export const pagarMensualidad = payload => {
  console.log("Payload enviado:", payload);
  return axios.post(`${API_URL}MensualidadController/comprar`, payload, {
    headers: { "Content-Type": "application/json" }
  });
}
