import axios from "axios";

// const API_URL = "http://localhost/amifit/";
// const API_URL = "http://localhost/amifit/";
const API_URL = "http://localhost/AmiFitCompleto/";
// const API_URL = "https://amifit.mx/";


export const createPaymentLink = async (id, monto, descripcion) => {
    try {
        const response = await axios.post(
            `${API_URL}Stripe/createPaymentLink`,
            { id: id, monto: monto, descripcion: descripcion, },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
// OBTENER LOS DATOS DEL CLIENTE POR ID Y GYMID
export const infoCliente = async (gymId, clave) => {
    try {
        const response = await axios.post(
            `${API_URL}Cliente/infoCliente`,
            { clave: clave, gymId: gymId },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
// AGREGA UNA NUEVA TAREA
export const postRegistro = async (task) => {
    try {
        const response = await axios.post(API_URL + 'Cliente/agregarClientePase7Dias', task, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        console.error('Error al agregar la tarea:', error);
        throw error;
    }
};

/* INGRESA LA INSCRIPCION POR ID Y GYMID */
export const agregarClienteAmifitCobro = async (data) => {
    try {
        const response = await axios.post(
            `${API_URL}Cliente/agregarClienteAmifitCobro`, data,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
