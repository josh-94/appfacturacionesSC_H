# Gestor de Facturas ![Texto alternativo](/assets/logo-empresa.svg)

![Texto alternativo](/assets/gestor-facturas.jpg)


## Contenido
1. [Información](#informacion)
2. [Instalaciones](#instalaciones)
3. [Uso](#uso)
4. [Contribuciones](#contribuciones)

## Información
En este proyecto decidimos elaborar un sistema de software para la empresa SURGICORP para poder tener un mejor manejo de las facturas, en la sección de Back-end creamos las APIS que nos hacen la conexión con la base de datos para poder visualizar y editar los datos de las facturas y en la parte Front-end se ase la petición a las APIS para que se muestra en una tabla las facturas que tenemos en la base de datos,  en la primera página web  se muestra la tabla de las facturas y tiene 4 filtros para poder hacer la búsqueda según el número de factura, el estatus de la factura, si esta cancelada o no , y por el rango de fechas. Al momento de seleccionar una factura se muestra una segunda hoja donde nos muestra la información de la factura más detallada en la cual hay 5 campos que se pueden editar. para poder editar los auxiliares asignados para una factura tenemos una tercera página donde podemos manejar esa lista de auxiliares agregado y eliminando según lo requiera también esa lista se muestra en el input para poder seleccionar cual es el auxiliar asignado para dicha factura.
Para tener más información del proyecto puede ingresar a nuestro siguiente Blog:

  [Blog Gestor de Facturas](http://gestorfacturas.worldwideinternationalacademy.org/proyecto-educativo/).

## Instalaciones

Para poder ejecutar el proyecto debemos tener instalado:

### Sección de Back-end
* Debemos tener instalados las siguientes versiones de Python y Django:

1. [Instalación del lenguaje Python](https://www.python.org/downloads/).
```
Python v3.10.5
```
2. [Instalación del Framework Django](https://www.djangoproject.com/download/).
```
Django v4.0.6
```

### Sección de Front-end
* Debemos tener instalado el framework de React la siguiente versión.

1. [Instalación de React](https://www.youtube.com/watch?v=wMDBbIo0zEo)
```
React v18.2.0
```
2. Debemos tener instalado la siguiente versión de node.js
```
Node v18.16.0
```

### Sección Base de datos

* Instalar la siguiente versión de SQLite.
1. [Instalación de SQLite3](https://www.youtube.com/watch?v=X2r4Sky01lw&t=309s)
```
SQLite v3.31.1
```

## Uso
debes clonar el proyecto en tu computadora usando el HTTPS:
```
https://github.com/josh-94/appfacturacionesSC_H.git
```

### Sección Back-end
Para iniciar el servidor sigue los siguientes pasos:
- Ingresar a la carpeta del Back-end:
```
cd Gestor-facturas_Backend/gestor_facturas/
```
- Una vez dentro de la carpeta de Back-end usa el siguiente comando para inicializar el servidor.
```
python manage.py runserver
```
### Sección Front-end
Una vez clonado el proyecto y quieres ver la parte del front-end del proyecto debes de dirigirte a esa carpeta. usando el siguiente comando:
```
cd Gestor-facturas_Frontend
```

Una vez dentro de la carpeta usa el siguiente comando para poder instalar todas las dependencias del proyecto:
```
npm install
```
Luego de haber instalado todas las dependencias te aparecerá el paquete node_modules el cual servirá para poder ejecutar los comandos para poder usar React. Unos de los comandos que debemos usar para comenzar a ver nuestro proyecto en pantalla es:
```
npm start
```
Ejecutando este comando podrás ver toda la parte front-end del proyecto.

### Sección Base de Datos

para poder crear la base de datos debemos ejecutar el siguiente script para que se pueda crear la tabla de las facturas.
```
sqlite3 archivo.db < ScriptData.sql
```
## Contribuciones

- [Jose Suárez](https://www.linkedin.com/in/jose-suarez-vigo/)
- [Yerti Mosqueira](https://www.linkedin.com/in/yerti22/)