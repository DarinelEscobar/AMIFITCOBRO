import axios from "axios";

const API_URL = "http://localhost/AmiFitCompleto/";

export const validarClave = clave =>
  axios.post(API_URL + 'keyfob/validar', { clave }, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  });

export const comprarKeyfob = payload =>
  axios.post(API_URL + 'keyfob/comprar', payload, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  });
