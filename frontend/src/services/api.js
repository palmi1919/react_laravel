export const obtenerSaludo = async () => {
    const respuesta = await fetch("http://127.0.0.1:8000/api/saludo");
    const data = await respuesta.json();

    return data;
}