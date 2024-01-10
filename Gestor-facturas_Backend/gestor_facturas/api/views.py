from rest_framework import viewsets, generics
from rest_framework.response import Response
from .models import DocumentoVenta, Personal
from .serializers import DocumentoVentaSerializer, PersonalSerializer

# Vista de toda la tabla DocumentoVenta
class DocumentoVentaViewSet(viewsets.ModelViewSet):
    queryset = DocumentoVenta.objects.all()
    serializer_class = DocumentoVentaSerializer
    http_method_names = ['get', 'post', 'head', 'put', 'patch']

# Vista de toda la tabla Personal
class PersonalList(generics.ListCreateAPIView):
    queryset = Personal.objects.all()
    serializer_class = PersonalSerializer
    http_method_names = ['get', 'post', 'head', 'put', 'patch']

# Vista de una fila de la tabla Personal
class PersonalDetail(generics.RetrieveUpdateDestroyAPIView):
    # Método GET para obtener la información
    queryset = Personal.objects.all()
    serializer_class = PersonalSerializer
    http_method_names = ['get', 'post', 'head', 'put', 'patch', 'delete']

    # Método PUT/PATCH para actualizar nombre
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    # Método POST para crear nueva fila
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=201, headers=headers)

    # Método DELETE para eliminar una fila
    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=204)

# Vista de una fila de la tabla DocumentoVenta
class DocumentoVentaDetailView(generics.RetrieveUpdateAPIView):
    queryset = DocumentoVenta.objects.all()
    serializer_class = DocumentoVentaSerializer
    http_method_names = ['get', 'put', 'patch', 'post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=201, headers=headers)
