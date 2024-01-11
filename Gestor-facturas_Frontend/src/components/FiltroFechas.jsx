import React, { useState } from 'react';
import imagenes from './imagenes';

export default function FiltroFechas({ onChangeValue, onHide }) {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');

    // obtenemos el valor de la fecha de inicio
    const obteniendoFechaInicio = (inicio) => {
        const nuevaFechaInicio = inicio.target.value;
        console.log(nuevaFechaInicio, 'fecha inicio')
        setFechaInicio(nuevaFechaInicio);
        // Llamar a la función de filtrado cada vez que cambie la fecha de inicio
        onChangeValue({ Inicio: nuevaFechaInicio, Final: fechaFinal });
    };

    // obteniendo el valor de la fecha final
    const obteniendoFechaFinal = (final) => {
        const nuevaFechaFinal = final.target.value;
        console.log(nuevaFechaFinal, 'fecha final')
        setFechaFinal(nuevaFechaFinal);
        // Llamar a la función de filtrado cada vez que cambie la fecha final
        onChangeValue({ Inicio: fechaInicio, Final: nuevaFechaFinal });
    };

    // limpiar los inputs de las fechas 
    const limpiarInputFiltroFecha = () => {
        setFechaInicio('');
        setFechaFinal('');

        onChangeValue('');
    }

    return (
        <div className='contenido-filtro-fechas'>
            <div className='filtro-fechas'>
                <label htmlFor="fecha-inicio"> Fecha Inicio:
                    <input
                        value={fechaInicio}
                        onChange={obteniendoFechaInicio}
                        type="date"
                        id='fecha-inicio'
                    />
                </label>
            </div>
            <div className='filtro-fechas'>
                <label htmlFor="fecha-final"> Fecha Final:
                    <input
                        value={fechaFinal}
                        onChange={obteniendoFechaFinal}
                        type="date"
                        id='fecha-final'
                    />
                </label>
            </div>
            <div className='contenido-imagenes-fechas'>
                <img className='imagen-check' src={imagenes['img-chek']} alt="" onClick={onHide}/>
                <img className='imagen-recarga' onClick={limpiarInputFiltroFecha} src={imagenes['img-recarga']} alt="" />
                <img className='imagen-flecha-abajo' src={imagenes['img-flecha-abajo']} alt="" />
            </div>
        </div>
    );
}