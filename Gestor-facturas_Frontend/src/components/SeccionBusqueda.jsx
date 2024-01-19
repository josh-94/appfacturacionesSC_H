import React, { useState, useEffect, useRef } from 'react'
import '../App.css';
import Refresh from '../assets/refresh.svg'
import Calendario from '../assets/calendar-outline.svg'
import EstatusFiltro from './EstatusFiltro'
import CanceladoFiltro from './CanceladoFiltro'
import FiltroFechas from './FiltroFechas'
import InputNumeroFactura from './InputNumeroFactura';
import { useNavigate } from 'react-router-dom';
import Navegacion from './Navegacion';
import imagenes from './imagenes';

export default function SeccionBusqueda() {
    const [mostrarFiltroFechas, setMostrarFiltroFechas] = useState(true);  //state para mostrar el filtro por fechas
    const handeclick = () => {
        setMostrarFiltroFechas(!mostrarFiltroFechas);
    }

    // state para buscar el numero de factura
    const [numeroFactura, setNumeroFactura] = useState([]);
    const [buscarFactura, setBuscarFactura] = useState("");
    const [buscarEstatus, setBuscarEstatus] = useState("");
    const [buscarCancelado, setBuscarCancelado] = useState("");
    const [buscarPorFechas, setBuscarPorFechas] = useState("");
    const [filtroNumeroFactura, setFiltroNumeroFactura] = useState([]);


    // obetenemos los datos de la api mediante useEffect
    const URL = 'https://jolusuvi.pythonanywhere.com/api/documentos/';
    // funcion para obtener los datos de la API
    const showData = async () => {
        try {
            const response = await fetch(URL);
            const data = await response.json();
            setNumeroFactura(data);
            setFiltroNumeroFactura(data);
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        }
    };

    useEffect(() => {
        showData();
    }, []);

    // manejo de cambios en las entradas de busqueda 
    const manejarCambiarEntrada = (text, tipo) => {
        if (tipo === 'numeroFactura') {
            setBuscarFactura(text);
        } else if (tipo === 'estado') {
            setBuscarEstatus(text);
        } else if (tipo === 'buscarCancelado') {
            setBuscarCancelado(text);
        } else if (tipo === 'fechas') {
            setBuscarPorFechas(text);
        }
    }

    // limpiar los inputs de los tres
    // inputs que son por nuemero de factura, estatus , cancelado
    // Inicializa la referencia usando useRef
    const estatusFiltroRef = useRef();
    const numeroFacturaFiltroRef = useRef();
    const canceladoFiltroRef = useRef();

    const limpiarInputsFEC = () => {
        setBuscarFactura('');
        setBuscarCancelado('');
        setBuscarEstatus('');

        if (estatusFiltroRef.current) {
            estatusFiltroRef.current.limpiarInput();
        } else if (numeroFacturaFiltroRef.current) {
            numeroFacturaFiltroRef.current.limpiarInput();
        } else if (canceladoFiltroRef.current) {
            canceladoFiltroRef.current.limpiarInput.limpiarInputCancelado();
        }

    }

    const navigate = useNavigate();

    const handleVerDetalles = (numeroFactura) => {
        // Navega a la ruta "/detalles/:numeroFactura"
        navigate(`/detalles/${numeroFactura}`);
    };

    const handleActualizarButtonClick = async () => {
        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error('Error al realizar la solicitud');
            }
            const data = await response.json();
            setNumeroFactura(data);
            setFiltroNumeroFactura(data);
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    }
    return (
        <div>
            <Navegacion
                titulo="Facturación App Distribuciones"
                regreso="Regreso"
            />

            <div className='contenido-total-seccion-busqueda'>
                <div className='Contenido-seccion-busqueda'>
                    <InputNumeroFactura
                        value={buscarFactura}
                        onChangeValue={(text) => manejarCambiarEntrada(text, 'numeroFactura')}
                        ref={numeroFacturaFiltroRef}
                    />
                    <EstatusFiltro
                        value={buscarEstatus}
                        onChangeValue={(text) => {
                            manejarCambiarEntrada(text, 'estado');
                            setBuscarEstatus(text); // Actualizar buscarEstatus
                        }}
                        ref={estatusFiltroRef}  // Ref para acceder al componente hijo desde el padre
                    />
                    <CanceladoFiltro
                        value={buscarCancelado}
                        onChangeValue={(text) => manejarCambiarEntrada(text, 'buscarCancelado')}
                        ref={canceladoFiltroRef}
                    />
                    <img className='imagen-recarga' onClick={limpiarInputsFEC} src={Refresh} alt="" />
                    <button className='contenido-seccion-boton' onClick={handleActualizarButtonClick}>Actualizar Facturas</button>
                    <button className='contenido-seccion-boton'>Distribuciones</button>
                    <img className='imagen-logo' onClick={handeclick} src={Calendario} alt="" />
                </div>
                <div className='total-filtro-fechas' style={mostrarFiltroFechas ? {} : { display: 'flex' }}>
                <FiltroFechas onChangeValue={(text) => manejarCambiarEntrada(text, 'fechas')} onHide={handeclick} />
                </div>
                <table className='contenido-tabla'>

                    <thead className='tabla-seccion-header'>
                        <tr>
                            <th className='columna-numero-factura'><img className='imagen-actualizar' src={imagenes['img-flecha-actilizar']} alt="" /> N° Factura</th>
                            <th>Fecha Emision</th>
                            <th>Estatus</th>
                            <th>Personal Asignado</th>
                            <th>Cliente</th>
                            <th>Fecha Entrega</th>
                            <th>Cancelado</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* // filtrado y mapeo de las facturas  */}
                        {numeroFactura
                            .filter((factura) => {
                                // filtro por fechas.
                                const fechaInicio = buscarPorFechas.Inicio ? new Date(buscarPorFechas.Inicio) : null;
                                const fechaFinal = buscarPorFechas.Final ? new Date(buscarPorFechas.Final) : null;
                                const fechaFactura = new Date(factura.FECHA_EMISION);

                                const contieneFechas = (!fechaInicio || fechaFactura >= fechaInicio) && (!fechaFinal || fechaFactura <= fechaFinal);

                                const contieneNumeroFactura = buscarFactura ? factura.NUMERO_FACTURA.toLowerCase().includes(buscarFactura) : true;
                                const contieneEstatus = buscarEstatus.length === 0 || buscarEstatus.includes(factura.ESTATUS.toLowerCase());
                                const contieneCancelado = buscarCancelado ? factura.CANCELADO.toLowerCase().includes(buscarCancelado) : true;

                                return contieneFechas && contieneNumeroFactura && contieneEstatus && contieneCancelado;
                            })
                            // Se realiza un mapeo de cada factura para su presentación en la tabla
                            .map((factura) => {
                                // cambiar color y texto de si esta cancelado o no
                                let estadoTexto;
                                let estadoClase;

                                if (factura.ESTADO === 'ACT') {
                                    //cambiar texto segun el valor que nos pase la base de datos
                                    estadoTexto = 'ACTIVA';
                                    // cambiar el background segun el valor que nos pase la base de datos
                                    estadoClase = 'activa ultima-columna'
                                } else if (factura.ESTADO === 'ANU') {
                                    estadoTexto = 'ANULADA';
                                    estadoClase = 'anulada ultima-columna'
                                } else if (factura.ESTADO === 'NCA') {
                                    estadoTexto = 'ANULADA CON NC';
                                    estadoClase = 'anulada-con-nc ultima-columna'
                                }

                                // cambiar nombre de la clase segun si la factura esta cancelada o no
                                let canceladoClase;
                                if (factura.CANCELADO === 'S') {
                                    canceladoClase = 'cancelado-si'
                                } else if (factura.CANCELADO === 'N') {
                                    canceladoClase = 'cancelado-no'
                                }

                                // cambiar el nombre de la clase segun el estatus de la clase 
                                let estatusClase;
                                if (factura.ESTATUS === 'Emitido') {
                                    estatusClase = 'estatus-emitido'
                                } else if (factura.ESTATUS === 'Programado') {
                                    estatusClase = 'estatus-programado'
                                } else if (factura.ESTATUS === 'Ingresado') {
                                    estatusClase = 'estatus-ingresado'
                                } else if (factura.ESTATUS === 'Rechazado') {
                                    estatusClase = 'estatus-rechazado'
                                }

                                return (
                                    <tr key={factura.NUMERO_FACTURA} className='fila-tabla' onClick={() => handleVerDetalles(factura.NUMERO_FACTURA)}>
                                        <td className='primera-columna'>{factura.NUMERO_FACTURA}</td>
                                        <td>{factura.FECHA_EMISION}</td>
                                        <td className={estatusClase}>{factura.ESTATUS}</td>
                                        <td>{factura.PERSONAL_ASIGNADO_NOMBRE}</td>
                                        <td>{factura.NOMBRE_CLIENTE}</td>
                                        <td >{factura.FECHA_ENTREGA}</td>
                                        <td className={canceladoClase}>{factura.CANCELADO === 'S' ? 'SI' : 'NO'}</td>
                                        <td className={estadoClase}>{estadoTexto}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
