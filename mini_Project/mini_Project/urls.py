"""
URL configuration for mini_Project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from users import views as users_views
from products import views as products_views
from django.conf import settings
from django.conf.urls.static import static
# from users import views
# from products import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('login', users_views.logIn, name='login'),
    path('register', users_views.register, name='register'),
    path('', products_views.home, name='home'),
    path('checkout', products_views.checkout, name='checkout'),
    path('thanks', products_views.thanks, name='thanks'),
    path('thankyou', products_views.thankyou, name='thankyou'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)