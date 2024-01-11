import React from 'react'
import Bienvenido from './Bienvenido'
import imagenes from './imagenes';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Navegacion(props) {
    const navigate = useNavigate();  // Cambia useHistory por useNavigate

    const handleRegresarClick = () => {
        navigate(-1); // Retrocede una página en la historia
    };
    return (
        <div>
            <header className='contenido-header'>
                <img
                className="icono-regreso"
                src={imagenes['img-regreso']}
                alt="Icono de regreso"
                onClick={handleRegresarClick}
                />
                <h1 className='contenido-texto'> {props.titulo}</h1>
                <Bienvenido />
                <img className='icono-persona-sin-foto' src={imagenes['img-persona']} alt="imagen de persona sin foto" />
                <img className='logo-empresa' src={imagenes['img-logo-empresa']} alt="logo de la empressa SURGICORP" />
            </header>

        </div>
    )
}
