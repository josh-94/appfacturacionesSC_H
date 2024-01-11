import React, { useState, forwardRef } from 'react';
import { useEffect } from 'react';

const InputNumeroFactura = forwardRef(({ onChangeValue, value }, ref) => {
    const [inputState, setInputState] = useState('');
    const buscando = (event) => {
        const textoInput = event.target.value;
        const textoInputToLowerCase = textoInput.toLowerCase();

        onChangeValue(textoInputToLowerCase);
    };

    useEffect(() => {
        const valorAUsar = value || ''; // Valor predeterminado si value es nulo o indefinido

        if (valorAUsar !== inputState) {
            setInputState(valorAUsar);
        }
    }, [value]);

    return (
        <div className='contenido-inputs'>
            <input
                ref={ref}
                type='text'
                className='input-busqueda-factura'
                placeholder='Buscar N° Factura'
                value={value}
                onChange={buscando}
                id='Input-numero-factura'
            />
        </div>
    );

})

export default InputNumeroFactura;