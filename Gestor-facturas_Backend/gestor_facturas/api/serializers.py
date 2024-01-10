from rest_framework import serializers
from .models import DocumentoVenta, Personal
from django.urls import reverse

class DocumentoVentaListSerializer(serializers.ModelSerializer):
    detalle_url = serializers.HyperlinkedIdentityField(view_name='documentodetail', format='html', lookup_field='pk')

    class Meta:
        model = DocumentoVenta
        fields = ['NUMERO_FACTURA', 'FECHA_EMISION', 'ESTATUS', 'PERSONAL_ASIGNADO', 'NOMBRE_CLIENTE', 'FECHA_ENTREGA', 'CONDICION_PAGO', 'CANCELADO', 'ESTADO', 'COMENTARIOS', 'DATOS_ADJUNTOS', 'detalle_url']

    def get_detalle_url(self, obj):
        url_name = 'documentodetail'
        kwargs = {'NUMERO_FACTURA': obj.NUMERO_FACTURA}
        return self.context['request'].build_absolute_uri(reverse(url_name, kwargs=kwargs))

class DocumentoVentaSerializer(serializers.ModelSerializer):
    PERSONAL_ASIGNADO_NOMBRE = serializers.CharField(source='PERSONAL_ASIGNADO.NOMBRE', read_only=True)
    detalle_url = serializers.HyperlinkedIdentityField(view_name='documentodetail', format='html', lookup_field='pk')

    class Meta:
        model = DocumentoVenta
        fields = ['ID', 'NUMERO_FACTURA', 'FECHA_EMISION', 'MONEDA', 'MONTO', 'TIPO_CLIENTE', 'NOMBRE_CLIENTE', 'CONDICION_PAGO', 'VENDEDOR', 'CANCELADO', 'ESTADO', 'ESTATUS', 'PERSONAL_ASIGNADO', 'PERSONAL_ASIGNADO_NOMBRE', 'FECHA_ENTREGA', 'COMENTARIOS', 'DATOS_ADJUNTOS', 'detalle_url']

    def get_detalle_url(self, obj):
        url_name = 'documentodetail'
        kwargs = {'NUMERO_FACTURA': obj.NUMERO_FACTURA}
        return self.context['request'].build_absolute_uri(reverse(url_name, kwargs=kwargs))

class PersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personal
        fields = '__all__'