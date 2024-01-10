from django.urls import include, path
from rest_framework import routers
from .views import DocumentoVentaDetailView, DocumentoVentaViewSet, PersonalList, PersonalDetail

router = routers.DefaultRouter()
router.register(r'documentos', DocumentoVentaViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/documentos/<int:pk>/', DocumentoVentaDetailView.as_view(), name='documentodetailOld'),
    path('personal/', PersonalList.as_view(), name='personal-list'),
    path('personal/<int:pk>/', PersonalDetail.as_view(), name='personal-detail'),
    path('documentodetail/<str:pk>/', DocumentoVentaDetailView.as_view(), name='documentodetail')
]

urlpatterns += router.urls