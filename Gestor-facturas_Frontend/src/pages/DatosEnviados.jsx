import React from 'react'
import imagenes from '../components/imagenes'
import { useNavigate } from 'react-router-dom';


export default function DatosEnviados() {
    const navigate = useNavigate();

  const handleRegresar = () => {
    // Navegar de vuelta a la página principal
    navigate('/');
  };


  return (
    <div className='contenido-total-datos-enviados'>
      <img className='imagen-regresa-datos-enviados' onClick={handleRegresar} src={imagenes['img-regresar-pagina']} alt="icono regreso" />
      <div className='contenido-datos-enviados'>
        <img className='imagen-check-datos-eviados' src={imagenes['img-enviado-check']} alt="" />
        <p>Los datos modificados se enviaron Correctamente</p>
      </div>
    </div>
  )
}
