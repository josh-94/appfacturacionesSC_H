import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Select from 'react-select';

const opcionesEstatus = [
  { value: 'emitido', label: 'Emitido' },
  { value: 'programado', label: 'Programado' },
  { value: 'ingresado', label: 'Ingresado' },
  { value: 'rechazado', label: 'Rechazado' },
];

const EstatusFiltro = forwardRef(({ onChangeValue, value }, ref) => {
  const [estadoSeleccionado, setEstadoSeleccionado] = useState([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      setEstadoSeleccionado(value.map(val => ({ value: val, label: val })));
      onChangeValue(value);
    }
  }, [value]);

  const handleChange = (selectedOptions) => {
    setEstadoSeleccionado(selectedOptions);
    onChangeValue(selectedOptions.map(option => option.value));
  };

  const limpiarInput = () => {
    setEstadoSeleccionado([]);
  };

  // Permite que la función limpiarInput sea accesible desde el componente padre
  useImperativeHandle(ref, () => ({
    limpiarInput: limpiarInput,
  }));

  return (
    <div className='contenido-inputs' ref={ref}>
      <label>
        Estatus N° 1
        <div className='input-container'>
          <Select
            isMulti
            value={estadoSeleccionado}
            onChange={handleChange}
            options={opcionesEstatus}
            placeholder='Elegir Estado(s)'
            id='mi-select-estatus'
          />
        </div>
      </label>
    </div>
  );
});

export default EstatusFiltro;
