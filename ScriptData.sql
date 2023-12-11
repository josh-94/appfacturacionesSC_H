/*Recomiendo utilizar sqlite3 si utilizan wsl, aqui mas informacion https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-microsoft-sql-server*/

CREATE TABLE IF NOT EXISTS DOCVEN_PWRAPP(

	    /*De aqui se jala la data que nos brinda el area de sistema de la empresa (GET REQUEST)*/
    ID int NOT NULL PRIMARY KEY,
    NUMERO_FACTURA VARCHAR(20),
    FECHA_EMISION DATE,
    MONEDA VARCHAR(60),
    MONTO NUMERIC(18,2),
    TIPO_CLIENTE VARCHAR(60),
    NOMBRE_CLIENTE VARCHAR(150),
    CONDICION_PAGO VARCHAR(60),
    VENDEDOR VARCHAR(60),
    CANCELADO VARCHAR(1),
    ESTADO VARCHAR(3),
    
    /*Esta data va a ser manipulada por el aplicativo (GET, POST)*/
    ESTATUS VARCHAR(20), /* Estatus por default "Emitido" */
    PERSONAL_ASIGNADO VARCHAR(80),
    FECHA_ENTREGA DATE,
    COMENTARIOS VARCHAR(400),
    DATOS_ADJUNTOS VARBINARY(MAX) /* Aqui el limite para SQLite es 8000, en el link hay mas detalles https://github.com/dotnet/efcore/issues/7030*/
);

INSERT or IGNORE INTO DOCVEN_PWRAPP (ID, NUMERO_FACTURA, FECHA_EMISION, MONEDA,MONTO, TIPO_CLIENTE, NOMBRE_CLIENTE,CONDICION_PAGO,VENDEDOR,CANCELADO,ESTADO) 

VALUES
('113200', 'F003-21150','2023-12-01', 'Soles', 590.00,'PRIVADO','LA POSITIVA SEGUROS Y REASEGUROS', 'Credito a 90 dias', 'SEBASTIAN VIDALON RENTERIA', 'N', 'ACT'),

('113201', 'F003-21150','2023-12-01', 'Soles', 5000.00,'PUBLICO','SEGURO SOCIAL DE SALUD - ESSALUD', 'Credito a 90 dias', 'SEBASTIAN VIDALON RENTERIA', 'S', 'ACT'),

('113202', 'F003-21150','2023-12-01', 'Soles', 4000.00,'PRIVADO','ADMINISTRADORA CLINICA RICADO PALMA S.A', 'Credito a 90 dias', 'SEBASTIAN VIDALON RENTERIA', 'N', 'ACT'),

('113203', 'F003-21150','2023-12-01', 'Soles', 3000.00,'PRIVADO','LA POSITIVA SEGUROS Y REASEGUROS', 'Credito a 90 dias', 'SEBASTIAN VIDALON RENTERIA', 'S', 'ANU'),

('113204', 'F003-21150','2023-12-01', 'Soles', 2000.00,'PRIVADO','LA POSITIVA SEGUROS Y REASEGUROS', 'Credito a 90 dias', 'SEBASTIAN VIDALON RENTERIA', 'N', 'NCA');

SELECT * FROM DOCVEN_PWRAPP
