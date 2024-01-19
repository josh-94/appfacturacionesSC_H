import React from "react";

export function Modal({ visible, onClose }) {
    return (
        <div id='modal-wrapper' style={{ display: visible ? '' : 'none' }}>
            <div className='modal-container'>
                <div className='boton-cerrar' onClick={onClose}>x</div>
                <p>
                    La imagen fue <strong className="mensaje-eliminado">Eliminada</strong> correctamente
                </p>
            </div>
        </div>
    );
}

