import React, { useState, useEffect } from 'react';
import Navegacion from './Navegacion';

export default function ListaDePersonal() {
    const [nombrePersonal, setNombrePersonal] = useState([]);
    const [nuevoAuxiliar, setNuevoAuxiliar] = useState('');

    const URL = "https://jolusuvi.pythonanywhere.com/personal/";

    const fetchData = async () => {
        try {
            const response = await fetch(URL);
            const data = await response.json();
            setNombrePersonal(data);
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleEliminar = async (id) => {
        try {
            const response = await fetch(`${URL}${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Actualizar la lista después de eliminar el elemento
                fetchData();
            } else {
                console.error(`Error al eliminar el elemento con ID ${id}`);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud DELETE:', error);
        }
    };

    const handleAgregar = async () => {
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    NOMBRE: nuevoAuxiliar,
                    // Agrega otras propiedades según sea necesario
                }),
            });

            if (response.ok) {
                // Actualizar la lista después de agregar el nuevo elemento
                fetchData();
                // Limpiar el campo después de agregar
                setNuevoAuxiliar('');
            } else {
                console.error('Error al agregar nuevo auxiliar');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud POST:', error);
        }
    };

    return (
        <div>
            <Navegacion titulo="Lista de Auxiliares" />
            <div className='contenido-total-lista-personal'>
                <div className='contenido-agregar-personal'>
                    <div className='contenido-input'>
                        <label htmlFor="NuevoAuxiliar">Agregar nuevo Auxiliar
                            <input
                                type="text"
                                id='NuevoAuxiliar'
                                placeholder='Escribe Nombre Completo'
                                value={nuevoAuxiliar}
                                onChange={(e) => setNuevoAuxiliar(e.target.value)}
                            />
                        </label>
                    </div>
                    <button onClick={handleAgregar}>Agregar</button>
                </div>
                <div className='contenido-tabla-lista-de-personal'>
                    <table className='tabla-lista-de-personal'>
                        <thead className='lista-personal-titulo'>
                            <tr>
                                <th className='columna-nombre'>Nombre</th>
                                <th className='columna-cancelado'>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nombrePersonal.map((personal) => (
                                <tr key={personal.ID} className='contenido-tabla-lista-personal'>
                                    <td className='fila-nombre-lista-personal'>{personal.NOMBRE}</td>
                                    <td className='fila-cancelado-lista-personal' onClick={() => handleEliminar(personal.ID)}>
                                        SI
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
