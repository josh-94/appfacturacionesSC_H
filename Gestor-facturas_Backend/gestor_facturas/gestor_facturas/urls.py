from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from ..api.views import DocumentoVentaDetailView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls')),
    path('api/', include('api.urls')),
    path('documentodetail/<str:pk>/', DocumentoVentaDetailView.as_view(), name='documentodetail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
