import axios from "axios";

const API_URL = "http://localhost/AmiFitCompleto/";

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

// VERIFICA LA SESSION
export const verificarSesionApi = async (task) => {
    try {
        const response = await axios.post(API_URL + 'Cliente/agregarClientePase7Dias', task, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error al agregar la tarea:', error);
        throw error;
    }
};

// OBTENER LAS CLASES
export const obtenerClases = async (id) => {
    try {
        const response = await axios.post(
            `${API_URL}Clase/obtenerClasesFecha`,
            { gymId: id },
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



// // ACTUALIZA LA TAREA
// export const putTask = async (id, task) => {
//     const response = await axios.put(API_URL + 'Home/putTask/' + id, task, {
//         headers: { "Content-Type": "application/json" },
//     });
//     return response.data;
// };

