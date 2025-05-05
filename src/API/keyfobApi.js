import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL?.endsWith('/')
  ? process.env.REACT_APP_API_URL
  : process.env.REACT_APP_API_URL + '/';


export const validarClave = clave => {
  console.log('API_URL:', API_URL);
  return axios.post(API_URL + 'KeyfobController/validar', { clave }, {
    headers: { "Content-Type": "application/json" }
  });
};

export const comprarKeyfob = payload =>
  axios.post(API_URL + 'KeyfobController/comprar', payload, {
    headers: { "Content-Type": "application/json" }
  });
