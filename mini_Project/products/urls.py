from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('shop', views.products, name='products'),
    path('checkout', views.checkout, name='checkout'),
    path('thanks', views.thanks, name='thanks'),

    # Add more URL patterns for the other app here...
]