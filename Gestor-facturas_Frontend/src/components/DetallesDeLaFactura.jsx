import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navegacion from './Navegacion';
import { Link } from 'react-router-dom';
import imagenes from './imagenes';
import { Modal } from "./Modal";


export default function DetallesDeLaFactura() {
    const navigate = useNavigate();
    const { numeroFactura } = useParams();
    const [nombrePersonal, setNombrePersonal] = useState([]);
    const [detallesFactura, setDetallesFactura] = useState(null);
    const [mostrarListaEstatus, setMostrarListaEstatus] = useState(false);
    const [mostratListaAuxiliares, setMostrarListaAuxiliares] = useState(false);
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [estatusSeleccionado, setEstatusSeleccionado] = useState('');
    const [auxiliarSeleccionado, setAuxiliarSeleccionado] = useState('');
    const [agregarComentario, setAgregarComentario] = useState('');
    const [agregarArchivos, setAgregarArchivos] = useState([]);
    const [archivoAdjuntoEliminado, setArchivoAdjuntoEliminado] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);


    const fetchData = async () => {
        try {
            const response = await fetch(`https://jolusuvi.pythonanywhere.com/api/documentos/?format=json`);
            const data = await response.json();
            const facturaEncontrada = data.find(factura => factura.NUMERO_FACTURA === numeroFactura);
            setDetallesFactura(facturaEncontrada);
            setFechaEntrega(!facturaEncontrada.FECHA_ENTREGA ? '' : facturaEncontrada.FECHA_ENTREGA);
            setEstatusSeleccionado(!facturaEncontrada.ESTATUS ? '' : facturaEncontrada.ESTATUS);
            // Establece el valor inicial del auxiliar seleccionado
            setAuxiliarSeleccionado(!facturaEncontrada.PERSONAL_ASIGNADO_NOMBRE ? '' : facturaEncontrada.PERSONAL_ASIGNADO_NOMBRE);
            setAgregarComentario(!facturaEncontrada.COMENTARIOS ? '' : facturaEncontrada.COMENTARIOS);

        } catch (error) {
            console.error('Error al obtener detalles de la factura:', error);
        }
    };
    useEffect(() => {
        fetchData();
        showData();
    }, []);


    // metodo fetch para solicitar la lista del personal
    const URL = "https://jolusuvi.pythonanywhere.com/personal/";
    const showData = async () => {
        try {
            const response = await fetch(URL);
            const data = await response.json();
            setNombrePersonal(data);
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        }
    };


    if (!detallesFactura) {
        return (
            <div id='contenido-recarga-factura'>
                <img src={imagenes['img-recargar-factura']} alt="icono de espera para recargar la factura" />
                <p>Cargando detalles de la factura...</p>
            </div>
        );
    }

    // funcion para poder actualizar el  estado fecha entrega
    const handleChangeFechaEntrega = (event) => {
        const fechaSeleccionada = event.target.value;

        setFechaEntrega(fechaSeleccionada)
    };


    // enviar los datos cambiados 
    const handleEnviar = async () => {
        const personalSeleccionado = nombrePersonal.find(personal => personal.NOMBRE === auxiliarSeleccionado);
        const personalAsignadoId = personalSeleccionado ? personalSeleccionado.ID : null;

        const formData = new FormData();
        formData.append('FECHA_ENTREGA', fechaEntrega);
        formData.append('ESTATUS', estatusSeleccionado);
        formData.append('PERSONAL_ASIGNADO', personalAsignadoId);
        formData.append('COMENTARIOS', agregarComentario);
        if (agregarArchivos.length > 0) {
            formData.append('DATOS_ADJUNTOS', agregarArchivos[0]);
        }

        const requestOptions = {
            method: 'PUT',
            body: formData,
        };

        try {
            const response = await fetch(`https://jolusuvi.pythonanywhere.com/documentodetail/${detallesFactura.ID}/`, requestOptions);
            const result = await response.json();
            console.log(result);
            navigate('/datos_enviados');
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);

        }
    };


    // function para mostrar listas de estatus
    const mostrarListaEstatusHandle = () => {
        setMostrarListaEstatus(!mostrarListaEstatus)
    }
    // funcion para  mostrar lista de auxiliares
    const handleMostrarListaAuxiliar = () => {
        setMostrarListaAuxiliares(!mostratListaAuxiliares)
    }
    // funcion para manejar la seleccion del estatus
    const handleSeleccionEstatus = (estatus) => {
        setEstatusSeleccionado(estatus);
        setMostrarListaEstatus(false)

    }
    // funcion para manejar la seleccion de auxiliares
    const handleSeleccionDeAuxiliares = (auxiliar) => {
        setAuxiliarSeleccionado(auxiliar)
        setMostrarListaAuxiliares(false)
    }

    const handleAdjuntosChange = (event) => {
        const files = event.target.files;
        setAgregarArchivos(files);
        setArchivoAdjuntoEliminado(false);
    };

    const eliminarArchivoAdjunto = async () => {
        try {
            const formData = new FormData();
            formData.append('DATOS_ADJUNTOS', '');

            const requestOptions = {
                method: 'PUT',
                body: formData,
            };

            const response = await fetch(`https://jolusuvi.pythonanywhere.com/documentodetail/${detallesFactura.ID}/`, requestOptions);
            const result = await response.json();
            console.log(result);

            // Actualizar la vista después de eliminar el adjunto y cambiar el estado
            
            fetchData();
            setArchivoAdjuntoEliminado(true);
            setTimeout(() => {
                abrirModal();
            }, 100);
        } catch (error) {
            console.error('Error al eliminar el archivo adjunto:', error);
        }
    };


    const abrirModal = () => {
        setMostrarModal(true);
        console.log('abrir modal')
    };

    const cerrarModal = () => {
        setMostrarModal(false);
        console.log('cerrar modal')
    };
    // cambiar color estado
    let estadoClase;
    if (detallesFactura.ESTADO === 'ACT') {
        estadoClase = 'detalle-factura-texto estado-activo';
    } else if (detallesFactura.ESTADO === 'ANU') {
        estadoClase = 'detalle-factura-texto estado-anulado'
    } else if (detallesFactura.ESTADO === 'NCA') {
        estadoClase = 'detalle-factura-texto estado-anulada-con-nc'
    }

    // cambiar color cancelado 
    let canceladoClase;
    if (detallesFactura.CANCELADO === 'N') {
        canceladoClase = 'detalle-factura-texto detalle-cancelado-no'
    } else if (detallesFactura.CANCELADO === 'S') {
        canceladoClase = 'detalle-factura-texto detalle-cancelado-si'
    }

    // Renderizar detalles de la factura
    return (
        <div>
            <Navegacion titulo={`Detalles de la Factura N° ${numeroFactura}`} />

            <div className='contenedor-total-factura'>
                <div className='datos-factura'>
                    <div className='detalle-datos-factura'>
                        <h2 className='titulo-detalle-factura'>Número Factura</h2>
                        <p className='detalle-factura-texto'>{detallesFactura.NUMERO_FACTURA}</p>
                    </div>
                    <div className='detalle-datos-factura'>
                        <h2 className='titulo-detalle-factura'>Fecha de Emision</h2>
                        <p className='detalle-factura-texto'>{detallesFactura.FECHA_EMISION}</p>
                    </div>
                    <div className='detalle-datos-factura'>
                        <h2 className='titulo-detalle-factura'>Nombre del Cliente</h2>
                        <p className='detalle-factura-texto'>{detallesFactura.NOMBRE_CLIENTE}</p>
                    </div>
                    <div className='detalle-datos-factura'>
                        <h2 className='titulo-detalle-factura'>Condicion Pago</h2>
                        <p className='detalle-factura-texto'>{detallesFactura.CONDICION_PAGO}</p>
                    </div>
                    <div className='detalle-datos-factura'>
                        <h2 className='titulo-detalle-factura'>Estado</h2>
                        <p className={estadoClase}>{detallesFactura.ESTADO}</p>
                    </div>
                    <div className='detalle-datos-factura'>
                        <h2 className='titulo-detalle-factura'>Cancelado</h2>
                        <p className={canceladoClase}>{detallesFactura.CANCELADO}</p>
                    </div>
                </div>
            </div>

            <div className='detalles-representante'>
                <h2 className='titulo-detalle-factura'>Representante</h2>
                <p>{detallesFactura.VENDEDOR}</p>
            </div>

            <div className='detalles-factura-modificables'>
                <div>
                    <h3 className='titulo-detalle-factura'>Fecha Entrega</h3>
                    <input
                        onChange={handleChangeFechaEntrega}
                        value={fechaEntrega}
                        type="date"
                        className='input-detalle-factura'
                    />
                </div>
                <div>
                    <h3 className='titulo-detalle-factura'>Estatus</h3>
                    <label>
                        <input
                            value={estatusSeleccionado}
                            onChange={(e) => setEstatusSeleccionado(e.target.value)}
                            type="text"
                            className='input-detalle-factura'
                            id='input-detalle-estatus'
                        />

                    </label>
                    <img
                        className='imagen-flecha-detalles-factura'
                        src={imagenes['img-flecha']}
                        alt="imagen flecha"
                        onClick={mostrarListaEstatusHandle}
                    />
                    <div className='lista-estatus-detalle-factura' style={mostrarListaEstatus ? { display: 'block' } : { display: 'none' }}>
                        <ul>
                            <li onClick={() => handleSeleccionEstatus('Emitido')}>Emitido</li>
                            <li onClick={() => handleSeleccionEstatus('Programado')}>Programado</li>
                            <li onClick={() => handleSeleccionEstatus('Ingresado')}>Ingresado</li>
                            <li onClick={() => handleSeleccionEstatus('Rechazado')}>Rechazado</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div className='titulo-boton-auxiliar-asignado'>
                        <h3 className='titulo-detalle-factura'>Auxiliar Asignado</h3>
                        <Link className='boton-personal-asignado' to={`/personal?nombre=${encodeURIComponent(auxiliarSeleccionado)}`}>Editar Auxiliar Asignado</Link>

                    </div>
                    <input
                        value={auxiliarSeleccionado}
                        onChange={(e) => setAuxiliarSeleccionado(e.target.value)}
                        type="text"
                        className='input-detalle-factura'
                        id='input-detalle-auxilir-asignado'
                    />
                    <img
                        className='imagen-flecha-detalles-factura'
                        src={imagenes['img-flecha']}
                        alt="imagen flecha"
                        onClick={handleMostrarListaAuxiliar}
                    />
                    <div className='lista-de-personal-detalles-factura' style={mostratListaAuxiliares ? { display: 'block' } : { display: 'none' }}>
                        <ul>
                            {nombrePersonal.map((personal, index) => (
                                <li key={index} onClick={() => handleSeleccionDeAuxiliares(`${personal.NOMBRE}`)}>{personal.NOMBRE}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='contenido-enviar-comentarios'>
                <div>
                    <h3 className='titulo-detalle-factura'>Comentarios</h3>
                    <input
                        value={agregarComentario}
                        onChange={(e) => setAgregarComentario(e.target.value)}
                        type="text"
                        className='input-comentario-datos-adjuntos'
                        id='input-detalle-comentario'
                    />
                </div>
                <div>
                    <h3 className='titulo-detalle-factura'>Datos Adjuntos</h3>
                    <form encType="multipart/form-data">
                        <input
                            type="file"
                            className='input-comentario-datos-adjuntos'
                            onChange={handleAdjuntosChange}
                            multiple
                        />
                    </form>
                    <div className='contenido-imagen-datos-adjuntos' style={(archivoAdjuntoEliminado || detallesFactura.DATOS_ADJUNTOS === null) ? { display: 'none' } : { display: '' }}>
                        <a href={detallesFactura.DATOS_ADJUNTOS}>{detallesFactura.DATOS_ADJUNTOS}</a>
                        <img
                            className='imagen-eliminar'
                            src={imagenes['img-eliminar']}
                            alt="icono eliminar"
                            onClick={eliminarArchivoAdjunto}
                        />
                    </div>

                </div>
            </div>
            <Modal visible={mostrarModal} onClose={cerrarModal} />
            <button className='boton-enviar' onClick={handleEnviar}>enviar</button>
        </div>
    );
}
