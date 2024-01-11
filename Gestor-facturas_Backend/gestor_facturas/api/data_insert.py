from .models import DocumentoVenta

def insert_initial_data():
    # Script de inserción de datos
    DocumentoVenta.objects.get_or_create(
        ID='113200',
        NUMERO_FACTURA='F003-21146',
        FECHA_EMISION='2023-12-01',
        MONEDA='Soles',
        MONTO=590.00,
        TIPO_CLIENTE='PRIVADO',
        NOMBRE_CLIENTE='LA POSITIVA SEGUROS Y REASEGUROS',
        CONDICION_PAGO='Credito a 90 dias',
        VENDEDOR='SEBASTIAN VIDALON RENTERIA',
        CANCELADO='N',
        ESTADO='ACT'
    )
    DocumentoVenta.objects.get_or_create(
        ID='113201',
        NUMERO_FACTURA='F003-21147',
        FECHA_EMISION='2023-12-01',
        MONEDA='Soles',
        MONTO=5000.00,
        TIPO_CLIENTE='PUBLICO',
        NOMBRE_CLIENTE='SEGURO SOCIAL DE SALUD - ESSALUD',
        CONDICION_PAGO='Credito a 90 dias',
        VENDEDOR='SEBASTIAN VIDALON RENTERIA',
        CANCELADO='S',
        ESTADO='ACT'
    )
    DocumentoVenta.objects.get_or_create(
        ID='113202',
        NUMERO_FACTURA='F003-21148',
        FECHA_EMISION='2023-12-01',
        MONEDA='Soles',
        MONTO=4000.00,
        TIPO_CLIENTE='PRIVADO',
        NOMBRE_CLIENTE='ADMINISTRADORA CLINICA RICADO PALMA S.A',
        CONDICION_PAGO='Credito a 90 dias',
        VENDEDOR='SEBASTIAN VIDALON RENTERIA',
        CANCELADO='N',
        ESTADO='ACT'
    )

    DocumentoVenta.objects.get_or_create(
        ID='113203',
        NUMERO_FACTURA='F003-21149',
        FECHA_EMISION='2023-12-01',
        MONEDA='Soles',
        MONTO=3000.00,
        TIPO_CLIENTE='PRIVADO',
        NOMBRE_CLIENTE='LA POSITIVA SEGUROS Y REASEGUROS',
        CONDICION_PAGO='Credito a 90 dias',
        VENDEDOR='SEBASTIAN VIDALON RENTERIA',
        CANCELADO='S',
        ESTADO='ANU'
    )
    DocumentoVenta.objects.get_or_create(
        ID='113204',
        NUMERO_FACTURA='F003-21150',
        FECHA_EMISION='2023-12-01',
        MONEDA='Soles',
        MONTO=2000.00,
        TIPO_CLIENTE='PRIVADO',
        NOMBRE_CLIENTE='LA POSITIVA SEGUROS Y REASEGUROS',
        CONDICION_PAGO='Credito a 90 dias',
        VENDEDOR='SEBASTIAN VIDALON RENTERIA',
        CANCELADO='N',
        ESTADO='NCA'
    )
    DocumentoVenta.objects.get_or_create(
        ID='113205',
        NUMERO_FACTURA='F003-21151',
        FECHA_EMISION='2023-12-03',
        MONEDA='Soles',
        MONTO=1200.00,
        TIPO_CLIENTE='PRIVADO',
        NOMBRE_CLIENTE='HOLBERTON PERU',
        CONDICION_PAGO='Contado',
        VENDEDOR='PEDRO PEREZ',
        CANCELADO='S',
        ESTADO='ACT'
    )
    DocumentoVenta.objects.get_or_create(
        ID='113206',
        NUMERO_FACTURA='F003-21152',
        FECHA_EMISION='2023-12-05',
        MONEDA='Dolares',
        MONTO=200.00,
        TIPO_CLIENTE='PUBLICO',
        NOMBRE_CLIENTE='MTC PERU',
        CONDICION_PAGO='Credito a 30 dias',
        VENDEDOR='JUAN PEREZ',
        CANCELADO='N',
        ESTADO='ANU'
    )
    DocumentoVenta.objects.get_or_create(
        ID='113207',
        NUMERO_FACTURA='F003-21153',
        FECHA_EMISION='2023-12-03',
        MONEDA='Soles',
        MONTO=10.00,
        TIPO_CLIENTE='PRIVADO',
        NOMBRE_CLIENTE='LA POSITIVA PERU',
        CONDICION_PAGO='Credito a 90 dias',
        VENDEDOR='PEDRO PEREZ',
        CANCELADO='N',
        ESTADO='ACT'
    )
    DocumentoVenta.objects.get_or_create(
        ID='113208',
        NUMERO_FACTURA='F003-21154',
        FECHA_EMISION='2023-12-05',
        MONEDA='Dolares',
        MONTO=2500.00,
        TIPO_CLIENTE='PUBLICO',
        NOMBRE_CLIENTE='MINSA PERU',
        CONDICION_PAGO='Credito a 45 dias',
        VENDEDOR='JUAN PEREZ',
        CANCELADO='N',
        ESTADO='ACT'
    )
    DocumentoVenta.objects.get_or_create(
        ID='113209',
        NUMERO_FACTURA='F003-21155',
        FECHA_EMISION='2023-12-13',
        MONEDA='Soles',
        MONTO=1900.00,
        TIPO_CLIENTE='PRIVADO',
        NOMBRE_CLIENTE='LA POSITIVA PERU',
        CONDICION_PAGO='Credito a 90 dias',
        VENDEDOR='PEDRO PEREZ',
        CANCELADO='S',
        ESTADO='NCA'
    )
